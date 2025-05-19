
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SupplierComparisonChartProps {
  data: {
    supplier: string;
    cost: number;
    marketAverage?: number;
  }[];
  title: string;
  description?: string;
}

export const SupplierComparisonChart = ({ data, title, description }: SupplierComparisonChartProps) => {
  // Format the data for display
  const chartData = data.map(item => ({
    supplier: item.supplier,
    'Supplier Cost': item.cost,
    'Market Average': item.marketAverage || 0,
  }));

  // Calculate chart dimensions based on data length
  const chartHeight = Math.max(300, data.length * 50);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="supplier" />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="Supplier Cost" fill="#8884d8" />
              <Bar dataKey="Market Average" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierComparisonChart;
