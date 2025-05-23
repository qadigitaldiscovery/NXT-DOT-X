
import React from 'react';
import type { TabItem } from '@/types/vendor';

// Placeholder components for tab content
const DataTab: React.FC = () => <div>Vendor Data</div>;
const MarketIQTab: React.FC = () => <div>Market IQ</div>;
const ContractsTab: React.FC = () => <div>Contracts</div>;
const EventsTab: React.FC = () => <div>Events</div>;
const MessagesTab: React.FC = () => <div>Messages</div>;
const FilesTab: React.FC = () => <div>Files</div>;
const FormsTab: React.FC = () => <div>Forms</div>;
const UsersTab: React.FC = () => <div>Users</div>;
const TrackTab: React.FC = () => <div>Track</div>;
const RiskTab: React.FC = () => <div>Risk</div>;
const SpendTab: React.FC = () => <div>Spend</div>;
const ReportsTab: React.FC = () => <div>Reports</div>;
const SettingsTab: React.FC = () => <div>Settings</div>;

export const vendorTabs: TabItem[] = [
  {
    id: "data",
    label: "Data",
    content: <DataTab />
  },
  {
    id: "market-iq",
    label: "Market IQ",
    content: <MarketIQTab />
  },
  {
    id: "contracts",
    label: "Contracts",
    content: <ContractsTab />
  },
  {
    id: "events",
    label: "Events",
    content: <EventsTab />
  },
  {
    id: "messages",
    label: "Messages",
    content: <MessagesTab />
  },
  {
    id: "files",
    label: "Files",
    content: <FilesTab />
  },
  {
    id: "forms",
    label: "Forms",
    content: <FormsTab />
  },
  {
    id: "users",
    label: "Users",
    content: <UsersTab />
  },
  {
    id: "track",
    label: "Track",
    content: <TrackTab />
  },
  {
    id: "risk",
    label: "Risk",
    content: <RiskTab />
  },
  {
    id: "spend",
    label: "Spend",
    content: <SpendTab />
  },
  {
    id: "reports",
    label: "Reports",
    content: <ReportsTab />
  },
  {
    id: "settings",
    label: "Settings",
    content: <SettingsTab />
  }
];

export default vendorTabs;
