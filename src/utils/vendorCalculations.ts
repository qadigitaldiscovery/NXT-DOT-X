
import { SubScore } from "@/types/vendor";

// Weights for local score calculation
const WEIGHTS = {
  payment: 0.4,
  financial: 0.4,
  operational: 0.2,
};

/**
 * Calculate local score based on sub-scores
 */
export function calculateLocalScore(
  paymentTimeliness: number,
  financialHealth: number,
  operationalStability: number
): number {
  const score =
    paymentTimeliness * WEIGHTS.payment +
    financialHealth * WEIGHTS.financial +
    operationalStability * WEIGHTS.operational;
  return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Get credit rating based on local score
 */
export function getCreditRating(localScore: number): [string, string] {
  if (localScore >= 90) return ["A", "Very Low Risk"];
  if (localScore >= 75) return ["B", "Low Risk"];
  if (localScore >= 60) return ["C", "Moderate Risk"];
  if (localScore >= 45) return ["D", "High Risk"];
  return ["E", "Very High Risk"];
}

/**
 * Calculate recommended credit limit
 */
export function calculateCreditLimit(
  annualRevenueM: number,
  leverageFactor = 0.5
): number {
  return Math.round(annualRevenueM * leverageFactor * 1_000_000);
}

/**
 * Calculate EMA for performance data
 */
export function calculatePerformanceEMA(
  data: Array<{ date: string; score: number }>,
  periods = 4
): number {
  if (data.length === 0) return 0;
  
  const alpha = 2 / (periods + 1);
  return data.reduce((ema, point, idx) => {
    if (idx === 0) return point.score;
    return alpha * point.score + (1 - alpha) * ema;
  }, 0);
}

/**
 * Format currency values
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date values
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
