
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Users, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ProjectWithMemberCount } from '@/types/project-management';

interface ProjectCardProps {
  project: ProjectWithMemberCount;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    planned: "bg-purple-100 text-purple-800"
  };

  const ragColors = {
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500"
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/projects/${project.id}`}>
        <div className={`h-1 ${project.rag_status ? ragColors[project.rag_status] : "bg-slate-200"}`} />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <Badge variant="outline" className={statusColors[project.status as keyof typeof statusColors]}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.description || "No description provided"}</p>
          
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {project.created_at ? `Created ${formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}` : "Recently created"}
            </span>
          </div>
          
          {project.start_date && (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Starts: {new Date(project.start_date).toLocaleDateString()}</span>
              {project.end_date && (
                <span className="ml-2">
                  - Ends: {new Date(project.end_date).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-between border-t py-3">
          <div className="flex items-center text-sm">
            <CheckCircle2 className="h-4 w-4 mr-1 text-gray-500" />
            <span>{project.task_count || 0} tasks</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span>{project.member_count || 0} members</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;
