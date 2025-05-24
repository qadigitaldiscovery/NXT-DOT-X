
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Search, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

const PriceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockProducts = [
    { id: '1', name: 'Product A', currentPrice: '$99.99', suggestedPrice: '$104.99', trend: 'up', lastUpdated: '2024-01-15' },
    { id: '2', name: 'Product B', currentPrice: '$149.99', suggestedPrice: '$144.99', trend: 'down', lastUpdated: '2024-01-14' },
    { id: '3', name: 'Product C', currentPrice: '$79.99', suggestedPrice: '$82.99', trend: 'up', lastUpdated: '2024-01-13' }
  ];

  const handleAddProduct = () => {
    toast.success('Opening new product form');
  };

  const handleEdit = (product: any) => {
    toast.success('Opening edit form');
  };

  const handleDelete = (product: any) => {
    toast.error('Product removed from pricing management');
  };

  const handleApplySuggestion = (product: any) => {
    toast.success(`Price updated to ${product.suggestedPrice}`);
  };

  const handleBulkUpdate = () => {
    toast.success('Bulk price update initiated');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Price Management</h1>
          <p className="text-muted-foreground">
            Manage product pricing and optimization
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBulkUpdate}>
            Bulk Update
          </Button>
          <Button onClick={handleAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Price Increase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3.2%</div>
            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$15,420</div>
            <p className="text-xs text-muted-foreground">From optimization</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Last updated: {product.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="font-bold">{product.currentPrice}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Suggested</p>
                    <div className="flex items-center space-x-1">
                      <p className="font-bold">{product.suggestedPrice}</p>
                      {product.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleApplySuggestion(product)}>
                      Apply
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceManagement;
