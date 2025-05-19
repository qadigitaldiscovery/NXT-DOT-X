
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Database, Server, Cloud, Shield } from "lucide-react";

const SystemTechnicalConfig = () => {
  return (
    <Card className="bg-gradient-to-br from-redmetal-600 to-black border-blue-800/40 backdrop-blur-sm relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/f591cd6e-de49-44cf-bfb9-207fcd31b3ce.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Neon blue splash */}
      <div 
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl"
        style={{
          background: "radial-gradient(circle at center, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)",
          zIndex: 0
        }}
      />
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-400" />
          System Technical Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-md">
              <Database className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <div className="text-sm text-white font-medium">Database</div>
              <div className="text-xs text-blue-200">Connected</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-md">
              <Server className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <div className="text-sm text-white font-medium">API Servers</div>
              <div className="text-xs text-blue-200">4 Active</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-md">
              <Cloud className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <div className="text-sm text-white font-medium">Cloud Storage</div>
              <div className="text-xs text-blue-200">14.2GB Used</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-md">
              <Shield className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <div className="text-sm text-white font-medium">Security</div>
              <div className="text-xs text-blue-200">Enhanced</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemTechnicalConfig;
