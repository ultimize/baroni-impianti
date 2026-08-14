-- Fa scattare la programmazione degli articoli.
--
-- Contesto: lo stato "scheduled" esisteva nel modello dati e nel pannello, ma
-- nessuno lo faceva mai diventare "published". Le query pubbliche filtrano su
-- status = 'published', quindi un articolo programmato restava invisibile per
-- sempre, anche a data ampiamente superata. Al 06-08-2026 erano 16 articoli
-- fermi, con date da aprile ad agosto.

create extension if not exists pg_cron;

create or replace function public.publish_due_scheduled_posts()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  pubblicati integer;
begin
  update posts
     set status = 'published', updated_at = now()
   where status = 'scheduled'
     and published_at is not null
     and published_at <= now();
  get diagnostics pubblicati = row_count;
  return pubblicati;
end;
$$;

comment on function public.publish_due_scheduled_posts is
  'Porta a published gli articoli scheduled con published_at gia'' passata. Invocata da pg_cron ogni 5 minuti.';

-- Ogni 5 minuti: granularita' piu' che sufficiente per un blog, e il job e'
-- idempotente (se non c'e' niente da pubblicare aggiorna zero righe).
select cron.schedule(
  'pubblica-articoli-programmati',
  '*/5 * * * *',
  $$select public.publish_due_scheduled_posts();$$
);
