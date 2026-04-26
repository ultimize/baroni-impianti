-- Seed base certifications
-- Schema: (title, description, issuer, order_index, is_published). No category column — info embedded in description.
-- TODO: caricare immagini/scansioni attestati (image_url) quando Luca le mandera'.
-- Idempotent via ON CONFLICT (title) — enforced by a unique index created here.

CREATE UNIQUE INDEX IF NOT EXISTS certifications_title_key ON certifications (title);

INSERT INTO certifications (title, description, issuer, order_index, is_published, is_featured)
VALUES
  ('Zucchetti', 'Installatore Certificato ZCS AZZURRO 22-23', 'Zucchetti Centro Sistemi', 1, true, true),
  ('Metodo Reti IP - Elettrosistemista', 'Certificazione Corso di Elettrosistemista 2023', 'Metodo Reti IP', 2, true, true),
  ('Metodo Reti IP - Altatensione', 'Certificazione Corso Altatensione 2023', 'Metodo Reti IP', 3, true, true),
  ('Il Professionista Elettrico', 'Corso su Autorimesse, box e ricarica veicoli', 'Il Professionista Elettrico', 4, true, false),
  ('OHMEGA Progettazioni', 'Corso sul System Integrator 2022', 'OHMEGA Progettazioni', 5, true, false),
  ('NETIFY ACADEMY', 'Corso sul Networking Base 2018', 'NETIFY ACADEMY', 6, true, false),
  ('KNX Partner', 'Partner n.105462 (12/04/2022) per la progettazione e installazione di sistemi domotici', 'KNX Association International', 7, true, true),
  ('Corso di Aggiornamento', 'Installatore e Manutentore Straordinario di Impianti Energetici alimentati da fonti rinnovabili (D.Lgs. 28/2011 art. 15)', 'Ministero', 8, true, false)
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  issuer = EXCLUDED.issuer,
  order_index = EXCLUDED.order_index,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  updated_at = now();
