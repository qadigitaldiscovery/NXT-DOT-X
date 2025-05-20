
import React from 'react';

export const PartnersList = () => {
  const partners = [
    {
      id: 1,
      name: "Quantum Analytica",
      description: "AI Powered Insights, Human-Centric Impacts",
      logo: "/path/to/quantum-logo.svg"
    },
    // More partners can be added here later
  ];

  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold text-center mb-4">Our Partners</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {partners.map(partner => (
          <div key={partner.id} className="flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-2">
              {/* Partner logo would go here */}
            </div>
            <p className="font-medium">{partner.name}</p>
            <p className="text-xs text-gray-500">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
