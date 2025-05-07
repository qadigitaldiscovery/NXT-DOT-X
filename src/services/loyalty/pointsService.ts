
// Service for points calculation logic
export const pointsService = {
  // Calculate points from purchase amount
  calculatePointsFromPurchase(purchaseAmount: number): number {
    // V1 logic: 1 point per $1
    return Math.floor(purchaseAmount);
  }
};
