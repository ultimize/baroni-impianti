-- Seed real services (Zero Pensieri + 4 categorie)
-- Schema: (slug, title, short_description, icon, order_index, is_published, is_featured)
-- Idempotent via ON CONFLICT (slug). Slug has UNIQUE constraint per existing schema.

INSERT INTO services (slug, title, short_description, icon, order_index, is_published, is_featured)
VALUES
  ('zero-pensieri', 'Zero Pensieri',
   'Contratto di manutenzione programmata con assistenza 7/7, garanzia a vita sui dispositivi e interventi urgenti illimitati.',
   'Shield', 1, true, true),
  ('progettazione-impianti-rete-cablata-a-sestri-levante', 'Impianti di Rete Cablata',
   'Provvediamo alla progettazione e realizzazione di reti cablate certificate su rame, fibra ottica e Wireless.',
   'Network', 2, true, false),
  ('diffusione-sonora', 'Impianti Diffusione Sonora',
   'Progettazione dell''impianto in base alla situazione ambientale del sito.',
   'Speaker', 3, true, false),
  ('protezione-dalle-scariche-atmosferiche-installazione-spd', 'Impianti Protezione Sovratensioni',
   'Abbiamo protetto centinaia di dispositivi che altrimenti sarebbero stati danneggiati dalle sovratensioni.',
   'Zap', 4, true, false),
  ('progettazione-e-realizzazione-impianti-di-sicurezza-sestri-levante', 'Impianti di Sicurezza',
   'Impianti di allarme intrusione, impianti di videosorveglianza non hanno segreti per noi.',
   'ShieldCheck', 5, true, false),
  ('impianti-fotovoltaici', 'Impianti Fotovoltaici',
   'Progettiamo e realizziamo impianti fotovoltaici su tetti e su strutture di sostegno a terra o a parete.',
   'Sun', 6, true, false)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  icon = EXCLUDED.icon,
  order_index = EXCLUDED.order_index,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  updated_at = now();
