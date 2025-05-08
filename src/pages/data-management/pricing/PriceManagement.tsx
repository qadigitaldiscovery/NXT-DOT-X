
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
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
  Trash,
  CheckSquare, 
  Percent, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock product data for South African market in ZAR
const productsData = [
  { 
    id: 1, 
    sku: 'AT-SPK-001', 
    name: 'Premium Bookshelf Speaker', 
    supplier: 'AudioTech Pro',
    cost: 4299.99,
    discount: 15,
    currentRetail: 7499.99,
    competitorAvg: 7899.99,
    newRetail: 7499.99
  },
  { 
    id: 2, 
    sku: 'VE-DSP-120', 
    name: '4K HDR Display Monitor', 
    supplier: 'VisualEdge',
    cost: 8999.99,
    discount: 12,
    currentRetail: 14999.99,
    competitorAvg: 14499.99,
    newRetail: 14999.99
  },
  { 
    id: 3, 
    sku: 'SV-AMP-220', 
    name: 'Multi-Channel Power Amplifier', 
    supplier: 'SoundVision',
    cost: 5999.99,
    discount: 18,
    currentRetail: 9999.99,
    competitorAvg: 10499.99,
    newRetail: 9999.99
  },
  { 
    id: 4, 
    sku: 'MM-MIC-320', 
    name: 'Studio Condenser Microphone', 
    supplier: 'MediaMax',
    cost: 1999.99,
    discount: 10,
    currentRetail: 3499.99,
    competitorAvg: 3699.99,
    newRetail: 3499.99
  },
  { 
    id: 5, 
    sku: 'AT-CAB-105', 
    name: 'Premium HDMI Cable 3m', 
    supplier: 'AudioTech Pro',
    cost: 399.99,
    discount: 25,
    currentRetail: 899.99,
    competitorAvg: 999.99,
    newRetail: 899.99
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
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Format currency in ZAR
  const formatZAR = (value: number) => {
    return `R${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your price changes have been saved successfully.",
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
      // Only modify selected products if any are selected, otherwise modify all
      if (selectedProductIds.length > 0 && !selectedProductIds.includes(product.id)) {
        return product;
      }
      
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
    
    const affectedCount = selectedProductIds.length > 0 ? selectedProductIds.length : products.length;
    
    toast({
      title: "Bulk Update Applied",
      description: `Price changes have been applied to ${affectedCount} product(s).`,
    });
  };
  
  const handleSelectProduct = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedProductIds([...selectedProductIds, id]);
    } else {
      setSelectedProductIds(selectedProductIds.filter(productId => productId !== id));
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    if (isChecked) {
      // Select all visible/filtered products
      const visibleProductIds = products
        .filter(product => 
          (selectedCategory === "1" || categories.find(c => c.id.toString() === selectedCategory)?.name.includes(product.name)) &&
          (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
          (searchTerm === "" || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .map(product => product.id);
      
      setSelectedProductIds(visibleProductIds);
    } else {
      setSelectedProductIds([]);
    }
  };
  
  const handleDeleteSelected = () => {
    if (selectedProductIds.length === 0) return;
    
    // Filter out the selected products
    const newProducts = products.filter(product => !selectedProductIds.includes(product.id));
    setProducts(newProducts);
    setSelectedProductIds([]);
    setSelectAll(false);
    
    toast({
      title: "Products Removed",
      description: `${selectedProductIds.length} product(s) have been removed.`,
    });
  };

  const filteredProducts = products.filter(product => 
    (selectedCategory === "1" || categories.find(c => c.id.toString() === selectedCategory)?.name.includes(product.name)) &&
    (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
    (searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Price Management (ZAR)</h1>
      
      <Tabs defaultValue="product-list">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="product-list">Product List</TabsTrigger>
          <TabsTrigger value="bulk-changes">Bulk Price Changes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="product-list" className="space-y-6">
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
          
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Product Price Management</CardTitle>
                <CardDescription>Manage and update individual product prices</CardDescription>
              </div>
              <div className="flex space-x-2">
                {selectedProductIds.length > 0 && (
                  <Button variant="outline" onClick={handleDeleteSelected} className="text-red-500">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove Selected ({selectedProductIds.length})
                  </Button>
                )}
                <Button onClick={handleSaveChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox 
                          checked={selectAll && filteredProducts.length > 0} 
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Competitor Avg</TableHead>
                      <TableHead>New Price</TableHead>
                      <TableHead>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map(product => {
                      const margin = ((product.newRetail - product.cost) / product.newRetail) * 100;
                      const competitorDiff = ((product.newRetail - product.competitorAvg) / product.competitorAvg) * 100;
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedProductIds.includes(product.id)} 
                              onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                            />
                          </TableCell>
                          <TableCell className="font-mono">{product.sku}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-muted-foreground">{product.supplier}</div>
                            </div>
                          </TableCell>
                          <TableCell>{formatZAR(product.cost)}</TableCell>
                          <TableCell>{formatZAR(product.currentRetail)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {formatZAR(product.competitorAvg)}
                              <span className="ml-2 text-xs">
                                {competitorDiff < 0 ? (
                                  <span className="text-green-500 flex items-center">
                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                    {Math.abs(competitorDiff).toFixed(1)}%
                                  </span>
                                ) : (
                                  <span className="text-amber-500 flex items-center">
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                    {competitorDiff.toFixed(1)}%
                                  </span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={product.newRetail}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                  handlePriceChange(product.id, value);
                                }
                              }}
                              className="w-28"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{margin.toFixed(1)}%</div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {filteredProducts.length === 0 && (
                <div className="py-6 text-center text-muted-foreground">
                  No products match your search criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bulk-changes" className="space-y-6">
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
            <CardHeader>
              <CardTitle>Bulk Price Changes</CardTitle>
              <CardDescription>
                Apply price changes to {selectedProductIds.length > 0 ? `${selectedProductIds.length} selected products` : "all products"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Increase Prices By Percentage</Label>
                      <div className="flex items-center mt-2">
                        <Input type="number" min="0" max="100" defaultValue="5" className="w-20" />
                        <span className="mx-2"><Percent className="h-4 w-4" /></span>
                        <Button variant="outline" onClick={() => applyBulkPriceChange("increase-percent", 5)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Decrease Prices By Percentage</Label>
                      <div className="flex items-center mt-2">
                        <Input type="number" min="0" max="100" defaultValue="5" className="w-20" />
                        <span className="mx-2"><Percent className="h-4 w-4" /></span>
                        <Button variant="outline" onClick={() => applyBulkPriceChange("decrease-percent", 5)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Match Competitor Average</Label>
                      <div className="flex items-center mt-2">
                        <Button variant="outline" className="w-full" onClick={() => applyBulkPriceChange("match-competitor", 0)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Beat Competitor Average By</Label>
                      <div className="flex items-center mt-2">
                        <Input type="number" min="0" max="100" defaultValue="3" className="w-20" />
                        <span className="mx-2"><Percent className="h-4 w-4" /></span>
                        <Button variant="outline" onClick={() => applyBulkPriceChange("beat-competitor", 3)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Set Fixed Margin</Label>
                      <div className="flex items-center mt-2">
                        <Input type="number" min="0" max="100" defaultValue="40" className="w-20" />
                        <span className="mx-2"><Percent className="h-4 w-4" /></span>
                        <Button variant="outline" onClick={() => applyBulkPriceChange("fixed-margin", 40)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => {
                    setProducts(productsData);
                    setSelectedProductIds([]);
                    setSelectAll(false);
                  }}>
                    Reset Changes
                  </Button>
                  <Button onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Save All Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PriceManagement;
