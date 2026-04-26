// Terminal mini-shell for hero
const { useState, useRef, useEffect } = React;

const TERM_HISTORY_INITIAL = [
  { kind: "out", t: "nurtidev — bash 5.2 · port 4000 · 2026" },
  { kind: "out dim", t: "type 'help' to see available commands" },
  { kind: "cmd", t: "whoami" },
  { kind: "out", t: "asankhan_n — backend engineer · senior golang · astana" },
  { kind: "cmd", t: "uptime" },
  { kind: "out", t: "4y 7m of commercial experience · open to opportunities" },
];

function runCommand(input, setLines, t, setLang) {
  const cmd = input.trim().toLowerCase();
  const push = (entries) => setLines((prev) => [...prev, { kind: "cmd", t: input }, ...entries]);

  if (!cmd) return;

  switch (cmd) {
    case "help":
      push([
        { kind: "out", t: "available: whoami · skills · projects · contact · stack · clear · github · ru / en · theme" },
      ]);
      break;
    case "whoami":
      push([{ kind: "out", t: "asankhan nurtilek · senior golang developer · 25 · astana, kz" }]);
      break;
    case "skills":
      push([
        { kind: "out acc", t: "go · postgres · clickhouse · kafka · grpc · k8s · docker" },
        { kind: "out dim", t: "+ python, redis, prometheus, grafana, mysql, elasticsearch" },
      ]);
      break;
    case "projects":
      push([
        { kind: "out", t: "1. hse forecasting platform — astana hub demo day '26 winner" },
        { kind: "out", t: "2. emoney payments core — fintech backend, kafka, mysql tuning" },
        { kind: "out", t: "3. sergek traffic analytics — clickhouse migration, antifraud" },
        { kind: "out", t: "4. dam anomaly detection — yolo + iot, mttd < 10 min" },
        { kind: "out", t: "5. darwin trading engine — microservice trading, crypto wallets" },
      ]);
      break;
    case "stack":
      push([
        { kind: "out dim", t: "// proficiency: ●●●●● expert  ●●●●○ strong  ●●●○○ working" },
        { kind: "out", t: "languages.....: go ●●●●●  python ●●●○○  sql ●●●●●  js ●●●○○" },
        { kind: "out", t: "databases.....: postgresql ●●●●●  mysql ●●●●○  clickhouse ●●●●○  redis ●●●●○" },
        { kind: "out", t: "messaging.....: kafka ●●●●○  rabbitmq ●●●○○  grpc ●●●●●  rest ●●●●●" },
        { kind: "out", t: "platform......: docker ●●●●●  k8s ●●●○○  gitlab ci ●●●●○  linux ●●●●○" },
        { kind: "out", t: "observability.: prometheus ●●●●○  grafana ●●●●○  zap ●●●●○  otel ●●●○○" },
        { kind: "out", t: "ai / cv.......: yolo ●●●○○  cursor ●●●●○  claude code ●●●●○" },
        { kind: "out acc", t: "→ scroll to #stack for full breakdown with descriptions" },
      ]);
      break;
    case "contact":
      push([
        { kind: "out", t: "email.....: nurtilek.assankhan@gmail.com" },
        { kind: "out", t: "telegram..: @nurtilek_assankhan" },
        { kind: "out", t: "phone.....: +7 (777) 561-83-08" },
      ]);
      break;
    case "github":
      push([{ kind: "out dim", t: "no public profile linked yet — ping me on telegram" }]);
      break;
    case "clear":
      setLines([]);
      break;
    case "ru":
      setLang("ru");
      push([{ kind: "out acc", t: "→ язык переключён на русский" }]);
      break;
    case "en":
      setLang("en");
      push([{ kind: "out acc", t: "→ language switched to english" }]);
      break;
    case "theme":
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      push([{ kind: "out acc", t: `→ theme: ${next}` }]);
      break;
    case "ls":
    case "ls -la":
      push([
        { kind: "out dim", t: "drwxr-xr-x  experience/" },
        { kind: "out dim", t: "drwxr-xr-x  projects/" },
        { kind: "out dim", t: "-rw-r--r--  resume.pdf" },
        { kind: "out dim", t: "-rw-r--r--  contact.txt" },
      ]);
      break;
    case "sudo rm -rf /":
      push([{ kind: "out", t: "nice try 🙂" }]);
      break;
    default:
      push([{ kind: "out dim", t: `command not found: ${cmd} — try 'help'` }]);
  }
}

function Terminal({ t, setLang }) {
  const [lines, setLines] = useState(TERM_HISTORY_INITIAL);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hi, setHi] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      const v = input;
      if (v.trim()) setHistory((h) => [...h, v]);
      setHi(-1);
      runCommand(v, setLines, t, setLang);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = hi === -1 ? history.length - 1 : Math.max(0, hi - 1);
      setHi(ni);
      setInput(history[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hi === -1) return;
      const ni = hi + 1;
      if (ni >= history.length) {
        setHi(-1);
        setInput("");
      } else {
        setHi(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const opts = ["help", "whoami", "skills", "projects", "stack", "contact", "github", "clear", "theme", "ru", "en"];
      const m = opts.find((o) => o.startsWith(input.trim().toLowerCase()));
      if (m) setInput(m);
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="term-bar">
        <span className="pip r"></span>
        <span className="pip y"></span>
        <span className="pip g"></span>
        <span className="term-title">~/nurtidev — zsh</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={`term-line ${l.kind}`}>{l.t}</div>
        ))}
      </div>
      <div className="term-input-line">
        <span className="prompt">❯</span>
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="help"
        />
      </div>
      <div className="term-hint">{t.hero.terminalHint}</div>
    </div>
  );
}

window.Terminal = Terminal;
