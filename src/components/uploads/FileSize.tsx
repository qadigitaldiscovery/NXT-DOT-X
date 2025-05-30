
import React from 'react';

interface FileSizeProps {
  bytes: number | null;
}

export function FileSize({ bytes }: FileSizeProps) {
  if (!bytes) return <>—</>;
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return <>{size.toFixed(1)} {units[unitIndex]}</>;
}
