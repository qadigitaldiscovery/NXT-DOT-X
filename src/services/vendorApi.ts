
import { supabase } from '@/integrations/supabase/client';
import { Vendor, VendorWithDetails, SubScore } from '@/types/vendor';
import { calculateLocalScore, getCreditRating, calculateCreditLimit } from '@/utils/vendorCalculations';

/**
 * Fetch a list of all vendors
 */
export async function fetchVendors() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('company_name');

  if (error) throw error;
  return data as Vendor[];
}

/**
 * Fetch a single vendor with all related data
 */
export async function fetchVendorDetails(vendorId: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select(`
      *,
      credit_ratings(*),
      vendor_performance(*),
      vendor_reports(*)
    `)
    .eq('id', vendorId)
    .single();

  if (error) throw error;
  return data as VendorWithDetails;
}

/**
 * Fetch vendor performance data
 */
export async function fetchVendorPerformance(vendorId: string) {
  const { data, error } = await supabase
    .from('vendor_performance')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('date');

  if (error) throw error;
  return data;
}

/**
 * Fetch a credit report URL
 */
export async function getReportUrl(filePath: string) {
  const { data, error } = await supabase.storage
    .from('reports')
    .createSignedUrl(filePath, 3600); // 1 hour expiry

  if (error) throw error;
  return data.signedUrl;
}

/**
 * Create a new vendor
 */
export async function createVendor(vendor: Partial<Vendor>, subScores: SubScore) {
  // Calculate local score
  const localScore = calculateLocalScore(
    subScores.paymentTimeliness,
    subScores.financialHealth,
    subScores.operationalStability
  );

  // Insert vendor
  const { data: vendorData, error: vendorError } = await supabase
    .from('vendors')
    .insert({ ...vendor, local_score: localScore })
    .select()
    .single();

  if (vendorError) throw vendorError;

  // Get credit rating based on local score
  const [ratingCode, description] = getCreditRating(localScore);
  
  // Insert credit rating
  const { error: ratingError } = await supabase
    .from('credit_ratings')
    .insert({
      vendor_id: vendorData.id,
      rating_code: ratingCode,
      description,
      credit_limit: calculateCreditLimit(10), // Default 10M revenue
      fetched_at: new Date().toISOString()
    });

  if (ratingError) throw ratingError;

  return vendorData;
}

/**
 * Fetch a credit report from external API
 */
export async function fetchCreditReport(vendorId: string) {
  const { data, error } = await supabase.functions.invoke('fetch-credit-report', {
    body: { vendorId }
  });

  if (error) throw error;
  return data;
}
