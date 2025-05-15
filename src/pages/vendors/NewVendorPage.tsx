import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateVendor } from '@/hooks/useVendorDetail';
import { Vendor, SubScore } from '@/types/vendor';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export default function NewVendorPage() {
  const [companyName, setCompanyName] = useState('');
  const [paymentScore, setPaymentScore] = useState(50);
  const [financialScore, setFinancialScore] = useState(50);
  const [operationalScore, setOperationalScore] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { mutate: createVendor } = useCreateVendor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const vendor: Partial<Vendor> = {
        company_name: companyName,
      };
      
      const subScores: SubScore = {
        paymentTimeliness: paymentScore,
        financialHealth: financialScore,
        operationalStability: operationalScore
      };
      
      await createVendor({ vendor, subScores });
      
      toast.success('Vendor created successfully!');
      navigate('/vendors');
    } catch (error: any) {
      toast.error(`Failed to create vendor: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Vendor</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <Label>Payment Timeliness Score</Label>
              <Slider
                value={[paymentScore]}
                onValueChange={(value) => setPaymentScore(value[0])}
                defaultValue={[50]}
                max={100}
                step={1}
              />
              <p className="text-sm text-muted-foreground">Score: {paymentScore}</p>
            </div>

            <div>
              <Label>Financial Health Score</Label>
              <Slider
                value={[financialScore]}
                onValueChange={(value) => setFinancialScore(value[0])}
                defaultValue={[50]}
                max={100}
                step={1}
              />
              <p className="text-sm text-muted-foreground">Score: {financialScore}</p>
            </div>

            <div>
              <Label>Operational Stability Score</Label>
              <Slider
                value={[operationalScore]}
                onValueChange={(value) => setOperationalScore(value[0])}
                defaultValue={[50]}
                max={100}
                step={1}
              />
              <p className="text-sm text-muted-foreground">Score: {operationalScore}</p>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Vendor'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
