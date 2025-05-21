import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useModules } from '../../context/ModulesContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
export default function BetaFeatureManagement() {
    const { user } = useAuth();
    const { modules } = useModules();
    const [accessRequests, setAccessRequests] = useState([]);
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
            if (error)
                throw error;
            // Fix type casting issue by properly transforming the data
            const typedData = data;
            setAccessRequests(typedData.map(request => ({
                id: request.id,
                userId: request.user_id,
                featureId: request.feature_id,
                status: request.status,
                userEmail: request.profiles?.email,
                featureName: request.beta_features?.name,
                createdAt: request.created_at
            })));
        }
        catch (error) {
            toast.error('Error fetching access requests');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAccessRequests();
    }, []);
    const handleAccessRequest = async (requestId, approved) => {
        try {
            const { error } = await supabase
                .from('user_beta_access')
                .update({
                status: approved ? 'granted' : 'denied',
                granted_at: approved ? new Date().toISOString() : null
            })
                .eq('id', requestId);
            if (error)
                throw error;
            toast.success(`Access request ${approved ? 'approved' : 'denied'}`);
            fetchAccessRequests();
        }
        catch (error) {
            toast.error('Error updating access request');
            console.error(error);
        }
    };
    const toggleBetaFeature = async (featureId, enabled) => {
        try {
            const { error } = await supabase
                .from('beta_features')
                .update({ enabled })
                .eq('id', featureId);
            if (error)
                throw error;
            toast.success(`Beta feature ${enabled ? 'enabled' : 'disabled'}`);
            // Since refreshModules doesn't exist, we'll just note it for future implementation
            // In a real app, you'd want to refresh the modules list after this change
            // For now we'll just reload the page
            window.location.reload();
        }
        catch (error) {
            toast.error('Error updating beta feature');
            console.error(error);
        }
    };
    if (!user || user.role !== 'admin') {
        return _jsx("div", { className: "p-4", children: "You don't have permission to access this page." });
    }
    if (loading) {
        return _jsx("div", { className: "p-4", children: "Loading..." });
    }
    // Add isBeta and description properties to Module type
    const betaModules = modules.filter(m => 'isBeta' in m && m.isBeta);
    return (_jsxs("div", { className: "p-4 space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Beta Feature Management" }), _jsx("div", { className: "bg-white rounded-lg shadow", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Beta Features" }), _jsx("div", { className: "space-y-4", children: betaModules.map((feature) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: feature.name }), _jsx("p", { className: "text-sm text-gray-600", children: feature.description || 'No description available' })] }), _jsx("button", { onClick: () => toggleBetaFeature(feature.id, !feature.isEnabled), className: `px-4 py-2 rounded ${feature.isEnabled
                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'}`, children: feature.isEnabled ? 'Disable' : 'Enable' })] }, feature.id))) })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Pending Access Requests" }), _jsxs("div", { className: "space-y-4", children: [accessRequests.map(request => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: request.userEmail }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Requesting access to: ", request.featureName] }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Requested: ", new Date(request.createdAt).toLocaleDateString()] })] }), _jsxs("div", { className: "space-x-2", children: [_jsx("button", { onClick: () => handleAccessRequest(request.id, true), className: "px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200", children: "Approve" }), _jsx("button", { onClick: () => handleAccessRequest(request.id, false), className: "px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200", children: "Deny" })] })] }, request.id))), accessRequests.length === 0 && (_jsx("p", { className: "text-gray-500 text-center py-4", children: "No pending access requests" }))] })] }) })] }));
}
