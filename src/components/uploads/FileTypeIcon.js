import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { File, Mail, FileSpreadsheet, FileText, FileImage, FileArchive } from "lucide-react";
export function FileTypeIcon({ fileName, fileType }) {
    const getFileIcon = (fileName, fileType) => {
        // Check file extension
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension === 'eml' || fileType.includes('message') || fileType.includes('email'))
            return 'EML';
        if (fileType.includes('csv'))
            return 'CSV';
        if (fileType.includes('excel') || fileType.includes('xlsx') || fileType.includes('xls') || extension === 'xlsx' || extension === 'xls')
            return 'XLS';
        if (fileType.includes('pdf') || extension === 'pdf')
            return 'PDF';
        if (fileType.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || ''))
            return 'IMG';
        if (fileType.includes('zip') || fileType.includes('archive') || ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || ''))
            return 'ZIP';
        return 'FILE';
    };
    const fileTypeLabel = getFileIcon(fileName, fileType);
    const getIcon = () => {
        switch (fileTypeLabel) {
            case 'EML': return _jsx(Mail, { className: "h-4 w-4" });
            case 'XLS': return _jsx(FileSpreadsheet, { className: "h-4 w-4" });
            case 'PDF': return _jsx(FileText, { className: "h-4 w-4" });
            case 'IMG': return _jsx(FileImage, { className: "h-4 w-4" });
            case 'ZIP': return _jsx(FileArchive, { className: "h-4 w-4" });
            default: return _jsx(File, { className: "h-4 w-4" });
        }
    };
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-muted rounded p-1.5", children: getIcon() }), _jsx("span", { className: "font-medium", children: fileName }), _jsx(Badge, { variant: "outline", className: "ml-1", children: fileTypeLabel })] }));
}
