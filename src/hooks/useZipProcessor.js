// useZipProcessor.ts
import { useEffect } from 'react';
import { registerExtractedFiles } from '@/services/zipService';
export const useZipProcessor = (zipName) => {
    useEffect(() => {
        registerExtractedFiles(zipName);
    }, [zipName]);
};
