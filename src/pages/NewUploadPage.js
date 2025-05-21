import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { FileUploadForm } from '@/components/uploads/FileUploadForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
export default function NewUploadPage() {
    const navigate = useNavigate();
    const handleUploadComplete = () => {
        navigate('/data-management/uploads');
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Upload Cost File" }), _jsx("p", { className: "text-muted-foreground", children: "Upload a new supplier cost file" })] }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/data-management/uploads'), children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to Uploads"] })] }), _jsx("div", { className: "max-w-md mx-auto", children: _jsx(FileUploadForm, { onUploadComplete: handleUploadComplete, allowHoldingBucket: true }) })] }));
}
