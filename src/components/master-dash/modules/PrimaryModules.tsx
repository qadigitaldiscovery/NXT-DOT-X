import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import DataManagement from "./DataManagement";
import LoyaltyProgram from "./LoyaltyProgram";
import TradingSystem from "./TradingSystem";
import SocialMediaMarketing from "./SocialMediaMarketing";
import TechHub from "./TechHub";
import DotX from "./DotX";
import SupplierManagement from "./SupplierManagement";
import CustomerManagement from "./CustomerManagement";
import BrandMarketing from "./BrandMarketing";
export default function PrimaryModules() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const modulesByCategory = {
    all: [<DataManagement key="data" />, <LoyaltyProgram key="loyalty" />, <TradingSystem key="trading" />, <SocialMediaMarketing key="social" />, <TechHub key="tech" />, <DotX key="dotx" />, <SupplierManagement key="supplier" />, <CustomerManagement key="customer" />, <BrandMarketing key="brand" />],
    data: [<DataManagement key="data" />, <SupplierManagement key="supplier" />, <CustomerManagement key="customer" />],
    marketing: [<LoyaltyProgram key="loyalty" />, <SocialMediaMarketing key="social" />, <BrandMarketing key="brand" />],
    tech: [<TechHub key="tech" />, <DotX key="dotx" />],
    operations: [<TradingSystem key="trading" />]
  };
  return <div className="space-y-6">
      {/* Dashboard Header - removed border by adding border-0 class */}
      <Card className="border-0 shadow-none">
        <CardHeader className="bg-stone-950">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="mb-1">Modules</CardTitle>
              <CardDescription>Explore available system modules</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3 sm:mt-0">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
      </Card>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulesByCategory[activeTab as keyof typeof modulesByCategory]}
      </div>
    </div>;
}