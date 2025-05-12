
import React from 'react';
import { Task } from '@/types/project-management';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Edit, 
  Trash,
  MessageSquare,
  File
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface TaskDetailDialogProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TaskDetailDialog: React.FC<TaskDetailDialogProps> = ({
  task,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete
}) => {
  if (!task) return null;
  
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-green-100 text-green-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800"
  };
  
  const statusColors = {
    todo: "bg-slate-100 text-slate-800",
    "in-progress": "bg-amber-100 text-amber-800",
    review: "bg-purple-100 text-purple-800",
    done: "bg-green-100 text-green-800"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit && onEdit(task)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete && onDelete(task)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="space-y-6">
              {task.description ? (
                <div className="mt-2">
                  <h3 className="text-sm font-medium mb-1 text-slate-600">Description</h3>
                  <p className="text-sm whitespace-pre-line">{task.description}</p>
                </div>
              ) : (
                <div className="mt-2 p-4 border border-dashed rounded-md">
                  <p className="text-sm text-slate-400">No description provided</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium mb-2 text-slate-600 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Comments
                </h3>
                <p className="text-sm text-slate-400 p-4 border border-dashed rounded-md">
                  No comments yet
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 text-slate-600 flex items-center">
                  <File className="h-4 w-4 mr-1" />
                  Attachments
                </h3>
                <p className="text-sm text-slate-400 p-4 border border-dashed rounded-md">
                  No attachments
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 border-l pl-4">
            <div>
              <h3 className="text-xs font-medium mb-1 uppercase text-slate-500">Status</h3>
              <Badge className={statusColors[task.status]}>
                {task.status}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-xs font-medium mb-1 uppercase text-slate-500">Priority</h3>
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-xs font-medium mb-1 uppercase text-slate-500">Assignee</h3>
              <p className="text-sm">{task.assigned_to || "Unassigned"}</p>
            </div>
            
            {task.due_date && (
              <div>
                <h3 className="text-xs font-medium mb-1 uppercase text-slate-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Due Date
                </h3>
                <p className="text-sm">{new Date(task.due_date).toLocaleDateString()}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-xs font-medium mb-1 uppercase text-slate-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Created
              </h3>
              <p className="text-sm">
                {task.created_at 
                  ? formatDistanceToNow(new Date(task.created_at), { addSuffix: true })
                  : "Recently"}
              </p>
            </div>
            
            {task.time_estimated && (
              <div>
                <h3 className="text-xs font-medium mb-1 uppercase text-slate-500">Time Tracking</h3>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1 text-slate-500" />
                  <span className="text-sm">
                    {task.time_spent || 0} / {task.time_estimated} hours
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
