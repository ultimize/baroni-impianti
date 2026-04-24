-- Seed 5 YouTube video testimonials
-- Schema: (client_name, project_title, description, location, youtube_url, youtube_video_id, order_index, is_published)
-- TODO: aggiornare client_name e description dopo che Luca avra' confermato i nomi reali dei testimonial.
-- Idempotent via ON CONFLICT (youtube_video_id) — enforced by a partial unique index created here.

-- Full (non-partial) unique index is required so ON CONFLICT can target it.
CREATE UNIQUE INDEX IF NOT EXISTS testimonials_youtube_video_id_key
  ON testimonials (youtube_video_id);

INSERT INTO testimonials (client_name, project_title, description, location, youtube_url, youtube_video_id, order_index, is_published)
VALUES
  ('Cliente Baroni #1', 'Testimonianza video', 'Testimonianza video: condivide la sua esperienza con Baroni Impianti.',
   'Provincia di Genova', 'https://www.youtube.com/watch?v=pC5B1FC9hbg', 'pC5B1FC9hbg', 1, true),
  ('Cliente Baroni #2', 'Testimonianza video', 'Testimonianza video: parla del servizio ricevuto.',
   'Tigullio', 'https://www.youtube.com/watch?v=HAwLF_hkTa8', 'HAwLF_hkTa8', 2, true),
  ('Cliente Baroni #3', 'Testimonianza video', 'Testimonianza video di un cliente Baroni Impianti.',
   'Provincia di Genova', 'https://www.youtube.com/watch?v=xWEZvt8zlew', 'xWEZvt8zlew', 3, true),
  ('Cliente Baroni #4', 'Testimonianza video', 'Testimonianza video: esperienza con il team Baroni.',
   'Tigullio', 'https://www.youtube.com/watch?v=8Dy-CSZQD9Q', '8Dy-CSZQD9Q', 4, true),
  ('Cliente Baroni #5', 'Testimonianza video', 'Testimonianza video piu'' recente.',
   'Provincia di Genova', 'https://www.youtube.com/watch?v=OrUzdG82Hmc', 'OrUzdG82Hmc', 5, true)
ON CONFLICT (youtube_video_id) DO UPDATE SET
  client_name = EXCLUDED.client_name,
  project_title = EXCLUDED.project_title,
  description = EXCLUDED.description,
  location = EXCLUDED.location,
  youtube_url = EXCLUDED.youtube_url,
  order_index = EXCLUDED.order_index,
  is_published = EXCLUDED.is_published,
  updated_at = now();
