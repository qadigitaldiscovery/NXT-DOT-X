// zipService.ts
import { supabase } from '@/integrations/supabase/client';

export async function uploadZipToStorage(file: File) {
  const { data, error } = await supabase.storage.from('documents').upload(`zips/${file.name}`, file);
  if (error) {
    console.error(error);
    return false;
  }
  await fetch('/functions/v1/extract-zip', {
    method: 'POST',
    body: JSON.stringify({ filePath: `zips/${file.name}` }),
  });
  return true;
}

export async function registerExtractedFiles(zipName: string, userId: string) {
  const { data } = await supabase.storage.from('documents').list(`unzipped/${zipName}`);
  for (const file of data || []) {
    await supabase.from('documents').insert({
      title: file.name,
      file_path: `unzipped/${zipName}/${file.name}`,
      file_size: file.metadata?.size,
      type: file.metadata?.mimetype,
      user_id: userId,
    });
  }
}
