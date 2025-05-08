
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUploadForm } from '@/components/uploads/FileUploadForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NewUploadPage() {
  const navigate = useNavigate();
  
  const handleUploadComplete = () => {
    navigate('/data-management/uploads');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Cost File</h1>
          <p className="text-muted-foreground">
            Upload a new supplier cost file
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/data-management/uploads')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Uploads
        </Button>
      </div>
      
      <div className="max-w-md mx-auto">
        <FileUploadForm onUploadComplete={handleUploadComplete} allowHoldingBucket={true} />
      </div>
    </div>
  );
}
