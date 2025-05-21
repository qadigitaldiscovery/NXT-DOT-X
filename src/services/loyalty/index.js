import { accountService } from "./accountService";
import { tierService } from "./tierService";
import { transactionService } from "./transactionService";
import { rewardService } from "./rewardService";
import { pointsService } from "./pointsService";
// Create combined service for backwards compatibility
export const loyaltyService = {
    // Account functions
    getOrCreateAccount: accountService.getOrCreateAccount,
    getAccountByUserId: accountService.getAccountByUserId,
    // Tier functions
    getAllTiers: tierService.getAllTiers,
    // Transaction functions
    getTransactions: transactionService.getTransactions,
    addTransaction: transactionService.addTransaction,
    // Reward functions
    getActiveRewards: rewardService.getActiveRewards,
    redeemReward: rewardService.redeemReward,
    // Points calculation
    calculatePointsFromPurchase: pointsService.calculatePointsFromPurchase
};
// Also export individual services for more targeted imports
export { accountService, tierService, transactionService, rewardService, pointsService };
