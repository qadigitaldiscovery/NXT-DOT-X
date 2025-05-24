
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { getAvailablePages, PageInfo } from '@/utils/pageDiscovery';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PageTreeNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  component?: React.ComponentType;
  children?: PageTreeNode[];
}

export const PageTreeSidebar: React.FC = () => {
  const [pageTree, setPageTree] = useState<PageTreeNode[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [draggedPage, setDraggedPage] = useState<PageInfo | null>(null);

  useEffect(() => {
    const pages = getAvailablePages();
    const tree = buildPageTree(pages);
    setPageTree(tree);
  }, []);

  const buildPageTree = (pages: PageInfo[]): PageTreeNode[] => {
    const tree: PageTreeNode[] = [];
    const folderMap = new Map<string, PageTreeNode>();

    // Group pages by their path segments
    pages.forEach(page => {
      const pathParts = page.path.split('/').filter(Boolean);
      let currentPath = '';
      let currentLevel = tree;

      pathParts.forEach((part, index) => {
        currentPath += `/${part}`;
        
        if (index === pathParts.length - 1) {
          // This is the final page file
          currentLevel.push({
            name: page.name,
            path: page.path,
            type: 'file',
            component: page.component
          });
        } else {
          // This is a folder
          let folder = folderMap.get(currentPath);
          if (!folder) {
            folder = {
              name: part,
              path: currentPath,
              type: 'folder',
              children: []
            };
            folderMap.set(currentPath, folder);
            currentLevel.push(folder);
          }
          currentLevel = folder.children!;
        }
      });
    });

    return tree;
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleDragStart = (e: React.DragEvent, page: PageInfo) => {
    setDraggedPage(page);
    
    // Set both text and JSON data for compatibility
    e.dataTransfer.setData('text/plain', page.name);
    e.dataTransfer.setData('application/json', JSON.stringify(page));
  };

  const handleDragEnd = () => {
    setDraggedPage(null);
  };

  const renderTreeNode = (node: PageTreeNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.path);
    const paddingLeft = level * 16;

    if (node.type === 'folder') {
      return (
        <div key={node.path}>
          <Button
            variant="ghost"
            className="w-full justify-start h-8 px-2 hover:bg-gray-100"
            style={{ paddingLeft: paddingLeft + 8 }}
            onClick={() => toggleFolder(node.path)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            <Folder className="h-4 w-4 mr-2" />
            <span className="text-sm">{node.name}</span>
          </Button>
          {isExpanded && node.children && (
            <div>
              {node.children.map(child => renderTreeNode(child, level + 1))}
            </div>
          )}
        </div>
      );
    } else {
      const pageInfo: PageInfo = {
        name: node.name,
        path: node.path,
        component: node.component!
      };

      return (
        <div
          key={node.path}
          draggable
          onDragStart={(e) => handleDragStart(e, pageInfo)}
          onDragEnd={handleDragEnd}
          className="cursor-move"
        >
          <Button
            variant="ghost"
            className="w-full justify-start h-8 px-2 hover:bg-blue-50 hover:text-blue-700"
            style={{ paddingLeft: paddingLeft + 8 }}
          >
            <File className="h-4 w-4 mr-2" />
            <span className="text-sm truncate">{node.name}</span>
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">Page Navigator</h2>
        <p className="text-sm text-gray-500 mt-1">Drag pages to widget containers</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {pageTree.map(node => renderTreeNode(node))}
        </div>
      </ScrollArea>

      {draggedPage && (
        <div className="p-3 bg-blue-50 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            Dragging: <strong>{draggedPage.name}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
