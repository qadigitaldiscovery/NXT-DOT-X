import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const SyncSettingItem = ({ id, title, description, setting, isLoading, onToggle, onFrequencyChange }) => {
    const isEnabled = setting?.is_enabled ?? false;
    const frequency = setting?.sync_frequency || 'daily';
    const lastSyncedAt = setting?.last_synced_at;
    return (_jsx("div", { className: "border p-4 rounded-md", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: `sync-${id}`, checked: isEnabled, onCheckedChange: (checked) => onToggle(checked === true), disabled: isLoading }), _jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: `sync-${id}`, className: "text-base font-medium", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description }), isEnabled && (_jsxs("div", { className: "mt-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Label, { htmlFor: `${id}-sync-frequency`, className: "text-sm w-32", children: "Sync frequency:" }), _jsxs(Select, { value: frequency, onValueChange: (value) => onFrequencyChange(value), disabled: isLoading, children: [_jsx(SelectTrigger, { id: `${id}-sync-frequency`, className: "w-36", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "hourly", children: "Hourly" }), _jsx(SelectItem, { value: "daily", children: "Daily" }), _jsx(SelectItem, { value: "weekly", children: "Weekly" }), _jsx(SelectItem, { value: "monthly", children: "Monthly" })] })] })] }), lastSyncedAt && (_jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: ["Last synced: ", new Date(lastSyncedAt).toLocaleString()] }))] }))] })] }) }));
};
export default SyncSettingItem;
