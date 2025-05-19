import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

export function EmptyState() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>No Data Available</CardTitle>
        <CardDescription>There are no records to display at the moment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <Database className="h-12 w-12 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">The database is empty</p>
        </div>
      </CardContent>
    </Card>
  );
}
