import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Key, Shield, Cloud, Plus, Eye, EyeOff, Trash2, Edit, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// TODO: Replace with real user/role context
const isAdmin = true;

// Placeholder data for Outgoing APIs
const outgoingApis = [
  {
    config_id: 1,
    service_name: 'Salesforce',
    environment_tag: 'PRODUCTION',
    base_url: 'https://api.salesforce.com',
    auth_method: 'OAUTH2_CC',
    last_test_status: 'SUCCESS',
    last_tested_at: '2024-06-01T12:00:00Z',
    description: 'Main CRM integration',
  },
];

// Placeholder data for API Keys
const apiKeys = [
  {
    api_key_id: 1,
    key_name_label: 'Integration Key',
    key_prefix: 'sk_test_',
    status: 'ACTIVE',
    created_at: '2024-05-01T10:00:00Z',
    last_used_at: '2024-06-01T12:00:00Z',
    scopes: ['read:orders', 'write:products'],
  },
];

// Placeholder data for Scopes
const scopes = [
  { scope_id: 1, scope_name: 'read:orders', description: 'Read order data', is_assignable_by_default: true },
  { scope_id: 2, scope_name: 'write:products', description: 'Modify product data', is_assignable_by_default: false },
];

const TechHubApiManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("outgoing");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  // Outgoing API Management UI
  const renderOutgoingApis = () => (
    <Card>
      <CardHeader>
        <CardTitle>Outgoing API Connections</CardTitle>
        <CardDescription>Manage external API configs (admin only). Add, edit, test, and delete outgoing API connections.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button variant="default" size="sm" disabled={!isAdmin}>
            <Plus className="h-4 w-4 mr-1" /> Add API Config
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Service</th>
                <th className="p-2 text-left">Environment</th>
                <th className="p-2 text-left">Base URL</th>
                <th className="p-2 text-left">Auth</th>
                <th className="p-2 text-left">Last Test</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {outgoingApis.map(api => (
                <tr key={api.config_id} className="border-b">
                  <td className="p-2 font-medium">{api.service_name}</td>
                  <td className="p-2">{api.environment_tag}</td>
                  <td className="p-2">{api.base_url}</td>
                  <td className="p-2">{api.auth_method}</td>
                  <td className="p-2">{api.last_tested_at ? new Date(api.last_tested_at).toLocaleString() : '-'}</td>
                  <td className="p-2">
                    <Badge variant={api.last_test_status === 'SUCCESS' ? 'default' : 'destructive'}>{api.last_test_status}</Badge>
                  </td>
                  <td className="p-2 flex gap-2">
                    <Button size="icon" variant="ghost" title="Test Connection" disabled={!isAdmin}><RefreshCw className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Edit" disabled={!isAdmin}><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Delete" disabled={!isAdmin}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-muted-foreground mt-4">[TODO] Add/Edit form, test connection logic, and backend integration.</div>
      </CardContent>
    </Card>
  );

  // Incoming API Keys UI
  const renderApiKeys = () => (
    <Card>
      <CardHeader>
        <CardTitle>Incoming API Keys</CardTitle>
        <CardDescription>Generate and manage API keys for accessing Tech Hub APIs. Users can generate/revoke their own keys. Admins can view all keys.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button variant="default" size="sm" onClick={() => { setShowKeyModal(true); setNewKey('sk_live_1234567890abcdef'); }}>
            <Plus className="h-4 w-4 mr-1" /> Generate New API Key
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Key Name</th>
                <th className="p-2 text-left">Prefix</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-2 text-left">Last Used</th>
                <th className="p-2 text-left">Scopes</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map(key => (
                <tr key={key.api_key_id} className="border-b">
                  <td className="p-2 font-medium">{key.key_name_label}</td>
                  <td className="p-2">{key.key_prefix}••••••••</td>
                  <td className="p-2"><Badge variant={key.status === 'ACTIVE' ? 'default' : 'destructive'}>{key.status}</Badge></td>
                  <td className="p-2">{new Date(key.created_at).toLocaleDateString()}</td>
                  <td className="p-2">{key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : '-'}</td>
                  <td className="p-2">{key.scopes.join(', ')}</td>
                  <td className="p-2 flex gap-2">
                    <Button size="icon" variant="ghost" title="View Stats"><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Revoke"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-muted-foreground mt-4">[TODO] Key generation modal, revoke logic, stats, and backend integration.</div>
        {/* One-time display modal for new key */}
        {showKeyModal && newKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-2">Your New API Key</h2>
              <p className="mb-4 text-sm text-muted-foreground">Copy and store this key securely. You will not be able to see it again!</p>
              <div className="flex items-center bg-muted p-3 rounded font-mono text-sm mb-4">
                <span className="flex-1">{newKey}</span>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(newKey, 'API key copied!')}><Copy className="h-4 w-4" /></Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="default" onClick={() => { setShowKeyModal(false); setNewKey(null); }}>Done</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Scopes Management UI
  const renderScopes = () => (
    <Card>
      <CardHeader>
        <CardTitle>API Key Scopes (Admin)</CardTitle>
        <CardDescription>Admins can define, update, and delete API key scopes (permissions).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button variant="default" size="sm" disabled={!isAdmin}>
            <Plus className="h-4 w-4 mr-1" /> Add Scope
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Scope Name</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Default?</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scopes.map(scope => (
                <tr key={scope.scope_id} className="border-b">
                  <td className="p-2 font-mono">{scope.scope_name}</td>
                  <td className="p-2">{scope.description}</td>
                  <td className="p-2">{scope.is_assignable_by_default ? 'Yes' : 'No'}</td>
                  <td className="p-2 flex gap-2">
                    <Button size="icon" variant="ghost" title="Edit" disabled={!isAdmin}><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Delete" disabled={!isAdmin}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-muted-foreground mt-4">[TODO] Scope add/edit/delete logic and backend integration.</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tech Hub API Management</h1>
          <p className="text-muted-foreground">Manage outgoing API connections and incoming API keys for the Tech Hub platform.</p>
        </div>
        <div>
          <Button variant="outline" onClick={() => window.open("#", "_blank")}> 
            <ExternalLink className="h-4 w-4 mr-2" />
            API Documentation
          </Button>
        </div>
      </div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="outgoing"><Cloud className="h-4 w-4 mr-1" />Outgoing APIs (Admin)</TabsTrigger>
          <TabsTrigger value="incoming"><Key className="h-4 w-4 mr-1" />Incoming API Keys</TabsTrigger>
          <TabsTrigger value="scopes"><Shield className="h-4 w-4 mr-1" />Admin Scopes</TabsTrigger>
        </TabsList>
        <TabsContent value="outgoing">{renderOutgoingApis()}</TabsContent>
        <TabsContent value="incoming">{renderApiKeys()}</TabsContent>
        <TabsContent value="scopes">{renderScopes()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default TechHubApiManagement;
