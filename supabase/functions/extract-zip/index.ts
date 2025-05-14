// extract-zip edge function
import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

serve(async (req) => {
  const { filePath } = await req.json();
  const res = await supabase.storage.from('documents').move(filePath, `unzipped/${filePath}`);
  return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
});
