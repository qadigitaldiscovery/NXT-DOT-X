
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Persona } from './PersonaCard';

interface TaskInputProps {
  persona: Persona;
  taskInput: string;
  setTaskInput: (input: string) => void;
  targetModule: string;
  setTargetModule: (module: string) => void;
  handleInvokePersona: () => void;
  isLoading: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({
  persona,
  taskInput,
  setTaskInput,
  targetModule,
  setTargetModule,
  handleInvokePersona,
  isLoading
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Your Task</CardTitle>
        <CardDescription>
          Describe what you want {persona.name} to help you with
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          placeholder={`What would you like the ${persona.name} to do?`}
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="min-h-[120px]"
        />
        
        <div>
          <Label className="text-sm font-medium mb-2">Forward results to:</Label>
          <RadioGroup 
            value={targetModule} 
            onValueChange={setTargetModule}
            className="grid grid-cols-2 gap-2 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">No forwarding</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="api" id="api" />
              <Label htmlFor="api">API Management</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cloud" id="cloud" />
              <Label htmlFor="cloud">Cloud Services</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="settings" id="settings" />
              <Label htmlFor="settings">Settings</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleInvokePersona} 
          disabled={isLoading || !taskInput.trim()}
        >
          {isLoading ? "Processing..." : `Invoke ${persona.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskInput;
