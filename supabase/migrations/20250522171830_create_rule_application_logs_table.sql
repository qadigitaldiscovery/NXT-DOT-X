CREATE TABLE IF NOT EXISTS public.rule_application_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id uuid REFERENCES public.business_rules(id) ON DELETE CASCADE NOT NULL,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    context_data JSONB,
    result JSONB,
    triggered_actions TEXT[],
    entity_id TEXT,
    user_id uuid,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);