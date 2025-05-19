
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Database, Server, Cloud, Shield } from "lucide-react";

const SystemTechnicalConfig = () => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Technical Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md">
              <Database className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Database</div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md">
              <Server className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium">API Servers</div>
              <div className="text-xs text-gray-500">4 Active</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md">
              <Cloud className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Cloud Storage</div>
              <div className="text-xs text-gray-500">14.2GB Used</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md">
              <Shield className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Security</div>
              <div className="text-xs text-gray-500">Enhanced</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemTechnicalConfig;
