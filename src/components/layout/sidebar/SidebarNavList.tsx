import React from 'react';
import { NavItem } from './types';

export const SidebarNavList = ({ items = [] }: { items?: NavItem[] }) => (
  <ul className="space-y-2">
    {items.map((item) => {
      const url = item.href ?? item.path ?? "#";
      return (
        <li key={url}>
          <a href={url} className="block text-gray-700 dark:text-gray-200 hover:underline">
            {item.label}
          </a>
        </li>
      );
    })}
  </ul>
);
