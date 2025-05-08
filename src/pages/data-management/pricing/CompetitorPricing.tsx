
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

// Mock data for South African audio equipment competitors
const competitors = [
  { id: 1, name: "SoundWave SA" },
  { id: 2, name: "AudioXpress" },
  { id: 3, name: "MusicTech" },
  { id: 4, name: "SoundGuru" },
  { id: 5, name: "AudioPro SA" },
];

// Mock data for price comparison in ZAR
const priceComparisonData = [
  { category: 'Speakers', ourPrice: 4399, competitorAvg: 4699 },
  { category: 'Displays', ourPrice: 9999, competitorAvg: 9499 },
  { category: 'Amplifiers', ourPrice: 5699, competitorAvg: 6299 },
  { category: 'Microphones', ourPrice: 2499, competitorAvg: 2699 },
  { category: 'Accessories', ourPrice: 499, competitorAvg: 599 },
];

// Mock data for product competitor pricing in ZAR
const competitorProductsData = [
  { 
    id: 1,
    sku: 'AT-SPK-001',
    name: 'Premium Bookshelf Speaker',
    ourPrice: 4999.99,
    competitor1: { name: 'SoundWave SA', price: 5299.99 },
    competitor2: { name: 'AudioXpress', price: 5099.99 },
    competitor3: { name: 'MusicTech', price: 4899.99 },
  },
  { 
    id: 2,
    sku: 'VE-DSP-120',
    name: '4K HDR Display Monitor',
    ourPrice: 11999.99,
    competitor1: { name: 'SoundWave SA', price: 12499.99 },
    competitor2: { name: 'AudioXpress', price: 11799.99 },
    competitor3: { name: 'MusicTech', price: 11999.99 },
  },
  { 
    id: 3,
    sku: 'SV-AMP-220',
    name: 'Multi-Channel Power Amplifier',
    ourPrice: 7499.99,
    competitor1: { name: 'SoundWave SA', price: 7299.99 },
    competitor2: { name: 'AudioXpress', price: 7699.99 },
    competitor3: { name: 'MusicTech', price: 7899.99 },
  },
  { 
    id: 4,
    sku: 'MM-MIC-320',
    name: 'Studio Condenser Microphone',
    ourPrice: 2499.99,
    competitor1: { name: 'SoundWave SA', price: 2699.99 },
    competitor2: { name: 'AudioXpress', price: 2499.99 },
    competitor3: { name: 'SoundGuru', price: 2399.99 },
  },
  { 
    id: 5,
    sku: 'AT-CAB-105',
    name: 'Premium HDMI Cable 3m',
    ourPrice: 599.99,
    competitor1: { name: 'AudioPro SA', price: 699.99 },
    competitor2: { name: 'AudioXpress', price: 499.99 },
    competitor3: { name: 'MusicTech', price: 599.99 },
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
      toast({
        title: "Upload Error",
        description: "Please select both a competitor and a file.",
        variant: "destructive",
      });
      return;
    }

    // Simulate processing
    toast({
      title: "File Uploaded",
      description: `${selectedFile.name} has been uploaded and is now processing.`,
    });

    // Reset form
    setSelectedFile(null);
    setSelectedCompetitor("");
    
    // Reset file input
    const fileInput = document.getElementById('competitor-file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    // Simulate completion
    setTimeout(() => {
      toast({
        title: "Processing Complete",
        description: "Competitor pricing data has been processed successfully.",
      });
    }, 2000);
  };

  // Format currency in ZAR
  const formatZAR = (value: number) => {
    return `R${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Competitor Pricing (ZAR)</h1>
      
      <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
      
      <Card className="backdrop-blur-md bg-white/30 border border-white/10">
        <CardHeader>
          <CardTitle>Price Comparison</CardTitle>
          <CardDescription>
            Our prices vs. competitor average by category (ZAR)
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
              <Tooltip formatter={(value) => formatZAR(value as number)} />
              <Legend />
              <Bar dataKey="ourPrice" name="Our Price" fill="#0EA5E9" />
              <Bar dataKey="competitorAvg" name="Competitor Avg." fill="#64748B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="backdrop-blur-md bg-white/30 border border-white/10">
        <CardHeader>
          <CardTitle>Competitor Product Pricing</CardTitle>
          <CardDescription>
            Detailed competitor pricing by product (ZAR)
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
                    <TableCell>{formatZAR(product.ourPrice)}</TableCell>
                    <TableCell>{formatZAR(product.competitor1.price)}</TableCell>
                    <TableCell>{formatZAR(product.competitor2.price)}</TableCell>
                    <TableCell>{formatZAR(product.competitor3.price)}</TableCell>
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
}

export default CompetitorPricing;
