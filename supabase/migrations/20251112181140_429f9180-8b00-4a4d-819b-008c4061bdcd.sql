-- Create enum for two participants
CREATE TYPE participant_handle AS ENUM ('zainab', 'rayyan');

-- Create notes table
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender participant_handle NOT NULL,
  message TEXT NOT NULL CHECK (length(message) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON public.notes(created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notes;

-- Disable RLS for public access (no auth required)
ALTER TABLE public.notes DISABLE ROW LEVEL SECURITY;

-- Seed with example note
INSERT INTO public.notes (sender, message)
VALUES ('zainab', 'I''m really sorry and I love you ♡')
ON CONFLICT DO NOTHING;