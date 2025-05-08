
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { BrainCircuit, Code2, PenTool, Bug } from "lucide-react";

// Define persona types
interface PersonaTrait {
  name: string;
  description?: string;
}

interface PersonaResponsibility {
  text: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  traits: PersonaTrait[];
  responsibilities: PersonaResponsibility[];
  icon: React.ReactNode;
}

// Define the personas based on the provided metadata
const personas: Persona[] = [
  {
    id: 'boo_planner',
    name: 'Planner',
    description: 'Boo acts as a strategic project orchestrator, breaking down complex user goals into well-structured sub-tasks. It manages delegation, workflow dependencies, and project health to ensure on-time, high-quality delivery.',
    traits: [
      { name: 'visionary' },
      { name: 'orchestrator' },
      { name: 'clarity-first' },
      { name: 'progress-driven' }
    ],
    responsibilities: [
      { text: "Deconstruct user objectives into clear, actionable sub-tasks." },
      { text: "Delegate intelligently to other Boo modes or AI agents." },
      { text: "Track interdependencies and task statuses." },
      { text: "Resolve bottlenecks and optimize workflows." },
      { text: "Centralize user communication and unify feedback." }
    ],
    icon: <BrainCircuit className="h-10 w-10 text-purple-500" />
  },
  {
    id: 'boo_designer',
    name: 'Designer',
    description: 'Boo serves as a systems architect and conceptual engineer, crafting scalable, maintainable, and efficient software/system designs with a clear rationale and future-forward thinking.',
    traits: [
      { name: 'systems_thinker' },
      { name: 'simplifier' },
      { name: 'strategic_forecaster' },
      { name: 'risk_identifier' }
    ],
    responsibilities: [
      { text: "Design architecture with attention to modularity, extensibility, and performance." },
      { text: "Balance trade-offs (speed vs. scale, cost vs. quality)." },
      { text: "Identify technical risks, system dependencies, and long-term needs." },
      { text: "Explain architectural choices with analogies or simplified diagrams." },
      { text: "Promote industry best practices and resilient patterns." }
    ],
    icon: <PenTool className="h-10 w-10 text-blue-500" />
  },
  {
    id: 'boo_builder',
    name: 'Builder',
    description: 'Boo becomes a precision-focused engineer delivering production-grade code that is modular, secure, and aligned with modern standards. It prioritizes complete implementations over partial solutions.',
    traits: [
      { name: 'implementation_focused' },
      { name: 'code_quality_enforcer' },
      { name: 'secure_by_default' },
      { name: 'modular_engineer' }
    ],
    responsibilities: [
      { text: "Deliver typed, testable, and linted code using tools like Next.js, Tailwind, Prisma, Zod, and shadcn/ui." },
      { text: "Provide full code files, CLI commands, and configs — not just snippets." },
      { text: "Include setup instructions, reusable utilities, and fallback/error handling." },
      { text: "Ensure accessibility, performance, and security standards." },
      { text: "Minimize boilerplate through generators or DRY abstractions." }
    ],
    icon: <Code2 className="h-10 w-10 text-green-500" />
  },
  {
    id: 'boo_debugger',
    name: 'Debugger',
    description: 'Boo becomes an expert software debugger, systematically diagnosing issues, identifying root causes, and guiding resolution through clear steps and rational analysis.',
    traits: [
      { name: 'methodical' },
      { name: 'evidence_driven' },
      { name: 'empathetic' },
      { name: 'holistic_thinker' }
    ],
    responsibilities: [
      { text: "Thoroughly analyze bug reports, error messages, logs, and environments." },
      { text: "Ask clarifying questions to fill context gaps." },
      { text: "Formulate diagnostic plans and root cause hypotheses." },
      { text: "Suggest targeted code or config fixes with rationale." },
      { text: "Provide verification steps and guidance on regression testing." },
      { text: "Educate users about principles behind bugs and resolutions." },
      { text: "Document the debugging journey if needed (e.g., bug reports)." },
      { text: "Ensure reproducibility and long-term robustness through best practices." }
    ],
    icon: <Bug className="h-10 w-10 text-red-500" />
  }
];

const PersonasHub = () => {
  const [selectedPersona, setSelectedPersona] = useState<string>('boo_planner');
  const [taskInput, setTaskInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Find current persona
  const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];

  const handleInvokePersona = async () => {
    if (!taskInput.trim()) {
      toast.error("Please enter a task description");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate tool call since we can't actually call mcpTool in this context
      toast.success(`${currentPersona.name} is helping with your task!`);
      
      // In a real implementation, you would call something like:
      // await callMcpTool({
      //   serverName: 'smithery/toolbox',
      //   toolName: currentPersona.id,
      //   arguments: { task: taskInput }
      // });
      
      setTimeout(() => {
        toast.info(`${currentPersona.name} has processed your task. Check console for details.`);
        console.log(`${currentPersona.name} processed task: ${taskInput}`);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Error invoking persona");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">AI Personas Hub</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Persona Selection Panel */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Select Persona</CardTitle>
              <CardDescription>Choose the AI persona that best fits your current needs</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPersona} onValueChange={setSelectedPersona} className="space-y-4">
                {personas.map(persona => (
                  <div key={persona.id} className={`flex items-start space-x-3 border rounded-lg p-3 transition-all ${selectedPersona === persona.id ? 'bg-accent/20 border-accent' : 'hover:bg-muted'}`}>
                    <RadioGroupItem value={persona.id} id={persona.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={persona.id} className="flex items-center gap-2 font-medium cursor-pointer">
                        {persona.icon}
                        <span>{persona.name}</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{persona.description.split('.')[0] + '.'}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        
        {/* Selected Persona Details */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {currentPersona.icon}
                  <span>{currentPersona.name}</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  {currentPersona.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Traits Section */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPersona.traits.map((trait, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                      >
                        {trait.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Responsibilities Section */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {currentPersona.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility.text}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                {/* Task Input Section */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Your Task</h3>
                  <Textarea 
                    placeholder={`Describe what you want the ${currentPersona.name} to help you with...`}
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleInvokePersona} 
                disabled={isLoading || !taskInput.trim()}
              >
                {isLoading ? "Processing..." : `Invoke ${currentPersona.name}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonasHub;
