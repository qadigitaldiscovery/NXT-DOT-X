
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export interface ChatTesterProps {
  providerName: string;
  onSendMessage: (message: string) => Promise<string>;
  placeholderText?: string;
}

const ChatTester: React.FC<ChatTesterProps> = ({ 
  providerName, 
  onSendMessage, 
  placeholderText = `Enter a prompt to test the ${providerName} API...` 
}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setResponse('');
      
      const result = await onSendMessage(prompt);
      setResponse(result);
    } catch (error) {
      console.error(`Error testing ${providerName}:`, error);
      setResponse(`Error: Failed to get a response. Please check your API key and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{providerName} Chat Test</CardTitle>
        <CardDescription>
          Send a test message to {providerName} to verify your API key is working
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder={placeholderText}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Generating Response...' : 'Send Test Message'}
          </Button>
        </form>

        {response && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Response:</h3>
            <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-gray-500">
        Your prompt and the response are not stored anywhere beyond this session.
      </CardFooter>
    </Card>
  );
};

export default ChatTester;
