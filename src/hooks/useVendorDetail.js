import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchVendors, fetchVendorDetails, fetchVendorPerformance, createVendor, fetchCreditReport } from '@/services/vendorApi';
import { toast } from 'sonner';
import { calculatePerformanceEMA } from '@/utils/vendorCalculations';
export function useVendors() {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: fetchVendors
    });
}
export function useVendorDetail(vendorId) {
    return useQuery({
        queryKey: ['vendor', vendorId],
        queryFn: () => fetchVendorDetails(vendorId),
        enabled: !!vendorId
    });
}
export function useVendorPerformance(vendorId) {
    const query = useQuery({
        queryKey: ['vendor-performance', vendorId],
        queryFn: () => fetchVendorPerformance(vendorId),
        enabled: !!vendorId
    });
    // Calculate EMA if we have data
    const emaScore = query.data
        ? calculatePerformanceEMA(query.data.map(p => ({ date: p.date, score: p.score })))
        : undefined;
    // Check for recent performance decline
    const hasPerformanceAlert = query.data && query.data.length >= 4
        ? emaScore < query.data[query.data.length - 1].score * 0.9
        : false;
    return {
        ...query,
        emaScore,
        hasPerformanceAlert
    };
}
export function useCreateVendor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ vendor, subScores }) => {
            return createVendor(vendor, subScores);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vendors'] });
            toast.success('Vendor created successfully');
        },
        onError: (error) => {
            toast.error(`Failed to create vendor: ${error.message}`);
        }
    });
}
export function useFetchCreditReport(vendorId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fetchCreditReport(vendorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vendor', vendorId] });
            toast.success('Credit report fetched successfully');
        },
        onError: (error) => {
            toast.error(`Failed to fetch credit report: ${error.message}`);
        }
    });
}
