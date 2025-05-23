
import React, { useState } from 'react';
import { toast } from 'sonner';
import ChatTester from '../core/ChatTester';
import { ChatCompletionResponse } from '@/utils/api-clients/openai/types';
import { callOpenAI } from '@/utils/api-clients/openai/client';

const OpenAIChatTester: React.FC = () => {
  const handleSendMessage = async (prompt: string): Promise<string> => {
    try {
      console.log("Sending test prompt to OpenAI");
      
      // Default to gpt-4o-mini
      const model = 'gpt-4o-mini';
      
      const result = await callOpenAI<ChatCompletionResponse>({
        endpoint: 'chat',
        payload: {
          model,
          messages: [
            { role: 'user', content: prompt }
          ],
          max_tokens: 500
        }
      });

      if (!result || !result.choices || result.choices.length === 0) {
        throw new Error("Received empty response from OpenAI");
      }
      
      return result.choices[0].message.content;
    } catch (error) {
      console.error('Error testing OpenAI:', error);
      toast.error('Failed to get response from OpenAI. Please check your API key.');
      throw error;
    }
  };

  return (
    <ChatTester 
      providerName="OpenAI" 
      onSendMessage={handleSendMessage} 
      placeholderText="Enter a prompt to test the OpenAI API..."
    />
  );
};

export default OpenAIChatTester;
