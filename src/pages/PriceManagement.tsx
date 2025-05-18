import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Save, 
  Percent, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';

// Mock product data
const productsData = [
  { 
    id: 1, 
    sku: 'AT-SPK-001', 
    name: 'Premium Bookshelf Speaker', 
    supplier: 'AudioTech Pro',
    cost: 249.99,
    discount: 15,
    currentRetail: 399.99,
    competitorAvg: 419.99,
    newRetail: 399.99
  },
  { 
    id: 2, 
    sku: 'VE-DSP-120', 
    name: '4K HDR Display Monitor', 
    supplier: 'VisualEdge',
    cost: 599.99,
    discount: 12,
    currentRetail: 899.99,
    competitorAvg: 879.99,
    newRetail: 899.99
  },
  { 
    id: 3, 
    sku: 'SV-AMP-220', 
    name: 'Multi-Channel Power Amplifier', 
    supplier: 'SoundVision',
    cost: 349.99,
    discount: 18,
    currentRetail: 599.99,
    competitorAvg: 629.99,
    newRetail: 599.99
  },
  { 
    id: 4, 
    sku: 'MM-MIC-320', 
    name: 'Studio Condenser Microphone', 
    supplier: 'MediaMax',
    cost: 129.99,
    discount: 10,
    currentRetail: 229.99,
    competitorAvg: 239.99,
    newRetail: 229.99
  },
  { 
    id: 5, 
    sku: 'AT-CAB-105', 
    name: 'Premium HDMI Cable 3m', 
    supplier: 'AudioTech Pro',
    cost: 24.99,
    discount: 25,
    currentRetail: 49.99,
    competitorAvg: 54.99,
    newRetail: 49.99
  },
];

// Mock categories
const categories = [
  { id: 1, name: "All Categories" },
  { id: 2, name: "Speakers" },
  { id: 3, name: "Displays" },
  { id: 4, name: "Amplifiers" },
  { id: 5, name: "Microphones" },
  { id: 6, name: "Accessories" },
];

// Mock suppliers
const suppliers = [
  { id: 1, name: "All Suppliers" },
  { id: 2, name: "AudioTech Pro" },
  { id: 3, name: "VisualEdge" },
  { id: 4, name: "SoundVision" },
  { id: 5, name: "MediaMax" },
];

const PriceManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [selectedSupplier, setSelectedSupplier] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(productsData);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast.success({
      title: "Changes Saved",
      description: "Your price changes have been saved successfully."
    });
  };

  const handlePriceChange = (id: number, newPrice: number) => {
    setProducts(
      products.map(product => 
        product.id === id ? { ...product, newRetail: newPrice } : product
      )
    );
  };

  const applyBulkPriceChange = (method: string, value: number) => {
    const newProducts = products.map(product => {
      let newPrice = product.newRetail;
      
      switch (method) {
        case "increase-percent":
          newPrice = product.currentRetail * (1 + value / 100);
          break;
        case "decrease-percent":
          newPrice = product.currentRetail * (1 - value / 100);
          break;
        case "match-competitor":
          newPrice = product.competitorAvg;
          break;
        case "beat-competitor":
          newPrice = product.competitorAvg * (1 - value / 100);
          break;
        case "fixed-margin":
          // Calculate price that would give the desired margin percentage
          const marginMultiplier = 1 / (1 - value / 100);
          newPrice = product.cost * marginMultiplier;
          break;
      }
      
      return { ...product, newRetail: Math.round(newPrice * 100) / 100 };
    });
    
    setProducts(newProducts);
    
    toast.success({
      title: "Bulk Update Applied",
      description: `Price changes have been calculated and applied to all visible products.`
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Price Management</h1>
      
      <Tabs defaultValue="product-list">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="product-list">Product List</TabsTrigger>
          <TabsTrigger value="bulk-changes">Bulk Price Changes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="product-list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Filter</CardTitle>
              <CardDescription>
                Filter products by category, supplier or search term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem 
                          key={category.id} 
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select 
                    value={selectedSupplier} 
                    onValueChange={setSelectedSupplier}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(supplier => (
                        <SelectItem 
                          key={supplier.id} 
                          value={supplier.id.toString()}
                        >
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Price Management</CardTitle>
              <CardDescription>
                Manage and update individual product prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Current Retail</TableHead>
                    <TableHead>Competitor Avg</TableHead>
                    <TableHead>New Retail</TableHead>
                    <TableHead>Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter(product => 
                      (selectedCategory === "1" || product.name.includes(categories.find(c => c.id.toString() === selectedCategory)?.name || "")) &&
                      (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
                      (searchTerm === "" || 
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((product) => {
                      const margin = ((product.newRetail - product.cost) / product.newRetail) * 100;
                      const competitorDiff = ((product.newRetail - product.competitorAvg) / product.competitorAvg) * 100;
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-mono">{product.sku}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>${product.cost.toFixed(2)}</TableCell>
                          <TableCell>{product.discount}%</TableCell>
                          <TableCell>${product.currentRetail.toFixed(2)}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            ${product.competitorAvg.toFixed(2)}
                            <span className="text-xs ml-1">
                              {competitorDiff < 0 ? (
                                <span className="text-green-500">
                                  <ArrowDownRight className="inline h-3 w-3" />
                                  {Math.abs(competitorDiff).toFixed(1)}%
                                </span>
                              ) : competitorDiff > 0 ? (
                                <span className="text-red-500">
                                  <ArrowUpRight className="inline h-3 w-3" />
                                  {competitorDiff.toFixed(1)}%
                                </span>
                              ) : null}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={product.newRetail}
                              onChange={(e) => handlePriceChange(product.id, parseFloat(e.target.value))}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell className={margin < 30 ? "text-red-500" : margin > 50 ? "text-green-500" : ""}>
                            {margin.toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bulk-changes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Price Updates</CardTitle>
              <CardDescription>
                Apply price changes to multiple products at once
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Percentage Change</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Increase Prices</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="0" 
                            defaultValue="5"
                            className="w-20" 
                          />
                          <span>%</span>
                          <Button 
                            variant="outline" 
                            onClick={() => applyBulkPriceChange("increase-percent", 5)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Decrease Prices</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="0" 
                            defaultValue="5"
                            className="w-20" 
                          />
                          <span>%</span>
                          <Button 
                            variant="outline"
                            onClick={() => applyBulkPriceChange("decrease-percent", 5)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Competitor-based Pricing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Match Competitor</Label>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline"
                            onClick={() => applyBulkPriceChange("match-competitor", 0)}
                            className="w-full"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Beat Competitor</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="0" 
                            defaultValue="3" 
                            className="w-20"
                          />
                          <span>%</span>
                          <Button 
                            variant="outline"
                            onClick={() => applyBulkPriceChange("beat-competitor", 3)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Margin-based Pricing</h3>
                    <div className="space-y-2">
                      <Label>Set Fixed Margin</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          min="0" 
                          defaultValue="40" 
                          className="w-20"
                        />
                        <span>%</span>
                        <Button 
                          variant="outline"
                          onClick={() => applyBulkPriceChange("fixed-margin", 40)}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sets prices to achieve the specified margin percentage across all products.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Promotional Pricing</h3>
                    <div className="space-y-2">
                      <Label>Create Promotion</Label>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="discount">
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="discount">Discount %</SelectItem>
                            <SelectItem value="clearance">Clearance</SelectItem>
                            <SelectItem value="bundle">Bundle</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          type="number" 
                          min="0" 
                          defaultValue="15" 
                          className="w-20"
                        />
                        <span>%</span>
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Reset All</Button>
                  <Button onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Save All Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pricing Preview</CardTitle>
              <CardDescription>
                Preview your bulk price changes before applying them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Retail</TableHead>
                    <TableHead>New Retail</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>New Margin</TableHead>
                    <TableHead>Vs. Competitor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter(product => 
                      (selectedCategory === "1" || product.name.includes(categories.find(c => c.id.toString() === selectedCategory)?.name || "")) &&
                      (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
                      (searchTerm === "" || 
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((product) => {
                      const priceDiff = ((product.newRetail - product.currentRetail) / product.currentRetail) * 100;
                      const margin = ((product.newRetail - product.cost) / product.newRetail) * 100;
                      const vsCompetitor = ((product.newRetail - product.competitorAvg) / product.competitorAvg) * 100;
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-mono">{product.sku}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>${product.currentRetail.toFixed(2)}</TableCell>
                          <TableCell>${product.newRetail.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {priceDiff !== 0 ? (
                                <>
                                  {priceDiff < 0 ? (
                                    <ArrowDownRight className="mr-1 h-4 w-4 text-amber-500" />
                                  ) : (
                                    <ArrowUpRight className="mr-1 h-4 w-4 text-blue-500" />
                                  )}
                                  <span className={priceDiff < 0 ? "text-amber-500" : "text-blue-500"}>
                                    {Math.abs(priceDiff).toFixed(1)}%
                                  </span>
                                </>
                              ) : (
                                <span>0.0%</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className={margin < 30 ? "text-red-500" : margin > 50 ? "text-green-500" : ""}>
                            {margin.toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {vsCompetitor < 0 ? (
                                <span className="text-green-500">
                                  Lower by {Math.abs(vsCompetitor).toFixed(1)}%
                                </span>
                              ) : vsCompetitor > 0 ? (
                                <span className="text-red-500">
                                  Higher by {vsCompetitor.toFixed(1)}%
                                </span>
                              ) : (
                                <span>Matched</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PriceManagement;
