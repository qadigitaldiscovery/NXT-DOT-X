import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export const useTasks = () => {
    const queryClient = useQueryClient();
    const fetchTasksByProjectId = useCallback(async (projectId) => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching tasks:', error);
            throw new Error(error.message);
        }
        return data;
    }, []);
    const fetchTaskById = useCallback(async (id) => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error fetching task:', error);
            throw new Error(error.message);
        }
        return data;
    }, []);
    const createTask = useMutation({
        mutationFn: async (newTask) => {
            const { data, error } = await supabase
                .from('tasks')
                .insert([newTask])
                .select()
                .single();
            if (error) {
                console.error('Error creating task:', error);
                throw new Error(error.message);
            }
            return data;
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
        mutationFn: async (updatedTask) => {
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
            return data;
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
        mutationFn: async (task) => {
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
        useProjectTasks: (projectId) => useQuery({
            queryKey: ['tasks', projectId],
            queryFn: () => fetchTasksByProjectId(projectId),
            enabled: !!projectId,
        }),
        useTask: (id) => useQuery({
            queryKey: ['task', id],
            queryFn: () => fetchTaskById(id),
            enabled: !!id,
        }),
        createTask,
        updateTask,
        deleteTask,
    };
};
