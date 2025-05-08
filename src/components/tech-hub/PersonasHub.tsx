
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { BrainCircuit, Code2, PenTool, Bug } from "lucide-react";
import { callMcpTool } from '@/utils/mcpToolCaller';

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
  color: string;
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
    icon: <BrainCircuit className="h-10 w-10 text-purple-500" />,
    color: 'bg-purple-100 border-purple-300'
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
    icon: <PenTool className="h-10 w-10 text-blue-500" />,
    color: 'bg-blue-100 border-blue-300'
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
    icon: <Code2 className="h-10 w-10 text-green-500" />,
    color: 'bg-green-100 border-green-300'
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
    icon: <Bug className="h-10 w-10 text-red-500" />,
    color: 'bg-red-100 border-red-300'
  }
];

const PersonasHub = () => {
  const [selectedPersona, setSelectedPersona] = useState<string>('boo_planner');
  const [taskInput, setTaskInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [targetModule, setTargetModule] = useState<string>('none');

  // Find current persona
  const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];

  const handleInvokePersona = async () => {
    if (!taskInput.trim()) {
      toast.error("Please enter a task description");
      return;
    }

    setIsLoading(true);
    setResult(null);
    
    try {
      toast.success(`${currentPersona.name} is helping with your task!`);
      
      // Simulate tool call with artificial delay
      setTimeout(() => {
        // In a real implementation, you would use the result from an actual API call
        // This is where the actual integration would happen
        const fakeResponse = `${currentPersona.name} has analyzed your request: "${taskInput}"\n\n`;
        let details = "";
        
        switch(currentPersona.id) {
          case 'boo_planner':
            details = "Task breakdown:\n1. Research requirements\n2. Create project plan\n3. Allocate resources\n4. Set up tracking dashboard";
            break;
          case 'boo_designer':
            details = "Design considerations:\n- Scalability\n- User experience\n- Performance\n- Security\n\nRecommended architecture: Microservices with API Gateway";
            break;
          case 'boo_builder':
            details = "Implementation plan:\n```typescript\nconst implement = async () => {\n  // Step 1: Setup foundation\n  // Step 2: Build core components\n  // Step 3: Test functionality\n};\n```";
            break;
          case 'boo_debugger':
            details = "Debugging report:\n- Root cause: Memory leak in rendering cycle\n- Fix: Use proper cleanup in useEffect hooks\n- Verification: All tests passing, performance improved by 30%";
            break;
        }
        
        const moduleInfo = targetModule !== 'none' 
          ? `\n\nResult will be forwarded to: ${targetModule}` 
          : '\n\nNo target module selected for result forwarding.';
          
        setResult(fakeResponse + details + moduleInfo);
        setIsLoading(false);
        
        if (targetModule !== 'none') {
          toast.info(`Results forwarded to ${targetModule} module`);
        }
      }, 2000);
    } catch (error) {
      toast.error("Error invoking persona");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">AI Personas Hub</h1>
      
      {/* Top Row Persona Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {personas.map(persona => (
          <Card 
            key={persona.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${selectedPersona === persona.id ? `border-2 ${persona.color}` : 'border hover:border-gray-300'}`}
            onClick={() => setSelectedPersona(persona.id)}
          >
            <CardHeader className="p-4 pb-0">
              <div className="flex items-center gap-2">
                {persona.icon}
                <CardTitle className="text-lg">{persona.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <CardDescription className="line-clamp-2">
                {persona.description.split('.')[0]}.
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Content - Selected Persona Details + Task Input */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Selected Persona Details */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                {currentPersona.icon}
                <div>
                  <CardTitle>{currentPersona.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {currentPersona.description}
                  </CardDescription>
                </div>
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
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Task Input Panel */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Your Task</CardTitle>
              <CardDescription>
                Describe what you want {currentPersona.name} to help you with
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder={`What would you like the ${currentPersona.name} to do?`}
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
                {isLoading ? "Processing..." : `Invoke ${currentPersona.name}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Results</CardTitle>
            <CardDescription>Output from {currentPersona.name}</CardDescription>
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
              onClick={() => setResult(null)}
            >
              Clear Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PersonasHub;
