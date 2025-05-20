import React from 'react';
export const PartnersList = () => {
  const partners = [{
    id: 1,
    name: "Quantum Analytica",
    description: "AI Powered Insights, Human-Centric Impacts",
    logo: "/path/to/quantum-logo.svg"
  }
  // More partners can be added here later
  ];
  return <div className="w-full mt-8">
      
      <div className="flex flex-wrap justify-center gap-6">
        {partners.map(partner => <div key={partner.id} className="flex flex-col items-center">
            
            
            
          </div>)}
      </div>
    </div>;
};