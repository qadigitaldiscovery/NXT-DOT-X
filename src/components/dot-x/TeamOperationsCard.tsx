
import { Card } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'mission';
  location?: string;
}

interface TeamOperationsProps {
  members?: TeamMember[];
}

export const TeamOperationsCard = ({ 
  members = [
    { id: "team-1", name: "Alex Wright", role: "Squad Leader", avatar: "/agents/agent-1.jpg", status: "online" as const, location: "HQ" },
    { id: "team-2", name: "Sarah Chen", role: "Tactical Lead", avatar: "/agents/agent-2.jpg", status: "mission" as const, location: "Field" },
    { id: "team-3", name: "Miguel Rodriguez", role: "Intel Officer", avatar: "/agents/agent-3.jpg", status: "online" as const, location: "HQ" }
  ]
}: TeamOperationsProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0 rounded-3xl border-0 shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-400 mr-2" />
            <h3 className="text-white font-medium">Team Operations</h3>
          </div>
          
          <div className="bg-blue-500/20 px-2 py-1 rounded-full text-xs font-medium text-blue-400">
            {members.filter(m => m.status === 'online').length}/{members.length} Active
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between bg-slate-800/50 p-2.5 rounded-xl">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-3 border border-slate-700">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-slate-700 text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  member.status === 'online' ? 'bg-emerald-500' : 
                  member.status === 'mission' ? 'bg-blue-500' : 
                  'bg-gray-500'
                }`}></div>
                <span className="text-xs text-gray-400">{member.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
