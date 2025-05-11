
import React from 'react';
import { toast } from 'sonner';
import ChatTester from '../core/ChatTester';
import { callOpenAI, ChatCompletionResponse } from '@/utils/openai-client';
import { supabase } from '@/integrations/supabase/client';

const OpenAIChatTester: React.FC = () => {
  const handleSendMessage = async (prompt: string): Promise<string> => {
    try {
      // Get preferred model from database if available
      let model = 'gpt-4o-mini';
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data } = await supabase
          .from('api_provider_settings')
          .select('preferred_model')
          .eq('provider_name', 'openai')
          .eq('user_id', session.user.id)
          .maybeSingle();
          
        if (data?.preferred_model) {
          model = data.preferred_model;
        }
      }

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

      return result.choices[0].message.content;
    } catch (error) {
      console.error('Error testing OpenAI:', error);
      toast.error('Failed to get response from OpenAI');
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
