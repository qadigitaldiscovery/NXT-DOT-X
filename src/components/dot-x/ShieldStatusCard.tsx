
import { Card } from "@/components/ui/card";

const ShieldStatusCard = () => {
  return (
    <Card className="border-red-200 bg-red-50/50 p-6">
      <h3 className="font-medium text-lg mb-2">Shield Status</h3>
      <p className="text-muted-foreground text-sm">Security and protection system monitoring</p>
    </Card>
  );
};

export default ShieldStatusCard;
