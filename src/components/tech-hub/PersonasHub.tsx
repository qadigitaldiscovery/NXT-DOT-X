
import { useState } from 'react';
import TaskInput from './TaskInput';
import PersonaCard, { Persona } from './PersonaCard';
import PersonaDetails from './PersonaDetails';
import ResultsPanel from './ResultsPanel';
import { personas } from './personasData';

export const PersonasHub = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [taskInput, setTaskInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
  };

  const handleTaskChange = (input: string) => {
    setTaskInput(input);
  };

  const handleInvokePersona = async () => {
    if (!selectedPersona || !taskInput.trim()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult(`As a ${selectedPersona.name}, here's my response to "${taskInput}":\n\n${selectedPersona.description}\n\nThis persona would approach this task by leveraging its ${selectedPersona.traits.map(t => t.name).join(", ")} traits.`);
    setIsLoading(false);
  };

  const handleClearResult = () => {
    setResult(null);
  };

  const [targetModule, setTargetModule] = useState('none');

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Panel: Personas */}
      <div className="w-full md:w-64 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Select a Persona</h2>
        <div className="grid gap-3">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onClick={() => handlePersonaSelect(persona)}
              isSelected={selectedPersona?.id === persona.id}
            />
          ))}
        </div>
      </div>

      {/* Middle Panel: Task Input & Persona Details */}
      <div className="w-full md:w-96 p-4 border-r">
        {selectedPersona ? (
          <>
            <PersonaDetails persona={selectedPersona} />
            <TaskInput
              persona={selectedPersona}
              taskInput={taskInput}
              setTaskInput={handleTaskChange}
              targetModule={targetModule}
              setTargetModule={setTargetModule}
              handleInvokePersona={handleInvokePersona}
              isLoading={isLoading}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">Select a persona to continue.</span>
          </div>
        )}
      </div>

      {/* Right Panel: Results */}
      <div className="w-full p-4">
        {result && (
          <ResultsPanel 
            result={result} 
            persona={selectedPersona!} 
            clearResult={handleClearResult} 
          />
        )}
      </div>
    </div>
  );
};

export default PersonasHub;
