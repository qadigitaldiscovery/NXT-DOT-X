import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export const useProjects = (filters) => {
    const queryClient = useQueryClient();
    const fetchProjects = useCallback(async () => {
        const { data, error } = await supabase
            .from('projects')
            .select(`
        *,
        member_count:project_members(count),
        task_count:tasks(count)
      `)
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching projects:', error);
            throw new Error(error.message);
        }
        // Transform the data to match the ProjectWithMemberCount type
        return data.map(project => ({
            ...project,
            member_count: Array.isArray(project.member_count) && project.member_count.length > 0
                ? project.member_count[0].count
                : 0,
            task_count: Array.isArray(project.task_count) && project.task_count.length > 0
                ? project.task_count[0].count
                : 0
        }));
    }, []);
    const fetchProjectById = useCallback(async (id) => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error fetching project:', error);
            throw new Error(error.message);
        }
        return data;
    }, []);
    const createProject = useMutation({
        mutationFn: async (newProject) => {
            const { data, error } = await supabase
                .from('projects')
                .insert([newProject])
                .select()
                .single();
            if (error) {
                console.error('Error creating project:', error);
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project created successfully');
        },
        onError: (error) => {
            toast.error(`Failed to create project: ${error.message}`);
        }
    });
    const updateProject = useMutation({
        mutationFn: async (updatedProject) => {
            const { id, ...rest } = updatedProject;
            const { data, error } = await supabase
                .from('projects')
                .update(rest)
                .eq('id', id)
                .select()
                .single();
            if (error) {
                console.error('Error updating project:', error);
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['project', data.id] });
            toast.success('Project updated successfully');
        },
        onError: (error) => {
            toast.error(`Failed to update project: ${error.message}`);
        }
    });
    const deleteProject = useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);
            if (error) {
                console.error('Error deleting project:', error);
                throw new Error(error.message);
            }
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project deleted successfully');
        },
        onError: (error) => {
            toast.error(`Failed to delete project: ${error.message}`);
        }
    });
    return {
        useAllProjects: () => useQuery({
            queryKey: ['projects', filters],
            queryFn: fetchProjects,
        }),
        useProject: (id) => useQuery({
            queryKey: ['project', id],
            queryFn: () => fetchProjectById(id),
            enabled: !!id,
        }),
        createProject,
        updateProject,
        deleteProject,
    };
};
