import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Informativa privacy"
        title="Privacy Policy"
        lead="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
      />
      <SectionWrapper>
        <article className="prose prose-slate prose-headings:text-slate-900 max-w-3xl mx-auto">
          <p>
            <strong>Ultimo aggiornamento:</strong> 26 aprile 2026
          </p>

          <p>
            Questo documento descrive come <strong>BARONI IMPIANTI di Baroni Luca</strong>{" "}
            raccoglie, utilizza e protegge i tuoi Dati Personali quando navighi sul sito{" "}
            <strong>elettricistasestrilevante.it</strong>.
          </p>

          <h2>Titolare del Trattamento dei Dati</h2>
          <p>
            <strong>BARONI IMPIANTI di Baroni Luca</strong>
            <br />
            Località Moggia, 9
            <br />
            16030 Castiglione Chiavarese (GE) — Italia
            <br />
            P. IVA 02438410991
            <br />
            Cod. Fisc. BRNLCU86P25C621F
            <br />
            Codice SDI: M5UXCR1
          </p>

          <p>
            <strong>Contatti per esercizio dei diritti:</strong>
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:info@baronitecnoimpianti.com">info@baronitecnoimpianti.com</a>
            </li>
            <li>
              Telefono: <a href="tel:+3901851676704">+39 0185 167 6704</a>
            </li>
          </ul>

          <h2>Tipologie di Dati raccolti</h2>
          <p>
            Fra i Dati Personali raccolti da questo Sito, in modo autonomo o tramite terze
            parti, ci sono:
          </p>
          <ul>
            <li>
              <strong>Dati forniti volontariamente dall&apos;utente:</strong> nome, cognome,
              indirizzo email, numero di telefono, messaggio di richiesta (tramite il modulo
              di contatto).
            </li>
            <li>
              <strong>Dati di Utilizzo raccolti automaticamente:</strong> indirizzo IP
              (anonimizzato), tipo e versione del browser, sistema operativo, pagine
              visitate, tempo di permanenza, referrer di provenienza, lingua del dispositivo.
            </li>
            <li>
              <strong>Cookie e tecnologie simili:</strong> vedi la{" "}
              <Link href="/cookie-policy">Cookie Policy</Link> per il dettaglio completo.
            </li>
          </ul>
          <p>
            I Dati Personali possono essere liberamente forniti dall&apos;utente o, nel caso
            di Dati di Utilizzo, raccolti automaticamente durante l&apos;uso del sito.
          </p>

          <h2>Finalità del Trattamento</h2>
          <p>I Dati raccolti vengono trattati per le seguenti finalità:</p>

          <h3>1. Rispondere alle richieste di contatto</h3>
          <p>
            Quando compili il modulo di contatto sul sito, raccogliamo i tuoi dati per
            rispondere a richieste di informazioni, preventivi o sopralluoghi.
          </p>
          <ul>
            <li>
              <strong>Dati trattati:</strong> nome, cognome, email, numero di telefono,
              contenuto del messaggio.
            </li>
            <li>
              <strong>Base giuridica:</strong> consenso esplicito dell&apos;interessato (art.
              6.1.a GDPR) e/o esecuzione di misure precontrattuali su richiesta
              dell&apos;interessato (art. 6.1.b GDPR).
            </li>
            <li>
              <strong>Conservazione:</strong> fino a 24 mesi dall&apos;ultimo contatto, salvo
              evoluzione della richiesta in rapporto contrattuale.
            </li>
          </ul>

          <h3>2. Statistiche di utilizzo del sito (Google Analytics 4)</h3>
          <p>
            Utilizziamo Google Analytics 4 (configurato tramite Google Tag Manager) per
            analizzare come gli utenti utilizzano il sito, in modo anonimizzato e aggregato.
          </p>
          <ul>
            <li>
              <strong>Dati trattati:</strong> dati di navigazione anonimizzati, identificativi
              univoci di sessione, dispositivo.
            </li>
            <li>
              <strong>Base giuridica:</strong> consenso dell&apos;interessato (art. 6.1.a
              GDPR).
            </li>
            <li>
              <strong>Conservazione:</strong> 14 mesi (impostazione default GA4).
            </li>
            <li>
              <strong>L&apos;IP viene anonimizzato</strong> prima dell&apos;invio ai server
              Google.
            </li>
            <li>
              <strong>Il consenso è facoltativo:</strong> puoi rifiutare in qualsiasi momento
              dal banner cookie.
            </li>
          </ul>

          <h3>3. Pubblicità e remarketing (Meta Pixel) — solo se attivato</h3>
          <p>
            Quando l&apos;utente acconsente, utilizziamo Meta Pixel per misurare
            l&apos;efficacia di eventuali campagne pubblicitarie su Facebook/Instagram.
          </p>
          <ul>
            <li>
              <strong>Dati trattati:</strong> identificativi pubblicitari, eventi di
              navigazione.
            </li>
            <li>
              <strong>Base giuridica:</strong> consenso dell&apos;interessato (art. 6.1.a
              GDPR).
            </li>
            <li>
              <strong>Il consenso è facoltativo</strong> e revocabile in qualsiasi momento dal
              banner cookie.
            </li>
          </ul>

          <h3>4. Hosting, sicurezza e funzionamento tecnico del sito</h3>
          <ul>
            <li>
              <strong>Dati trattati:</strong> indirizzo IP, dati di sessione tecnica, log di
              sicurezza.
            </li>
            <li>
              <strong>Base giuridica:</strong> legittimo interesse del Titolare a garantire il
              corretto funzionamento e la sicurezza del sito (art. 6.1.f GDPR).
            </li>
            <li>
              <strong>Conservazione:</strong> log di sicurezza fino a 30 giorni.
            </li>
          </ul>

          <h3>5. Adempimento obblighi di legge</h3>
          <p>
            Conserviamo determinati dati per ottemperare a obblighi fiscali, contabili o
            legali (es. fatturazione elettronica via SdI).
          </p>
          <ul>
            <li>
              <strong>Base giuridica:</strong> obbligo legale (art. 6.1.c GDPR).
            </li>
            <li>
              <strong>Conservazione:</strong> secondo i termini previsti dalla normativa
              applicabile (in genere 10 anni per documenti fiscali).
            </li>
          </ul>

          <h2>Servizi terzi utilizzati</h2>
          <p>
            Il sito utilizza i seguenti servizi terzi che possono trattare Dati Personali:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Servizio</th>
                  <th>Finalità</th>
                  <th>Categoria</th>
                  <th>Trasferimento dati</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Vercel Inc.</strong>
                  </td>
                  <td>Hosting del sito</td>
                  <td>Necessario</td>
                  <td>USA (Standard Contractual Clauses)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Supabase Inc.</strong>
                  </td>
                  <td>Database, archiviazione file e autenticazione admin</td>
                  <td>Necessario</td>
                  <td>UE (eu-west-2)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Resend</strong>
                  </td>
                  <td>Invio email transazionali (modulo contatti)</td>
                  <td>Necessario</td>
                  <td>USA (Standard Contractual Clauses)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Google LLC — Tag Manager</strong>
                  </td>
                  <td>Gestione tag analitici e marketing</td>
                  <td>Analitici/Marketing (consenso)</td>
                  <td>USA (Standard Contractual Clauses)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Google LLC — Analytics 4</strong>
                  </td>
                  <td>Statistiche anonime di utilizzo</td>
                  <td>Analitici (consenso)</td>
                  <td>USA (Standard Contractual Clauses)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Meta Platforms Ireland Ltd. — Pixel</strong>
                  </td>
                  <td>Misurazione campagne Facebook/Instagram</td>
                  <td>Marketing (consenso)</td>
                  <td>Irlanda / USA (SCC)</td>
                </tr>
                <tr>
                  <td>
                    <strong>YouTube (LLC, Google)</strong>
                  </td>
                  <td>Riproduzione video testimonianze (modalità nocookie)</td>
                  <td>Necessario / Marketing se interagisci</td>
                  <td>USA (SCC)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Google LLC — Maps Embed</strong>
                  </td>
                  <td>Mappa interattiva indirizzo sede</td>
                  <td>Marketing (consenso, mostrato solo dopo consenso)</td>
                  <td>USA (SCC)</td>
                </tr>
                <tr>
                  <td>
                    <strong>WhatsApp</strong>
                  </td>
                  <td>Bottone link diretto a chat (nessun cookie installato)</td>
                  <td>Solo link uscente, no tracciamento</td>
                  <td>n/a</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cookie</h2>
          <p>
            Utilizziamo cookie tecnici (necessari al funzionamento del sito) e, previo tuo
            consenso, cookie analitici e di marketing. Per il dettaglio completo dei cookie
            utilizzati, le finalità e la durata, consulta la{" "}
            <Link href="/cookie-policy">
              <strong>Cookie Policy</strong>
            </Link>
            .
          </p>
          <p>
            Puoi gestire le tue preferenze cookie in qualsiasi momento cliccando su{" "}
            <strong>&ldquo;Gestisci cookie&rdquo;</strong> nel footer del sito.
          </p>

          <h2>Modalità di trattamento</h2>
          <p>
            Il Titolare adotta misure di sicurezza tecniche e organizzative adeguate per
            proteggere i Dati Personali da accesso, divulgazione, modifica o distruzione non
            autorizzati:
          </p>
          <ul>
            <li>Connessioni HTTPS con certificato SSL/TLS.</li>
            <li>Database con crittografia at-rest (Supabase).</li>
            <li>Accesso amministrativo protetto da autenticazione e password forti.</li>
            <li>Log di accesso conservati per audit di sicurezza.</li>
            <li>IP utenti anonimizzati o hashati nei log di consenso (non in chiaro).</li>
            <li>Backup giornalieri con conservazione limitata nel tempo.</li>
          </ul>
          <p>
            Il trattamento è effettuato mediante strumenti informatici e telematici. Oltre al
            Titolare, possono avere accesso ai Dati altri soggetti coinvolti
            nell&apos;organizzazione del sito (personale tecnico, fornitori di servizi
            tecnici, hosting provider) nominati Responsabili del Trattamento.
          </p>

          <h2>Diritti dell&apos;utente</h2>
          <p>
            In qualità di interessato, puoi esercitare in qualsiasi momento i seguenti
            diritti previsti dal GDPR (artt. 15-22):
          </p>
          <ul>
            <li>
              <strong>Accesso ai dati</strong> (art. 15): ottenere conferma del trattamento e
              copia dei dati che ti riguardano.
            </li>
            <li>
              <strong>Rettifica</strong> (art. 16): correggere dati inesatti o incompleti.
            </li>
            <li>
              <strong>Cancellazione / &ldquo;diritto all&apos;oblio&rdquo;</strong> (art. 17):
              chiedere la cancellazione dei tuoi dati, salvo obblighi di legge contrari.
            </li>
            <li>
              <strong>Limitazione del trattamento</strong> (art. 18): chiedere la sospensione
              del trattamento in determinate circostanze.
            </li>
            <li>
              <strong>Portabilità</strong> (art. 20): ricevere i tuoi dati in formato
              strutturato e leggibile da dispositivo automatico.
            </li>
            <li>
              <strong>Opposizione</strong> (art. 21): opporti al trattamento per motivi
              connessi alla tua situazione, inclusi i trattamenti basati sul legittimo
              interesse.
            </li>
            <li>
              <strong>Revoca del consenso</strong>: revocare in qualsiasi momento il consenso
              prestato per finalità che lo richiedono (cookie analitici, marketing, mailing
              list), senza pregiudicare la liceità dei trattamenti precedenti.
            </li>
          </ul>

          <h3>Come esercitare i diritti</h3>
          <p>Per esercitare i tuoi diritti, contatta il Titolare scrivendo a:</p>
          <p>
            📧{" "}
            <strong>
              <a href="mailto:info@baronitecnoimpianti.com">info@baronitecnoimpianti.com</a>
            </strong>
          </p>
          <p>
            Le richieste sono evase entro 30 giorni e gratuitamente, salvo casi
            manifestamente infondati o eccessivi.
          </p>

          <h3>Diritto di reclamo</h3>
          <p>
            Hai diritto di proporre reclamo all&apos;
            <strong>Autorità Garante per la Protezione dei Dati Personali</strong> (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.garanteprivacy.it
            </a>
            ) qualora ritenga che il trattamento dei tuoi Dati avvenga in violazione del
            GDPR.
          </p>

          <h2>Trasferimento di dati extra-UE</h2>
          <p>
            Alcuni servizi terzi utilizzati (es. Google, Meta, Vercel, Resend) hanno sede
            negli Stati Uniti. Il trasferimento dei dati avviene sulla base delle{" "}
            <strong>Standard Contractual Clauses</strong> approvate dalla Commissione
            Europea, che garantiscono un livello di protezione adeguato.
          </p>
          <p>
            Puoi richiedere ulteriori informazioni sulle garanzie adottate scrivendo al
            Titolare.
          </p>

          <h2>Modifiche a questa Privacy Policy</h2>
          <p>
            Il Titolare si riserva il diritto di modificare questa Privacy Policy in
            qualsiasi momento, dandone notifica agli utenti tramite pubblicazione su questa
            pagina. Si prega di consultare con frequenza questa pagina, facendo riferimento
            alla data di ultima modifica indicata in apertura.
          </p>
          <p>
            Qualora le modifiche riguardino trattamenti basati sul consenso, il Titolare
            provvederà a raccogliere nuovamente il consenso dell&apos;utente, se necessario.
          </p>

          <h2>Definizioni</h2>
          <ul>
            <li>
              <strong>Dati Personali:</strong> qualsiasi informazione che renda identificata
              o identificabile una persona fisica.
            </li>
            <li>
              <strong>Trattamento:</strong> qualsiasi operazione effettuata su Dati
              Personali.
            </li>
            <li>
              <strong>Titolare del Trattamento:</strong> persona o ente che determina
              finalità e mezzi del trattamento.
            </li>
            <li>
              <strong>Responsabile del Trattamento:</strong> soggetto che tratta dati per
              conto del Titolare.
            </li>
            <li>
              <strong>Interessato:</strong> persona fisica cui si riferiscono i Dati.
            </li>
            <li>
              <strong>Cookie:</strong> piccoli file di testo memorizzati dal browser
              dell&apos;utente.
            </li>
            <li>
              <strong>GDPR:</strong> Regolamento (UE) 2016/679 sulla protezione dei Dati
              Personali.
            </li>
          </ul>

          <h2>Riferimenti normativi</h2>
          <ul>
            <li>Regolamento (UE) 2016/679 — GDPR</li>
            <li>D.Lgs. 196/2003 e successive modifiche (Codice Privacy)</li>
            <li>
              Provvedimenti del Garante per la protezione dei dati personali in materia di
              cookie e strumenti di tracciamento (10 giugno 2021)
            </li>
          </ul>
        </article>
      </SectionWrapper>
    </>
  )
}
