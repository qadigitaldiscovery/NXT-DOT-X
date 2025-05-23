import { useQuery } from '@tanstack/react-query';
const getMockData = (options) => {
    // This would be replaced with an API call in a real application
    return {
        averageCostChange: {
            value: '+2.5%',
            change: {
                value: 0.8,
                isPositive: true,
                text: 'increase from last month'
            }
        },
        costSavings: {
            value: 'R229,580',
            change: {
                value: 18,
                isPositive: false,
                text: 'increase from last month'
            }
        },
        suppliersWithIncreases: {
            value: 5,
            change: {
                value: 2,
                isPositive: false,
                text: 'decrease from last month'
            }
        },
        productsWithAlerts: {
            value: 24,
            change: {
                value: 6,
                isPositive: true,
                text: 'increase from last month'
            }
        },
        costTrends: [
            { month: 'Jan', cost: 520000, previous: 500000 },
            { month: 'Feb', cost: 540000, previous: 520000 },
            { month: 'Mar', cost: 510000, previous: 530000 },
            { month: 'Apr', cost: 570000, previous: 540000 },
            { month: 'May', cost: 550000, previous: 560000 },
            { month: 'Jun', cost: 590000, previous: 550000 },
        ],
        supplierDistribution: [
            { name: 'AudioTech Pro', value: 35 },
            { name: 'VisualEdge', value: 25 },
            { name: 'SoundVision', value: 20 },
            { name: 'MediaMax', value: 15 },
            { name: 'Others', value: 5 },
        ],
        categoryVariation: [
            { category: 'Electronics', variance: 8.2 },
            { category: 'Audio', variance: 5.7 },
            { category: 'Displays', variance: 12.3 },
            { category: 'Accessories', variance: 3.4 },
            { category: 'Components', variance: 7.9 },
            { category: 'Cables', variance: 2.1 },
        ]
    };
};
/**
 * Hook to fetch and manage cost analysis data
 */
export const useCostAnalysis = (options = { timeRange: '6m' }) => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: ['cost-analysis', options],
        queryFn: () => getMockData(options),
    });
    return {
        data: data || getMockData(options),
        isLoading,
        error,
        isError,
        refetch
    };
};
