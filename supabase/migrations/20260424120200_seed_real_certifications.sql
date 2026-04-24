-- Seed base certifications
-- Schema: (title, description, issuer, order_index, is_published). No category column — info embedded in description.
-- TODO: caricare immagini/scansioni attestati (image_url) quando Luca le mandera'.
-- Idempotent via ON CONFLICT (title) — enforced by a unique index created here.

CREATE UNIQUE INDEX IF NOT EXISTS certifications_title_key ON certifications (title);

INSERT INTO certifications (title, description, issuer, order_index, is_published, is_featured)
VALUES
  ('DM 37/2008 — Lettera A',
   'Abilitazione ministeriale alla realizzazione di impianti elettrici civili, industriali e strumentali. La lettera A include impianti di produzione, trasformazione, trasporto, distribuzione e utilizzazione dell''energia elettrica.',
   'Ministero dello Sviluppo Economico',
   1, true, true),
  ('KNX Partner',
   'Certificazione internazionale di partnership per la progettazione e installazione di sistemi KNX, lo standard mondiale per l''automazione di edifici residenziali e commerciali. Ottenuta dopo formazione specifica ed esami pratici.',
   'KNX Association International',
   2, true, true),
  ('Conformità CEI 64-8',
   'Tutti gli impianti vengono progettati e installati secondo l''ultima edizione della norma CEI 64-8, riferimento tecnico per gli impianti elettrici utilizzatori a tensione nominale non superiore a 1000 V in c.a. e a 1500 V in c.c.',
   'Comitato Elettrotecnico Italiano',
   3, true, false)
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  issuer = EXCLUDED.issuer,
  order_index = EXCLUDED.order_index,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  updated_at = now();
