import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Clock, PlayCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
const ScheduledTaskCard = ({ title, description, taskName, lastRun }) => {
    const [running, setRunning] = useState(false);
    const handleRunNow = async () => {
        setRunning(true);
        try {
            const { data, error } = await supabase.functions.invoke(taskName, {
                method: 'POST',
                body: { manual: true, timestamp: new Date().toISOString() }
            });
            if (error) {
                throw new Error(error.message);
            }
            toast.success('Task executed successfully');
            console.log('Task response:', data);
        }
        catch (err) {
            console.error('Error running task:', err);
            toast.error('Failed to execute task');
        }
        finally {
            setRunning(false);
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: title }), _jsx(Clock, { className: "h-5 w-5 text-muted-foreground" })] }), _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm", children: lastRun ? (_jsxs("span", { children: ["Last run: ", lastRun] })) : (_jsxs("span", { className: "flex items-center text-amber-600", children: [_jsx(AlertCircle, { className: "mr-1 h-4 w-4" }), "Never run"] })) }), _jsxs(Button, { size: "sm", onClick: handleRunNow, disabled: running, className: "flex items-center gap-1", children: [running ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(PlayCircle, { className: "h-4 w-4" })), running ? 'Running...' : 'Run Now'] })] }) }) })] }));
};
export default ScheduledTaskCard;
