
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type ThresholdRule } from '@/hooks/useThresholdRules';
import { Trash2 } from 'lucide-react';
import StatusGauge from './StatusGauge';

type ThresholdRulesListProps = {
  rules: ThresholdRule[];
  onDeleteRule: (id: string) => void;
  loading?: boolean;
}

export default function ThresholdRulesList({ rules, onDeleteRule, loading = false }: ThresholdRulesListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Threshold Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading threshold rules...</p>
        </CardContent>
      </Card>
    );
  }

  if (rules.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Threshold Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No threshold rules defined.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Threshold Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {rules.map((rule) => (
            <li key={rule.id} className="flex items-center justify-between gap-2 border-b pb-3 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{rule.metric}</span>
                  <StatusGauge status={rule.resulting_status} size="sm" animate={false} />
                </div>
                <p className="text-sm">
                  {rule.condition} {rule.threshold}
                  {rule.duration_seconds && (
                    <span className="text-muted-foreground"> for {rule.duration_seconds}s</span>
                  )}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDeleteRule(rule.id)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
