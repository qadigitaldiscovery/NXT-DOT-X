// Function to process streaming responses
export async function* processStreamingResponse(stream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let partialLine = '';
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = (partialLine + chunk).split('\n');
            partialLine = lines.pop() || '';
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine || trimmedLine === '[DONE]')
                    continue;
                if (trimmedLine.startsWith('data: ')) {
                    const jsonData = trimmedLine.slice(6);
                    try {
                        if (jsonData === '[DONE]')
                            continue;
                        const data = JSON.parse(jsonData);
                        // Handle chat completion
                        if (data.choices && data.choices[0]) {
                            const choice = data.choices[0];
                            if (choice.delta && choice.delta.content) {
                                yield choice.delta.content;
                            }
                        }
                    }
                    catch (err) {
                        console.error('Error parsing JSON from stream:', err, jsonData);
                    }
                }
            }
        }
    }
    catch (error) {
        console.error('Error reading from stream:', error);
        throw error;
    }
    finally {
        try {
            await reader.cancel();
        }
        catch (error) {
            console.error('Error canceling reader:', error);
        }
    }
}
