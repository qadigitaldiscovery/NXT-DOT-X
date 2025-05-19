
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChatTester from "../core/ChatTester";
import { useOpenAIStream } from "@/hooks/api-clients/openai/use-openai-stream";

export function OpenAIChatTester() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const { streamResponse, isLoading, error } = useOpenAIStream();

  const handleSubmit = async (prompt: string) => {
    const userMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await streamResponse({
        messages: [...messages, userMessage],
        onToken: (token) => {
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
      
      return true;
    } catch (err) {
      console.error('Error during OpenAI chat:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Failed to get response from OpenAI.' }]);
      return false;
    }
  };

  return (
    <ChatTester 
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
