
import { sendRequestyMessage, streamRequestyMessage } from '@/utils/api-clients/requesty/client';
import { RequestyMessage } from '@/utils/api-clients/requesty/types';
import { useRequestyClient } from './use-requesty-client';

// Re-export the client functions
export { sendRequestyMessage, streamRequestyMessage };

// Export types
export type { RequestyMessage };

// Hook for using Requesty in components
export { useRequestyClient };
export const useRequesty = useRequestyClient;
