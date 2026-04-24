-- Seed real company contact data into site_settings
-- site_settings.value is JSONB; each upsert uses to_jsonb() for scalars and jsonb_build_object() for structures.
-- Idempotent via ON CONFLICT (key) DO UPDATE.

-- Legal / registry
INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_legal_name', to_jsonb('BARONI IMPIANTI di Baroni Luca'::text), 'Ragione sociale completa', 'legal', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, description = COALESCE(site_settings.description, EXCLUDED.description), category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_vat', to_jsonb('02438410991'::text), 'Partita IVA', 'legal', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_fiscal_code', to_jsonb('BRNLCU86P25C621F'::text), 'Codice fiscale del titolare', 'legal', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_sdi_code', to_jsonb('M5UXCR1'::text), 'Codice destinatario SDI per fatturazione elettronica', 'legal', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

-- Address (existing key is a structured object {street, zip, city, province, country})
INSERT INTO site_settings (key, value, description, category, is_public)
VALUES (
  'company_address',
  jsonb_build_object(
    'street', 'Località Moggia, 9',
    'zip', '16030',
    'city', 'Castiglione Chiavarese',
    'province', 'GE',
    'country', 'IT'
  ),
  'Indirizzo sede legale e operativa',
  'contact',
  true
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

-- Contact channels
INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_email', to_jsonb('info@baronitecnoimpianti.com'::text), 'Email principale', 'contact', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_phone', to_jsonb('+39 0185 167 6704'::text), 'Telefono (formato internazionale con spazi)', 'contact', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_phone_display', to_jsonb('0185 167 6704'::text), 'Telefono formattato per la UI', 'contact', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_phone_tel', to_jsonb('+390185167704'::text), 'Telefono per attributo href="tel:"', 'contact', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('company_hours_display', to_jsonb('Lun–Ven 8:00–18:00'::text), 'Orario apertura in formato leggibile (per footer/hero)', 'contact', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

-- Social
INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('social_youtube', to_jsonb('https://www.youtube.com/channel/UC3Kqg-f2VRUumit58p1W26A'::text), 'Canale YouTube aziendale', 'social', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

-- TODO: social_facebook, social_instagram, social_linkedin restano vuoti finché Luca non li fornisce.
INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('social_facebook', to_jsonb(''::text), 'URL profilo Facebook', 'social', true)
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('social_instagram', to_jsonb(''::text), 'URL profilo Instagram', 'social', true)
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('social_linkedin', to_jsonb(''::text), 'URL profilo LinkedIn', 'social', true)
ON CONFLICT (key) DO NOTHING;

-- Privacy / analytics toggles
INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('cookie_banner_enabled', to_jsonb(true), 'Mostra il banner cookie sul frontend', 'general', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();

INSERT INTO site_settings (key, value, description, category, is_public)
VALUES ('analytics_enabled', to_jsonb(false), 'Abilita gli script di analytics quando configurati', 'integrations', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category, updated_at = now();
