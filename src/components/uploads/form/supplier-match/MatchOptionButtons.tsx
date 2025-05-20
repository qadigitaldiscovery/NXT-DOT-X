
import React from 'react';

interface MatchOptionButtonsProps {
  matchOption: 'existing' | 'new';
  setMatchOption: (option: 'existing' | 'new') => void;
}

export function MatchOptionButtons({ matchOption, setMatchOption }: MatchOptionButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <a
        href="#"
        className={`flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium py-2 px-4 ${
          matchOption === 'existing' 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "border border-input hover:bg-accent hover:text-accent-foreground"
        }`}
        onClick={(e) => {
          e.preventDefault();
          setMatchOption('existing');
        }}
        aria-label="Use existing supplier"
      >
        Use Existing Supplier
      </a>
      <a
        href="#"
        className={`flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium py-2 px-4 ${
          matchOption === 'new' 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "border border-input hover:bg-accent hover:text-accent-foreground"
        }`}
        onClick={(e) => {
          e.preventDefault();
          setMatchOption('new');
        }}
        aria-label="Create new supplier"
      >
        Create New Supplier
      </a>
    </div>
  );
}
