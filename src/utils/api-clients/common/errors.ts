
import { toast } from 'sonner';

// Type for API errors
export class ApiError extends Error {
  code?: string;
  status?: number;
  type?: string;

  constructor(message: string, details?: { code?: string; status?: number; type?: string }) {
    super(message);
    this.name = 'ApiError';
    if (details) {
      this.code = details.code;
      this.status = details.status;
      this.type = details.type;
    }
  }
}
