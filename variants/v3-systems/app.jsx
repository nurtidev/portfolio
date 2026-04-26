// Systems-led variant — diagram-first, technical schematic
const { useState, useEffect } = React;

function Nav({ lang, setLang, theme, setTheme, t }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#top">
          <span className="sigil">A</span>
          <span>nurtilek<span className="brand-sub">.dev / arch</span></span>
        </a>
        <div className="nav-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-tools">
          <button className="tool-btn" onClick={() => setLang(lang === "ru" ? "en" : "ru")}>{lang.toUpperCase()}</button>
          <button className="tool-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "DARK" : "LIGHT"}</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero-frame">
          <HeroDiagram t={t} />
          <div className="hero-overlay">
            <h1>
              <span className="role">{t.hero.role} · {t.hero.location}</span>
              Asankhan Nurtilek<br/>designs <span style={{ color: "var(--accent)" }}>distributed</span> Go systems.
            </h1>
            <div className="hero-meta">
              <div className="row"><span className="k">STATUS</span><span className="v acc">● {t.hero.status}</span></div>
              <div className="row"><span className="k">EXP</span><span className="v">{t.hero.yoe}</span></div>
              <div className="row"><span className="k">DOMAIN</span><span className="v">FinTech · IoT · CV</span></div>
              <div className="row"><span className="k">STACK</span><span className="v">Go · Kafka · ClickHouse · K8s</span></div>
              <div className="row"><span className="k">RESUME</span><span className="v"><a href="../../assets/resume.pdf" target="_blank" style={{ color: "var(--accent)" }}>resume.pdf →</a></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head">
          <span className="section-num">// 01</span>
          <h2 className="section-title">{t.about.title}</h2>
          <span className="section-meta">profile.spec</span>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>{t.about.body}</p>
            <p style={{ color: "var(--fg-mute)", fontSize: 12 }}>
              {t.about.langs.map((l, i) => <span key={i}>{i > 0 ? " · " : ""}{l.l} <span style={{ color: "var(--fg)" }}>{l.lvl}</span></span>)}
            </p>
          </div>
          <div className="spec-table">
            <div className="spec-header"><span>highlights.csv</span><span>{t.about.highlights.length} rows</span></div>
            {t.about.highlights.map((h, i) => (
              <div key={i} className="spec-row">
                <div className="k">{h.k}</div>
                <div className="v">{h.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience({ t }) {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <div className="section-head">
          <span className="section-num">// 02</span>
          <h2 className="section-title">{t.experience.title}</h2>
          <span className="section-meta">timeline.gantt</span>
        </div>
        <div className="timeline-wrap">
          <div className="timeline-header"><span>2021 → 2026</span><span>4y 7m</span></div>
          <HorizontalTimeline t={t} />
        </div>
        <div className="exp-detail-grid">
          {t.experience.items.map((e, i) => (
            <div key={i} className="exp-detail">
              <div className="exp-detail-head">
                <span className="exp-detail-co">{e.company}</span>
                <span className="exp-detail-period">{e.period} · {e.duration}</span>
              </div>
              <div className="exp-detail-role">{e.role} — {e.sector}</div>
              <ul>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ t }) {
  return (
    <section className="section" id="projects">
      <div className="shell">
        <div className="section-head">
          <span className="section-num">// 03</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <span className="section-meta">{t.projects.items.length} entries</span>
        </div>
        <div className="projects-grid">
          {t.projects.items.map((p, i) => (
            <article key={i} className={`proj ${i === 0 ? "featured" : ""}`}>
              <div className="proj-id">
                <span>P-{String(i + 1).padStart(3, "0")}</span>
                <span className="tag">[{p.tag}]</span>
              </div>
              <h3>{p.name}</h3>
              <div className="proj-where">{p.where}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <div className="proj-metrics-row">
                {p.metrics.map((m, j) => (
                  <div key={j} className="proj-metric">
                    <span className="v">{m.v}</span>
                    <span className="l">{m.l}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack({ t }) {
  return (
    <section className="section" id="stack">
      <div className="shell">
        <div className="section-head">
          <span className="section-num">// 04</span>
          <h2 className="section-title">{t.stack.title}</h2>
          <span className="section-meta">stack.toml</span>
        </div>
        <div className="stack-table">
          {t.stack.groups.map((g, i) => (
            <div key={i} className="stack-row">
              <div className="k">{g.name.replace("_", " ")}</div>
              <div className="v">
                {g.items.map((it, j) => <span key={j}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="edu-grid">
          {t.edu.items.map((e, i) => (
            <div key={i} className="edu-cell">
              <div className="y">{e.y} · {t.edu.eyebrow}</div>
              <div className="d">{e.d}</div>
              <div className="w">{e.w}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="section-head">
          <span className="section-num">// 05</span>
          <h2 className="section-title">{t.contact.eyebrow}</h2>
          <span className="section-meta">interface.contact</span>
        </div>
        <div className="contact-block">
          <div>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>
            <a className="btn" href="../../assets/resume.pdf" target="_blank" rel="noreferrer">
              {t.contact.resume} ↓
            </a>
          </div>
          <div className="contact-list">
            <a className="c-link" href={`mailto:${t.contact.email}`}>
              <span className="lab">EMAIL</span>
              <span className="v">{t.contact.email}</span>
              <span>→</span>
            </a>
            <a className="c-link" href="https://t.me/nurtilek_assankhan" target="_blank">
              <span className="lab">TG</span>
              <span className="v">{t.contact.tg}</span>
              <span>→</span>
            </a>
            <a className="c-link" href="tel:+77775618308">
              <span className="lab">TEL</span>
              <span className="v">{t.contact.phone}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Foot({ t }) {
  return (
    <footer className="foot shell">
      <span>© nurtilek.assankhan · {t.foot.built}</span>
      <span>v3 · systems-led</span>
    </footer>
  );
}

function App() {
  const [lang, setLangRaw] = useState(() => { try { return localStorage.getItem("lang_v3") || "ru"; } catch { return "ru"; } });
  const [theme, setThemeRaw] = useState(() => { try { return localStorage.getItem("theme_v3") || "dark"; } catch { return "dark"; } });

  const setLang = (l) => { setLangRaw(l); try { localStorage.setItem("lang_v3", l); } catch {} };
  const setTheme = (th) => { setThemeRaw(th); try { localStorage.setItem("theme_v3", th); } catch {} };

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  useEffect(() => {
    const els = document.querySelectorAll(".section");
    els.forEach((el) => el.classList.add("fade-in"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const t = window.I18N[lang];

  return (
    <>
      <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Stack t={t} />
      <Contact t={t} />
      <Foot t={t} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
