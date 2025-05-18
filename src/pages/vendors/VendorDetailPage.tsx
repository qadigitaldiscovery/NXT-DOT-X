
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';
import { vendorDetailTabs } from '@/config/vendorTabs';
import { 
  File, Download, ExternalLink, AlertCircle, DollarSign,
  Award, ChevronRight, ChevronLeft, ListFilter
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Vendor performance data components
import { GaugeRating } from '@/components/vendorDetail/GaugeRating';
import { PerformanceChart } from '@/components/vendorDetail/PerformanceChart';
import { CreditSummaryCard } from '@/components/vendorDetail/CreditSummaryCard';

interface VendorDetailPageProps {
  defaultTab?: string;
}

const VendorDetailPage: React.FC<VendorDetailPageProps> = ({ defaultTab = 'data' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching vendor data
    setLoading(true);
    setTimeout(() => {
      setVendor({
        id: id || '1',
        name: 'Healthcare Supplier',
        type: 'supplier',
        creditRating: 'A',
        creditRisk: 'Very Low Risk',
        creditLimit: '$50,000,000',
        localScore: 89,
        status: 'active',
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/vendors/${id}/${value}`);
  };

  const handlePrevVendor = () => {
    // Simulate navigation to previous vendor
    toast.info("Navigation to previous vendor");
    // In a real app, you would fetch the previous vendor ID and navigate
  };

  const handleNextVendor = () => {
    // Simulate navigation to next vendor
    toast.info("Navigation to next vendor");
    // In a real app, you would fetch the next vendor ID and navigate
  };

  if (loading) {
    return (
      <TradingSystemLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </TradingSystemLayout>
    );
  }

  return (
    <TradingSystemLayout>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{vendor?.name}</h1>
              <Badge variant={vendor?.status === 'active' ? 'secondary' : 'destructive'}>
                {vendor?.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mt-1">
              Vendor ID: {vendor?.id} • Type: {vendor?.type}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrevVendor}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextVendor}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="sm">
              <ListFilter className="h-4 w-4 mr-1" /> Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Credit Rating</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <div className="text-3xl font-bold text-green-500">{vendor?.creditRating}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Credit Rating Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <div className="text-lg font-medium text-green-500">{vendor?.creditRisk}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Credit Limit</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <div className="text-lg font-medium">{vendor?.creditLimit}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Local Score</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <div className="text-lg font-medium">{vendor?.localScore}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4 flex flex-wrap">
            {vendorDetailTabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="data" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-gray-500" />
                    <CardTitle>Rating</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="text-5xl font-bold text-green-500 mb-4">{vendor?.creditRating}</div>
                    <GaugeRating value={85} />
                    <div className="mt-6 text-center">
                      <p className="text-lg uppercase font-bold">HEALTHCARE SUPPLIER</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <File className="h-5 w-5 mr-2 text-gray-500" />
                    <CardTitle>Historical Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <File className="h-5 w-5 mr-2 text-gray-500" />
                  <CardTitle>Full Credit Report | Fetched 10-Jan-2022</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  View in CreditSafe <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <div className="text-center text-muted-foreground">
                    <Download className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>Click to download or view full credit report</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-iq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Market analytics and competitive intelligence will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Contract information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Event information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Messages will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Files</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Files will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Forms will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Vendor user information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Track</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tracking information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Risk information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spend" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Spend information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="more" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Additional vendor information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Section</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Form to add a new custom section will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TradingSystemLayout>
  );
};

export default VendorDetailPage;
