
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Trash, Plus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  expires: string;
  scope: string;
}

const sampleApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_prod_2023_ZXhhbXBsZWFwaWtleXZhbHVl',
    created: '2025-01-15T08:30:00',
    expires: '2026-01-15T08:30:00',
    scope: 'full_access'
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_dev_2023_YW5vdGhlcmV4YW1wbGVrZXl2YWx1ZQ',
    created: '2025-03-22T14:45:00',
    expires: '2025-09-22T14:45:00',
    scope: 'read_only'
  },
  {
    id: '3',
    name: 'Analytics Integration',
    key: 'sk_analytics_2023_dGhpcmRleGFtcGxla2V5dmFsdWU',
    created: '2025-04-10T11:20:00',
    expires: '2026-04-10T11:20:00',
    scope: 'analytics'
  }
];

const ApiKeyForm: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(sampleApiKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyScope, setNewKeyScope] = useState('read_only');
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };
  
  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success("API key deleted successfully");
  };
  
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }
    
    // Generate a mock key - in a real app, this would come from the backend
    const mockKey = `sk_${newKeyScope.substring(0, 4)}_${Math.floor(Date.now() / 1000)}_${btoa(Math.random().toString()).substring(0, 20)}`;
    
    const newKey: ApiKey = {
      id: `${apiKeys.length + 1}`,
      name: newKeyName,
      key: mockKey,
      created: new Date().toISOString(),
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      scope: newKeyScope
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyScope('read_only');
    
    // Show the new key
    setVisibleKeys(prev => ({
      ...prev,
      [newKey.id]: true
    }));
    
    toast.success("New API key created successfully");
  };
  
  const getScopeBadgeClass = (scope: string) => {
    switch(scope) {
      case 'full_access':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'read_only':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'analytics':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage API keys for external access to your system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Create new API key form */}
        <div className="rounded-md border p-4 bg-muted/20">
          <h3 className="text-md font-medium mb-4">Create New API Key</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input 
                id="key-name"
                placeholder="e.g., Production API Key" 
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="key-scope">Access Scope</Label>
              <Select value={newKeyScope} onValueChange={setNewKeyScope}>
                <SelectTrigger id="key-scope">
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_access">Full Access</SelectItem>
                  <SelectItem value="read_only">Read Only</SelectItem>
                  <SelectItem value="analytics">Analytics Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleCreateKey} className="w-full">
                <Plus className="h-4 w-4 mr-1" /> Generate Key
              </Button>
            </div>
          </div>
        </div>
        
        {/* API Keys Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="bg-muted rounded px-2 py-1 text-xs font-mono">
                        {visibleKeys[apiKey.id] 
                          ? apiKey.key 
                          : `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}`
                        }
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        title={visibleKeys[apiKey.id] ? "Hide key" : "Show key"}
                      >
                        {visibleKeys[apiKey.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getScopeBadgeClass(apiKey.scope)}`}>
                      {apiKey.scope.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(apiKey.created).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(apiKey.expires).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleCopyKey(apiKey.key)}
                      title="Copy API key"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteKey(apiKey.id)}
                      title="Delete API key" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
