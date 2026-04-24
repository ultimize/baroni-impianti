-- Seed real services (Zero Pensieri + 4 categorie)
-- Schema: (slug, title, short_description, icon, order_index, is_published, is_featured)
-- Idempotent via ON CONFLICT (slug). Slug has UNIQUE constraint per existing schema.

INSERT INTO services (slug, title, short_description, icon, order_index, is_published, is_featured)
VALUES
  ('zero-pensieri', 'Zero Pensieri',
   'Contratto di manutenzione programmata con assistenza 7/7, garanzia a vita sui dispositivi e interventi urgenti illimitati. Il nostro servizio di punta.',
   'Shield', 1, true, true),
  ('impianti-cablati', 'Impianti Cablati',
   'Realizzazione di impianti elettrici civili e industriali a norma CEI 64-8. Nuove costruzioni, ristrutturazioni, adeguamenti.',
   'Plug', 2, true, false),
  ('impianti-sicurezza', 'Impianti di Sicurezza',
   'Allarmi intrusione, videosorveglianza TVCC, controllo accessi, sistemi antincendio STOP FIRE.',
   'ShieldCheck', 3, true, false),
  ('impianti-digitali-integrati', 'Impianti Digitali Integrati',
   'Domotica KNX, automazione edifici, scenari illuminazione e clima, gestione smart degli ambienti.',
   'Network', 4, true, false),
  ('impianti-fotovoltaici', 'Impianti Fotovoltaici',
   'Fotovoltaico chiavi in mano con accumulo, monitoraggio consumi, gestione pratiche incentivi.',
   'Sun', 5, true, false)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  icon = EXCLUDED.icon,
  order_index = EXCLUDED.order_index,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  updated_at = now();
