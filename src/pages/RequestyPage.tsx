
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RequestyKeyForm from '@/components/tech-hub/api-management/requesty/RequestyKeyForm';
import RequestyChatTester from '@/components/tech-hub/api-management/requesty/RequestyChatTester';

const RequestyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Requesty API Integration</h1>
          <p className="text-muted-foreground">Configure and test your Requesty API integration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RequestyKeyForm />
        <RequestyChatTester />
      </div>
    </div>
  );
};

export default RequestyPage;
