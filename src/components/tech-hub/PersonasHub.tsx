
import React, { useState } from 'react';
import { toast } from 'sonner';
import PersonaCard from './PersonaCard';
import PersonaDetails from './PersonaDetails';
import TaskInput from './TaskInput';
import ResultsPanel from './ResultsPanel';
import { personas } from './personasData';

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
          <PersonaCard
            key={persona.id}
            persona={persona}
            isSelected={selectedPersona === persona.id}
            onClick={() => setSelectedPersona(persona.id)}
          />
        ))}
      </div>
      
      {/* Main Content - Selected Persona Details + Task Input */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Selected Persona Details */}
        <div className="lg:col-span-2">
          <PersonaDetails persona={currentPersona} />
        </div>
        
        {/* Task Input Panel */}
        <div className="lg:col-span-1">
          <TaskInput
            persona={currentPersona}
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            targetModule={targetModule}
            setTargetModule={setTargetModule}
            handleInvokePersona={handleInvokePersona}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* Results Section */}
      <ResultsPanel 
        result={result} 
        persona={currentPersona}
        clearResult={() => setResult(null)} 
      />
    </div>
  );
};

export default PersonasHub;
