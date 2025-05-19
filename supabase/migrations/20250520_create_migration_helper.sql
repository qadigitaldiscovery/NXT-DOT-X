
-- Create a function that can run arbitrary SQL (for admins only)
CREATE OR REPLACE FUNCTION public.run_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow admins to run this function
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Permission denied: Only admins can run this function';
  END IF;

  EXECUTE sql;
END;
$$;

-- Add a function to apply all necessary migrations
CREATE OR REPLACE FUNCTION public.apply_migrations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Run the user profile trigger migration if it hasn't been applied yet
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    -- Create the handle_new_user function
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.profiles (id, name, role)
      VALUES (new.id, coalesce(new.raw_user_meta_data->>'name', new.email), 'user');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Create the trigger
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      
    -- Add existing users to profiles table
    INSERT INTO public.profiles (id, name, role)
    SELECT 
      id, 
      email as name,
      'user' as role
    FROM auth.users
    WHERE NOT EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.users.id
    );
  END IF;
END;
$$;
