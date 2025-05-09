
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  duration: string;
  user: string;
}

interface QueryHistoryListProps {
  queries: QueryHistoryItem[];
  onLoadQuery: (query: string) => void;
}

const QueryHistoryList: React.FC<QueryHistoryListProps> = ({ queries, onLoadQuery }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Queries</CardTitle>
        <CardDescription>
          View recently executed SQL queries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queries.map((query) => (
            <Card key={query.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{query.user}</Badge>
                    <div className="text-sm text-muted-foreground">
                      {query.timestamp} · {query.duration}
                    </div>
                  </div>
                  <div className="bg-muted p-2 rounded-md overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap">{query.query}</pre>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onLoadQuery(query.query)}
                    >
                      Load Query
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QueryHistoryList;
