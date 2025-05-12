
export type Project = {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled' | 'planned';
  start_date?: string;
  end_date?: string;
  owner_id: string;
  rag_status?: 'green' | 'amber' | 'red';
  created_at?: string;
  updated_at?: string;
};

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  due_date?: string;
  parent_task_id?: string;
  time_estimated?: number;
  time_spent?: number;
  created_at?: string;
  updated_at?: string;
};

export type ProjectMember = {
  id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'contributor' | 'viewer';
  created_at?: string;
  updated_at?: string;
};

export type TaskComment = {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

export type TaskAttachment = {
  id: string;
  task_id: string;
  user_id: string;
  file_path: string;
  file_name: string;
  file_type?: string;
  file_size?: number;
  created_at?: string;
};

export type ActivityLog = {
  id: string;
  entity_id: string;
  entity_type: 'project' | 'task' | 'comment';
  action: string;
  details?: any;
  performed_by?: string;
  performed_at?: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  content?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  entity_id?: string;
  entity_type?: string;
  is_read: boolean;
  created_at?: string;
};

export type ProjectWithMemberCount = Project & {
  member_count: number;
  task_count: number;
};
