
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { NavCategory } from '@/components/layout/sidebar/types';

interface MissingPageTemplateProps {
  moduleName: string;
  moduleDescription: string;
  navCategories: NavCategory[];
  docsLink?: string;
}

const MissingPageTemplate: React.FC<MissingPageTemplateProps> = ({
  moduleName,
  moduleDescription,
  navCategories,
  docsLink
}) => {
  const navigate = useNavigate();

  return (
    <PlatformLayout moduleTitle={moduleName} navCategories={navCategories}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/master')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Master Dashboard
          </Button>
          
          {docsLink && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(docsLink)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              View Documentation
            </Button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">{moduleName}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{moduleDescription}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {navCategories[0]?.items.map((item, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center mb-4">
                  {item.icon && <item.icon className="h-5 w-5 mr-2 text-blue-600" />}
                  <h3 className="font-medium">{item.label}</h3>
                </div>
                <p className="text-sm text-gray-500">Access and manage {item.label.toLowerCase()} functionality.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
};

export default MissingPageTemplate;
