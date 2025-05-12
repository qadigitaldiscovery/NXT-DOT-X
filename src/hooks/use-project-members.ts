
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProjectMember } from '@/types/project-management';
import { toast } from 'sonner';

export const useProjectMembers = () => {
  const queryClient = useQueryClient();
  
  const fetchMembersByProjectId = useCallback(async (projectId: string): Promise<ProjectMember[]> => {
    const { data, error } = await supabase
      .from('project_members')
      .select(`
        *,
        profiles:user_id(
          id,
          avatar_url,
          full_name,
          email
        )
      `)
      .eq('project_id', projectId);
    
    if (error) {
      console.error('Error fetching project members:', error);
      throw new Error(error.message);
    }
    
    return data as unknown as ProjectMember[];
  }, []);

  const addMember = useMutation({
    mutationFn: async (member: Omit<ProjectMember, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('project_members')
        .insert([member])
        .select()
        .single();
      
      if (error) {
        console.error('Error adding project member:', error);
        throw new Error(error.message);
      }
      
      return data as ProjectMember;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project-members', data.project_id] });
      toast.success('Member added to project');
    },
    onError: (error) => {
      toast.error(`Failed to add member: ${error.message}`);
    }
  });

  const updateMemberRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: ProjectMember['role'] }) => {
      const { data, error } = await supabase
        .from('project_members')
        .update({ role })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating member role:', error);
        throw new Error(error.message);
      }
      
      return data as ProjectMember;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project-members', data.project_id] });
      toast.success('Member role updated');
    },
    onError: (error) => {
      toast.error(`Failed to update member role: ${error.message}`);
    }
  });

  const removeMember = useMutation({
    mutationFn: async (member: Pick<ProjectMember, 'id' | 'project_id'>) => {
      const { error } = await supabase
        .from('project_members')
        .delete()
        .eq('id', member.id);
      
      if (error) {
        console.error('Error removing project member:', error);
        throw new Error(error.message);
      }
      
      return member;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project-members', data.project_id] });
      toast.success('Member removed from project');
    },
    onError: (error) => {
      toast.error(`Failed to remove member: ${error.message}`);
    }
  });

  return {
    useProjectMembers: (projectId: string) => useQuery({
      queryKey: ['project-members', projectId],
      queryFn: () => fetchMembersByProjectId(projectId),
      enabled: !!projectId,
    }),
    addMember,
    updateMemberRole,
    removeMember,
  };
};
