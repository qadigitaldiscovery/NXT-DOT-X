
import { Supplier } from '@/hooks/use-suppliers';

export type SupplierUpload = {
  id: string;
  supplier_id: string | null;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  source: 'direct' | 'email' | 'api' | 'sftp';
  processing_notes: any | null;
  processed_rows: number;
  error_rows: number;
  processing_start: string | null;
  processing_end: string | null;
  created_at: string;
  for_allocation: boolean;
  // Joined fields
  supplier_name?: string;
};
