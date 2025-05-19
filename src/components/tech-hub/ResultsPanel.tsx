
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={() => {
            navigator.clipboard.writeText(result);
            toast.success("Results copied to clipboard");
          }}
        >
          Copy Results
        </Button>
        <Button 
          variant="outline" 
          onClick={clearResult}
        >
          Clear Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsPanel;
