import { z } from 'zod';
export const endpointSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    url: z.string().url({ message: "Must be a valid URL" }),
    apiKey: z.string().min(1, { message: "API Key is required" }),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
    status: z.enum(['active', 'inactive']).default('active'),
    description: z.string().optional()
});
