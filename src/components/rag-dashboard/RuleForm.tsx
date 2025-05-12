
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Module } from '@/hooks/useModules';
import { type ThresholdRule } from '@/hooks/useThresholdRules';

type RuleFormProps = {
  module: Module;
  onAddRule: (rule: Omit<ThresholdRule, 'id' | 'created_at' | 'condition' | 'operator'> & { condition: string }) => Promise<any>;
}

export default function RuleForm({ module, onAddRule }: RuleFormProps) {
  const [metric, setMetric] = useState('');
  const [condition, setCondition] = useState('>');
  const [threshold, setThreshold] = useState('');
  const [durationSeconds, setDurationSeconds] = useState('');
  const [resultingStatus, setResultingStatus] = useState<'green' | 'orange' | 'red'>('orange');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!metric || !threshold) return;
    
    setIsSubmitting(true);
    
    await onAddRule({
      module_id: module.id,
      metric,
      condition,
      threshold: parseFloat(threshold),
      duration_seconds: durationSeconds ? parseInt(durationSeconds) : null,
      resulting_status: resultingStatus
    });
    
    // Reset form
    setMetric('');
    setCondition('>');
    setThreshold('');
    setDurationSeconds('');
    setResultingStatus('orange');
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Create Threshold Rule</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metric">Metric Name</Label>
            <Input
              id="metric"
              placeholder="e.g. CPU Usage, Response Time"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=">">Greater than (&gt;)</SelectItem>
                  <SelectItem value=">=">Greater than or equal (&gt;=)</SelectItem>
                  <SelectItem value="<">Less than (&lt;)</SelectItem>
                  <SelectItem value="<=">Less than or equal (&lt;=)</SelectItem>
                  <SelectItem value="=">Equal to (=)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold</Label>
              <Input
                id="threshold"
                type="number"
                placeholder="Threshold value"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds, optional)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="e.g. 300 for 5 minutes"
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Resulting Status</Label>
            <Select value={resultingStatus} onValueChange={(value) => setResultingStatus(value as 'green' | 'orange' | 'red')}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="green">Green (Operational)</SelectItem>
                <SelectItem value="orange">Orange (Degraded)</SelectItem>
                <SelectItem value="red">Red (Outage)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Rule'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
