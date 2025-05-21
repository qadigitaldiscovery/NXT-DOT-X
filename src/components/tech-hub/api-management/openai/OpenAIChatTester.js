import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { useOpenAI } from "@/hooks/use-openai";
export const OpenAIChatTester = () => {
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
            // Use the openai hook to send the message
            const completion = await openai.sendMessage(prompt, model);
            setResponse(completion);
        }
        catch (error) {
            console.error("Error testing OpenAI API:", error);
            toast.error("Failed to get a response from OpenAI");
            setResponse("Error: Failed to get a response. Please check your API key configuration and try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Test OpenAI API" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "model-select", className: "text-sm font-medium", children: "Model" }), _jsxs(Select, { value: model, onValueChange: setModel, children: [_jsx(SelectTrigger, { id: "model-select", children: _jsx(SelectValue, { placeholder: "Select a model" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "gpt-4o-mini", children: "GPT-4o Mini" }), _jsx(SelectItem, { value: "gpt-4o", children: "GPT-4o" }), _jsx(SelectItem, { value: "gpt-3.5-turbo", children: "GPT-3.5 Turbo" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "prompt", className: "text-sm font-medium", children: "Prompt" }), _jsx(Textarea, { id: "prompt", placeholder: "Enter your prompt here...", value: prompt, onChange: (e) => setPrompt(e.target.value), rows: 4 })] }), response && (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Response" }), _jsx("div", { className: "p-3 bg-muted rounded-md overflow-auto max-h-64", children: _jsx("pre", { className: "whitespace-pre-wrap text-sm", children: response }) })] }))] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: handleSubmit, disabled: isSubmitting || !prompt.trim(), className: "w-full", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(SendIcon, { className: "mr-2 h-4 w-4" }), "Send Prompt"] })) }) })] }));
};
export default OpenAIChatTester;
