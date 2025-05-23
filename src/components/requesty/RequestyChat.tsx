
import React, { useState } from "react";
import { useRequestyClient } from "@/utils/requestyClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export const RequestyChat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant");
  const { sendMessage, isLoading, error } = useRequestyClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      const result = await sendMessage(prompt, systemPrompt);
      setResponse(result);
      setPrompt("");
    } catch (err) {
      // Error is already handled in the hook
      console.error("Error in Requesty chat:", err);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Requesty AI Chat</CardTitle>
        <CardDescription>
          Chat with AI models through the Requesty API
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">System Prompt</label>
          </div>
          <Textarea 
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Set the AI's behavior with a system prompt"
            className="h-24 resize-none"
          />
        </div>

        {response && (
          <div className="bg-muted p-4 rounded-md overflow-auto max-h-80">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            Error: {error}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="ml-2">{isLoading ? "Sending..." : "Send"}</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
