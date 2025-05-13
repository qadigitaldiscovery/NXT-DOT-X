
/// <reference types="jest" />

import {
  callOpenAI,
  analyzeBrandSentiment,
  generateSEOKeywords,
  analyzeBrandTrust
} from '../utils/mcpToolCaller';

describe('mcpToolCaller Utilities', () => {
  test('callOpenAI returns mocked response', async () => {
    const prompt = "Test prompt";
    const response = await callOpenAI(prompt);
    expect(response).toContain("OpenAI Response for prompt");
  });

  test('analyzeBrandSentiment correctly classifies sentiment', () => {
    const result = analyzeBrandSentiment(["great product", "okay", "terrible experience"]);
    expect(result.positive).toBe(1);
    expect(result.neutral).toBe(1);
    expect(result.negative).toBe(1);
  });

  test('generateSEOKeywords returns expected keywords', () => {
    const keywords = generateSEOKeywords("marketing");
    expect(keywords).toContain("marketing tips");
    expect(keywords.length).toBeGreaterThan(0);
  });

  test('analyzeBrandTrust computes average rating correctly', () => {
    const reviews = [
      { rating: 5, content: "Excellent" },
      { rating: 3, content: "Okay" },
      { rating: 1, content: "Bad" }
    ];
    const score = analyzeBrandTrust(reviews);
    expect(score).toBeCloseTo(3.0);
  });
});
