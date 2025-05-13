
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, MessageSquare, BrainCircuit } from 'lucide-react';
import { useOpenAI } from '@/hooks/api-clients/openai';

const RequestyPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { sendMessage } = useOpenAI();
  const { toast } = useToast();

  const brandMarketingSystemPrompt = `
    You are BrandGPT, an expert brand marketing assistant specialized in:
    1. Brand analytics and market trends
    2. Trust analysis and reputation management
    3. Market perception and sentiment analysis
    4. SEO strategy and keyword opportunities
    
    Provide detailed, actionable insights based on marketing best practices.
    Include specific recommendations when possible.
    Format your responses with clear headings and bullet points for readability.
  `;

  const handleQuerySubmit = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter a question about brand marketing.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setResponse('');

    try {
      const result = await sendMessage(query, 'gpt-4o-mini', {
        systemPrompt: brandMarketingSystemPrompt,
        temperature: 0.7
      });
      
      setResponse(result);
    } catch (error) {
      console.error('Error querying AI:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Marketing Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered insights for your brand marketing strategy
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5" />
            Ask Requesty about Brand Marketing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="E.g., 'How can I improve my brand's trust score?' or 'Suggest keywords for a tech startup in AI space'"
            className="min-h-[100px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          <Button 
            onClick={handleQuerySubmit} 
            disabled={isProcessing || !query.trim()} 
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Get Brand Insights
              </>
            )}
          </Button>

          {response && (
            <div className="mt-6 border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
              <h3 className="font-medium mb-2">Requesty's Analysis:</h3>
              <div className="whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Popular Brand Marketing Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {[
              "How can I measure the ROI of brand marketing activities?",
              "What metrics should I track for brand trust?",
              "Suggest a content strategy to improve brand perception",
              "How to interpret negative sentiment in social media mentions?",
              "What SEO strategies work best for B2B brands?",
            ].map((suggestion, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="justify-start h-auto py-2 px-3 text-left"
                onClick={() => {
                  setQuery(suggestion);
                  window.scrollTo(0, 0);
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestyPage;
