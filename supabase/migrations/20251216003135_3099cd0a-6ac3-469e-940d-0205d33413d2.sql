-- Add missing columns to suppliers table
ALTER TABLE public.suppliers 
ADD COLUMN IF NOT EXISTS code text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS contact_name text,
ADD COLUMN IF NOT EXISTS payment_terms text,
ADD COLUMN IF NOT EXISTS discount_structure text;

-- Create supplier_cost_uploads table
CREATE TABLE IF NOT EXISTS public.supplier_cost_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT,
    file_size BIGINT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    processed_rows INTEGER DEFAULT 0,
    error_message TEXT,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.supplier_cost_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own uploads" ON public.supplier_cost_uploads
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own uploads" ON public.supplier_cost_uploads
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own uploads" ON public.supplier_cost_uploads
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploads" ON public.supplier_cost_uploads
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_supplier_cost_uploads_user_id ON public.supplier_cost_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_supplier_cost_uploads_supplier_id ON public.supplier_cost_uploads(supplier_id);

CREATE TRIGGER update_supplier_cost_uploads_updated_at
    BEFORE UPDATE ON public.supplier_cost_uploads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on-hold', 'cancelled', 'planned')),
    start_date DATE,
    end_date DATE,
    owner_id UUID NOT NULL,
    rag_status TEXT CHECK (rag_status IN ('green', 'amber', 'red')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects" ON public.projects
    FOR SELECT TO authenticated USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own projects" ON public.projects
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own projects" ON public.projects
    FOR UPDATE TO authenticated USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own projects" ON public.projects
    FOR DELETE TO authenticated USING (auth.uid() = owner_id);

CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON public.projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();