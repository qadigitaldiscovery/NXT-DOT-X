
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Persona } from './PersonaCard';

interface ResultsPanelProps {
  result: string;
  persona: Persona;
  clearResult: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, persona, clearResult }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Results</CardTitle>
        <CardDescription>Output from {persona.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
          {result}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(result);
            toast.success("Results copied to clipboard");
          }}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Copy Results
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            clearResult();
          }}
          className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
        >
          Clear Results
        </a>
      </CardFooter>
    </Card>
  );
};

export default ResultsPanel;
