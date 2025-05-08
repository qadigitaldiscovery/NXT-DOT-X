
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Persona } from './PersonaCard';

interface PersonaDetailsProps {
  persona: Persona;
}

const PersonaDetails: React.FC<PersonaDetailsProps> = ({ persona }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          {persona.icon}
          <div>
            <CardTitle>{persona.name}</CardTitle>
            <CardDescription className="mt-1">
              {persona.description}
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
              {persona.traits.map((trait, index) => (
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
              {persona.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaDetails;
