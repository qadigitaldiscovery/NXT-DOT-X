// useZipProcessor.ts
import { useEffect } from 'react';
import { registerExtractedFiles } from '@/services/zipService';

export const useZipProcessor = (zipName: string) => {
  useEffect(() => {
    registerExtractedFiles(zipName);
  }, [zipName]);
};
