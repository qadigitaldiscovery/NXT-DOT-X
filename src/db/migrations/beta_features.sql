-- Create beta_features table
CREATE TABLE IF NOT EXISTS beta_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    enabled BOOLEAN DEFAULT false,
    requires_approval BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_beta_access table
CREATE TABLE IF NOT EXISTS user_beta_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    feature_id UUID NOT NULL REFERENCES beta_features(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'granted', 'denied', 'expired')),
    granted_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, feature_id)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_beta_features_updated_at
    BEFORE UPDATE ON beta_features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_beta_access_updated_at
    BEFORE UPDATE ON user_beta_access
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_beta_access_user_id ON user_beta_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_beta_access_feature_id ON user_beta_access(feature_id);
CREATE INDEX IF NOT EXISTS idx_user_beta_access_status ON user_beta_access(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE beta_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_beta_access ENABLE ROW LEVEL SECURITY;

-- Beta features can be read by any authenticated user
CREATE POLICY "Beta features are viewable by authenticated users"
    ON beta_features FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can modify beta features
CREATE POLICY "Beta features are modifiable by admins only"
    ON beta_features FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Users can view their own beta access
CREATE POLICY "Users can view their own beta access"
    ON user_beta_access FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Only admins can modify beta access
CREATE POLICY "Only admins can modify beta access"
    ON user_beta_access FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );
