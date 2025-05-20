import React from "react";
import { PlatformLayout } from "../components/layouts/PlatformLayout";
import AIExtractPage from "../pages/auto/AIExtractPage";

export const AIExtractRoutes = [
  {
    path: "/ai-extract",
    children: [
      {
        index: true,
        element: (
          <PlatformLayout moduleTitle="AI Extract" navCategories={[]} >
            <AIExtractPage />
          </PlatformLayout>
        ),
      },
      {
        path: "upload",
        element: (
          <PlatformLayout moduleTitle="Upload Documents" navCategories={[]} >
            <AIExtractPage />
          </PlatformLayout>
        ),
      },
      {
        path: "extractions",
        element: (
          <PlatformLayout moduleTitle="View Extractions" navCategories={[]} >
            <AIExtractPage />
          </PlatformLayout>
        ),
      },
      {
        path: "storage",
        element: (
          <PlatformLayout moduleTitle="Data Storage" navCategories={[]} >
            <AIExtractPage />
          </PlatformLayout>
        ),
      },
      {
        path: "settings",
        element: (
          <PlatformLayout moduleTitle="AI Extract Settings" navCategories={[]} >
            <AIExtractPage />
          </PlatformLayout>
        ),
      },
    ],
  },
];
