
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
        className={`flex-1 inline-flex items-center justify-center text-sm font-medium py-2 px-4 ${
          matchOption === 'existing' 
            ? "text-primary-foreground bg-primary hover:text-primary-foreground/90 hover:underline" 
            : "text-foreground hover:text-primary hover:underline"
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
        className={`flex-1 inline-flex items-center justify-center text-sm font-medium py-2 px-4 ${
          matchOption === 'new' 
            ? "text-primary-foreground bg-primary hover:text-primary-foreground/90 hover:underline" 
            : "text-foreground hover:text-primary hover:underline"
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
