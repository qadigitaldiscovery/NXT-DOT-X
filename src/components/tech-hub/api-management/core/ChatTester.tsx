import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export interface ChatTesterProps {
  providerName: string;
  onSendMessage: (message: string) => Promise<string>;
  placeholderText?: string;
  title?: string;
  messages?: Array<{ role: string; content: string }>;
  onSubmit?: (prompt: string) => Promise<boolean>;
  isLoading?: boolean;
  error?: any;
  onClear?: () => void;
}

const ChatTester: React.FC<ChatTesterProps> = ({ 
  providerName, 
  onSendMessage, 
  placeholderText = `Enter a prompt to test the ${providerName} API...`,
  title,
  messages,
  onSubmit,
  isLoading: propIsLoading,
  error,
  onClear,
}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [localIsLoading, setLocalIsLoading] = useState(false);
  
  // Use either the prop loading state or local state
  const isLoading = propIsLoading !== undefined ? propIsLoading : localIsLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // If the parent component provided an onSubmit handler, use it
    if (onSubmit) {
      await onSubmit(prompt);
      return;
    }

    // Otherwise, use the default implementation
    try {
      setLocalIsLoading(true);
      setResponse('');
      
      const result = await onSendMessage(prompt);
      setResponse(result);
    } catch (error) {
      console.error(`Error testing ${providerName}:`, error);
      setResponse(`Error: Failed to get a response. Please check your API key and try again.`);
    } finally {
      setLocalIsLoading(false);
    }
  };

  // Render messages if provided, otherwise render the simple response
  const renderContent = () => {
    if (messages && messages.length > 0) {
      return (
        <div className="mt-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}>
              <p className="text-xs font-medium mb-1">{msg.role === 'user' ? 'You' : providerName}</p>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}
        </div>
      );
    } else if (response) {
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Response:</h3>
          <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
            {response}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title || `${providerName} Chat Test`}</CardTitle>
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
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              className="flex-1"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating Response...' : 'Send Test Message'}
            </Button>
            
            {onClear && (
              <Button 
                type="button" 
                variant="outline"
                onClick={onClear}
              >
                Clear Chat
              </Button>
            )}
          </div>
        </form>

        {renderContent()}
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
            {typeof error === 'string' ? error : 'An error occurred during the request'}
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
