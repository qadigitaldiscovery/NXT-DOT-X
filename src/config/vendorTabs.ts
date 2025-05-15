
import { 
  Database, 
  LineChart, 
  FileText, 
  CalendarClock,
  MessageSquare, 
  Files, 
  ClipboardList, 
  Users2,
  Route, 
  AlertCircle, 
  DollarSign, 
  MoreHorizontal,
  PlusCircle 
} from 'lucide-react';
import { TabItem } from '@/types/vendor';

export const vendorDetailTabs: TabItem[] = [
  { key: 'data', label: 'Data', icon: Database },
  { key: 'market-iq', label: 'Market IQ', icon: LineChart },
  { key: 'contracts', label: 'Contracts', icon: FileText },
  { key: 'events', label: 'Events', icon: CalendarClock },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
  { key: 'files', label: 'Files', icon: Files },
  { key: 'forms', label: 'Forms', icon: ClipboardList },
  { key: 'users', label: 'Vendor Users', icon: Users2 },
  { key: 'track', label: 'Track', icon: Route },
  { key: 'risk', label: 'Risk', icon: AlertCircle },
  { key: 'spend', label: 'Spend', icon: DollarSign },
  { key: 'more', label: 'More...', icon: MoreHorizontal },
  { key: 'add', label: 'ADD', icon: PlusCircle },
];
