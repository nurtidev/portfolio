// Hero architecture diagram for systems-led variant
function HeroDiagram({ t }) {
  const N = t.arch.nodes;
  // viewBox 1000 x 460
  const nodes = [
    { id: "client",   x: 30,  y: 200, w: 120, h: 50, label: N.client,   sub: "web · mobile" },
    { id: "gateway",  x: 220, y: 200, w: 150, h: 56, label: N.gateway,  sub: "tls · auth · rl", gw: true },
    { id: "auth",     x: 440, y: 50,  w: 140, h: 46, label: N.auth,     sub: "jwt · 2fa" },
    { id: "payments", x: 440, y: 130, w: 140, h: 46, label: N.payments, sub: "go · idempotent", hi: true },
    { id: "ledger",   x: 440, y: 210, w: 140, h: 46, label: N.ledger,   sub: "go · acid tx" },
    { id: "risk",     x: 440, y: 290, w: 140, h: 46, label: N.risk,     sub: "grpc · ml" },
    { id: "kafka",    x: 440, y: 370, w: 140, h: 46, label: N.kafka,    sub: "events · async" },
    { id: "pg",       x: 660, y: 80,  w: 150, h: 46, label: N.pg,       sub: "primary store" },
    { id: "redis",    x: 660, y: 160, w: 150, h: 46, label: N.redis,    sub: "cache · locks" },
    { id: "ch",       x: 660, y: 240, w: 150, h: 46, label: N.ch,       sub: "olap · 4–5×" },
    { id: "prom",     x: 660, y: 380, w: 150, h: 46, label: N.prom,     sub: "metrics" },
  ];
  const idx = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const portR = (n) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
  const portL = (n) => ({ x: n.x, y: n.y + n.h / 2 });
  const path = (a, b) => {
    const p1 = portR(idx[a]); const p2 = portL(idx[b]);
    const mx = (p1.x + p2.x) / 2;
    return `M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`;
  };
  const edges = [
    ["client", "gateway", true],
    ["gateway", "auth"],
    ["gateway", "payments", true],
    ["gateway", "ledger"],
    ["gateway", "risk"],
    ["payments", "kafka", true],
    ["risk", "kafka"],
    ["payments", "pg", true],
    ["ledger", "pg"],
    ["payments", "redis"],
    ["kafka", "ch", true],
    ["payments", "prom"],
  ];
  const pulses = [
    { p: path("client", "gateway"), d: 2.4, b: 0 },
    { p: path("gateway", "payments"), d: 2.0, b: 0.4 },
    { p: path("payments", "kafka"), d: 2.6, b: 1.0 },
    { p: path("payments", "pg"), d: 2.2, b: 0.8 },
    { p: path("kafka", "ch"), d: 2.4, b: 1.4 },
    { p: path("gateway", "risk"), d: 2.6, b: 0.6 },
  ];

  return (
    <svg className="hero-svg" viewBox="0 0 850 440" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-3" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.5" />
        </marker>
      </defs>

      {/* axis labels */}
      <text className="axis-label" x={30} y={24}>EDGE</text>
      <text className="axis-label" x={220} y={24}>GATEWAY</text>
      <text className="axis-label" x={440} y={24}>SERVICES (Go)</text>
      <text className="axis-label" x={660} y={24}>STATE</text>
      <line x1={210} y1={30} x2={210} y2={420} stroke="var(--line)" strokeDasharray="2 4" />
      <line x1={420} y1={30} x2={420} y2={420} stroke="var(--line)" strokeDasharray="2 4" />
      <line x1={640} y1={30} x2={640} y2={420} stroke="var(--line)" strokeDasharray="2 4" />

      {edges.map(([a, b, hi], i) => (
        <path key={i} className={`edge ${hi ? "hi" : ""}`} d={path(a, b)} markerEnd="url(#arrow-3)" />
      ))}
      {pulses.map((p, i) => (
        <circle key={`p${i}`} className="pulse-dot" r="3.5">
          <animateMotion dur={`${p.d}s`} repeatCount="indefinite" begin={`${p.b}s`} path={p.p} />
          <animate attributeName="opacity" values="0;1;1;0" dur={`${p.d}s`} repeatCount="indefinite" begin={`${p.b}s`} />
        </circle>
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect className={`node-rect ${n.gw ? "gw" : ""} ${n.hi ? "hi" : ""}`}
            x={n.x} y={n.y} width={n.w} height={n.h} />
          <text className="node-text" x={n.x + n.w / 2} y={n.y + n.h / 2 - 4}>{n.label}</text>
          <text className="node-text dim" x={n.x + n.w / 2} y={n.y + n.h / 2 + 11}>{n.sub}</text>
        </g>
      ))}
    </svg>
  );
}
window.HeroDiagram = HeroDiagram;
