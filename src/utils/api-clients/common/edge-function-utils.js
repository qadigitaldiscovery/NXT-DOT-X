import { supabase } from '@/integrations/supabase/client';
/**
 * Safely invoke an edge function with error handling
 *
 * @param functionName Name of the edge function to invoke
 * @param payload Data to send to the function
 * @param options Optional configuration
 * @returns The function result or null if there was an error
 */
export async function tryUseEdgeFunction(functionName, payload, options = {}) {
    try {
        // Set default timeout to 20 seconds
        const timeout = options.timeout || 20000;
        // Create an AbortController to handle timeouts
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        // Prepare headers
        const headers = options.headers || {};
        // Add API key header if provided
        if (options.apiKey) {
            headers['X-API-Key'] = options.apiKey;
            console.log("Adding API key to request headers");
        }
        // Call the edge function with the payload
        const { data, error } = await supabase.functions.invoke(functionName, {
            body: payload,
            headers: headers
        });
        // Clear the timeout
        clearTimeout(timeoutId);
        if (error) {
            console.error(`Edge function ${functionName} error:`, error);
            return null;
        }
        return data;
    }
    catch (err) {
        // Handle timeouts
        if (err.name === 'AbortError') {
            console.error(`Edge function ${functionName} timed out`);
            return null;
        }
        console.error(`Error calling edge function ${functionName}:`, err);
        return null;
    }
}
