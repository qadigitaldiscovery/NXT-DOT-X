
import { callOpenAI, analyzeBrandSentiment, generateSEOKeywords, analyzeBrandTrust } from './utils/mcpToolCaller';

/**
 * Test function for the MCP Tool Caller utilities
 */
export const testMcpToolCaller = async () => {
  console.log('Testing MCP Tool Caller utilities...');

  try {
    // Test OpenAI call
    console.log('Testing OpenAI call...');
    const openAIResponse = await callOpenAI('Summarize brand tone in 2025.');
    console.log('OpenAI Response:', openAIResponse);

    // Test sentiment analysis
    console.log('\nTesting sentiment analysis...');
    const sentimentResponse = await analyzeBrandSentiment([
      "I love this brand!",
      "It's okay I guess.",
      "Absolutely terrible service."
    ]);
    console.log('Sentiment Analysis:', sentimentResponse);

    // Test SEO keyword generation
    console.log('\nTesting SEO keyword generation...');
    const keywordsResponse = await generateSEOKeywords('brand marketing');
    console.log('SEO Keywords:', keywordsResponse);

    // Test brand trust analysis
    console.log('\nTesting brand trust analysis...');
    const trustResponse = await analyzeBrandTrust([
      { rating: 5, content: "Excellent experience!" },
      { rating: 4, content: "Very good" },
      { rating: 2, content: "Not great" },
      { rating: 1, content: "Terrible" }
    ]);
    console.log('Brand Trust Analysis:', trustResponse);

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Error during MCP Tool Caller tests:', error);
  }
};

// Uncomment to run the test function
// testMcpToolCaller();

export default testMcpToolCaller;
