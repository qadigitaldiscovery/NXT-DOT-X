
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useCreateVendor } from '@/hooks/useVendorDetail';
import { calculateLocalScore } from '@/utils/vendorCalculations';

type FormData = {
  company_name: string;
  code: string;
  paymentTimeliness: number;
  financialHealth: number;
  operationalStability: number;
};

export default function NewVendorPage() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      paymentTimeliness: 75,
      financialHealth: 75,
      operationalStability: 75
    }
  });
  
  const paymentTimeliness = watch('paymentTimeliness');
  const financialHealth = watch('financialHealth');
  const operationalStability = watch('operationalStability');
  
  const navigate = useNavigate();
  const { mutate: createVendor, isPending } = useCreateVendor();
  
  const localScore = calculateLocalScore(
    paymentTimeliness,
    financialHealth,
    operationalStability
  );
  
  const onSubmit = (data: FormData) => {
    const { company_name, code } = data;
    const subScores = {
      paymentTimeliness: data.paymentTimeliness,
      financialHealth: data.financialHealth,
      operationalStability: data.operationalStability
    };
    
    createVendor(
      {
        vendor: { company_name, code },
        subScores
      },
      {
        onSuccess: (data) => {
          navigate(`/vendors/${data.id}`);
        }
      }
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add New Healthcare Supplier</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Supplier Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                {...register('company_name', { required: 'Company name is required' })}
              />
              {errors.company_name && (
                <p className="text-sm text-red-500">{errors.company_name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Supplier Code</Label>
              <Input
                id="code"
                {...register('code', { required: 'Supplier code is required' })}
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="paymentTimeliness">Payment Timeliness</Label>
                <span>{paymentTimeliness}/100</span>
              </div>
              <Slider
                id="paymentTimeliness"
                min={0}
                max={100}
                step={1}
                defaultValue={[75]}
                onValueChange={(value) => setValue('paymentTimeliness', value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Percentage of invoices paid on time by this supplier.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="financialHealth">Financial Health</Label>
                <span>{financialHealth}/100</span>
              </div>
              <Slider
                id="financialHealth"
                min={0}
                max={100}
                step={1}
                defaultValue={[75]}
                onValueChange={(value) => setValue('financialHealth', value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Ratio of current assets to liabilities and other financial indicators.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="operationalStability">Operational Stability</Label>
                <span>{operationalStability}/100</span>
              </div>
              <Slider
                id="operationalStability"
                min={0}
                max={100}
                step={1}
                defaultValue={[75]}
                onValueChange={(value) => setValue('operationalStability', value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Uptime, incident counts, compliance metrics and other operational indicators.
              </p>
            </div>
            
            <div className="rounded-lg bg-muted p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Calculated Local Score</h3>
                <p className="text-sm text-muted-foreground">
                  Based on weighted average of sub-scores
                </p>
              </div>
              <div className="text-2xl font-bold">{localScore}</div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate('/vendors')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Supplier'}
          </Button>
        </div>
      </form>
    </div>
  );
}
