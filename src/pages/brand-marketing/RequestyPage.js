import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, MessageSquare, BrainCircuit } from 'lucide-react';
import { useOpenAI } from '@/hooks/api-clients/openai/use-openai-client';
const RequestyPage = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { sendMessage } = useOpenAI();
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
            toast.error("Empty query: Please enter a question about brand marketing.");
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
        }
        catch (error) {
            console.error('Error querying AI:', error);
            toast.error("Error: Failed to get a response. Please try again.");
        }
        finally {
            setIsProcessing(false);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Brand Marketing Assistant" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Get AI-powered insights for your brand marketing strategy" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(BrainCircuit, { className: "mr-2 h-5 w-5" }), "Ask Requesty about Brand Marketing"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Textarea, { placeholder: "E.g., 'How can I improve my brand's trust score?' or 'Suggest keywords for a tech startup in AI space'", className: "min-h-[100px]", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx(Button, { onClick: handleQuerySubmit, disabled: isProcessing || !query.trim(), className: "w-full", children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(MessageSquare, { className: "mr-2 h-4 w-4" }), "Get Brand Insights"] })) }), response && (_jsxs("div", { className: "mt-6 border rounded-md p-4 bg-slate-50 dark:bg-slate-900", children: [_jsx("h3", { className: "font-medium mb-2", children: "Requesty's Analysis:" }), _jsx("div", { className: "whitespace-pre-wrap", children: response })] }))] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Popular Brand Marketing Questions" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-2", children: [
                                "How can I measure the ROI of brand marketing activities?",
                                "What metrics should I track for brand trust?",
                                "Suggest a content strategy to improve brand perception",
                                "How to interpret negative sentiment in social media mentions?",
                                "What SEO strategies work best for B2B brands?",
                            ].map((suggestion, index) => (_jsx(Button, { variant: "outline", className: "justify-start h-auto py-2 px-3 text-left", onClick: () => {
                                    setQuery(suggestion);
                                    window.scrollTo(0, 0);
                                }, children: suggestion }, index))) }) })] })] }));
};
export default RequestyPage;
