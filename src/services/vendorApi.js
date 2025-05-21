import { supabase } from '@/integrations/supabase/client';
import { nanoid } from 'nanoid';
import { calculateLocalScore } from '@/utils/vendorCalculations';
/**
 * Fetch all vendors
 */
export async function fetchVendors() {
    const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });
    if (error)
        throw error;
    return data;
}
/**
 * Fetch a vendor by ID with related credit ratings, reports and performance data
 */
export async function fetchVendorDetails(vendorId) {
    const { data, error } = await supabase
        .from('vendors')
        .select(`
      *,
      credit_ratings(*),
      vendor_reports(*),
      vendor_performance(*)
    `)
        .eq('id', vendorId)
        .order('fetched_at', { foreignTable: 'credit_ratings', ascending: false })
        .order('fetched_at', { foreignTable: 'vendor_reports', ascending: false })
        .order('date', { foreignTable: 'vendor_performance', ascending: true })
        .single();
    if (error)
        throw error;
    return data;
}
/**
 * Fetch performance data for a vendor
 */
export async function fetchVendorPerformance(vendorId) {
    const { data, error } = await supabase
        .from('vendor_performance')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('date', { ascending: true });
    if (error)
        throw error;
    return data || [];
}
/**
 * Create a new vendor with initial scores
 */
export async function createVendor(vendor, subScores) {
    // Calculate local score from sub-scores
    const localScore = calculateLocalScore(subScores.paymentTimeliness || 0, subScores.financialHealth || 0, subScores.operationalStability || 0);
    // Generate vendor ID if not provided
    const id = vendor.id || nanoid(10);
    // First, create the vendor
    const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .insert({
        id,
        company_name: vendor.company_name || 'Unnamed Vendor',
        created_at: new Date().toISOString(),
        local_score: localScore
    })
        .select()
        .single();
    if (vendorError)
        throw vendorError;
    return vendorData;
}
/**
 * Get a download URL for a vendor report
 */
export async function getReportUrl(filePath) {
    const response = await supabase
        .storage
        .from('reports')
        .getPublicUrl(filePath);
    // Supabase storage getPublicUrl doesn't return an error property
    // It returns { data: { publicUrl: string } }
    return response.data.publicUrl;
}
/**
 * Fetch a credit report for a vendor (triggers edge function)
 */
export async function fetchCreditReport(vendorId) {
    const { data, error } = await supabase
        .functions.invoke('fetch-credit-report', {
        body: { vendor_id: vendorId }
    });
    if (error)
        throw error;
    return data;
}
