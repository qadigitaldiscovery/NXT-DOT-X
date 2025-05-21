
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Clock, PlayCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ScheduledTaskCardProps {
  title: string;
  description: string;
  taskName: string;
  lastRun?: string;
}

const ScheduledTaskCard: React.FC<ScheduledTaskCardProps> = ({
  title,
  description,
  taskName,
  lastRun
}) => {
  const [running, setRunning] = useState(false);

  const handleRunNow = async () => {
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke(taskName, {
        method: 'POST',
        body: { manual: true, timestamp: new Date().toISOString() }
      });

      if (error) {
        throw new Error(error.message);
      }
      
      toast.success('Task executed successfully');
      console.log('Task response:', data);
    } catch (err) {
      console.error('Error running task:', err);
      toast.error('Failed to execute task');
    } finally {
      setRunning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              {lastRun ? (
                <span>Last run: {lastRun}</span>
              ) : (
                <span className="flex items-center text-amber-600">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  Never run
                </span>
              )}
            </div>
            <Button 
              size="sm"
              onClick={handleRunNow}
              disabled={running}
              className="flex items-center gap-1"
            >
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle className="h-4 w-4" />
              )}
              {running ? 'Running...' : 'Run Now'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledTaskCard;
