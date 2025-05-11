
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { callOpenAI, estimateTokenCount, estimateCost } from '@/utils/openai-client';

const AIChatTester: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState({ prompt: 0, completion: 0, total: 0 });
  const [cost, setCost] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Get API key from localStorage
  const getApiKey = () => localStorage.getItem('openai-api-key') || '';
  
  // Update token count when prompt changes
  useEffect(() => {
    const promptTokens = estimateTokenCount(prompt);
    setTokens(prev => ({ ...prev, prompt: promptTokens, total: promptTokens + prev.completion }));
  }, [prompt]);
  
  // Generate response
  const generateResponse = async () => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      toast.error("Please configure your OpenAI API key first");
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    setIsLoading(true);
    setResponse('');
    
    try {
      // Create abort controller
      abortControllerRef.current = new AbortController();
      
      const model = localStorage.getItem('openai-preferred-model') || 'gpt-4o-mini';
      
      const result = await callOpenAI({
        endpoint: 'chat',
        payload: {
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 500
        },
        apiKey,
        signal: abortControllerRef.current.signal
      });
      
      const completionText = result.choices[0].message.content;
      setResponse(completionText);
      
      // Update token counts and cost estimate
      const promptTokens = result.usage.prompt_tokens;
      const completionTokens = result.usage.completion_tokens;
      setTokens({
        prompt: promptTokens,
        completion: completionTokens,
        total: result.usage.total_tokens
      });
      
      setCost(estimateCost(model, promptTokens, completionTokens));
      
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error("Error generating response:", error);
        toast.error("Failed to generate response");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };
  
  // Cancel ongoing request
  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      toast.info("Request cancelled");
    }
  };
  
  // Format cost for display
  const formatCost = (value: number) => {
    return `$${value.toFixed(6)}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI API Tester</CardTitle>
        <CardDescription>
          Test your OpenAI integration with this simple chat interface
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-24 resize-none"
          />
        </div>
        
        {response && (
          <div className="space-y-2 mt-4">
            <div className="font-medium">Response:</div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          <div>Prompt tokens: {tokens.prompt}</div>
          <div>Completion tokens: {tokens.completion}</div>
          <div>Total tokens: {tokens.total}</div>
          {cost > 0 && <div>Estimated cost: {formatCost(cost)}</div>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setPrompt('');
            setResponse('');
            setTokens({ prompt: 0, completion: 0, total: 0 });
            setCost(0);
          }}
          disabled={isLoading}
        >
          Clear
        </Button>
        
        <div className="space-x-2">
          {isLoading && (
            <Button variant="outline" onClick={cancelRequest}>
              Cancel
            </Button>
          )}
          <Button 
            onClick={generateResponse}
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? "Generating..." : "Generate Response"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatTester;
