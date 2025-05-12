
// Estimate token count for text
export function estimateTokenCount(text: string): number {
  // Very rough approximation: 4 characters ≈ 1 token
  return Math.ceil(text.length / 4);
}
