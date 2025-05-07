
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface GuideStepProps {
  stepNumber: number;
  title: string;
  description: string;
}

const GuideStep: React.FC<GuideStepProps> = ({ stepNumber, title, description }) => (
  <div className="flex gap-4">
    <div className="bg-purple-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
      <span className="font-bold text-purple-600">{stepNumber}</span>
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  </div>
);

export const GettingStartedGuide: React.FC = () => {
  const steps = [
    {
      title: "Enroll Members",
      description: "Members can join the loyalty program and start earning points. Points are tracked automatically based on purchases."
    },
    {
      title: "Earn Points",
      description: "Members earn 1 point for every $1 spent on purchases. Additional points can be awarded for special promotions."
    },
    {
      title: "Redeem Rewards",
      description: "Members can redeem their points for various rewards including discounts, store credit, and exclusive benefits."
    },
    {
      title: "Track Performance",
      description: "Use the analytics dashboard to monitor program performance, member engagement, and redemption patterns."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>Learn how to use the loyalty program management system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <GuideStep
              key={index}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
