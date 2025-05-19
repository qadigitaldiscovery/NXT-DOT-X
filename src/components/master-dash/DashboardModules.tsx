import { useNavigate } from 'react-router-dom';
import Administration from './modules/Administration';
import AiArmy from './modules/AiArmy';
import DataManagement from './modules/DataManagement';
import LoyaltyProgram from './modules/LoyaltyProgram';
import ProjectManagement from './modules/ProjectManagement';
import SupplierManagement from './modules/SupplierManagement';

const DashboardModules = () => {
  // Keep navigate for potential future use
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Administration />
      <AiArmy />
      <DataManagement />
      <LoyaltyProgram />
      <ProjectManagement />
      <SupplierManagement />
    </div>
  );
};

export default DashboardModules;
