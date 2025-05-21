
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface AdvancedConfigSectionProps {
  config: Record<string, any>;
  onUpdateConfig: (key: string, value: any) => void;
  showAdvancedOptions?: boolean;
}

const AdvancedConfigSection = ({ 
  config, 
  onUpdateConfig, 
  showAdvancedOptions = true 
}: AdvancedConfigSectionProps) => {
  if (!showAdvancedOptions) return null;
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Advanced Configuration</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="top_p">Top P</Label>
            <span className="text-sm text-muted-foreground">{config.top_p || 1}</span>
          </div>
          <Slider 
            id="top_p"
            defaultValue={[config.top_p || 1]} 
            min={0} 
            max={1} 
            step={0.01}
            onValueChange={(values) => onUpdateConfig('top_p', values[0])}
          />
          <p className="text-xs text-muted-foreground">
            Controls diversity via nucleus sampling, setting a probability threshold for token selection.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="frequency_penalty">Frequency Penalty</Label>
            <span className="text-sm text-muted-foreground">{config.frequency_penalty || 0}</span>
          </div>
          <Slider 
            id="frequency_penalty"
            defaultValue={[config.frequency_penalty || 0]} 
            min={-2} 
            max={2} 
            step={0.1}
            onValueChange={(values) => onUpdateConfig('frequency_penalty', values[0])}
          />
          <p className="text-xs text-muted-foreground">
            Reduces repetition by penalizing tokens that have already appeared in the text.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="presence_penalty">Presence Penalty</Label>
            <span className="text-sm text-muted-foreground">{config.presence_penalty || 0}</span>
          </div>
          <Slider 
            id="presence_penalty"
            defaultValue={[config.presence_penalty || 0]} 
            min={-2} 
            max={2} 
            step={0.1}
            onValueChange={(values) => onUpdateConfig('presence_penalty', values[0])}
          />
          <p className="text-xs text-muted-foreground">
            Encourages discussion of new topics by penalizing tokens that have appeared in the text.
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="streaming">Streaming</Label>
            <p className="text-xs text-muted-foreground">Enable streaming responses</p>
          </div>
          <Switch 
            id="streaming"
            checked={config.streaming !== false} 
            onCheckedChange={(checked) => onUpdateConfig('streaming', checked)}
          />
        </div>
        
        {config.organization_id !== undefined && (
          <div className="space-y-2">
            <Label htmlFor="organization_id">Organization ID (Optional)</Label>
            <Input
              id="organization_id"
              type="text"
              value={config.organization_id || ''}
              onChange={(e) => onUpdateConfig('organization_id', e.target.value)}
              placeholder="org-..."
            />
            <p className="text-xs text-muted-foreground">
              For users who belong to multiple organizations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedConfigSection;
