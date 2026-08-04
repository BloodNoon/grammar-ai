import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const TOTAL = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

const NOT_NOUNS = new Set([
  "a","an","the","is","are","was","were","be","been","being","and","but","or","so","yet","for","nor",
  "in","on","at","by","to","of","from","with","about","into","through","during","before","after",
  "above","below","between","very","really","quickly","slowly","always","never","often",
  "not","no","yes","this","that","these","those",
  "i","me","my","we","us","our","you","your","he","him","his","she","her","they","them","their","it","its",
]);

const BASE_VERBS = new Set([
  "is","are","was","were","run","runs","ran","walk","walks","walked","eat","eats","ate",
  "drink","drinks","drank","read","reads","write","writes","wrote","see","sees","saw",
  "make","makes","made","take","takes","took","give","gives","gave","get","gets","got",
  "go","goes","went","come","comes","came","love","loves","loved","help","helps","helped",
  "find","finds","found","teach","teaches","taught","learn","learns","learned",
  "bite","bites","bit","chase","chases","chased","catch","catches","caught",
  "cook","cooks","cooked","play","plays","played","call","calls","called",
  "build","builds","built","create","creates","created","carry","carries","carried",
  "biting","chasing","eating","drinking","reading","writing","making","taking",
  "giving","getting","loving","helping","finding","teaching","learning","playing","building",
]);

