-- 1) Add updated_at column (nullable) with default for INSERT
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 2) Create/replace trigger function to keep updated_at fresh
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3) Drop trigger if it exists (makes migration re-runnable)
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;

-- 4) Fire trigger on both INSERT and UPDATE
CREATE TRIGGER set_profiles_updated_at
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
