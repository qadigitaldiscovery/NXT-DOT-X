
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task } from '@/types/project-management';
import { toast } from 'sonner';

export const useTasks = () => {
  const queryClient = useQueryClient();
  
  const fetchTasksByProjectId = useCallback(async (projectId: string): Promise<Task[]> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tasks:', error);
      throw new Error(error.message);
    }
    
    return data as Task[];
  }, []);

  const fetchTaskById = useCallback(async (id: string): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching task:', error);
      throw new Error(error.message);
    }
    
    return data as Task;
  }, []);

  const createTask = useMutation({
    mutationFn: async (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating task:', error);
        throw new Error(error.message);
      }
      
      return data as Task;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', data.project_id] });
      toast.success('Task created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create task: ${error.message}`);
    }
  });

  const updateTask = useMutation({
    mutationFn: async (updatedTask: Partial<Task> & { id: string }) => {
      const { id, ...rest } = updatedTask;
      const { data, error } = await supabase
        .from('tasks')
        .update(rest)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating task:', error);
        throw new Error(error.message);
      }
      
      return data as Task;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
      toast.success('Task updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    }
  });

  const deleteTask = useMutation({
    mutationFn: async (task: Pick<Task, 'id' | 'project_id'>) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id);
      
      if (error) {
        console.error('Error deleting task:', error);
        throw new Error(error.message);
      }
      
      return task;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', data.project_id] });
      toast.success('Task deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    }
  });

  return {
    useProjectTasks: (projectId: string) => useQuery({
      queryKey: ['tasks', projectId],
      queryFn: () => fetchTasksByProjectId(projectId),
      enabled: !!projectId,
    }),
    useTask: (id: string) => useQuery({
      queryKey: ['task', id],
      queryFn: () => fetchTaskById(id),
      enabled: !!id,
    }),
    createTask,
    updateTask,
    deleteTask,
  };
};
