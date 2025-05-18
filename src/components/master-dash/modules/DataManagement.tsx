import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Truck, Calculator, FileText, Server, BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

export default function DataManagement() {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  
  return (
    <Card className="col-span-1 bg-gray-800 hover:bg-gray-700 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-400" />
          <span>Data Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-300">
        <p>Analyze costs, manage documents, suppliers and customers.</p>
        <div className="mt-4 space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Cost analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Document management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Supplier management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Customer management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Supplier costing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Data Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Data Connections</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={() => navigate('/data-management')} className="w-full">
          Open Data Management
        </Button>
      </CardFooter>
    </Card>
  );
}
