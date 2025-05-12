
import React, { useState, useEffect } from 'react';
import { Task } from '@/types/project-management';
import TaskCard from './TaskCard';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface KanbanBoardProps {
  tasks: Task[];
  onAddTask?: (status: string) => void;
  onTaskClick?: (task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onAddTask, onTaskClick }) => {
  const [groupedTasks, setGroupedTasks] = useState<Record<string, Task[]>>({
    todo: [],
    'in-progress': [],
    review: [],
    done: []
  });

  const columnTitles = {
    todo: "To Do",
    'in-progress': "In Progress",
    review: "Review",
    done: "Done"
  };

  // Group tasks by status
  useEffect(() => {
    const grouped = tasks.reduce<Record<string, Task[]>>((acc, task) => {
      const status = task.status || 'todo';
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {
      todo: [],
      'in-progress': [],
      review: [],
      done: []
    });
    
    setGroupedTasks(grouped);
  }, [tasks]);

  const handleAddTask = (status: string) => {
    if (onAddTask) onAddTask(status);
  };

  return (
    <div className="flex space-x-4 h-full overflow-x-auto px-4 py-3">
      {Object.entries(columnTitles).map(([status, title]) => (
        <div 
          key={status}
          className="bg-slate-50 rounded-lg w-72 flex-shrink-0 flex flex-col shadow-sm"
        >
          <div className="p-3 font-medium border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span>{title}</span>
              <span className="bg-slate-200 text-slate-600 text-xs rounded-full px-2 py-0.5">
                {groupedTasks[status]?.length || 0}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => handleAddTask(status)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {groupedTasks[status]?.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onTaskClick && onTaskClick(task)}
              />
            ))}
            
            {groupedTasks[status]?.length === 0 && (
              <div className="flex items-center justify-center h-24 border border-dashed rounded-md border-slate-200 text-slate-400 text-sm">
                No tasks
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
