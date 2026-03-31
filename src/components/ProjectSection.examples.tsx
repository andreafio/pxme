/**
 * ESEMPI DI UTILIZZO: Componente ProjectSection
 * 
 * Questi esempi mostrano come utilizzare il componente ProjectSection
 * in contesti reali con i 5 diversi layout.
 */

import { ProjectSection } from "@/components/ProjectSection";

/**
 * ESEMPIO 1: Pagina progetto completa con tutti e 5 i layout
 */
export function ProjectPageComplete() {
  return (
    <div>
      {/* LAYOUT 1: Executive Summary */}
      <ProjectSection
        sectionNumber="01"
        sectionLabel="Executive Summary"
        title="Il Brief"
        description="Abbiamo ricevuto il brief per un rebranding completo della linea di packaging Pernigotti. L'obiettivo era aggiornare l'identità visiva mantenendo il riconoscimento del brand storico, introducendo elementi di modernità e sostenibilità."
        image="https://via.placeholder.com/800"
        layout="summary"
        accentColor="green"
        metadata={[
          { label: "Categoria", value: "Packaging" },
          { label: "Focus", value: "Design Estrategico" },
          { label: "Scope", value: "Multi-product" },
        ]}
      />

      {/* LAYOUT 2: Challenge */}
      <ProjectSection
        sectionNumber="02"
        sectionLabel="Challenge"
        title="La Sfida"
        description="Il mercato del cioccolato premium è sempre più competitivo. Dovevamo creare un packaging che non solo comunicasse qualità, ma che raccontasse anche la storia di sostenibilità e innovazione di Pernigotti."
        layout="challenge"
        accentColor="green"
        image="https://via.placeholder.com/800"
        extras={{
          constraints: [
            "Mantenere il DNA storico del brand",
            "Ridurre l'uso di plastica del 40%",
            "Aumentare il contrasto sugli scaffali",
            "Scalabilità su 5 linee di prodotto",
          ],
        }}
      />

      {/* LAYOUT 3: Concept */}
      <ProjectSection
        sectionNumber="03"
        sectionLabel="Concept"
        title="La Soluzione"
        description="Abbiamo sviluppato un sistema di packaging modulare basato su un'architettura di colore naturale. Ogni linea mantiene il core visual identity di Pernigotti ma con variazioni cromatiche distintive. La texture della carta riciclata diventa elemento tattile e sostenibilitario."
        image="https://via.placeholder.com/800"
        layout="concept"
        accentColor="magenta"
        extras={{
          steps: [
            "Analisi competitiva e ricerca di mercato",
            "Workshop creativo con team Pernigotti",
            "Sviluppo di 5 varianti cromatiche",
            "Testing e ottimizzazione della produzione",
          ],
        }}
      />

      {/* LAYOUT 4: Results */}
      <ProjectSection
        sectionNumber="04"
        sectionLabel="Results"
        title="I Risultati"
        description="Il nuovo packaging ha superato le aspettative sia in termini di performance che di sostenibilità. Negli ultimi 6 mesi, abbiamo registrato un incremento significativo del brand awareness e una riduzione importante dei costi di produzione."
        image="https://via.placeholder.com/800"
        layout="results"
        accentColor="green"
        extras={{
          kpis: [
            { label: "Incremento Vendite", value: "+120%" },
            { label: "Riconoscimento Brand", value: "5x" },
            { label: "Reach Digitale", value: "1.2M" },
            { label: "Retention Cliente", value: "89%" },
          ],
          quote: {
            text: "Il nuovo packaging comunica perfettamente la qualità e la tradizione Pernigotti. Un progetto curato nei minimi dettagli.",
            author: "— Marketing Manager Pernigotti",
          },
        }}
      />

      {/* LAYOUT 5: Closing */}
      <ProjectSection
        sectionNumber="05"
        sectionLabel="Learnings"
        title="Il design deve raccontare una storia vera, non solo essere bello"
        description="Le lezioni apprese da questo progetto ci hanno insegnato quanto sia cruciale l'ascolto del cliente e l'iterazione continua. Un buon design non è un atto creativo isolato, ma una conversazione che si evolve nel tempo."
        image="https://via.placeholder.com/800"
        layout="closing"
        accentColor="magenta"
        extras={{
          highlights: [
            "L'importanza della ricerca qualitativa sul target",
            "Coinvolgimento degli stakeholder da subito",
            "Iterazione rapida con feedback costante",
          ],
          kpis: [
            { label: "Durata Progetto", value: "6 mesi" },
            { label: "Team", value: "5 persone" },
          ],
        }}
        onNavigate={(direction) => console.log(`Navigate ${direction}`)}
      />
    </div>
  );
}

