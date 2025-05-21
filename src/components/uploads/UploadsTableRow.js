import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { FileTypeIcon } from './FileTypeIcon';
import { StatusBadge } from './StatusBadge';
import { ErrorBadge } from './ErrorBadge';
import { FileSize } from './FileSize';
import { UploadActionsMenu } from './UploadActionsMenu';
export function UploadsTableRow({ upload, showSupplierColumn, isHoldingBucket, onProcess, onDelete, onAssign }) {
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(FileTypeIcon, { fileName: upload.file_name, fileType: upload.file_type }) }), showSupplierColumn && (_jsx(TableCell, { children: upload.supplier_name })), _jsx(TableCell, { children: format(new Date(upload.created_at), 'PP') }), _jsx(TableCell, { children: _jsx(FileSize, { bytes: upload.file_size }) }), _jsx(TableCell, { children: _jsx(StatusBadge, { status: upload.status }) }), _jsx(TableCell, { children: upload.processed_rows || '—' }), _jsx(TableCell, { children: _jsx(ErrorBadge, { errorRows: upload.error_rows, status: upload.status }) }), _jsx(TableCell, { children: _jsx(UploadActionsMenu, { upload: upload, isHoldingBucket: isHoldingBucket, onProcess: onProcess, onDelete: onDelete, onAssign: onAssign }) })] }));
}
