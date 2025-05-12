
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectWithMemberCount } from '@/types/project-management';
import { toast } from 'sonner';

export const useProjects = (filters?: any) => {
  const queryClient = useQueryClient();
  
  const fetchProjects = useCallback(async (): Promise<ProjectWithMemberCount[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        member_count: project_members(count),
        task_count: tasks(count)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      throw new Error(error.message);
    }
    
    return data as ProjectWithMemberCount[];
  }, []);

  const fetchProjectById = useCallback(async (id: string): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      throw new Error(error.message);
    }
    
    return data as Project;
  }, []);

  const createProject = useMutation({
    mutationFn: async (newProject: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating project:', error);
        throw new Error(error.message);
      }
      
      return data as Project;
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
    mutationFn: async (updatedProject: Partial<Project> & { id: string }) => {
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
      
      return data as Project;
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
    mutationFn: async (id: string) => {
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
    useProject: (id: string) => useQuery({
      queryKey: ['project', id],
      queryFn: () => fetchProjectById(id),
      enabled: !!id,
    }),
    createProject,
    updateProject,
    deleteProject,
  };
};
