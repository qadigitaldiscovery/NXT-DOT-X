import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Users, Truck, Beaker, Calculator, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

export default function DataManagement() {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const hasBetaAccess = hasPermission('modules.data');
  
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
          {hasBetaAccess && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="flex items-center">
                <Beaker className="w-3 h-3 mr-1 text-purple-400" />
                <Button 
                  variant="link" 
                  className="px-1 py-0 h-auto text-purple-400 text-xs" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/beta1');
                  }}
                >
                  Data Platform Beta
                </Button>
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={() => navigate('/data-management')} className="w-full">
          Open Data Management
        </Button>
        {hasBetaAccess && (
          <Button 
            onClick={() => navigate('/beta1')} 
            variant="outline" 
            className="w-full text-purple-400 border-purple-700 hover:bg-purple-900/30"
          >
            <Beaker className="w-4 h-4 mr-2" />
            Open Data Platform Beta
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
