
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Key } from "lucide-react";
import { toast } from "sonner";

interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  status: 'active' | 'deprecated' | 'beta';
}

const apiEndpoints: ApiEndpoint[] = [
  {
    id: '1',
    name: 'Get Supplier Data',
    description: 'Retrieve supplier information and cost data',
    method: 'GET',
    path: '/api/v1/suppliers',
    status: 'active'
  },
  {
    id: '2',
    name: 'Create Supplier',
    description: 'Create a new supplier record',
    method: 'POST',
    path: '/api/v1/suppliers',
    status: 'active'
  },
  {
    id: '3',
    name: 'Product Cost Analysis',
    description: 'Get cost analysis data for products',
    method: 'GET',
    path: '/api/v1/analysis/costs',
    status: 'active'
  },
  {
    id: '4',
    name: 'Batch Upload',
    description: 'Upload multiple supplier cost files at once',
    method: 'POST',
    path: '/api/v1/uploads/batch',
    status: 'beta'
  },
  {
    id: '5',
    name: 'Legacy Data Retrieval',
    description: 'Get data from the legacy system',
    method: 'GET',
    path: '/api/v1/legacy/data',
    status: 'deprecated'
  }
];

const exampleCode = {
  javascript: `// Using fetch to get supplier data
fetch('https://api.example.com/api/v1/suppliers', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,

  python: `# Using requests to get supplier data
import requests

url = "https://api.example.com/api/v1/suppliers"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`,

  curl: `curl -X GET "https://api.example.com/api/v1/suppliers" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer YOUR_API_KEY"`
};

const APIsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("javascript");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const apiKey = "sk_test_abcd1234efgh5678ijkl9012";

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'beta': return 'bg-blue-500';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'POST': return 'bg-green-100 text-green-800 border-green-300';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">API Management</h1>
          <p className="text-muted-foreground">Manage and interact with the Data Management API</p>
        </div>
        <div>
          <Button variant="outline" onClick={() => window.open("#", "_blank")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            API Documentation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Key</CardTitle>
          <CardDescription>Use this key to authenticate your API requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-muted p-3 rounded-md font-mono text-sm overflow-hidden">
              {showApiKey ? apiKey : '••••••••••••••••••••••••••'}
            </div>
            <Button variant="secondary" onClick={() => setShowApiKey(!showApiKey)}>
              <Key className="h-4 w-4 mr-2" />
              {showApiKey ? 'Hide' : 'Show'}
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(apiKey, 'API key copied to clipboard')}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="default">
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>Available endpoints for the Data Management API</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {apiEndpoints.map(endpoint => (
              <div key={endpoint.id} className="p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={getMethodColor(endpoint.method)}>
                      {endpoint.method}
                    </Badge>
                    <h3 className="font-semibold">{endpoint.name}</h3>
                    <Badge className={`${getStatusColor(endpoint.status)} text-white`}>
                      {endpoint.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(endpoint.path, 'Path copied to clipboard')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                <code className="text-xs font-mono bg-muted p-1 rounded">{endpoint.path}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Examples of how to use the API in different languages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            <div className="relative">
              <TabsContent value="javascript" className="p-4 bg-zinc-950 text-zinc-50 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{exampleCode.javascript}</pre>
              </TabsContent>
              <TabsContent value="python" className="p-4 bg-zinc-950 text-zinc-50 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{exampleCode.python}</pre>
              </TabsContent>
              <TabsContent value="curl" className="p-4 bg-zinc-950 text-zinc-50 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{exampleCode.curl}</pre>
              </TabsContent>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                onClick={() => copyToClipboard(exampleCode[selectedTab as keyof typeof exampleCode], 'Code copied to clipboard')}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIsPage;
