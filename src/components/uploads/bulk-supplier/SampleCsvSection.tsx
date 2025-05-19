
import { Button } from "@/components/ui/button";
import { Copy, Info } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_CSV = `name,code,contact_name,email,phone,website,payment_terms,status
Acme Supplies,ACM001,John Doe,john@acme.com,555-123-4567,https://acme.com,Net 30,active
Global Parts,GLB002,Jane Smith,jane@globalparts.com,555-987-6543,https://globalparts.com,Net 45,active
Mega Industries,MEG003,Bob Johnson,bob@megaind.com,555-555-5555,https://megaind.com,Net 60,active`;

export function SampleCsvSection() {
  const handleCopySample = () => {
    navigator.clipboard.writeText(SAMPLE_CSV);
    toast.success("Sample CSV copied to clipboard");
  };

  return (
    <div className="bg-muted p-4 rounded-lg space-y-2">
      <div className="flex items-start gap-2">
        <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <h3 className="font-medium">CSV Format</h3>
          <p className="text-sm text-muted-foreground">
            Your CSV file should include these columns (only name and code are required):
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">name</span> (required)
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">code</span> (required)
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">contact_name</span>
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">email</span>
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">phone</span>
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">website</span>
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">payment_terms</span>
        </div>
        <div className="bg-background p-2 rounded border">
          <span className="font-semibold">status</span> (active/inactive)
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full" onClick={handleCopySample}>
        <Copy className="h-4 w-4 mr-2" />
        Copy Sample CSV
      </Button>
    </div>
  );
}
