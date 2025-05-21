import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
const getStatusColor = (status) => {
    switch (status) {
        case 'active':
        case 'green':
            return 'bg-[#e5effc] text-[#005fea] border-[#aee1f9]';
        case 'beta':
        case 'orange':
        case 'maintenance':
            return 'bg-[#fdf0ec] text-[#f97316] border-[#fdcfbc]';
        case 'deprecated':
        case 'red':
        case 'inactive':
            return 'bg-[#fdecf0] text-[#ef4444] border-[#faccda]';
        default:
            return 'bg-[#f1f0fb] text-[#6e59a5] border-[#d6bcfa]';
    }
};
const getStatusText = (status) => {
    switch (status) {
        case 'active':
        case 'inactive':
        case 'maintenance':
        case 'deprecated':
        case 'beta':
            return status.charAt(0).toUpperCase() + status.slice(1);
        case 'green':
            return 'Operational';
        case 'orange':
            return 'Degraded';
        case 'red':
            return 'Critical';
        default:
            return status.charAt(0).toUpperCase() + status.slice(1);
    }
};
const getSizingClasses = (size) => {
    switch (size) {
        case 'sm':
            return 'text-xs px-1.5 py-0.5';
        case 'md':
            return 'text-sm px-2 py-1';
        case 'lg':
            return 'text-base px-3 py-1.5';
        default:
            return 'text-sm px-2 py-1';
    }
};
const ModuleStatusIndicator = ({ status, size = 'md', className, }) => {
    return (_jsx(Badge, { variant: "outline", className: cn('rounded-full font-medium border', getStatusColor(status), getSizingClasses(size), className), children: getStatusText(status) }));
};
export default ModuleStatusIndicator;
