import { sendRequestyMessage, streamRequestyMessage } from '@/utils/api-clients/requesty/client';
import { useRequestyClient } from './use-requesty-client';
// Re-export the client functions
export { sendRequestyMessage, streamRequestyMessage };
// Hook for using Requesty in components
export { useRequestyClient };
export const useRequesty = useRequestyClient;
