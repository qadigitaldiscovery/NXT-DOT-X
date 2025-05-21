
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { type StatusLog } from '@/hooks/useStatusLogs';
import { format } from 'date-fns';
import StatusGauge from './StatusGauge';

type StatusTimelineProps = {
  logs: StatusLog[];
  loading?: boolean;
}

export default function StatusTimeline({ logs, loading = false }: StatusTimelineProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Status History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading status history...</p>
        </CardContent>
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Status History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No status changes recorded.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Status History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l-2 border-muted">
          {logs.map((log) => (
            <div key={log.id} className="mb-4 last:mb-0 relative">
              <div className="absolute -left-[21px] mt-1.5">
                <StatusGauge status={log.status} size="sm" animate={false} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(log.recorded_at), 'MMM d, yyyy h:mm a')}
                </p>
                <p className="font-medium mt-0.5">{log.note || `Status changed to ${log.status}`}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
