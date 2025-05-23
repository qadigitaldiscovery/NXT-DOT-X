
export interface TabItem {
  id: string;
  label: string;
  path: string;
}

export const vendorTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/vendor-overview'
  },
  {
    id: 'performance',
    label: 'Performance',
    path: '/vendor-performance'
  },
  {
    id: 'credit',
    label: 'Credit',
    path: '/vendor-credit'
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/vendor-reports'
  }
];
