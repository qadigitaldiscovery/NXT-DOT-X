
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ChevronRight, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProjectManagement() {
  const navigate = useNavigate();

  return (
    <Card 
      className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full"
      onClick={() => navigate('/projects')}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Project Management</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Manage projects, tasks, and team collaboration
          </CardDescription>
        </div>
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
          <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span>Track project milestones</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span>Team collaboration tools</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">Projects</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">Tasks</Badge>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </CardFooter>
    </Card>
  );
}
