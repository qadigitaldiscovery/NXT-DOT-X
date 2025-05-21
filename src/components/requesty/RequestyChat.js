import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useRequestyClient } from "@/utils/requestyClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
export const RequestyChat = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState(null);
    const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant");
    const { sendMessage, isLoading, error } = useRequestyClient();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            toast.error("Please enter a message");
            return;
        }
        try {
            const result = await sendMessage(prompt, systemPrompt);
            setResponse(result);
            setPrompt("");
        }
        catch (err) {
            // Error is already handled in the hook
            console.error("Error in Requesty chat:", err);
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-3xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Requesty AI Chat" }), _jsx(CardDescription, { children: "Chat with AI models through the Requesty API" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("div", { className: "flex justify-between items-center mb-2", children: _jsx("label", { className: "text-sm font-medium", children: "System Prompt" }) }), _jsx(Textarea, { value: systemPrompt, onChange: (e) => setSystemPrompt(e.target.value), placeholder: "Set the AI's behavior with a system prompt", className: "h-24 resize-none" })] }), response && (_jsx("div", { className: "bg-muted p-4 rounded-md overflow-auto max-h-80", children: _jsx("p", { className: "whitespace-pre-wrap", children: response }) })), error && (_jsxs("div", { className: "p-4 bg-destructive/10 text-destructive rounded-md", children: ["Error: ", error] }))] }), _jsx(CardFooter, { children: _jsxs("form", { onSubmit: handleSubmit, className: "flex w-full gap-2", children: [_jsx(Input, { value: prompt, onChange: (e) => setPrompt(e.target.value), placeholder: "Type your message here...", disabled: isLoading, className: "flex-1" }), _jsxs(Button, { type: "submit", disabled: isLoading, children: [isLoading ? _jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : _jsx(Send, { className: "h-4 w-4" }), _jsx("span", { className: "ml-2", children: isLoading ? "Sending..." : "Send" })] })] }) })] }));
};