function checkSS1(sentence, pool) {
  const words = sentence.trim().split(/\s+/);
  if (words.length < 3) return false;

  const allVerbs = pool ? new Set([...BASE_VERBS, ...(pool.verbs?.all || [])]) : BASE_VERBS;
  const allNouns = pool ? new Set(pool.nouns?.all || []) : new Set();

  const isVerb = (w) => allVerbs.has(w.toLowerCase().replace(/[.,!?;:'"]/g, ""));
  const isNoun = (w) => {
    const clean = w.toLowerCase().replace(/[.,!?;:'"]/g, "");
    if (NOT_NOUNS.has(clean) || allVerbs.has(clean)) return false;
    if (allNouns.size > 0) return allNouns.has(clean);
    return clean.length > 1;
  };

  let verbIndex = -1;
  for (let i = 1; i < words.length; i++) {
    if (isVerb(words[i])) { verbIndex = i; break; }
  }
  if (verbIndex === -1) return false;

  const hasSubject = words.slice(0, verbIndex).some(isNoun);
  const hasObject = words.slice(verbIndex + 1).some(isNoun);
  return hasSubject && hasObject;
}

export default function SS1Practice() {
  const history = useHistory();
  const [pool, setPool] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [inputs, setInputs] = useState(Array(TOTAL).fill(""));
  const [results, setResults] = useState(Array(TOTAL).fill(null));
  const poolLoaded = useRef(false);

  useEffect(() => {
    if (poolLoaded.current) return;
    poolLoaded.current = true;
    import("./BIGSSPOOL").then(mod => {
      const p = mod.default;
      setPool(p);
      refreshSuggestions(p);
    });
  }, []);

  const refreshSuggestions = (p) => {
    if (!p) return;
    setSuggestions({
      articles: ["a", "an", "the"],
      subject_nouns: pickRandom(p.nouns.subject_nouns, 10),
      action_verbs: pickRandom(p.verbs.action_verbs, 10),
      object_nouns: pickRandom(p.nouns.object_nouns, 10),
      adjectives: pickRandom(p.adjectives.descriptive, 8),
    });
  };

  const setInput = (i, val) => {
    const next = [...inputs];
    next[i] = val;
    setInputs(next);
  };

  const submitRow = (i) => {
    if (!inputs[i].trim() || results[i] !== null) return;
    const correct = checkSS1(inputs[i], pool);
    const next = [...results];
    next[i] = correct;
    setResults(next);
  };

  const score = results.filter(r => r === true).length;
  const answered = results.filter(r => r !== null).length;
  const allDone = answered === TOTAL;
  const pct = answered > 0 ? Math.round((score / answered) * 100) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#fef3e2", fontFamily: "'Inter', sans-serif", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span style={{
            display: "inline-block", background: "#f97316", color: "white",
            fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.1em",
            padding: "0.25rem 0.75rem", borderRadius: "999px", marginBottom: "0.6rem",
          }}>SENTENCE STRUCTURES</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#1a1a1a", margin: "0 0 0.2rem" }}>SS 1 Practice</h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>Subject noun + verb + object noun</p>
        </div>

        {/* Pattern card */}
        <div style={{
          background: "white", borderRadius: "16px", border: "1px solid #fed7aa",
          padding: "1rem 1.5rem", marginBottom: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
            <span style={{
              background: "#fff7ed", border: "1px solid #fed7aa", color: "#ea580c",
              fontWeight: "700", fontSize: "0.8rem", padding: "0.2rem 0.6rem", borderRadius: "6px",
            }}>SS 1</span>
            <span style={{ fontWeight: "700", color: "#1a1a1a" }}>Subject noun + verb + object noun</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {["Dogs are biting bones.", "People read books.", "Serenity creates peace."].map((ex, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#f97316" }}>Ex {i + 1}.</span>
                <span style={{ fontFamily: "Georgia, serif", color: "#374151", fontSize: "0.95rem" }}>{ex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main layout */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>

          {/* Practice rows */}
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "700", fontSize: "0.85rem", color: "#374151", marginBottom: "0.75rem" }}>
              Now, using SS1, write your own sentences:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    minWidth: "72px", fontSize: "0.8rem", fontWeight: "600",
                    color: "#6b7280", textAlign: "right", flexShrink: 0,
                  }}>
                    Practice {i + 1}
                  </span>
                  <input
                    type="text"
                    value={inputs[i]}
                    onChange={(e) => setInput(i, e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") submitRow(i); }}
                    disabled={results[i] !== null}
                    placeholder="Write your sentence here..."
                    style={{
                      flex: 1,
                      padding: "0.45rem 0.65rem",
                      borderRadius: "8px",
                      border: `2px solid ${results[i] === true ? "#22c55e" : results[i] === false ? "#ef4444" : "#e5e7eb"}`,
                      background: results[i] === true ? "#f0fdf4" : results[i] === false ? "#fef2f2" : "white",
                      fontSize: "0.88rem",
                      fontFamily: "Georgia, serif",
                      color: "#1a1a1a",
                      outline: "none",
                    }}
                  />
                  <div style={{ width: "24px", textAlign: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                    {results[i] === true ? <span style={{ color: "#22c55e" }}>✓</span>
                      : results[i] === false ? <span style={{ color: "#ef4444" }}>✗</span> : null}
                  </div>
                  <button
                    onClick={() => submitRow(i)}
                    disabled={!inputs[i].trim() || results[i] !== null}
                    style={{
                      padding: "0.4rem 0.9rem", borderRadius: "8px",
                      border: "2px solid #1a1a1a",
                      background: results[i] !== null || !inputs[i].trim() ? "#e5e7eb" : "#f97316",
                      color: results[i] !== null || !inputs[i].trim() ? "#9ca3af" : "white",
                      fontWeight: "600", fontSize: "0.78rem",
                      cursor: results[i] !== null || !inputs[i].trim() ? "not-allowed" : "pointer",
                      boxShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                      minWidth: "64px", flexShrink: 0,
                    }}>
                    Submit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Word Bank Suggestion sidebar */}
          <div style={{ width: "260px", flexShrink: 0 }}>
            <div style={{
              background: "white", borderRadius: "16px", border: "1px solid #fed7aa",
              padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              position: "sticky", top: "1rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "#374151" }}>💡 Word Bank Suggestions</span>
                <button onClick={() => refreshSuggestions(pool)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "0.72rem", color: "#f97316", fontWeight: "600", padding: "0",
                }}>↺ New</button>
              </div>

              {!suggestions ? (
                <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Loading...</p>
              ) : (
                <>
                  {[
                    { label: "Articles", words: suggestions.articles, color: "#8b5cf6" },
                    { label: "Subject Nouns", words: suggestions.subject_nouns, color: "#f97316" },
                    { label: "Verbs", words: suggestions.action_verbs, color: "#2563eb" },
                    { label: "Object Nouns", words: suggestions.object_nouns, color: "#16a34a" },
                    { label: "Adjectives", words: suggestions.adjectives, color: "#db2777" },
                  ].map(({ label, words, color }) => (
                    <div key={label} style={{ marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: "700", color: "#9ca3af", margin: "0 0 0.4rem", letterSpacing: "0.05em" }}>
                        {label.toUpperCase()}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {words.map((word, i) => (
                          <span key={i} style={{
                            padding: "0.2rem 0.5rem", borderRadius: "6px",
                            background: `${color}15`, border: `1px solid ${color}40`,
                            color, fontSize: "0.8rem", cursor: "pointer",
                            fontFamily: "Georgia, serif",
                          }}>
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
              <p style={{ fontSize: "0.65rem", color: "#d1d5db", margin: "0.5rem 0 0", textAlign: "center" }}>
                Click a word to copy it
              </p>
            </div>
          </div>

          {/* Score card */}
          <div style={{ width: "120px", flexShrink: 0 }}>
            <div style={{
              background: "white", borderRadius: "16px",
              border: "2px solid #1a1a1a", boxShadow: "4px 4px 0px rgba(0,0,0,0.12)", overflow: "hidden",
            }}>
              <div style={{
                background: "#1a1a1a", color: "white", textAlign: "center",
                padding: "0.4rem", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.05em",
              }}>SCORE</div>
              <div style={{ padding: "1.25rem 0.75rem", textAlign: "center" }}>
                <span style={{
                  fontSize: "2.2rem", fontWeight: "800", lineHeight: 1,
                  color: pct === null ? "#d1d5db" : pct >= 70 ? "#22c55e" : "#ef4444",
                }}>
                  {pct === null ? "—" : `${pct}%`}
                </span>
                {answered > 0 && (
                  <p style={{ fontSize: "0.65rem", color: "#9ca3af", margin: "0.4rem 0 0" }}>
                    {score}/{answered} correct
                  </p>
                )}
              </div>
            </div>

            {/* Go to SS2 button — appears when all 10 are done */}
            {allDone && (
              <button
                onClick={() => history.push("/ss2-practice")}
                style={{
                  marginTop: "0.75rem", width: "100%",
                  padding: "0.6rem 0.5rem", borderRadius: "10px",
                  border: "2px solid #1a1a1a", background: "#f97316",
                  color: "white", fontWeight: "700", fontSize: "0.8rem",
                  cursor: "pointer", boxShadow: "3px 3px 0px rgba(0,0,0,0.12)",
                  textAlign: "center",
                }}>
                Next: SS2 →
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
