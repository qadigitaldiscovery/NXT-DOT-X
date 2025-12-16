import { supabase } from '@/integrations/supabase/client';
import { nanoid } from 'nanoid';
import { Vendor, SubScore, VendorDetail } from '@/types/vendor';
import { calculateLocalScore } from '@/utils/vendorCalculations';

/**
 * Fetch all vendors
 */
export async function fetchVendors() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return (data || []) as unknown as Vendor[];
}

/**
 * Fetch a vendor by ID with related credit ratings, reports and performance data
 */
export async function fetchVendorDetails(vendorId: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select(`
      *,
      credit_ratings(*),
      vendor_reports(*),
      vendor_performance(*)
    `)
    .eq('id', vendorId)
    .single();

  if (error) throw error;
  
  return data as unknown as VendorDetail;
}

/**
 * Fetch performance data for a vendor
 */
export async function fetchVendorPerformance(vendorId: string) {
  const { data, error } = await supabase
    .from('vendor_performance')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('date', { ascending: true });

  if (error) throw error;
  
  return data || [];
}

/**
 * Create a new vendor with initial scores
 */
export async function createVendor(
  vendor: Partial<Vendor>,
  subScores: SubScore
) {
  // Calculate local score from sub-scores
  const localScore = calculateLocalScore(
    (subScores as any).paymentTimeliness || 0,
    (subScores as any).financialHealth || 0,
    (subScores as any).operationalStability || 0
  );
  
  // Generate vendor ID if not provided
  const id = vendor.id || nanoid(10);
  
  // Get current user for vendor ownership
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in to create a vendor');
  }
  
  // Create the vendor
  const { data: vendorData, error: vendorError } = await supabase
    .from('vendors')
    .insert({
      id,
      company_name: vendor.company_name || 'Unnamed Vendor',
      local_score: localScore,
      user_id: user.id,
    })
    .select()
    .single();

  if (vendorError) throw vendorError;
  
  return vendorData;
}

/**
 * Get a download URL for a vendor report
 */
export async function getReportUrl(filePath: string) {
  const response = await supabase
    .storage
    .from('reports')
    .getPublicUrl(filePath);
  
  return response.data.publicUrl;
}

/**
 * Fetch a credit report for a vendor (triggers edge function)
 */
export async function fetchCreditReport(vendorId: string) {
  const { data, error } = await supabase
    .functions.invoke('fetch-credit-report', {
      body: { vendor_id: vendorId }
    });
  
  if (error) throw error;
  
  return data;
}
