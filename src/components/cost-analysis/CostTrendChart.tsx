
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CostTrendChartProps {
  data: {
    date: string;
    cost: number;
    previousYearCost?: number;
  }[];
  title: string;
  description?: string;
}

export const CostTrendChart = ({ data, title, description }: CostTrendChartProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} name="Current Year" />
              {data.some(d => d.previousYearCost !== undefined) && (
                <Line type="monotone" dataKey="previousYearCost" stroke="#82ca9d" name="Previous Year" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostTrendChart;
