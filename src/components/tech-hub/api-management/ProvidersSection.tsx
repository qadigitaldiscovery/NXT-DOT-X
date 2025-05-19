
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import OpenAIKeyForm from './openai/OpenAIKeyForm';
import RequestyKeyForm from './requesty/RequestyKeyForm';
import { OpenAIChatTester } from './openai/OpenAIChatTester';
import RequestyChatTester from './requesty/RequestyChatTester';

export default function ProvidersSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Providers Configuration</CardTitle>
          <CardDescription>Configure your API providers for use across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              API keys are stored securely in encrypted storage. You can update or remove keys at any time.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="openai" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
              <TabsTrigger value="openai">OpenAI</TabsTrigger>
              <TabsTrigger value="requesty">Requesty</TabsTrigger>
            </TabsList>
            <TabsContent value="openai" className="space-y-6">
              <OpenAIKeyForm />
              <OpenAIChatTester />
            </TabsContent>
            <TabsContent value="requesty" className="space-y-6">
              <RequestyKeyForm />
              <RequestyChatTester />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
