/**
 * Creates an OpenAI client with the provided API key.
 *
 * @param apiKey - The OpenAI API key to use for authentication
 * @returns An OpenAI client instance
 */
export const createOpenAIClient = (apiKey) => {
    // Base URL for OpenAI API
    const baseUrl = 'https://api.openai.com/v1';
    /**
     * Generic request method that handles authentication and error handling
     */
    const request = async (endpoint, options = {}) => {
        try {
            const url = `${baseUrl}/${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                ...options.headers,
            };
            const response = await fetch(url, {
                ...options,
                headers,
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error?.message ||
                    `OpenAI API error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error("OpenAI API request failed:", error);
            throw error;
        }
    };
    /**
     * Text completion with one of the OpenAI models
     */
    const createCompletion = async (params) => {
        return request('completions', {
            method: 'POST',
            body: JSON.stringify(params),
        });
    };
    /**
     * Chat completion with one of the OpenAI chat models
     */
    const createChatCompletion = async (params) => {
        return request('chat/completions', {
            method: 'POST',
            body: JSON.stringify(params),
        });
    };
    return {
        createCompletion,
        createChatCompletion,
    };
};