/**
 * ESEMPIO 2: Singolo layout isolated (es. per una landing page)
 */
export function ProjectSummarySingle() {
  return (
    <ProjectSection
      sectionNumber="01"
      sectionLabel="Case Study"
      title="Branding Unicredit"
      description="Un progetto di rebranding completo per la campagna BTL Unicredit. Abbiamo creato un sistema visivo coerente su tutti i touchpoint, da digital a physical."
      image="https://via.placeholder.com/800"
      layout="summary"
      accentColor="green"
      metadata={[
        { label: "Categoria", value: "BTL & ATL" },
        { label: "Durata", value: "4 mesi" },
        { label: "Team", value: "8 persone" },
      ]}
    />
  );
}

/**
 * ESEMPIO 3: Challenge section con dati dinamici
 */
export function ProjectChallengeDynamic({
  challenges,
}: {
  challenges: string[];
}) {
  return (
    <ProjectSection
      sectionNumber="02"
      sectionLabel="Challenge"
      title={`Affrontare ${challenges.length} vincoli principali`}
      description="Ogni progetto inizia con una serie di vincoli che diventano opportunità di innovazione. Ecco come abbiamo affrontato questa sfida specifica."
      layout="challenge"
      accentColor="green"
      image="https://via.placeholder.com/800"
      extras={{
        constraints: challenges,
      }}
    />
  );
}

/**
 * ESEMPIO 4: Concept layout dark con steps
 */
export function ProjectConceptDark() {
  return (
    <ProjectSection
      sectionNumber="03"
      sectionLabel="Concept"
      title="Un'identità minimalista e forte"
      description="La soluzione si basa su un linguaggio visivo essenziale. Ogni elemento ha uno scopo comunicativo preciso. La semplicità non è assenza di complessità, ma riduzione della complessità al suo nucleo essenziale."
      image="https://via.placeholder.com/800"
      layout="concept"
      accentColor="magenta"
      extras={{
        steps: [
          "Ridefinire il color palette su 4 colori core",
          "Sviluppare un icon system coerente",
          "Creare le linee guida complete",
          "Implementare su tutti i touchpoint",
        ],
      }}
    />
  );
}

/**
 * ESEMPIO 5: Results con KPI e quote
 */
export function ProjectResultsWithStats() {
  return (
    <ProjectSection
      sectionNumber="04"
      sectionLabel="Results"
      title="Misuriamo il successo"
      description="Come abbiamo misurato l'impatto del nuovo design sul business. Ogni metrica racconta una parte della storia di successo del progetto."
      image="https://via.placeholder.com/800"
      layout="results"
      accentColor="green"
      extras={{
        kpis: [
          { label: "CTR", value: "+340%" },
          { label: "Engagement", value: "+215%" },
          { label: "Conversion", value: "+87%" },
          { label: "Time on Page", value: "+45s" },
        ],
        quote: {
          text: "Questo nuovo design ha trasformato completamente la percezione del nostro brand nel mercato.",
          author: "— CEO of the Company",
        },
      }}
    />
  );
}

/**
 * ESEMPIO 6: Closing section per conclusione
 */
export function ProjectClosing() {
  return (
    <ProjectSection
      sectionNumber="05"
      sectionLabel="Conclusione"
      title="Il design non è solo estettica è strategia profonda e consapevole"
      description="Ogni linea, ogni colore, ogni tipografia è una scelta strategica basata su ricerca, intuizione e esperienza. Il nostro ruolo è tradurre la complessità in semplicità comunicativa."
      image="https://via.placeholder.com/800"
      layout="closing"
      accentColor="magenta"
      extras={{
        highlights: [
          "La ricerca qualitativa è fondamentale",
          "Il coinvolgimento del cliente amplifica il risultato",
          "L'iterazione continua è la chiave",
        ],
        kpis: [
          { label: "Valore Creato", value: "5x" },
          { label: "Soddisfazione", value: "98%" },
        ],
      }}
      onNavigate={(dir) => {
        if (dir === "prev") {
          // Navigate to previous project
        } else {
          // Navigate to next project
        }
      }}
    />
  );
}

export default {
  ProjectPageComplete,
  ProjectSummarySingle,
  ProjectChallengeDynamic,
  ProjectConceptDark,
  ProjectResultsWithStats,
  ProjectClosing,
};
