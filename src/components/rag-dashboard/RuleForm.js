import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export default function RuleForm({ module, onAddRule }) {
    const [metric, setMetric] = useState('');
    const [condition, setCondition] = useState('>');
    const [threshold, setThreshold] = useState('');
    const [durationSeconds, setDurationSeconds] = useState('');
    const [resultingStatus, setResultingStatus] = useState('orange');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!metric || !threshold)
            return;
        setIsSubmitting(true);
        await onAddRule({
            module_id: module.id,
            metric,
            condition,
            threshold: parseFloat(threshold),
            duration_seconds: durationSeconds ? parseInt(durationSeconds) : null,
            resulting_status: resultingStatus
        });
        // Reset form
        setMetric('');
        setCondition('>');
        setThreshold('');
        setDurationSeconds('');
        setResultingStatus('orange');
        setIsSubmitting(false);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Create Threshold Rule" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "metric", children: "Metric Name" }), _jsx(Input, { id: "metric", placeholder: "e.g. CPU Usage, Response Time", value: metric, onChange: (e) => setMetric(e.target.value), required: true })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "condition", children: "Condition" }), _jsxs(Select, { value: condition, onValueChange: setCondition, children: [_jsx(SelectTrigger, { id: "condition", children: _jsx(SelectValue, { placeholder: "Select condition" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: ">", children: "Greater than (>)" }), _jsx(SelectItem, { value: ">=", children: "Greater than or equal (>=)" }), _jsx(SelectItem, { value: "<", children: "Less than (<)" }), _jsx(SelectItem, { value: "<=", children: "Less than or equal (<=)" }), _jsx(SelectItem, { value: "=", children: "Equal to (=)" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "threshold", children: "Threshold" }), _jsx(Input, { id: "threshold", type: "number", placeholder: "Threshold value", value: threshold, onChange: (e) => setThreshold(e.target.value), required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "duration", children: "Duration (seconds, optional)" }), _jsx(Input, { id: "duration", type: "number", placeholder: "e.g. 300 for 5 minutes", value: durationSeconds, onChange: (e) => setDurationSeconds(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "status", children: "Resulting Status" }), _jsxs(Select, { value: resultingStatus, onValueChange: (value) => setResultingStatus(value), children: [_jsx(SelectTrigger, { id: "status", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "green", children: "Green (Operational)" }), _jsx(SelectItem, { value: "orange", children: "Orange (Degraded)" }), _jsx(SelectItem, { value: "red", children: "Red (Outage)" })] })] })] })] }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? 'Creating...' : 'Create Rule' }) })] })] }));
}
