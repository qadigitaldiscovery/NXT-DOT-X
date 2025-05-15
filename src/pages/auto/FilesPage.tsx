
import React from 'react';
import MissingPageTemplate from './MissingPageTemplate';
import { Files, Upload, Search, History, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const FilesPage: React.FC = () => {
  const filesNavCategories: NavCategory[] = [
    {
      name: "Files",
      label: "Files",
      items: [
        { label: "Dashboard", path: "/files", icon: Files },
        { label: "Upload", path: "/files/upload", icon: Upload },
        { label: "Search", path: "/files/search", icon: Search },
        { label: "History", path: "/files/history", icon: History },
        { label: "Settings", path: "/files/settings", icon: Settings }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Files"
      moduleDescription="Manage file storage, uploads, downloads, and permissions across the platform."
      navCategories={filesNavCategories}
      docsLink="/admin/documentation?section=files"
    />
  );
};

export default FilesPage;
