import { jsx as _jsx } from "react/jsx-runtime";
import { PlatformLayout } from "../components/layouts/PlatformLayout";
import AIExtractPage from "../pages/auto/AIExtractPage";
export const AIExtractRoutes = [
    {
        path: "/ai-extract",
        children: [
            {
                index: true,
                element: (_jsx(PlatformLayout, { moduleTitle: "AI Extract", navCategories: [], children: _jsx(AIExtractPage, {}) })),
            },
            {
                path: "upload",
                element: (_jsx(PlatformLayout, { moduleTitle: "Upload Documents", navCategories: [], children: _jsx(AIExtractPage, {}) })),
            },
            {
                path: "extractions",
                element: (_jsx(PlatformLayout, { moduleTitle: "View Extractions", navCategories: [], children: _jsx(AIExtractPage, {}) })),
            },
            {
                path: "storage",
                element: (_jsx(PlatformLayout, { moduleTitle: "Data Storage", navCategories: [], children: _jsx(AIExtractPage, {}) })),
            },
            {
                path: "settings",
                element: (_jsx(PlatformLayout, { moduleTitle: "AI Extract Settings", navCategories: [], children: _jsx(AIExtractPage, {}) })),
            },
        ],
    },
];
