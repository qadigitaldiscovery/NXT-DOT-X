
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModules } from "@/context/ModulesContext";

export default function DotX() {
  const navigate = useNavigate();
  const { hasAccess } = useModules();

  const handleNavigateToDotX = () => {
    navigate('/dot-x');
  };

  const handleNavigateToDotX2 = () => {
    navigate('/dot-x/dot-x-2');
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-indigo-500" />
          <span>DOT-X</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500">
          Advanced command center with AI agents and neural shield protection.
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Mission control</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">AI commandos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Neural shield</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-sm">DOT-X-2 (New)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleNavigateToDotX} 
          className="w-full"
          disabled={!hasAccess('dot-x')}
        >
          Open DOT-X
        </Button>
        <Button 
          onClick={handleNavigateToDotX2} 
          variant="outline"
          className="w-full border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
          disabled={!hasAccess('dot-x', 'dot-x-2')}
        >
          Open DOT-X-2
        </Button>
      </CardFooter>
    </Card>
  );
}
