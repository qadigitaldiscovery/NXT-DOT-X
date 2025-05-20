
import { Users } from "lucide-react";
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
    <div className="frosted-card h-full">
      <div className="glossy-overlay" />
      
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-silver-300/70 mr-2" />
            <h3 className="text-silver-100 font-medium">Team Operations</h3>
          </div>
          
          <div className="bg-redmetal-400/30 px-2 py-1 rounded-full text-xs font-medium text-silver-300">
            {members.filter(m => m.status === 'online').length}/{members.length} Active
          </div>
        </div>
        
        <div className="space-y-3 mt-4 flex-1">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between bg-black-800/50 p-2.5 rounded-xl">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-3 border border-redmetal-600">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-black-800 text-silver-300">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="text-sm font-medium text-silver-100">{member.name}</p>
                  <p className="text-xs text-silver-300/60">{member.role}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  member.status === 'online' ? 'bg-emerald-500' : 
                  member.status === 'mission' ? 'bg-redmetal-400' : 
                  'bg-gray-500'
                }`}></div>
                <span className="text-xs text-silver-300/70">{member.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
