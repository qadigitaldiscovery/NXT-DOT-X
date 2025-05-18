
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryData = {
  category: string;
  variance: number;
};

type CategoryVariationChartProps = {
  data: CategoryData[];
  title: string;
  description: string;
  className?: string;
};

export const CategoryVariationChart = ({ data, title, description, className }: CategoryVariationChartProps) => {
  return (
    <Card className={`backdrop-blur-md bg-white/30 border border-white/10 ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis label={{ value: 'Variance %', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Bar dataKey="variance" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.variance > 10 ? '#FF8042' : entry.variance > 5 ? '#FFBB28' : '#00C49F'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
