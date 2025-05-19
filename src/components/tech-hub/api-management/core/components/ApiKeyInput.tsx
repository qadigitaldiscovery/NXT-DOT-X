
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ApiKeyInputProps {
  apiKey: string;
  isVerifying: boolean;
  keyStatus: 'unknown' | 'valid' | 'invalid' | 'quota_exceeded';
  placeholder: string;
  docsLink?: {
    text: string;
    url: string;
  };
  onApiKeyChange: (value: string) => void;
  onVerify: () => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  isVerifying,
  keyStatus,
  placeholder,
  docsLink,
  onApiKeyChange,
  onVerify
}) => {
  const renderStatusMessage = () => {
    switch (keyStatus) {
      case 'valid':
        return <p className="text-sm text-green-500 mt-1">✓ Valid API key saved</p>;
      case 'invalid':
        return <p className="text-sm text-red-500 mt-1">✗ Invalid API key</p>;
      case 'quota_exceeded':
        return (
          <p className="text-sm text-amber-500 mt-1">
            ⚠ Valid key, but quota exceeded. {docsLink && (
              <a 
                href={docsLink.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-amber-600"
              >
                Check your billing
              </a>
            )}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="apiKey">API Key</Label>
      <div className="flex gap-2">
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button 
          onClick={onVerify}
          disabled={isVerifying || !apiKey.trim()}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </div>
      {renderStatusMessage()}
    </div>
  );
};

export default ApiKeyInput;
