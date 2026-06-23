ALTER TABLE public.video_analysis
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'video',
  ADD COLUMN IF NOT EXISTS media_name text,
  ADD COLUMN IF NOT EXISTS metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS overall_score integer;

ALTER TABLE public.video_analysis
  ALTER COLUMN video_url DROP NOT NULL;

ALTER TABLE public.video_analysis
  ADD CONSTRAINT video_analysis_media_type_check
  CHECK (media_type IN ('video', 'image'));
