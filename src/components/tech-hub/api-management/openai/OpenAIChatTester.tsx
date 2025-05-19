
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "@/types/ai";

import { useOpenAI } from "@/hooks/use-openai";

export const OpenAIChatTester: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const openai = useOpenAI();
  
  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setResponse(""); // Clear previous response
      
      const messages: ChatMessage[] = [
        { role: "user", content: prompt }
      ];
      
      // Use the openai hook to send the message
      const completion = await openai.sendMessage(prompt, model);
      setResponse(completion);
    } catch (error) {
      console.error("Error testing OpenAI API:", error);
      toast.error("Failed to get a response from OpenAI");
      setResponse("Error: Failed to get a response. Please check your API key configuration and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test OpenAI API</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="model-select" className="text-sm font-medium">Model</label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model-select">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">Prompt</label>
          <Textarea 
            id="prompt"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
        </div>
        
        {response && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Response</label>
            <div className="p-3 bg-muted rounded-md overflow-auto max-h-64">
              <pre className="whitespace-pre-wrap text-sm">{response}</pre>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !prompt.trim()}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <SendIcon className="mr-2 h-4 w-4" />
              Send Prompt
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpenAIChatTester;
