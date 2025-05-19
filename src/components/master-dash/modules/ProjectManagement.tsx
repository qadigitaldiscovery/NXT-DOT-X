
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProjectManagement() {
  const navigate = useNavigate();

  return (
    <Card 
      className="bg-white shadow-sm border border-gray-200 cursor-pointer"
      onClick={() => navigate('/projects')}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Project Management</CardTitle>
          <div className="p-2 bg-gray-100 rounded-md">
            <ClipboardList className="h-5 w-5 text-gray-600" />
          </div>
        </div>
        <CardDescription className="text-sm text-gray-500">
          Manage projects, tasks, and team collaboration
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span>Track project milestones</span>
          </div>
          <div className="flex items-center text-sm">
            <span>Team collaboration tools</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Projects</Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Tasks</Badge>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </CardFooter>
    </Card>
  );
}
