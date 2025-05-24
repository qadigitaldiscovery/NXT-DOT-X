
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

const CompetitorPricing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCompetitors = [
    { id: '1', name: 'CompetitorA', product: 'Product X', price: '$99.99', lastUpdated: '2024-01-15', status: 'active' },
    { id: '2', name: 'CompetitorB', product: 'Product Y', price: '$149.99', lastUpdated: '2024-01-14', status: 'active' },
    { id: '3', name: 'CompetitorC', product: 'Product Z', price: '$79.99', lastUpdated: '2024-01-13', status: 'inactive' }
  ];

  const handleAddCompetitor = () => {
    toast.success('Competitor pricing analysis started');
  };

  const handleViewDetails = (competitor: any) => {
    toast.success('Opening competitor details');
  };

  const handleEdit = (competitor: any) => {
    toast.success('Opening edit form');
  };

  const handleDelete = (competitor: any) => {
    toast.error('Competitor removed from analysis');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitor Pricing</h1>
          <p className="text-muted-foreground">
            Monitor and analyze competitor pricing strategies
          </p>
        </div>
        <Button onClick={handleAddCompetitor}>
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search competitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCompetitors.map((competitor) => (
              <div key={competitor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{competitor.name}</p>
                    <p className="text-sm text-muted-foreground">{competitor.product}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg">{competitor.price}</span>
                  <Badge variant={competitor.status === 'active' ? 'default' : 'secondary'}>
                    {competitor.status}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(competitor)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(competitor)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(competitor)}>
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

export default CompetitorPricing;
