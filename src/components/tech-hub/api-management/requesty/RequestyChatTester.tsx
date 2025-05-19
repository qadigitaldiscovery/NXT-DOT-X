
import { useState } from 'react';
import { toast } from 'sonner';
import ChatTester from '../core/ChatTester';

const RequestyChatTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendMessage = async (prompt: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    const apiKey = localStorage.getItem('requesty_api_key');
    if (!apiKey) {
      setError("No API key found. Please configure your Requesty API key first.");
      setIsLoading(false);
      return "Error: No API key configured";
    }
    
    try {
      const configString = localStorage.getItem('requesty_config') || '{}';
      const config = JSON.parse(configString);
      
      const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: config.model || "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: config.max_tokens || 2048,
          temperature: config.temperature || 0.7
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response from Requesty");
      }
      
      const data = await response.json();
      return data.choices[0]?.message?.content || "No content in the response";
    } catch (error: any) {
      console.error('Error testing Requesty:', error);
      setError(error.message || "Failed to get response from Requesty");
      toast.error('Failed to get response from Requesty');
      return `Error: ${error.message || "Unknown error occurred"}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatTester 
      providerName="Requesty" 
      onSendMessage={sendMessage} 
      placeholderText="Enter a prompt to test the Requesty API..."
      isLoading={isLoading}
      error={error}
    />
  );
};

export default RequestyChatTester;
