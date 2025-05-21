import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export function useEnhancedSupplier() {
    const { supplierId } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadSupplier = async () => {
            try {
                // Reduced timeout for testing
                await new Promise(resolve => setTimeout(resolve, 100));
                // Mock data
                const mockSupplier = {
                    id: supplierId || 'demo-1',
                    businessName: 'Demo Supplier Inc.',
                    status: 'active',
                    contactEmail: 'contact@demosupplier.com',
                    contactPhone: '+1 (555) 123-4567',
                    address: '123 Demo St, Example City, 12345',
                    website: 'https://demosupplier.com',
                    description: 'A demo supplier for testing purposes',
                    creditRating: {
                        grade: 'A',
                        description: 'Excellent creditworthiness',
                        lastUpdated: new Date().toISOString(),
                    },
                    creditLimit: 100000,
                    localScore: 85,
                    marketData: {
                        industryRank: 3,
                        marketShare: 15.5,
                        growthTrend: 'up',
                    },
                    performance: {
                        onTimeDelivery: 98,
                        qualityScore: 95,
                        responseTime: 24,
                        historical: [
                            { date: '2024-01-01', score: 92 },
                            { date: '2024-01-15', score: 95 },
                            { date: '2024-02-01', score: 98 },
                        ],
                    },
                };
                setSupplier(mockSupplier);
                setLoading(false);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load supplier'));
                setLoading(false);
            }
        };
        loadSupplier();
    }, [supplierId]);
    return { supplier, loading, error };
}
