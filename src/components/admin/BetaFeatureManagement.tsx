
import { useState, useEffect } from 'react';
import { useModules } from '../../context/ModulesContext';
import { useAuth } from '../../context/AuthContext';
import { BetaAccessStatus } from '../../types/beta';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

// Define proper types for beta features
interface BetaFeature {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

interface DatabaseBetaAccess {
  id: string;
  user_id: string;
  feature_id: string;
  status: BetaAccessStatus;
  created_at: string;
  profiles: {
    email: string;
  };
  beta_features: {
    name: string;
  };
}

interface BetaAccessRequest {
  id: string;
  userId: string;
  featureId: string;
  status: BetaAccessStatus;
  userEmail: string;
  featureName: string;
  createdAt: string;
}

export default function BetaFeatureManagement() {
  const { user } = useAuth();
  const { modules } = useModules();
  const [accessRequests, setAccessRequests] = useState<BetaAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch beta access requests
  const fetchAccessRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('user_beta_access')
        .select(`
          id,
          user_id,
          feature_id,
          status,
          created_at,
          profiles:user_id (email),
          beta_features:feature_id (name)
        `)
        .eq('status', 'pending');

      if (error) throw error;
      
      // Fix type casting issue by properly transforming the data
      const typedData = data as any[];
      setAccessRequests(typedData.map(request => ({
        id: request.id,
        userId: request.user_id,
        featureId: request.feature_id,
        status: request.status as BetaAccessStatus,
        userEmail: request.profiles?.email,
        featureName: request.beta_features?.name,
        createdAt: request.created_at
      })));
    } catch (error: any) {
      toast.error('Error fetching access requests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessRequests();
  }, []);

  const handleAccessRequest = async (requestId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('user_beta_access')
        .update({
          status: approved ? 'granted' : 'denied',
          granted_at: approved ? new Date().toISOString() : null
        })
        .eq('id', requestId);

      if (error) throw error;

      toast.success(`Access request ${approved ? 'approved' : 'denied'}`);
      fetchAccessRequests();
    } catch (error: any) {
      toast.error('Error updating access request');
      console.error(error);
    }
  };

  const toggleBetaFeature = async (featureId: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('beta_features')
        .update({ enabled })
        .eq('id', featureId);

      if (error) throw error;

      toast.success(`Beta feature ${enabled ? 'enabled' : 'disabled'}`);
      // Since refreshModules doesn't exist, we'll just note it for future implementation
      // In a real app, you'd want to refresh the modules list after this change
      // For now we'll just reload the page
      window.location.reload();
    } catch (error: any) {
      toast.error('Error updating beta feature');
      console.error(error);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="p-4">You don't have permission to access this page.</div>;
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // Add isBeta and description properties to Module type
  const betaModules = modules.filter(m => 'isBeta' in m && (m as any).isBeta);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Beta Feature Management</h2>
      
      {/* Beta Features List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Beta Features</h3>
          <div className="space-y-4">
            {betaModules.map((feature: any) => (
              <div key={feature.id} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-gray-600">{feature.description || 'No description available'}</p>
                </div>
                <button
                  onClick={() => toggleBetaFeature(feature.id, !feature.enabled)}
                  className={`px-4 py-2 rounded ${
                    feature.enabled
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {feature.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Access Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Pending Access Requests</h3>
          <div className="space-y-4">
            {accessRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <p className="font-medium">{request.userEmail}</p>
                  <p className="text-sm text-gray-600">
                    Requesting access to: {request.featureName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Requested: {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleAccessRequest(request.id, true)}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAccessRequest(request.id, false)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
            {accessRequests.length === 0 && (
              <p className="text-gray-500 text-center py-4">No pending access requests</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
