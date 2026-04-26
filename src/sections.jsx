// Sections: hero, about, experience, projects, stack, edu, contact
function Hero({ t, setLang }) {
  const headline = t.hero.role;
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="hero-meta">
              <span className="pulse"></span>
              <span>{t.hero.status}</span>
              <span className="sep" style={{ width: 1, height: 12, background: "var(--line-strong)" }}></span>
              <span>{t.hero.location}</span>
            </div>
            <h1>
              <span className="accent">{headline}</span>
            </h1>
            <p className="hero-tagline">{t.hero.tagline}</p>
            <div className="hero-stats">
              <span>◆ {t.hero.yoe}</span>
              <span className="sep"></span>
              <span>◆ Go · Kafka · ClickHouse</span>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#contact">
                {t.hero.ctaPrimary}
                <span className="arrow">→</span>
              </a>
              <a className="btn" href="assets/resume.pdf" target="_blank" rel="noreferrer">
                {t.hero.ctaSecondary}
                <span className="arrow">↓</span>
              </a>
            </div>
          </div>
          <Terminal t={t} setLang={setLang} />
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
          <div className="eyebrow">{t.about.eyebrow}</div>
          <h2 className="section-title">{t.about.title}</h2>
        </div>
        <div className="about-body">
          <div>
            <p className="about-text">{t.about.body}</p>
            <div className="langs">
              {t.about.langs.map((l) => (
                <span key={l.l}><b>{l.l}</b> · {l.lvl}</span>
              ))}
            </div>
          </div>
          <div className="highlights">
            {t.about.highlights.map((h, i) => (
              <div key={i} className="hl-row">
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
          <div className="eyebrow">{t.experience.eyebrow}</div>
          <h2 className="section-title">{t.experience.title}</h2>
        </div>
        <div className="timeline">
          {t.experience.items.map((e, i) => (
            <div key={i} className="exp-row">
              <div className="exp-meta">
                <div className="exp-period">{e.period}</div>
                <span className="exp-duration">{e.duration}</span>
                <span className="exp-sector">{e.sector}</span>
              </div>
              <div className="exp-main">
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">@ {e.company}</div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ t }) {
  const items = t.projects.items;
  return (
    <section className="section" id="projects">
      <div className="shell">
        <div className="section-head">
          <div className="eyebrow">{t.projects.eyebrow}</div>
          <h2 className="section-title">{t.projects.title}</h2>
        </div>
        <div className="projects-grid">
          {items.map((p, i) => (
            <article key={i} className={`project ${i === 0 ? "featured" : ""}`}>
              <span className="project-tag">{p.tag}</span>
              <h3 className="project-name">{p.name}</h3>
              <div className="project-where">{p.where}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-metrics">
                {p.metrics.map((m, j) => (
                  <div key={j} className="metric">
                    <span className="v">{m.v}</span>
                    <span className="l">{m.l}</span>
                  </div>
                ))}
              </div>
              <div className="project-stack">
                {p.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture({ t }) {
  return (
    <section className="section" id="architecture">
      <div className="shell">
        <div className="section-head">
          <div className="eyebrow">{t.arch.eyebrow}</div>
          <h2 className="section-title">{t.arch.title}</h2>
        </div>
        <ArchGraph t={t} />
      </div>
    </section>
  );
}

function Stack({ t }) {
  return (
    <section className="section" id="stack">
      <div className="shell">
        <div className="section-head">
          <div className="eyebrow">{t.stack.eyebrow}</div>
          <h2 className="section-title">{t.stack.title}</h2>
        </div>
        <div className="stack-grid">
          {t.stack.groups.map((g) => (
            <div key={g.name} className="stack-cell">
              <div className="stack-name">{g.name}</div>
              <div className="stack-list">
                {g.items.map((it) => <span key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="edu">
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

function Contact({ t }) {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="section-head">
          <div className="eyebrow">{t.contact.eyebrow}</div>
          <h2 className="section-title">—</h2>
        </div>
        <div className="contact-card">
          <div>
            <h3 className="contact-title">{t.contact.title}</h3>
            <p className="contact-body">{t.contact.body}</p>
            <a className="btn btn-primary" href="assets/resume.pdf" target="_blank" rel="noreferrer">
              {t.contact.resume}
              <span className="arrow">↓</span>
            </a>
          </div>
          <div className="contact-links">
            <a className="c-link" href={`mailto:${t.contact.email}`}>
              <span className="label">EMAIL</span>
              <span className="val">{t.contact.email} <span>→</span></span>
            </a>
            <a className="c-link" href="https://t.me/nurtilek_assankhan" target="_blank" rel="noreferrer">
              <span className="label">TELEGRAM</span>
              <span className="val">{t.contact.tg} <span>→</span></span>
            </a>
            <a className="c-link" href="tel:+77775618308">
              <span className="label">PHONE</span>
              <span className="val">{t.contact.phone} <span>→</span></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
window.About = About;
window.Experience = Experience;
window.Projects = Projects;
window.Architecture = Architecture;
window.Stack = Stack;
window.Contact = Contact;
