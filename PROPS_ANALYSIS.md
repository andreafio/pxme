# Analisi Props: `registry.tsx` → `PxmeLayout3_Results.tsx`

## Come `registry.tsx` passa i props

```tsx
<Renderer
  section={normalized}        // NormalizedProjectSection
  project={project}           // CarouselProject
  sectionIndex={sectionIndex} // number
  sectionCount={sectionCount} // number  ← nome usato nel registry
/>
```

---

## Come `PxmeLayout3_Results` destructura i props

```tsx
export function PxmeLayout3_Results({
  section,
  project,
  sectionIndex,
  totalSections   // ⚠️ si aspetta "totalSections", non "sectionCount"
}: SectionRenderProps)
```

---

## Tabella mismatch

| Prop inviato dal registry | Nome in `SectionRenderProps` | Usato in PxmeLayout3 | Impatto visivo |
|---|---|---|---|
| `section` | `section` | ✅ corretto | nessuno |
| `project` | `project` | ✅ corretto | nessuno |
| `sectionIndex` | `sectionIndex` | ✅ corretto | nessuno |
| `sectionCount` | `sectionCount` | ⚠️ destructurato come `totalSections` | **nessuno** — non viene renderizzato |

---

## Come vengono renderizzati i KPI

```tsx
// Fallback sui dati hardcoded se section.kpis è vuoto
const kpis = section.kpis || [
  { label: "Incremento", value: "120%" },
  { label: "Impatto",    value: "5x"   },
  { label: "Reach",      value: "1.2M" },
  { label: "Retention",  value: "89%"  },
];

// Render: valore grande + label
{kpis.slice(0, 4).map((kpi, i) => (
  <div key={i}>
    <div>{kpi.value}</div>   {/* grande, verde #7EB83A */}
    <div>{kpi.label}</div>   {/* label uppercase */}
  </div>
))}
```

> ✅ La struttura `{ label, value }` corrisponde a quello che arriva da `normalize.ts`.

---

## Come viene renderizzata la quote

```tsx
{section.quote && (
  <div className="border-l-4 border-[#C94B8F] ...">
    <p>"{section.quote.text}"</p>
    {section.quote.author && (
      <p>— {section.quote.author}</p>
    )}
  </div>
)}
```

> ✅ `section.quote` viene costruito da `normalize.ts` unendo `section.quote?.text ?? project.feedbackQuote`.

---

## Verdetto

**Non c'è un mismatch di props che causa problemi visivi.**

Se vedi KPI hardcoded (`120%`, `5x`, ecc.) invece dei dati reali, il problema è a monte: i dati del progetto in `App.tsx` non hanno il campo `kpis` popolato, quindi `normalize.ts` usa il fallback.

**Passo successivo consigliato:** leggere la definizione del progetto `suaviter` in `App.tsx` per verificare se il campo `kpis` (e `feedbackQuote`) è presente.
