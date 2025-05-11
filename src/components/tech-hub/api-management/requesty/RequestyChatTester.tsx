
import React from 'react';
import { toast } from 'sonner';
import ChatTester from '../core/ChatTester';
import { useRequesty } from '@/hooks/api-clients/requesty';

const RequestyChatTester: React.FC = () => {
  const { sendMessage } = useRequesty();

  const handleSendMessage = async (prompt: string): Promise<string> => {
    try {
      return await sendMessage(prompt);
    } catch (error) {
      console.error('Error testing Requesty:', error);
      toast.error('Failed to get response from Requesty');
      throw error;
    }
  };

  return (
    <ChatTester 
      providerName="Requesty" 
      onSendMessage={handleSendMessage} 
      placeholderText="Enter a prompt to test the Requesty API..."
    />
  );
};

export default RequestyChatTester;
