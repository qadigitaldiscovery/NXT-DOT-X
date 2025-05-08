
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonaTrait {
  name: string;
  description?: string;
}

interface PersonaResponsibility {
  text: string;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  traits: PersonaTrait[];
  responsibilities: PersonaResponsibility[];
  icon: React.ReactNode;
  color: string;
}

interface PersonaCardProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? `border-2 ${persona.color}` : 'border hover:border-gray-300'}`}
      onClick={onClick}
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
  );
};

export default PersonaCard;
