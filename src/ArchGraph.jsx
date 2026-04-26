// Architecture graph — animated packet flow
function ArchGraph({ t }) {
  // Layout grid in viewBox 800x440
  // Nodes positioned for visual rhythm
  const N = t.arch.nodes;
  const nodes = [
    { id: "client",   x: 60,  y: 200, w: 110, h: 44, label: N.client,   sub: "web · mobile" },
    { id: "gateway",  x: 230, y: 200, w: 130, h: 50, label: N.gateway,  sub: "tls · auth · rate-limit", gw: true },
    { id: "auth",     x: 410, y: 60,  w: 130, h: 44, label: N.auth,     sub: "jwt · 2fa" },
    { id: "payments", x: 410, y: 130, w: 130, h: 44, label: N.payments, sub: "go · idempotent" },
    { id: "ledger",   x: 410, y: 200, w: 130, h: 44, label: N.ledger,   sub: "go · tx · ACID" },
    { id: "risk",     x: 410, y: 270, w: 130, h: 44, label: N.risk,     sub: "grpc · ml" },
    { id: "kafka",    x: 410, y: 350, w: 130, h: 44, label: N.kafka,    sub: "events · async" },
    { id: "pg",       x: 600, y: 100, w: 130, h: 44, label: N.pg,       sub: "primary store" },
    { id: "redis",    x: 600, y: 170, w: 130, h: 44, label: N.redis,    sub: "cache · locks" },
    { id: "ch",       x: 600, y: 240, w: 130, h: 44, label: N.ch,       sub: "olap · 4–5×" },
    { id: "prom",     x: 600, y: 350, w: 130, h: 44, label: N.prom,     sub: "metrics · grafana" },
  ];
  const idx = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Edge endpoints (right-mid of src to left-mid of dst)
  const portR = (n) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
  const portL = (n) => ({ x: n.x, y: n.y + n.h / 2 });

  const edges = [
    ["client", "gateway"],
    ["gateway", "auth"],
    ["gateway", "payments"],
    ["gateway", "ledger"],
    ["gateway", "risk"],
    ["payments", "kafka"],
    ["risk", "kafka"],
    ["payments", "pg"],
    ["ledger", "pg"],
    ["payments", "redis"],
    ["kafka", "ch"],
    ["payments", "prom"],
    ["ledger", "prom"],
  ];

  const edgePath = (a, b) => {
    const p1 = portR(idx[a]);
    const p2 = portL(idx[b]);
    const mx = (p1.x + p2.x) / 2;
    return `M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  // Animated packets along key paths
  const pulses = [
    { path: edgePath("client", "gateway"), dur: 2.4, delay: 0 },
    { path: edgePath("gateway", "payments"), dur: 2.0, delay: 0.4 },
    { path: edgePath("payments", "kafka"), dur: 2.6, delay: 1.0 },
    { path: edgePath("payments", "pg"), dur: 2.2, delay: 0.8 },
    { path: edgePath("kafka", "ch"), dur: 2.4, delay: 1.4 },
    { path: edgePath("gateway", "risk"), dur: 2.6, delay: 0.6 },
  ];

  return (
    <div className="arch-wrap">
      <svg className="arch-svg" viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.5" />
          </marker>
        </defs>

        {/* edges */}
        {edges.map(([a, b], i) => (
          <path key={i} className="edge" d={edgePath(a, b)} markerEnd="url(#arrow)" />
        ))}

        {/* animated pulses */}
        {pulses.map((p, i) => (
          <circle key={`p${i}`} className="pulse-dot" r="3.5">
            <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} path={p.path} />
            <animate attributeName="opacity" values="0;1;1;0" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
          </circle>
        ))}

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect className={`node-rect ${n.gw ? "gw" : ""}`}
              x={n.x} y={n.y} width={n.w} height={n.h} rx="0" />
            <text className="node-text" x={n.x + n.w / 2} y={n.y + n.h / 2 - 3}>{n.label}</text>
            <text className="node-text dim" x={n.x + n.w / 2} y={n.y + n.h / 2 + 11}>{n.sub}</text>
          </g>
        ))}
      </svg>
      <p className="arch-caption">{t.arch.caption}</p>
    </div>
  );
}

window.ArchGraph = ArchGraph;
