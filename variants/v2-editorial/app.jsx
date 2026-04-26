// Editorial variant — minimal interactivity, serif-led
const { useState, useEffect } = React;

function Nav({ lang, setLang, theme, setTheme, t }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#top">Asankhan <span className="amp">&amp;</span> Co.</a>
        <div className="nav-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-tools">
          <button className="tool-btn" onClick={() => setLang(lang === "ru" ? "en" : "ru")}>{lang.toUpperCase()}</button>
          <button className="tool-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "☾" : "☀"}</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          <span>{t.hero.status}</span>
          <span>·</span>
          <span>{t.hero.location}</span>
        </div>
        <h1 className="hero-name">Asankhan <em>Nurtilek</em></h1>
        <p className="hero-lede">
          {t.about.title}
        </p>
        <div className="hero-meta">
          <span><b>{t.hero.role}</b></span>
          <span>·</span>
          <span>{t.hero.yoe}</span>
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  // Build a single highlights paragraph using prose-with-pulls
  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="section-rule">
          <span className="section-num">§ 01</span>
          <h2 className="section-title">{t.about.eyebrow.toLowerCase()}</h2>
          <span className="section-kicker">{t.hero.role}</span>
        </div>
        <p className="lede">{t.about.body}</p>
        <p className="highlights-prose">
          {t.about.highlights.map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && " · "}
              <span className="pull">{h.k}</span> — {h.v}
            </React.Fragment>
          ))}
          .
        </p>
        <div className="about-meta">
          {t.about.langs.map((l, i) => (
            <div key={i}>
              <div className="k">{l.l}</div>
              <div className="v">{l.lvl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ t }) {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <div className="section-rule">
          <span className="section-num">§ 02</span>
          <h2 className="section-title">{t.experience.title.toLowerCase()}</h2>
        </div>
        {t.experience.items.map((e, i) => (
          <div key={i} className="exp-item">
            <div className="exp-year">
              <b>{e.period.split(" — ")[0]}</b>
              {e.period.split(" — ")[1] || ""}
              <div style={{ marginTop: 8, color: "var(--ink-mute)" }}>{e.duration}</div>
            </div>
            <div className="exp-content">
              <h3>{e.role} <em>at {e.company}</em></h3>
              <div className="where">{e.sector}</div>
              <p>{e.bullets.join(" — ")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects({ t }) {
  return (
    <section className="section" id="projects">
      <div className="shell">
        <div className="section-rule">
          <span className="section-num">§ 03</span>
          <h2 className="section-title">{t.projects.title.toLowerCase()} — selected</h2>
        </div>
        <div className="projects-list">
          {t.projects.items.map((p, i) => (
            <article key={i} className="proj-item">
              <div className="proj-tag">
                <b>nº {String(i + 1).padStart(2, "0")}</b>
                {p.tag}
              </div>
              <div>
                <h3 className="proj-name">{p.name}</h3>
                <div className="proj-where">{p.where}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-metrics">
                  {p.metrics.map((m, j) => (
                    <div key={j} className="m">
                      <span className="v">{m.v}</span>
                      <span className="l">{m.l}</span>
                    </div>
                  ))}
                </div>
                <div className="proj-stack">
                  {p.stack.map((s, j) => <span key={j}>{s}</span>)}
                </div>
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
        <div className="section-rule">
          <span className="section-num">§ 04</span>
          <h2 className="section-title">{t.stack.title.toLowerCase()} &amp; tools</h2>
        </div>
        <div className="stack-list">
          {t.stack.groups.map((g, i) => (
            <div key={i} className="stack-row">
              <div className="k">{g.name.replace("_", " ")}</div>
              <div className="v">
                {g.items.map((it, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && <em>, </em>}
                    {it}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="edu-block">
          <h3>{t.edu.eyebrow.toLowerCase()}</h3>
          {t.edu.items.map((e, i) => (
            <div key={i} className="edu-row">
              <div className="y">{e.y}</div>
              <div><b>{e.d}</b> <em>· {e.w}</em></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section className="contact-block" id="contact">
      <div className="shell">
        <span className="section-num" style={{ display: "block", marginBottom: 16 }}>§ 05 — get in touch</span>
        <h2>Open to <em>interesting problems.</em></h2>
        <p>{t.contact.body}</p>
        <a className="btn" href="../../assets/resume.pdf" target="_blank" rel="noreferrer">
          {t.contact.resume} →
        </a>
        <div className="contact-grid">
          <a className="c-link" href={`mailto:${t.contact.email}`}>
            <span className="lab">email</span>
            <span className="v">{t.contact.email}</span>
          </a>
          <a className="c-link" href="https://t.me/nurtilek_assankhan" target="_blank" rel="noreferrer">
            <span className="lab">telegram</span>
            <span className="v">{t.contact.tg}</span>
          </a>
          <a className="c-link" href="tel:+77775618308">
            <span className="lab">phone</span>
            <span className="v">{t.contact.phone}</span>
          </a>
          <a className="c-link" href="../../assets/resume.pdf">
            <span className="lab">document</span>
            <span className="v">resume.pdf</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Foot({ t }) {
  return (
    <footer className="foot shell">
      <span>© Asankhan Nurtilek · {t.foot.built}</span>
      <span>{t.foot.colophon}</span>
    </footer>
  );
}

function App() {
  const [lang, setLangRaw] = useState(() => { try { return localStorage.getItem("lang_v2") || "ru"; } catch { return "ru"; } });
  const [theme, setThemeRaw] = useState(() => { try { return localStorage.getItem("theme_v2") || "light"; } catch { return "light"; } });

  const setLang = (l) => { setLangRaw(l); try { localStorage.setItem("lang_v2", l); } catch {} };
  const setTheme = (th) => { setThemeRaw(th); try { localStorage.setItem("theme_v2", th); } catch {} };

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  useEffect(() => {
    const els = document.querySelectorAll(".section, .contact-block");
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
