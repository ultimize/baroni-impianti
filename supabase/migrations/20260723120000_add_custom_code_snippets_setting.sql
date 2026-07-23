-- Setting per gli snippet di codice personalizzato (header/body), gestiti
-- dall'area admin con scelta di consenso (sempre/analytics/marketing) per snippet.
insert into public.site_settings (key, value, description, category, is_public)
values (
  'custom_code_snippets',
  '[]'::jsonb,
  'Snippet di codice personalizzati (header/body) gestiti dall''admin, con consenso per snippet.',
  'code',
  true
)
on conflict (key) do nothing;
