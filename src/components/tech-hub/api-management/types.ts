
import { z } from 'zod';

// Define endpoint schema for form validation
export const endpointSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("URL must be valid"),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  description: z.string().optional(),
  apiKey: z.string().optional(),
  status: z.enum(["active", "inactive", "testing"]).default("active")
});

export type EndpointFormValues = z.infer<typeof endpointSchema>;

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
  method: string;
  status: string;
  lastUsed: string;
}
