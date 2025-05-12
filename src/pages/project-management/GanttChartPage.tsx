
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectManagementLayout from '@/components/layout/ProjectManagementLayout';
import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { Task } from '@/types/project-management';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addDays, format, eachDayOfInterval, parseISO, isWithinInterval } from 'date-fns';

const GanttChartPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { useProject } = useProjects();
  const { useProjectTasks } = useTasks();
  
  const [days, setDays] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 14));
  
  // Fetch project and task data
  const { data: project } = useProject(projectId!);
  const { data: tasks = [], isLoading: isLoadingTasks } = useProjectTasks(projectId!);
  
  useEffect(() => {
    // Generate dates for the gantt chart
    const dateArray = eachDayOfInterval({ start: startDate, end: endDate });
    setDays(dateArray);
    
    // If project has start/end dates, use those
    if (project?.start_date) {
      setStartDate(parseISO(project.start_date));
      if (project.end_date) {
        setEndDate(parseISO(project.end_date));
      } else {
        setEndDate(addDays(parseISO(project.start_date), 30));
      }
    }
  }, [project]);

  const moveRange = (days: number) => {
    setStartDate(addDays(startDate, days));
    setEndDate(addDays(endDate, days));
  };
  
  return (
    <ProjectManagementLayout>
      <div className="h-full flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{project?.name || 'Project'} - Gantt Chart</h1>
            <p className="text-sm text-gray-500">Timeline visualization</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => moveRange(-7)}>
              Previous Week
            </Button>
            <Button variant="outline" size="sm" onClick={() => moveRange(7)}>
              Next Week
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <Card className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header row with dates */}
              <div className="flex border-b">
                <div className="w-56 shrink-0 font-medium p-3 border-r">
                  Task
                </div>
                {days.map((day) => (
                  <div 
                    key={day.toString()}
                    className={`w-16 shrink-0 text-center p-2 text-xs font-medium ${
                      day.getDay() === 0 || day.getDay() === 6 ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div>{format(day, 'EEE')}</div>
                    <div className="font-bold">{format(day, 'd')}</div>
                  </div>
                ))}
              </div>
              
              {/* Task rows */}
              {isLoadingTasks ? (
                <div className="animate-pulse space-y-2 py-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-100 rounded-md mx-3" />
                  ))}
                </div>
              ) : (
                <>
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <div key={task.id} className="flex border-b hover:bg-slate-50">
                        <div className="w-56 shrink-0 p-2 border-r truncate">
                          {task.title}
                        </div>
                        <div className="flex flex-1 relative h-12">
                          {task.due_date && (
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 h-6 bg-blue-100 border border-blue-300 rounded-sm text-xs flex items-center px-1"
                              style={{
                                left: getTaskPosition(task, days),
                                width: getTaskWidth(task, days),
                                display: isTaskVisible(task, days) ? 'flex' : 'none'
                              }}
                              title={`${task.title} - Due: ${task.due_date}`}
                            >
                              {task.title}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No tasks with dates to display on the Gantt chart.
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            Note: This is a simplified Gantt chart. Only tasks with due dates are shown.
          </div>
        </div>
      </div>
    </ProjectManagementLayout>
  );
};

// Helper functions for Gantt chart positioning
const getTaskPosition = (task: Task, days: Date[]): string => {
  if (!task.due_date) return '0%';
  
  const dueDate = parseISO(task.due_date);
  const daysFromStart = days.findIndex(day => 
    day.getDate() === dueDate.getDate() &&
    day.getMonth() === dueDate.getMonth() &&
    day.getFullYear() === dueDate.getFullYear()
  );
  
  if (daysFromStart === -1) return '0%';
  return `${daysFromStart * 64}px`;  // 64px is the width of each day column
};

const getTaskWidth = (task: Task, days: Date[]): string => {
  return '64px';  // Simple implementation: just show on the due date
};

const isTaskVisible = (task: Task, days: Date[]): boolean => {
  if (!task.due_date) return false;
  
  const dueDate = parseISO(task.due_date);
  return isWithinInterval(dueDate, {
    start: days[0],
    end: days[days.length - 1]
  });
};

export default GanttChartPage;
