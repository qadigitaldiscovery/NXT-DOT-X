import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FileSize({ bytes }) {
    if (!bytes)
        return _jsx(_Fragment, { children: "\u2014" });
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return _jsxs(_Fragment, { children: [size.toFixed(1), " ", units[unitIndex]] });
}
