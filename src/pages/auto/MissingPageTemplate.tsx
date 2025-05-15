
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText } from "lucide-react";
import { NavCategory } from '@/components/layout/sidebar/types';

interface MissingPageTemplateProps {
  moduleName: string;
  moduleDescription?: string;
  navCategories: NavCategory[];
  docsLink?: string;
}

const MissingPageTemplate: React.FC<MissingPageTemplateProps> = ({
  moduleName,
  moduleDescription = "This module is currently under development.",
  navCategories,
  docsLink
}) => {
  return (
    <PlatformLayout 
      moduleTitle={moduleName}
      navCategories={navCategories}
    >
      <div className="container p-6 mx-auto">
        <Card className="border-dashed border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              <CardTitle>{moduleName} Module</CardTitle>
            </div>
            <CardDescription>
              {moduleDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This page is a placeholder for the {moduleName} module functionality. The development team is actively working on implementing this feature.
              </p>
              <div className="p-4 bg-background rounded-md border">
                <h3 className="font-medium mb-2">Expected Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Data management and visualization</li>
                  <li>User interaction capabilities</li>
                  <li>Integration with other platform modules</li>
                  <li>Analytics and reporting</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
            {docsLink && (
              <Button className="flex items-center gap-2" onClick={() => window.open(docsLink, '_blank')}>
                <FileText className="h-4 w-4" />
                View Documentation
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </PlatformLayout>
  );
};

export default MissingPageTemplate;
