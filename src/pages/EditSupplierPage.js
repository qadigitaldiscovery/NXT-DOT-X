import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { SupplierForm } from '@/components/suppliers/SupplierForm';
import { useDeleteSupplier, useSupplier } from '@/hooks/use-suppliers';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export default function EditSupplierPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: supplier, isLoading, error } = useSupplier(id);
    const { mutate: deleteSupplier } = useDeleteSupplier();
    const handleDelete = () => {
        if (id && window.confirm(`Are you sure you want to delete supplier "${supplier?.name}"?`)) {
            deleteSupplier(id, {
                onSuccess: () => {
                    navigate('/beta1/suppliers');
                }
            });
        }
    };
    if (isLoading) {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Edit Supplier" }), _jsx("p", { className: "text-muted-foreground", children: "Loading supplier details..." })] }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" })] }) }) })] }));
    }
    if (error || !supplier) {
        return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Edit Supplier" }), _jsx("p", { className: "text-muted-foreground text-red-500", children: "Error loading supplier details. The supplier may not exist." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Edit Supplier" }), _jsxs("p", { className: "text-muted-foreground", children: ["Update supplier information for ", supplier.name] })] }), _jsx(SupplierForm, { initialData: supplier, isEditing: true, onDelete: handleDelete })] }));
}
