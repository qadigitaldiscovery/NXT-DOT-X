import { Router } from 'express';
import { businessGovernanceService } from '../services/business-governance/businessGovernanceService';
import { BusinessRule } from '../types/business-governance';

const businessGovernanceRouter = Router();

// GET all business rules
businessGovernanceRouter.get('/rules', async (req, res) => {
    try {
        const rules = await businessGovernanceService.getAllRules();
        res.status(200).json(rules);
    } catch (error: any) {
        console.error('Failed to retrieve business rules:', error);
        res.status(500).json({ message: 'Failed to retrieve business rules', error: error.message });
    }
});

// GET a single business rule by ID
businessGovernanceRouter.get('/rules/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rule = await businessGovernanceService.getRule(id);
        if (rule) {
            res.status(200).json(rule);
        } else {
            res.status(404).json({ message: 'Business rule not found' });
        }
    } catch (error: any) {
        console.error(`Failed to retrieve business rule with ID ${req.params.id}:`, error);
        res.status(500).json({ message: `Failed to retrieve business rule with ID ${req.params.id}`, error: error.message });
    }
});

// POST a new business rule
businessGovernanceRouter.post('/rules', async (req, res) => {
    try {
        const ruleData: Omit<BusinessRule, 'id' | 'created_at' | 'updated_at'> = req.body;
        const newRule = await businessGovernanceService.createRule(ruleData);
        res.status(201).json(newRule);
    } catch (error: any) {
        console.error('Failed to create business rule:', error);
        res.status(500).json({ message: 'Failed to create business rule', error: error.message });
    }
});

// PUT (update) an existing business rule by ID
businessGovernanceRouter.put('/rules/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates: Partial<Omit<BusinessRule, 'id' | 'created_at' | 'updated_at'>> = req.body;
        const updatedRule = await businessGovernanceService.updateRule(id, updates);
        if (updatedRule) {
            res.status(200).json(updatedRule);
        } else {
            res.status(404).json({ message: 'Business rule not found or could not be updated' });
        }
    } catch (error: any) {
        console.error(`Failed to update business rule with ID ${req.params.id}:`, error);
        res.status(500).json({ message: `Failed to update business rule with ID ${req.params.id}`, error: error.message });
    }
});

// DELETE a business rule by ID
businessGovernanceRouter.delete('/rules/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await businessGovernanceService.deleteRule(id);
        res.status(204).send(); // No content for successful deletion
    } catch (error: any) {
        console.error(`Failed to delete business rule with ID ${req.params.id}:`, error);
        res.status(500).json({ message: `Failed to delete business rule with ID ${req.params.id}`, error: error.message });
    }
});

export default businessGovernanceRouter;