
import DataManagement from './DataManagement';
import SocialMediaMarketing from './SocialMediaMarketing';
import BrandMarketing from './BrandMarketing';
import TradingSystem from './TradingSystem';
import ProjectManagement from './ProjectManagement';
import DotX from './DotX';
import TechHub from './TechHub';
import Communications from './Communications';
import AutomationWorkflow from './AutomationWorkflow';
import Operations from './Operations';
import WebServices from './WebServices';
import WebDev from './WebDev';

export const PrimaryModules = () => {
  return (
    <>
      <DataManagement />
      <SocialMediaMarketing />
      <BrandMarketing />
      <TradingSystem />
      <ProjectManagement /> 
      <DotX />
      <TechHub />
      <Communications />
      <AutomationWorkflow />
      <Operations />
      <WebServices />
      <WebDev />
    </>
  );
};

export default PrimaryModules;
