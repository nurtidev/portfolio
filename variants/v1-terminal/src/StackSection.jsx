// Stack section v2 — categorized with proficiency dots, core stack featured
function StackSection({ t, lang }) {
  const data = (window.STACK_DATA || {})[lang] || (window.STACK_DATA || {}).ru;
  if (!data) return null;
  const lvlLabels = data.levelLabels;

  const Dots = ({ lvl, max = 5 }) => (
    <span className="dots" aria-label={`level ${lvl} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`dot ${i < lvl ? "on" : ""}`}></span>
      ))}
    </span>
  );

  return (
    <section className="section" id="stack">
      <div className="shell">
        <div className="section-head">
          <div className="eyebrow">{t.stack.eyebrow}</div>
          <h2 className="section-title">{t.stack.title}</h2>
        </div>

        <div className="stack-intro">
          <p>{t.stack.intro}</p>
          <div className="stack-legend">
            <div className="ttl">// proficiency</div>
            {[5, 4, 3, 2].map((n) => (
              <div key={n} className="leg">
                <span className="dots">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`dot legend ${i < n ? "on" : ""}`}></span>
                  ))}
                </span>
                <span className="name">{lvlLabels[n]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core stack — featured */}
        <div className="core-stack">
          <div className="core-stack-head">
            <h3>
              <span className="star">★</span>
              {data.coreTitle}
              <span style={{ color: "var(--fg-mute)", fontSize: 13, marginLeft: 12, fontFamily: "var(--mono)", fontWeight: 400 }}>
                — {data.coreSubtitle}
              </span>
            </h3>
            <div className="sub">{data.coreNote}</div>
          </div>
          <div className="core-grid">
            {data.core.map((c) => (
              <div key={c.name} className="core-cell">
                <div className="core-name">
                  <span>{c.name}</span>
                  <span className="core-years">{c.years}+ {data.yearsLabel}</span>
                </div>
                <div className="core-dots"><Dots lvl={c.level} /></div>
                <div className="core-note">{c.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized grid removed per design feedback — core stack alone is enough */}

        {/* Education stays here */}
        <div className="edu" style={{ marginTop: 64 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div className="eyebrow">{t.edu.eyebrow}</div>
            <h2 className="section-title" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>—</h2>
          </div>
          {t.edu.items.map((e, i) => (
            <div key={i} className="edu-row">
              <div className="edu-y">{e.y}</div>
              <div className="edu-d">{e.d}</div>
              <div className="edu-w">{e.w}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.StackSection = StackSection;
