-- Loyalty Tables

-- Create loyalty_tiers table
CREATE TABLE public.loyalty_tiers (
  tier_id SERIAL PRIMARY KEY,
  tier_name TEXT NOT NULL,
  min_points_required INTEGER NOT NULL DEFAULT 0,
  description_v1 TEXT,
  benefits_summary_v1 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create loyalty_accounts table
CREATE TABLE public.loyalty_accounts (
  loyalty_id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points_balance INTEGER NOT NULL DEFAULT 0,
  tier_level TEXT NOT NULL DEFAULT 'Bronze',
  join_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_activity_date TIMESTAMP WITH TIME ZONE,
  tier_assigned_date TIMESTAMP WITH TIME ZONE,
  next_tier_evaluation_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create loyalty_transactions table
CREATE TABLE public.loyalty_transactions (
  transaction_id SERIAL PRIMARY KEY,
  loyalty_id INTEGER NOT NULL REFERENCES public.loyalty_accounts(loyalty_id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  points_amount INTEGER NOT NULL,
  description TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reference_id TEXT,
  related_order_value NUMERIC,
  points_expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create loyalty_rewards_v1 table
CREATE TABLE public.loyalty_rewards_v1 (
  reward_id SERIAL PRIMARY KEY,
  reward_name TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  points_cost INTEGER NOT NULL,
  value_monetary NUMERIC,
  description_v1 TEXT,
  is_active BOOLEAN DEFAULT true,
  redemption_instructions_v1 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Vendor Tables

-- Create vendors table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  local_score NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active',
  contact_email TEXT,
  phone TEXT,
  address TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create credit_ratings table
CREATE TABLE public.credit_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  rating TEXT,
  score NUMERIC,
  report_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create vendor_reports table
CREATE TABLE public.vendor_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create vendor_performance table
CREATE TABLE public.vendor_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  score NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.loyalty_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_rewards_v1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_performance ENABLE ROW LEVEL SECURITY;

-- Loyalty Tiers: Public read, admin write
CREATE POLICY "Anyone can view loyalty tiers" ON public.loyalty_tiers FOR SELECT USING (true);

-- Loyalty Accounts: Users can manage their own
CREATE POLICY "Users can view their own loyalty account" ON public.loyalty_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own loyalty account" ON public.loyalty_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own loyalty account" ON public.loyalty_accounts FOR UPDATE USING (auth.uid() = user_id);

-- Loyalty Transactions: Users can view their own
CREATE POLICY "Users can view their own transactions" ON public.loyalty_transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.loyalty_accounts WHERE loyalty_id = loyalty_transactions.loyalty_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create transactions for their account" ON public.loyalty_transactions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.loyalty_accounts WHERE loyalty_id = loyalty_transactions.loyalty_id AND user_id = auth.uid())
);

-- Loyalty Rewards: Public read
CREATE POLICY "Anyone can view active rewards" ON public.loyalty_rewards_v1 FOR SELECT USING (true);

-- Vendors: Users can manage their own
CREATE POLICY "Users can view their own vendors" ON public.vendors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own vendors" ON public.vendors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own vendors" ON public.vendors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own vendors" ON public.vendors FOR DELETE USING (auth.uid() = user_id);

-- Credit Ratings: Through vendor ownership
CREATE POLICY "Users can view credit ratings for their vendors" ON public.credit_ratings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.vendors WHERE id = credit_ratings.vendor_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage credit ratings for their vendors" ON public.credit_ratings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.vendors WHERE id = credit_ratings.vendor_id AND user_id = auth.uid())
);

-- Vendor Reports: Through vendor ownership
CREATE POLICY "Users can view reports for their vendors" ON public.vendor_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.vendors WHERE id = vendor_reports.vendor_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage reports for their vendors" ON public.vendor_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM public.vendors WHERE id = vendor_reports.vendor_id AND user_id = auth.uid())
);

-- Vendor Performance: Through vendor ownership
CREATE POLICY "Users can view performance for their vendors" ON public.vendor_performance FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.vendors WHERE id = vendor_performance.vendor_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage performance for their vendors" ON public.vendor_performance FOR ALL USING (
  EXISTS (SELECT 1 FROM public.vendors WHERE id = vendor_performance.vendor_id AND user_id = auth.uid())
);

-- Add updated_at triggers
CREATE TRIGGER update_loyalty_tiers_updated_at BEFORE UPDATE ON public.loyalty_tiers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_loyalty_accounts_updated_at BEFORE UPDATE ON public.loyalty_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_loyalty_rewards_v1_updated_at BEFORE UPDATE ON public.loyalty_rewards_v1 FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_credit_ratings_updated_at BEFORE UPDATE ON public.credit_ratings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vendor_reports_updated_at BEFORE UPDATE ON public.vendor_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default loyalty tiers
INSERT INTO public.loyalty_tiers (tier_name, min_points_required, description_v1, benefits_summary_v1) VALUES
  ('Bronze', 0, 'Entry level membership', 'Basic rewards access'),
  ('Silver', 500, 'Silver tier membership', '10% bonus points on purchases'),
  ('Gold', 2000, 'Gold tier membership', '20% bonus points, exclusive offers'),
  ('Platinum', 5000, 'Platinum tier membership', '30% bonus points, VIP access, priority support');