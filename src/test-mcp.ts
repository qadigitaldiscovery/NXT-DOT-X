
import { callOpenAI, analyzeBrandSentiment, generateSEOKeywords, analyzeBrandTrust } from './utils/mcpToolCaller';

/**
 * Test function for the MCP Tool Caller utilities
 */
export const testMcpToolCaller = async () => {
  console.log('Testing MCP Tool Caller utilities...');

  try {
    // Test OpenAI call
    console.log('Testing OpenAI call...');
    const openAIResponse = await callOpenAI('What are the best practices for brand marketing?', {
      model: 'gpt-4o-mini',
      temperature: 0.5
    });
    console.log('OpenAI Response:', openAIResponse);

    // Test sentiment analysis
    console.log('\nTesting sentiment analysis...');
    const sentimentResponse = await analyzeBrandSentiment(
      'I absolutely love this product! The customer service was exceptional and the quality exceeded my expectations.'
    );
    console.log('Sentiment Analysis:', sentimentResponse);

    // Test SEO keyword generation
    console.log('\nTesting SEO keyword generation...');
    const keywordsResponse = await generateSEOKeywords('brand marketing', {
      difficulty: 'medium',
      count: 5
    });
    console.log('SEO Keywords:', keywordsResponse);

    // Test brand trust analysis
    console.log('\nTesting brand trust analysis...');
    const trustResponse = await analyzeBrandTrust([
      'This company always delivers on its promises. Great experience every time.',
      'Product quality is excellent but shipping times could be improved.',
      'Customer service was responsive and helpful with my issue.',
      'Pricing is transparent and fair compared to competitors.'
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
