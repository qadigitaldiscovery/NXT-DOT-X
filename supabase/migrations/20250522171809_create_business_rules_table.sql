CREATE TABLE IF NOT EXISTS public.business_rules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    rule_definition JSONB NOT NULL,
    type TEXT NOT NULL,
    scope TEXT NOT NULL DEFAULT 'global',
    applicable_modules TEXT[] NOT NULL DEFAULT '{}',
    application_method TEXT NOT NULL,
    frequency TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_business_rules_updated_at
BEFORE UPDATE ON public.business_rules
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();