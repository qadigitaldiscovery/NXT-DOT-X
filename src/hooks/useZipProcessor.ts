// useZipProcessor.ts
import { useEffect } from 'react';
import { registerExtractedFiles } from '@/services/zipService';
import { supabase } from '@/integrations/supabase/client';

export const useZipProcessor = (zipName: string) => {
  useEffect(() => {
    const processZip = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await registerExtractedFiles(zipName, user.id);
      }
    };
    processZip();
  }, [zipName]);
};
