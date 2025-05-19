import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Loading Data</CardTitle>
        <CardDescription>Please wait while we fetch the information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">Fetching database records...</p>
        </div>
      </CardContent>
    </Card>
  );
}
