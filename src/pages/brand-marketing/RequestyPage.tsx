
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Zap } from 'lucide-react';
import { useOpenAI } from '@/hooks/use-openai';
import { toast } from 'sonner';

const RequestyPage = () => {
  const { sendMessage, isValid } = useOpenAI();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    if (!isValid) {
      toast.error('Please configure your OpenAI API key first');
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendMessage(message);
      setResponse(result);
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requesty AI</h1>
          <p className="text-muted-foreground">
            AI-powered brand marketing assistant
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          AI Assistant
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Message
            </CardTitle>
            <CardDescription>
              Ask Requesty AI about your brand marketing needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Ask about brand strategy, market analysis, campaign ideas..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSendMessage} 
                disabled={!message.trim() || isLoading}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('Analyze my brand positioning')}
                >
                  Brand Analysis
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('Suggest marketing campaign ideas')}
                >
                  Campaign Ideas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction('Help with competitor analysis')}
                >
                  Competitor Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Section */}
        <Card>
          <CardHeader>
            <CardTitle>AI Response</CardTitle>
            <CardDescription>
              Requesty AI's insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {response ? (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{response}</p>
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Send a message to see AI response here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Brand Strategy</h3>
            <p className="text-sm text-muted-foreground">
              Get insights on brand positioning, messaging, and market differentiation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Campaign Planning</h3>
            <p className="text-sm text-muted-foreground">
              Generate creative campaign ideas and marketing strategies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Market Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze market trends and competitive landscape
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestyPage;
