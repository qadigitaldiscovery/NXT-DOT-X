
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabsMenu, { TabItem } from '@/components/ui/tabs-menu';
import { Terminal, MessageSquare } from 'lucide-react';
import OpenAIKeyForm from "./OpenAIKeyForm";
import AIChatTester from "./AIChatTester";
import RequestyKeyForm from "./RequestyKeyForm";
import RequestyChatTester from "./RequestyChatTester";

const ProvidersSection: React.FC = () => {
  const [activeProvider, setActiveProvider] = useState("openai");
  const [activeTab, setActiveTab] = useState("config");

  const providerItems: TabItem[] = [
    { value: "openai", label: "OpenAI", icon: Terminal },
    { value: "requesty", label: "Requesty", icon: MessageSquare },
  ];

  const tabItems: TabItem[] = [
    { value: "config", label: "Configuration" },
    { value: "test", label: "Test" },
  ];

  return (
    <div className="space-y-6">
      <TabsMenu 
        items={providerItems} 
        value={activeProvider} 
        onChange={setActiveProvider} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {activeProvider === "openai" && (
          <>
            <TabsContent value="config">
              <OpenAIKeyForm />
            </TabsContent>
            <TabsContent value="test">
              <AIChatTester />
            </TabsContent>
          </>
        )}

        {activeProvider === "requesty" && (
          <>
            <TabsContent value="config">
              <RequestyKeyForm />
            </TabsContent>
            <TabsContent value="test">
              <RequestyChatTester />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ProvidersSection;
