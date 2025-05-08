
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { BrainCircuit, Code2, PenTool, Bug } from "lucide-react";
import { callMcpTool } from '@/utils/mcpToolCaller';

// Define persona types
interface Persona {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  traits: string[];
  responsibilities: string[];
}

// Define the personas based on the knowledge base
const personas: Persona[] = [
  {
    id: "boo_planner",
    name: "Planner",
    icon: BrainCircuit,
    description: "Strategic project orchestrator that breaks down complex goals into well-structured tasks",
    traits: ["visionary", "orchestrator", "clarity-first", "progress-driven"],
    responsibilities: [
      "Deconstruct objectives into actionable sub-tasks",
      "Delegate intelligently to other modes",
      "Track interdependencies and task statuses",
      "Resolve bottlenecks and optimize workflows"
    ]
  },
  {
    id: "boo_designer",
    name: "Designer",
    icon: PenTool,
    description: "Systems architect and conceptual engineer that crafts scalable, maintainable system designs",
    traits: ["systems_thinker", "simplifier", "strategic_forecaster", "risk_identifier"],
    responsibilities: [
      "Design architecture with attention to modularity",
      "Balance trade-offs (speed vs. scale, cost vs. quality)",
      "Identify technical risks and dependencies",
      "Explain architectural choices clearly"
    ]
  },
  {
    id: "boo_builder",
    name: "Builder",
    icon: Code2,
    description: "Precision-focused engineer delivering production-grade code that is modular and secure",
    traits: ["implementation_focused", "code_quality_enforcer", "secure_by_default", "modular_engineer"],
    responsibilities: [
      "Deliver typed, testable, and linted code",
      "Provide full code files, not just snippets",
      "Include setup instructions and error handling",
      "Ensure accessibility and performance standards"
    ]
  },
  {
    id: "boo_debugger",
    name: "Debugger",
    icon: Bug,
    description: "Expert software debugger systematically diagnosing issues and identifying root causes",
    traits: ["methodical", "evidence_driven", "empathetic", "holistic_thinker"],
    responsibilities: [
      "Analyze bug reports, error messages, and logs",
      "Ask clarifying questions to fill context gaps",
      "Formulate diagnostic plans and hypotheses",
      "Suggest targeted fixes with clear rationale"
    ]
  }
];

export const PersonasHub = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setResponse("");
  };

  const handleSubmitTask = async () => {
    if (!selectedPersona || !task.trim()) {
      toast.error("Please select a persona and enter a task");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      // Call the MCP tool to invoke the selected persona
      console.log(`Invoking ${selectedPersona.name} persona with task: ${task}`);
      
      // This is a mock implementation - in a real application, you would use
      // the actual MCP tooling to invoke these personas
      callMcpTool({
        serverName: 'smithery/toolbox',
        toolName: 'invoke_persona',
        arguments: {
          personaId: selectedPersona.id,
          task: task
        }
      });
      
      // Show success message
      toast.success(`${selectedPersona.name} has been called to help!`);
      
      // For demo purposes, simulate a response
      setTimeout(() => {
        setResponse(`${selectedPersona.name} is now working on: "${task}"\n\nPlease check your chat interface for responses.`);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error invoking persona:", error);
      toast.error("Failed to invoke persona. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Persona Hub</h1>
        <p className="text-muted-foreground">
          Invoke specialized AI personas to help with different aspects of your project
        </p>
      </div>

      <Tabs defaultValue="personas" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="personas">Personas</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personas">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <Card 
                  key={persona.id}
                  className={`cursor-pointer transition-all ${selectedPersona?.id === persona.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleSelectPersona(persona)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{persona.name}</CardTitle>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardDescription>{persona.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="font-medium text-sm">Key Traits:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.traits.map((trait, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-muted px-2 py-1 rounded-md"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8">
            {selectedPersona && (
              <Card>
                <CardHeader>
                  <CardTitle>Request help from {selectedPersona.name}</CardTitle>
                  <CardDescription>Describe what you need help with below</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedPersona.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Textarea
                    placeholder={`Describe what you need the ${selectedPersona.name} to help with...`}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="min-h-[120px]"
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSubmitTask} 
                    disabled={isLoading || !task.trim()}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? 'Sending Request...' : `Call ${selectedPersona.name}`}
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {response && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <pre className="whitespace-pre-wrap text-sm">{response}</pre>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Personas</CardTitle>
              <CardDescription>How these specialized AI personas can help you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These four personas represent different specialized modes of AI assistance,
                each designed to excel at specific aspects of software and digital project workflows.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-medium">When to use each persona:</h3>
                
                <div>
                  <h4 className="font-medium text-sm">Planner:</h4>
                  <p className="text-sm text-muted-foreground">
                    Use when you need help organizing projects, breaking down complex tasks,
                    setting milestones, or coordinating different aspects of your workflow.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Designer:</h4>
                  <p className="text-sm text-muted-foreground">
                    Use when you need assistance with system architecture, conceptual design,
                    thinking through trade-offs, or evaluating different approaches.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Builder:</h4>
                  <p className="text-sm text-muted-foreground">
                    Use when you need production-ready code, implementation of specific features,
                    or help with technical execution details.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Debugger:</h4>
                  <p className="text-sm text-muted-foreground">
                    Use when you're facing errors, need to troubleshoot issues,
                    want to improve performance, or need systematic analysis of problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonasHub;
