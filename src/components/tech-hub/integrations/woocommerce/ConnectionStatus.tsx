
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface ConnectionStatusProps {
  status: 'idle' | 'success' | 'error';
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  if (status === 'idle') {
    return null;
  }

  if (status === 'success') {
    return (
      <Alert className="mt-4 bg-green-50 border-green-200">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Connection Successful</AlertTitle>
        <AlertDescription className="text-green-700">
          Your WooCommerce store is properly configured and connected.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mt-4 bg-red-50 border-red-200">
      <XCircle className="h-5 w-5 text-red-600" />
      <AlertTitle className="text-red-800">Connection Failed</AlertTitle>
      <AlertDescription className="text-red-700">
        Unable to connect to your WooCommerce store. Please check your API credentials.
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionStatus;
