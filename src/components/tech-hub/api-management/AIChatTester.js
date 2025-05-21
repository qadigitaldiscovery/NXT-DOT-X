import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { callOpenAI } from '@/utils/openai-client';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
const AIChatTester = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim())
            return;
        try {
            setIsLoading(true);
            setResponse('');
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
            const result = await callOpenAI({
                endpoint: 'chat',
                payload: {
                    model,
                    messages: [
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 500
                }
            });
            setResponse(result.choices[0].message.content);
        }
        catch (error) {
            console.error('Error testing OpenAI:', error);
            toast.error('Failed to get response from OpenAI');
            setResponse('Error: Failed to get a response. Please check your API key and try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "OpenAI Chat Test" }), _jsx(CardDescription, { children: "Send a test message to OpenAI to verify your API key is working" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("div", { children: _jsx(Textarea, { placeholder: "Enter a prompt to test the OpenAI API...", value: prompt, onChange: (e) => setPrompt(e.target.value), rows: 4, className: "resize-none" }) }), _jsxs(Button, { type: "submit", disabled: isLoading || !prompt.trim(), className: "w-full", children: [isLoading && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), isLoading ? 'Generating Response...' : 'Send Test Message'] })] }), response && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Response:" }), _jsx("div", { className: "border rounded-md p-4 bg-gray-50 whitespace-pre-wrap", children: response })] }))] }), _jsx(CardFooter, { className: "border-t pt-4 text-xs text-gray-500", children: "Your prompt and the response are not stored anywhere beyond this session." })] }));
};
export default AIChatTester;
