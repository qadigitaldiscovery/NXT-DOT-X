import { useState } from 'react';
import { TaskInput } from './TaskInput';
import { PersonaCard } from './PersonaCard';
import { PersonaDetails } from './PersonaDetails';
import { ResultsPanel } from './ResultsPanel';
import { personasData } from './personasData';

export const PersonasHub = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [task, setTask] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = async () => {
    if (!selectedPersona || !task) {
      alert('Please select a persona and enter a task.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResults([
      `As a ${selectedPersona.name}, I would ${task}.`,
      `From the perspective of a ${selectedPersona.name}, ${task} is important because...`,
    ]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Panel: Personas */}
      <div className="w-full md:w-64 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Select a Persona</h2>
        {personasData.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            onClick={() => handlePersonaSelect(persona)}
            isSelected={selectedPersona?.id === persona.id}
          />
        ))}
      </div>

      {/* Middle Panel: Task Input & Persona Details */}
      <div className="w-full md:w-96 p-4 border-r">
        {selectedPersona ? (
          <>
            <PersonaDetails persona={selectedPersona} />
            <TaskInput
              task={task}
              onChange={handleTaskChange}
              onSubmit={handleTaskSubmit}
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
        <ResultsPanel results={results} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PersonasHub;
