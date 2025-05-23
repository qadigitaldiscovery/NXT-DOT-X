
import React from 'react';
import { Button } from "@/components/ui/button";

interface MatchOptionButtonsProps {
  matchOption: 'existing' | 'new';
  setMatchOption: (option: 'existing' | 'new') => void;
}

export function MatchOptionButtons({ matchOption, setMatchOption }: MatchOptionButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant={matchOption === 'existing' ? "default" : "outline"}
        className="flex-1"
        onClick={() => setMatchOption('existing')}
      >
        Use Existing Supplier
      </Button>
      <Button
        type="button"
        variant={matchOption === 'new' ? "default" : "outline"}
        className="flex-1"
        onClick={() => setMatchOption('new')}
      >
        Create New Supplier
      </Button>
    </div>
  );
}
