
import { useState, useEffect } from 'react';

// Mock data for project members since we don't have a project_members table
interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

const mockMembers: ProjectMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Project Manager',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Developer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Designer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
  }
];

export function useProjectMembers(projectId?: string) {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // In a real app, we would fetch from Supabase here
        // For now, use mock data with a simulated delay
        setTimeout(() => {
          setMembers(mockMembers);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  const addMember = async (member: Omit<ProjectMember, 'id'>) => {
    const newMember = {
      ...member,
      id: Date.now().toString()
    };
    
    // In a real app, we would insert into Supabase here
    setMembers(prev => [...prev, newMember]);
    return newMember;
  };

  const removeMember = async (memberId: string) => {
    // In a real app, we would delete from Supabase here
    setMembers(prev => prev.filter(member => member.id !== memberId));
    return true;
  };

  return { members, loading, error, addMember, removeMember };
}
