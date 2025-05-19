
import { useCallback } from 'react';
import { ChatTester } from '../core/ChatTester';
import { useOpenAiStream } from '@/hooks/api-clients/openai/use-openai-stream';

interface OpenAIChatTesterProps {
  apiKey: string;
  config?: Record<string, any>;
}

export const OpenAIChatTester: React.FC<OpenAIChatTesterProps> = ({ apiKey, config }) => {
  const { 
    messages, 
    pendingMessage, 
    setPendingMessage,
    isLoading,
    handleSubmit,
    responseStream,
    error
  } = useOpenAiStream(apiKey, config);

  const handleSendMessage = useCallback((message: string) => {
    handleSubmit(message);
  }, [handleSubmit]);

  return (
    <ChatTester
      title="OpenAI Chat"
      description="Test your OpenAI API key with a simple chat interface"
      messages={messages}
      pendingMessage={pendingMessage}
      setPendingMessage={setPendingMessage}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      streamingResponse={responseStream}
      error={error}
    />
  );
};

export default OpenAIChatTester;
