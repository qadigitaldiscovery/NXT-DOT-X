
import { useState } from 'react';
import ChatTester from "../core/ChatTester";
import { useOpenAIStream } from "@/hooks/api-clients/openai/use-openai-stream";

export function OpenAIChatTester() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const openAIStream = useOpenAIStream();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (prompt: string) => {
    const userMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Add assistant message placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      await openAIStream.stream({
        messages: [...messages, userMessage],
        onToken: (token: string) => {
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.role === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + token }
              ];
            } else {
              return [...prev, { role: 'assistant', content: token }];
            }
          });
        }
      });
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error during OpenAI chat:', err);
      setError(err.message || 'Failed to get response from OpenAI');
      setMessages(prev => {
        // If the last message is an empty assistant message, update it
        if (prev[prev.length - 1]?.role === 'assistant' && !prev[prev.length - 1]?.content) {
          return [...prev.slice(0, -1), { role: 'assistant', content: 'Error: Failed to get response from OpenAI.' }];
        }
        return [...prev, { role: 'assistant', content: 'Error: Failed to get response from OpenAI.' }];
      });
      setIsLoading(false);
      return false;
    }
  };

  return (
    <ChatTester 
      providerName="OpenAI"
      onSendMessage={async () => ""} // Not used when onSubmit is provided
      title="OpenAI Tester"
      messages={messages}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      onClear={() => setMessages([])}
    />
  );
}

export default OpenAIChatTester;
