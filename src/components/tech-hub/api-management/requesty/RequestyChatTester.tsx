
import React from 'react';
import { toast } from 'sonner';
import ChatTester from '../core/ChatTester';
import { sendRequestyMessage } from '@/utils/requestyClient';

const RequestyChatTester: React.FC = () => {
  const handleSendMessage = async (prompt: string): Promise<string> => {
    try {
      return await sendRequestyMessage([
        { role: 'user', content: prompt }
      ]);
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
