
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from 'lucide-react';

interface ChatTesterProps {
  onSubmit: () => void;
  isProcessing: boolean;
  isDisabled: boolean;
  isAuthenticated?: boolean | null;
  onLogin?: () => void;
}

export function AIChatTester({ 
  onSubmit, 
  isProcessing, 
  isDisabled, 
  isAuthenticated,
  onLogin 
}: ChatTesterProps) {
  return (
    <Button 
      onClick={onSubmit}
      disabled={isDisabled || isProcessing}
      className="w-full"
      variant="default"
    >
      {isProcessing ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Send className="h-4 w-4 mr-2" />
          Send Message
        </>
      )}
    </Button>
  );
}
