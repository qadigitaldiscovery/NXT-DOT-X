
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';

const BusinessRules = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Key Business Rules & Operations</h1>
      <p className="text-muted-foreground">View and manage core business rules for data management</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Data Validation Rules</CardTitle>
            <BookOpen className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">25 active validation rules across all data domains</p>
            <div className="mt-4 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
              <span className="text-sm">All validation rules passing</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Data Quality Management</CardTitle>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Monitor data quality metrics and compliance</p>
            <div className="mt-4 flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" /> 
              <span className="text-sm">3 quality warnings require attention</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Business Process Rules</CardTitle>
            <BookOpen className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Core business processes and operational guidelines</p>
            <div className="mt-4 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
              <span className="text-sm">All processes operating normally</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessRules;
