
import { sendRequestyMessage, streamRequestyMessage } from '@/utils/api-clients/requesty/client';
import { RequestyMessage } from '@/utils/api-clients/requesty/types';

// Re-export the client functions
export { sendRequestyMessage, streamRequestyMessage };

// Export types
export type { RequestyMessage };

// Hook for using Requesty in components
export const useRequesty = () => {
  return {
    sendMessage: sendRequestyMessage,
    streamMessage: streamRequestyMessage
  };
};
