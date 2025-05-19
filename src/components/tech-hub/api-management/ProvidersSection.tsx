
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabsMenu, { TabItem } from '@/components/ui/tabs-menu';
import { Terminal, MessageSquare } from 'lucide-react';
import OpenAIKeyForm from "./openai/OpenAIKeyForm";
import OpenAIChatTester from "./openai/OpenAIChatTester";
import RequestyKeyForm from "./requesty/RequestyKeyForm";
import RequestyChatTester from "./requesty/RequestyChatTester";
import { Card } from '@/components/ui/card';

const ProvidersSection: React.FC = () => {
  const [activeProvider, setActiveProvider] = useState("openai");
  const [activeTab, setActiveTab] = useState("config");
  
  // Check if API keys are set
  const [openAIKeyExists, setOpenAIKeyExists] = useState(!!localStorage.getItem('openai_api_key'));
  const [requestyKeyExists, setRequestyKeyExists] = useState(!!localStorage.getItem('requesty_api_key'));
  
  React.useEffect(() => {
    // Listen for storage changes to update key status
    const handleStorageChange = () => {
      setOpenAIKeyExists(!!localStorage.getItem('openai_api_key'));
      setRequestyKeyExists(!!localStorage.getItem('requesty_api_key'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also check on mount
    handleStorageChange();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
              <Card className="p-6">
                <OpenAIKeyForm />
              </Card>
            </TabsContent>
            <TabsContent value="test">
              <Card className="p-6">
                {openAIKeyExists ? (
                  <OpenAIChatTester />
                ) : (
                  <div className="text-center p-4">
                    Please configure your OpenAI API key first
                  </div>
                )}
              </Card>
            </TabsContent>
          </>
        )}

        {activeProvider === "requesty" && (
          <>
            <TabsContent value="config">
              <Card className="p-6">
                <RequestyKeyForm />
              </Card>
            </TabsContent>
            <TabsContent value="test">
              <Card className="p-6">
                {requestyKeyExists ? (
                  <RequestyChatTester />
                ) : (
                  <div className="text-center p-4">
                    Please configure your Requesty API key first
                  </div>
                )}
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ProvidersSection;
