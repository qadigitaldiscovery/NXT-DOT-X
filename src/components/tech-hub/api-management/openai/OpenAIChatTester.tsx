import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useOpenAI } from '@/hooks/use-openai';
import { ChatMessage } from '@/types/ai';

export function OpenAIChatTester() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modified to handle API without stream property
  const openai = useOpenAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input } as ChatMessage;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await openai.createChatCompletion({
        messages: [...messages, userMessage],
        model: 'gpt-3.5-turbo',
      });

      if (response && response.choices && response.choices[0]?.message) {
        const assistantMessage = response.choices[0].message as ChatMessage;
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error chatting with OpenAI:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while chatting with OpenAI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI Chat Tester</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] mb-4">
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${message.role === 'user' ? 'bg-blue-100 text-blue-800 self-end' : 'bg-gray-100 text-gray-800 self-start'
                  }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            {isLoading && <div className="text-gray-500">Thinking...</div>}
          </div>
        </ScrollArea>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            Send <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        <p>
          This is a simple chat interface to test the OpenAI API.
        </p>
      </CardFooter>
    </Card>
  );
}
