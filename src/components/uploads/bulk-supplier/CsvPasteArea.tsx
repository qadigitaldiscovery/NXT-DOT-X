
import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export interface CsvPasteAreaProps {
  onPaste: (pastedText: string) => void;
}

export const CsvPasteArea: React.FC<CsvPasteAreaProps> = ({ onPaste }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePaste = () => {
    if (text.trim()) {
      onPaste(text);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <Clipboard className="h-5 w-5 text-gray-500" />
        <span className="text-gray-700">Paste CSV data below</span>
      </div>
      
      <Textarea 
        placeholder="Paste your CSV data here..." 
        className="min-h-[200px] font-mono text-sm"
        value={text}
        onChange={handleTextChange}
      />
      
      <Button 
        onClick={handlePaste}
        disabled={!text.trim()}
        className="w-full"
      >
        Use Pasted Data
      </Button>
    </div>
  );
};

export default CsvPasteArea;
