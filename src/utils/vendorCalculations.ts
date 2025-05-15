
interface PerformancePoint {
  date: string;
  score: number;
}

// Weights for local score calculation
const WEIGHTS = {
  payment: 0.4,
  financial: 0.4,
  operational: 0.2,
};

/**
 * Calculate the local score based on weighted sub-scores
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
 * Determine credit rating based on local score
 */
export function getCreditRating(localScore: number): [string, string] {
  if (localScore >= 90) return ['A', 'Very Low Risk'];
  if (localScore >= 75) return ['B', 'Low Risk'];
  if (localScore >= 60) return ['C', 'Moderate Risk'];
  if (localScore >= 45) return ['D', 'High Risk'];
  return ['E', 'Very High Risk'];
}

/**
 * Calculate recommended credit limit based on annual revenue
 */
export function calculateCreditLimit(
  annualRevenueM: number,
  leverageFactor = 0.5
): number {
  return Math.round(annualRevenueM * leverageFactor * 1_000_000);
}

/**
 * Compute EMA for an array of {date,score}, newest last
 * alpha defaults to 2/(N+1), here N=4 
 */
export function calculatePerformanceEMA(
  data: PerformancePoint[],
  periods = 4
): number {
  if (!data || data.length === 0) return 0;
  
  const alpha = 2 / (periods + 1);
  return data.reduce((ema, point, idx) => {
    if (idx === 0) return point.score;
    return alpha * point.score + (1 - alpha) * ema;
  }, 0);
}
