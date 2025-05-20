import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Activity, FileText, Users, AlertTriangle, DollarSign, BarChart2, Mail, Calendar, Link, Phone, MapPin } from 'lucide-react';
import { useEnhancedSupplier } from '../../hooks/useEnhancedSupplier';
import { toast } from 'sonner';

const EnhancedSuppliersPage = () => {
  const navigate = useNavigate();
  const { supplier, loading, error } = useEnhancedSupplier();
  const [activeTab, setActiveTab] = useState('data');

  const tabs = [
    { id: 'data', label: 'Data', icon: <Activity className="h-4 w-4" /> },
    { id: 'marketiq', label: 'Market IQ', icon: <BarChart2 className="h-4 w-4" /> },
    { id: 'contracts', label: 'Contracts', icon: <FileText className="h-4 w-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <Mail className="h-4 w-4" /> },
    { id: 'files', label: 'Files', icon: <FileText className="h-4 w-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
    { id: 'risk', label: 'Risk', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'spend', label: 'Spend', icon: <DollarSign className="h-4 w-4" /> }
  ];

  const handleAddNew = () => {
    navigate('/data-management/suppliers/new');
    toast({
      title: "Add New Partner",
      description: "Redirecting to partner creation form...",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`${statusClasses[status as keyof typeof statusClasses]} px-3 py-1 rounded-full text-sm font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Partner Data...</h2>
          <p className="text-muted-foreground">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-destructive">Error Loading Data</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partner Management</h1>
          <p className="text-muted-foreground">
            Comprehensive partner management with enhanced features
          </p>
        </div>
        <Button onClick={handleAddNew}>
          Add New Partner
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{supplier?.businessName}</CardTitle>
              <CardDescription>View and manage partner information</CardDescription>
            </div>
            {supplier?.status && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                {getStatusBadge(supplier.status)}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {supplier && (
            <div className="grid gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${supplier.contactEmail}`} className="hover:underline">
                  {supplier.contactEmail}
                </a>
              </div>
              {supplier.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.contactPhone}</span>
                </div>
              )}
              {supplier.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.address}</span>
                </div>
              )}
              {supplier.website && (
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {supplier.website}
                  </a>
                </div>
              )}
            </div>
          )}

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-4">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  {tab.icon}
                  <span className="hidden lg:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{tab.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                      {supplier ? (
                        <pre className="text-sm overflow-auto p-4">
                          {JSON.stringify(supplier[tab.id === 'data' ? 'description' : tab.id], null, 2)}
                        </pre>
                      ) : (
                        `${tab.label} content will be displayed here`
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSuppliersPage;
