
-- Add config column to api_provider_settings if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='api_provider_settings' AND column_name='config'
  ) THEN
    ALTER TABLE api_provider_settings ADD COLUMN config JSONB;
  END IF;
END
$$;
