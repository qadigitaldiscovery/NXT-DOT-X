import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import TaskInput from './TaskInput';
import PersonaCard from './PersonaCard';
import PersonaDetails from './PersonaDetails';
import ResultsPanel from './ResultsPanel';
import { personas } from './personasData';
export const PersonasHub = () => {
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [taskInput, setTaskInput] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handlePersonaSelect = (persona) => {
        setSelectedPersona(persona);
    };
    const handleTaskChange = (input) => {
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
    return (_jsxs("div", { className: "flex flex-col md:flex-row h-screen", children: [_jsxs("div", { className: "w-full md:w-64 p-4 border-r overflow-y-auto", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Select a Persona" }), _jsx("div", { className: "grid gap-3", children: personas.map((persona) => (_jsx(PersonaCard, { persona: persona, onClick: () => handlePersonaSelect(persona), isSelected: selectedPersona?.id === persona.id }, persona.id))) })] }), _jsx("div", { className: "w-full md:w-96 p-4 border-r", children: selectedPersona ? (_jsxs(_Fragment, { children: [_jsx(PersonaDetails, { persona: selectedPersona }), _jsx(TaskInput, { persona: selectedPersona, taskInput: taskInput, setTaskInput: handleTaskChange, targetModule: targetModule, setTargetModule: setTargetModule, handleInvokePersona: handleInvokePersona, isLoading: isLoading })] })) : (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("span", { className: "text-gray-500", children: "Select a persona to continue." }) })) }), _jsx("div", { className: "w-full p-4", children: result && (_jsx(ResultsPanel, { result: result, persona: selectedPersona, clearResult: handleClearResult })) })] }));
};
export default PersonasHub;
