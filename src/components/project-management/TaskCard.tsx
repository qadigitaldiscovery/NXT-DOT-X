
import React from 'react';
import { Task } from '@/types/project-management';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CalendarClock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    medium: "bg-green-100 text-green-800 hover:bg-green-200",
    high: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    urgent: "bg-red-100 text-red-800 hover:bg-red-200"
  };
  
  const statusColors = {
    todo: "bg-slate-100 text-slate-800",
    "in-progress": "bg-amber-100 text-amber-800",
    review: "bg-purple-100 text-purple-800",
    done: "bg-green-100 text-green-800"
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const handleClick = () => {
    if (onClick) onClick(task);
  };

  return (
    <Card 
      className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-sm">{task.title}</h3>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </div>
        
        {task.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">{task.description}</p>
        )}
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            {task.created_at ? `Created ${formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}` : "Recently created"}
          </span>
        </div>
        
        {task.due_date && (
          <div className="flex items-center text-xs text-gray-500">
            <CalendarClock className="h-3 w-3 mr-1" />
            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-3 py-2 flex justify-between items-center border-t">
        {task.assigned_to ? (
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {getInitials(task.assigned_to)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <span className="text-xs text-gray-500">Unassigned</span>
        )}
        
        <Badge variant="secondary" className={statusColors[task.status]}>
          {task.status}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
