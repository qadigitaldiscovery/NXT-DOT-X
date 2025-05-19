
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { TeamMember } from '@/pages/dot-x/types';

interface TeamOperationsCardProps {
  members: TeamMember[];
}

export function TeamOperationsCard({ members }: TeamOperationsCardProps) {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const fieldMembers = members.filter(m => m.status === 'field').length;
  
  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-900/10 to-orange-900/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-500" />
            <span>Team Operations</span>
          </CardTitle>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            Active
          </Badge>
        </div>
        <CardDescription>Team coordination and deployment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-3 bg-amber-950/20 rounded-lg">
              <span className="text-xs text-amber-300">Team Members</span>
              <span className="text-xl font-bold">{members.length}</span>
            </div>
            <div className="flex flex-col p-3 bg-amber-950/20 rounded-lg">
              <span className="text-xs text-amber-300">Field Ops</span>
              <span className="text-xl font-bold">{fieldMembers}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {members.slice(0, 3).map(member => (
              <div key={member.id} className="flex items-center justify-between p-2 bg-amber-950/20 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{member.name}</div>
                  <div className="text-xs text-amber-300/80">{member.role}</div>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    member.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                    member.status === 'field' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-100"
          >
            <Users className="h-4 w-4" />
            Team Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
