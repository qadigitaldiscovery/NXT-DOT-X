import React from 'react';
import { NavItem } from './types';

export const SidebarNavList = ({ items }: { items?: NavItem[] }) => {
  const safeItems = items ?? [];
  return (
    <ul className="space-y-2">
      {safeItems.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="block text-gray-700 dark:text-gray-200 hover:underline">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
