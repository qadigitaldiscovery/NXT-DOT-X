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
import { Upload, LineChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Mock data for competitors
const competitors = [
  { id: 1, name: "SuperSound" },
  { id: 2, name: "AV Universe" },
  { id: 3, name: "TechAudio" },
  { id: 4, name: "SoundGear" },
  { id: 5, name: "ElectroWorld" },
];

// Mock data for price comparison
const priceComparisonData = [
  { category: 'Speakers', ourPrice: 240, competitorAvg: 260 },
  { category: 'Displays', ourPrice: 590, competitorAvg: 580 },
  { category: 'Amplifiers', ourPrice: 350, competitorAvg: 390 },
  { category: 'Microphones', ourPrice: 130, competitorAvg: 140 },
  { category: 'Accessories', ourPrice: 25, competitorAvg: 30 },
];

// Mock data for product competitor pricing
const competitorProductsData = [
  { 
    id: 1,
    sku: 'AT-SPK-001',
    name: 'Premium Bookshelf Speaker',
    ourPrice: 299.99,
    competitor1: { name: 'SuperSound', price: 319.99 },
    competitor2: { name: 'AV Universe', price: 309.99 },
    competitor3: { name: 'TechAudio', price: 289.99 },
  },
  { 
    id: 2,
    sku: 'VE-DSP-120',
    name: '4K HDR Display Monitor',
    ourPrice: 699.99,
    competitor1: { name: 'SuperSound', price: 729.99 },
    competitor2: { name: 'AV Universe', price: 689.99 },
    competitor3: { name: 'TechAudio', price: 699.99 },
  },
  { 
    id: 3,
    sku: 'SV-AMP-220',
    name: 'Multi-Channel Power Amplifier',
    ourPrice: 449.99,
    competitor1: { name: 'SuperSound', price: 439.99 },
    competitor2: { name: 'AV Universe', price: 459.99 },
    competitor3: { name: 'TechAudio', price: 469.99 },
  },
  { 
    id: 4,
    sku: 'MM-MIC-320',
    name: 'Studio Condenser Microphone',
    ourPrice: 149.99,
    competitor1: { name: 'SuperSound', price: 159.99 },
    competitor2: { name: 'AV Universe', price: 149.99 },
    competitor3: { name: 'SoundGear', price: 139.99 },
  },
  { 
    id: 5,
    sku: 'AT-CAB-105',
    name: 'Premium HDMI Cable 3m',
    ourPrice: 34.99,
    competitor1: { name: 'ElectroWorld', price: 39.99 },
    competitor2: { name: 'AV Universe', price: 29.99 },
    competitor3: { name: 'TechAudio', price: 34.99 },
  },
];

const CompetitorPricing = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedCompetitor) {
      toast.error({
        title: "Upload Error",
        description: "Please select both a competitor and a file."
      });
      return;
    }

    // Simulate processing
    toast.success({
      title: "File Uploaded",
      description: `${selectedFile.name} has been uploaded and is now processing.`
    });

    // Reset form
    setSelectedFile(null);
    setSelectedCompetitor("");
    
    // Reset file input
    const fileInput = document.getElementById('competitor-file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    // Simulate completion
    setTimeout(() => {
      toast.success({
        title: "Processing Complete",
        description: "Competitor pricing data has been processed successfully."
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Competitor Pricing</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Competitor Data</CardTitle>
          <CardDescription>
            Upload CSV or Excel files with competitor pricing data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="competitor">Select Competitor</Label>
                <Select 
                  value={selectedCompetitor} 
                  onValueChange={setSelectedCompetitor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a competitor" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitors.map(competitor => (
                      <SelectItem 
                        key={competitor.id} 
                        value={competitor.id.toString()}
                      >
                        {competitor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="competitor-file-upload">Upload File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="competitor-file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={!selectedFile || !selectedCompetitor}>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Price Comparison</CardTitle>
          <CardDescription>
            Our prices vs. competitor average by category
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priceComparisonData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="ourPrice" name="Our Price" fill="#0EA5E9" />
              <Bar dataKey="competitorAvg" name="Competitor Avg." fill="#64748B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Competitor Product Pricing</CardTitle>
          <CardDescription>
            Detailed competitor pricing by product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Our Price</TableHead>
                <TableHead>{competitorProductsData[0].competitor1.name}</TableHead>
                <TableHead>{competitorProductsData[0].competitor2.name}</TableHead>
                <TableHead>{competitorProductsData[0].competitor3.name}</TableHead>
                <TableHead>Avg. Diff</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorProductsData.map((product) => {
                const prices = [
                  product.competitor1.price, 
                  product.competitor2.price, 
                  product.competitor3.price
                ];
                const avgCompetitorPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
                const priceDiff = ((product.ourPrice - avgCompetitorPrice) / avgCompetitorPrice) * 100;
                
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono">{product.sku}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.ourPrice.toFixed(2)}</TableCell>
                    <TableCell>${product.competitor1.price.toFixed(2)}</TableCell>
                    <TableCell>${product.competitor2.price.toFixed(2)}</TableCell>
                    <TableCell>${product.competitor3.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {priceDiff < 0 ? (
                          <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="mr-1 h-4 w-4 text-red-500" />
                        )}
                        <span className={priceDiff < 0 ? "text-green-500" : "text-red-500"}>
                          {Math.abs(priceDiff).toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorPricing;
