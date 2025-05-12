
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { sendRequestyMessage } from '@/utils/api-clients/requesty/client';
import { toast } from 'sonner';

const RequestyChatTester = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setResponse('');
      
      const result = await sendRequestyMessage([
        { role: 'user', content: prompt }
      ]);

      setResponse(result);
    } catch (error) {
      console.error('Error testing Requesty:', error);
      toast.error('Failed to get response from Requesty');
      setResponse('Error: Failed to get a response. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Requesty Chat Test</CardTitle>
        <CardDescription>
          Send a test message to Requesty to verify your API key is working
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="Enter a prompt to test the Requesty API..."
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

export default RequestyChatTester;
