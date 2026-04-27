import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa estesa sui cookie utilizzati dal sito Baroni Impianti.",
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Informativa cookie"
        title="Cookie Policy"
        lead="Informativa estesa sui cookie utilizzati dal sito Baroni Impianti."
      />
      <SectionWrapper>
        <article className="prose prose-slate prose-headings:text-slate-900 max-w-3xl mx-auto">
          <p>
            <strong>Ultimo aggiornamento:</strong> 26 aprile 2026
          </p>

          <p>
            Questa Cookie Policy spiega quali cookie utilizza il sito{" "}
            <strong>elettricistasestrilevante.it</strong> di{" "}
            <strong>BARONI IMPIANTI di Baroni Luca</strong>, perché li utilizziamo e come
            puoi gestire le tue preferenze.
          </p>
          <p>
            Per informazioni più ampie sul trattamento dei tuoi Dati Personali, consulta la{" "}
            <Link href="/privacy-policy">
              <strong>Privacy Policy</strong>
            </Link>
            .
          </p>

          <h2>Cosa sono i cookie</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web visitati salvano sul
            dispositivo dell&apos;utente per memorizzare informazioni utili al funzionamento
            del sito stesso o per migliorarne l&apos;esperienza d&apos;uso. Esistono diverse
            tipologie di cookie:
          </p>
          <ul>
            <li>
              <strong>Cookie tecnici (necessari):</strong> indispensabili al funzionamento
              del sito e non richiedono consenso.
            </li>
            <li>
              <strong>Cookie analitici:</strong> raccolgono informazioni anonime e aggregate
              sull&apos;utilizzo del sito.
            </li>
            <li>
              <strong>Cookie di marketing:</strong> utilizzati per misurare l&apos;efficacia
              delle campagne pubblicitarie e mostrare annunci personalizzati.
            </li>
            <li>
              <strong>Strumenti di tracciamento simili:</strong> identificatori, pixel, web
              beacon, fingerprinting, ecc.
            </li>
          </ul>

          <h2>Categorie di cookie utilizzate</h2>

          <h3>1. Cookie strettamente necessari (sempre attivi)</h3>
          <p>
            Questi cookie sono indispensabili per il corretto funzionamento del sito. Senza
            di essi, alcune funzionalità non sarebbero disponibili. Non richiedono consenso.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Tipologia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>baroni_consent</code>
                  </td>
                  <td>Memorizza le tue preferenze sui cookie.</td>
                  <td>365 giorni</td>
                  <td>Prima parte</td>
                </tr>
                <tr>
                  <td>
                    <code>sb-access-token</code>, <code>sb-refresh-token</code>
                  </td>
                  <td>
                    Sessione amministrativa (Supabase Auth — solo per amministratori
                    autenticati).
                  </td>
                  <td>Sessione / 7 giorni</td>
                  <td>Prima parte</td>
                </tr>
                <tr>
                  <td>Cookie di sicurezza Vercel</td>
                  <td>Protezione anti-DDoS, anti-CSRF, gestione bilanciamento carico.</td>
                  <td>Sessione</td>
                  <td>Prima parte</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2. Cookie analitici (richiedono consenso)</h3>
          <p>
            Utilizziamo Google Analytics 4 (caricato tramite Google Tag Manager) per capire
            come gli utenti utilizzano il sito, in modo aggregato e anonimo. Ci aiutano a
            migliorare contenuti e usabilità.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Identificatore univoco anonimo per Google Analytics 4.</td>
                  <td>2 anni</td>
                  <td>Google LLC (USA)</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_*</code>
                  </td>
                  <td>Stato sessione Analytics 4.</td>
                  <td>2 anni</td>
                  <td>Google LLC (USA)</td>
                </tr>
                <tr>
                  <td>
                    <code>_gid</code>
                  </td>
                  <td>Identificatore di sessione (se presente).</td>
                  <td>24 ore</td>
                  <td>Google LLC (USA)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>L&apos;IP viene anonimizzato</strong> prima dell&apos;invio ai server
            Google. I dati sono aggregati e non identificano direttamente l&apos;utente.
          </p>
          <p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy di Google
            </a>{" "}
            —{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Opt-out browser add-on
            </a>
          </p>

          <h3>3. Cookie di marketing (richiedono consenso)</h3>
          <p>
            Se attivi, usiamo Meta Pixel per misurare l&apos;efficacia di eventuali campagne
            pubblicitarie su Facebook/Instagram e per il remarketing. Questi cookie possono
            profilare l&apos;utente.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_fbp</code>
                  </td>
                  <td>Identificatore Meta Pixel per attribuzione campagne.</td>
                  <td>90 giorni</td>
                  <td>Meta Platforms Ireland Ltd.</td>
                </tr>
                <tr>
                  <td>
                    <code>fr</code>
                  </td>
                  <td>Identificatore Facebook per pubblicità.</td>
                  <td>90 giorni</td>
                  <td>Meta Platforms Ireland Ltd.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <a
              href="https://www.facebook.com/privacy/policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy di Meta
            </a>
          </p>

          <h3>4. Embed di terze parti (caricamento condizionale)</h3>
          <p>
            Alcuni contenuti embedati possono installare cookie. Per ridurre l&apos;impatto
            privacy:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Servizio</th>
                  <th>Comportamento sul sito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>YouTube</strong> (testimonianze video)
                  </td>
                  <td>
                    Caricato in modalità <strong>
                      <code>youtube-nocookie.com</code>
                    </strong>
                    : nessun cookie installato finché l&apos;utente non avvia il video.
                    Quando avviato, possono essere installati cookie YouTube (richiedono
                    consenso marketing).
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Google Maps</strong> (mappa sede)
                  </td>
                  <td>
                    Mostrato come <strong>placeholder statico</strong> finché l&apos;utente
                    non accetta i cookie marketing. Solo dopo il consenso esplicito viene
                    caricato l&apos;iframe Google Maps interattivo.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>WhatsApp</strong> (bottone chat)
                  </td>
                  <td>
                    Solo link diretto a <code>wa.me/...</code> —{" "}
                    <strong>nessun cookie installato</strong>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Come gestire le preferenze</h2>

          <h3>Al primo accesso</h3>
          <p>
            Al primo accesso al sito ti viene mostrato un banner cookie con tre opzioni:
          </p>
          <ul>
            <li>
              <strong>Accetta tutti:</strong> abilita tutte le categorie (necessari +
              analitici + marketing).
            </li>
            <li>
              <strong>Rifiuta non necessari:</strong> abilita solo i cookie tecnici
              indispensabili.
            </li>
            <li>
              <strong>Personalizza:</strong> scegli singolarmente quali categorie attivare.
            </li>
          </ul>

          <h3>In qualsiasi momento</h3>
          <p>
            Puoi modificare o revocare le tue preferenze cliccando sul link{" "}
            <strong>&ldquo;Gestisci cookie&rdquo;</strong> nel footer di ogni pagina del
            sito. Le preferenze vengono memorizzate per 365 giorni.
          </p>

          <h3>Gestione tramite browser</h3>
          <p>
            Puoi anche disabilitare o eliminare i cookie direttamente dalle impostazioni del
            tuo browser. Tieni presente che disabilitare tutti i cookie potrebbe compromettere
            il corretto funzionamento del sito.
          </p>
          <p>Guide ufficiali per i browser più diffusi:</p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/it/kb/Eliminare%20i%20cookie"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/it-it/HT201265"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2>Audit log dei consensi</h2>
          <p>
            Per finalità di compliance GDPR, ogni scelta espressa dall&apos;utente sul
            banner cookie viene registrata in un log interno con:
          </p>
          <ul>
            <li>
              Identificatore di consenso (UUID anonimo, non collegato all&apos;identità
              dell&apos;utente)
            </li>
            <li>Data e ora del consenso</li>
            <li>Categorie accettate / rifiutate</li>
            <li>Versione della Cookie Policy in vigore al momento del consenso</li>
            <li>
              IP <strong>hashato (sha256 con salt)</strong> — non conserviamo l&apos;IP in
              chiaro
            </li>
            <li>User-Agent del browser</li>
          </ul>
          <p>
            Questi log sono accessibili solo al Titolare e sono utilizzati esclusivamente
            per dimostrare il rispetto degli obblighi di consenso GDPR. Non sono utilizzati
            per profilare gli utenti né condivisi con terzi.
          </p>

          <h2>Trasferimento dati extra-UE</h2>
          <p>
            Alcuni servizi (Google, Meta, Vercel, Resend) hanno sede negli Stati Uniti. Il
            trasferimento avviene sulla base delle <strong>Standard Contractual Clauses</strong>{" "}
            approvate dalla Commissione Europea.
          </p>

          <h2>I tuoi diritti</h2>
          <p>
            In qualità di interessato, puoi esercitare i diritti previsti dal GDPR (accesso,
            rettifica, cancellazione, opposizione, revoca consenso, ecc.). Per il dettaglio
            completo consulta la{" "}
            <Link href="/privacy-policy">
              <strong>Privacy Policy</strong>
            </Link>
            .
          </p>
          <p>Per esercitare i tuoi diritti contatta il Titolare:</p>
          <p>
            📧{" "}
            <strong>
              <a href="mailto:info@baronitecnoimpianti.com">info@baronitecnoimpianti.com</a>
            </strong>
            <br />
            📞{" "}
            <strong>
              <a href="tel:+3901851676704">+39 0185 167 6704</a>
            </strong>
          </p>

          <h2>Modifiche a questa Cookie Policy</h2>
          <p>
            Il Titolare si riserva il diritto di modificare questa Cookie Policy in qualsiasi
            momento. Le modifiche saranno pubblicate su questa pagina con indicazione della
            data di ultimo aggiornamento. Per modifiche sostanziali (es. nuove categorie di
            cookie o nuovi servizi terzi che richiedono consenso) ti verrà nuovamente
            mostrato il banner di consenso.
          </p>

          <h2>Riferimenti</h2>
          <ul>
            <li>Regolamento (UE) 2016/679 — GDPR</li>
            <li>D.Lgs. 196/2003 e successive modifiche (Codice Privacy italiano)</li>
            <li>
              Linee guida del Garante per la protezione dei dati personali in materia di
              cookie e altri strumenti di tracciamento (provvedimento del 10 giugno 2021)
            </li>
            <li>Direttiva ePrivacy 2002/58/CE</li>
          </ul>
        </article>
      </SectionWrapper>
    </>
  )
}
