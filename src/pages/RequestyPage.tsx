
import React from "react";
import { RequestyChat } from "@/components/requesty/RequestyChat";
import { BrandMarketingLayout } from "@/components/layout/BrandMarketingLayout";

const RequstyPage: React.FC = () => {
  return (
    <BrandMarketingLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-6">Requesty Integration</h1>
        <RequestyChat />
      </div>
    </BrandMarketingLayout>
  );
};

export default RequstyPage;
