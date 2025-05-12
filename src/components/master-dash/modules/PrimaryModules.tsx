
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataManagement from "./DataManagement";
import LoyaltyProgram from "./LoyaltyProgram";
import TradingSystem from "./TradingSystem";
import SocialMediaMarketing from "./SocialMediaMarketing";
import TechHub from "./TechHub";
import DotX from "./DotX";
import BrandMarketing from "./BrandMarketing";

export default function PrimaryModules() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  const modulesByCategory = {
    all: [<DataManagement key="data" />, <LoyaltyProgram key="loyalty" />, <TradingSystem key="trading" />, <SocialMediaMarketing key="social" />, <TechHub key="tech" />, <DotX key="dotx" />, <BrandMarketing key="brand" />],
    data: [<DataManagement key="data" />],
    marketing: [<LoyaltyProgram key="loyalty" />, <SocialMediaMarketing key="social" />, <BrandMarketing key="brand" />],
    tech: [<TechHub key="tech" />, <DotX key="dotx" />],
    operations: [<TradingSystem key="trading" />]
  };
  
  // Use the activeTab from the parent component
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modulesByCategory[activeTab as keyof typeof modulesByCategory]}
    </div>
  );
}
