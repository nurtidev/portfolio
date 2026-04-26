// App shell — navigation, theme + lang state, section assembly.
function Nav({ lang, setLang, theme, setTheme, t }) {
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#stack", label: t.nav.stack },
    { href: "#contact", label: t.nav.contact },
  ];
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#top">
          <span className="monogram">AN</span>
          <span><span className="brand-name">nurtilek.dev</span><span className="brand-role">/ go</span></span>
        </a>
        <div className="nav-links">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <div className="nav-tools">
          <button
            className="tool-btn"
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            title="toggle language"
          >
            <span>{lang === "ru" ? "RU" : "EN"}</span>
            <span style={{ color: "var(--fg-mute)" }}>/</span>
            <span style={{ color: "var(--fg-mute)" }}>{lang === "ru" ? "en" : "ru"}</span>
          </button>
          <button
            className="tool-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="toggle theme"
          >
            <span className="dot"></span>
            <span>{theme === "dark" ? "dark" : "light"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Foot({ t }) {
  return (
    <footer className="foot shell">
      <span>© nurtilek.assankhan · {t.foot.built}</span>
      <span>{t.foot.colophon}</span>
    </footer>
  );
}

function App() {
  const [lang, setLangRaw] = React.useState(() => {
    try { return localStorage.getItem("lang") || "ru"; } catch { return "ru"; }
  });
  const [theme, setThemeRaw] = React.useState(() => {
    try { return localStorage.getItem("theme") || "dark"; } catch { return "dark"; }
  });

  const setLang = (l) => { setLangRaw(l); try { localStorage.setItem("lang", l); } catch {} };
  const setTheme = (th) => { setThemeRaw(th); try { localStorage.setItem("theme", th); } catch {} };

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // fade-in observer
  React.useEffect(() => {
    const els = document.querySelectorAll(".section");
    els.forEach((el) => el.classList.add("fade-in"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const t = window.I18N[lang];

  return (
    <>
      <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
      <Hero t={t} setLang={setLang} />
      <About t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Architecture t={t} />
      <Stack t={t} />
      <Contact t={t} />
      <Foot t={t} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
