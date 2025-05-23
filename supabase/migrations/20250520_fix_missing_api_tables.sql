
-- Create the missing api_provider_settings table needed for proper API integration
CREATE TABLE IF NOT EXISTS public.api_provider_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name TEXT NOT NULL,
  api_key TEXT,
  config JSONB DEFAULT '{}'::jsonb,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- Add Row Level Security to protect API keys
ALTER TABLE public.api_provider_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for api_provider_settings table
CREATE POLICY "Users can view their own API settings"
  ON public.api_provider_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own API settings"
  ON public.api_provider_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API settings"
  ON public.api_provider_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API settings"
  ON public.api_provider_settings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
