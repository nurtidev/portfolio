// Horizontal experience timeline (Gantt-style)
function HorizontalTimeline({ t }) {
  // Date range: Sep 2021 → Mar 2026 (≈54 months)
  const items = [
    { co: "Darwin Tech Labs",     start: 2021 + 8/12,  end: 2023 + 9/12,  role: "Golang", color: "oklch(0.65 0.14 280)" },
    { co: "Sergek Technologies",  start: 2023 + 10/12, end: 2024 + 6/12,  role: "Golang", color: "oklch(0.7 0.14 50)" },
    { co: "Astana IT University", start: 2023 + 8/12,  end: 2025 + 10/12, role: "Engineer", color: "oklch(0.7 0.14 145)" },
    { co: "eMoney.ge",            start: 2024 + 6/12,  end: 2026 + 2/12,  role: "Golang", color: "oklch(0.78 0.16 220)" },
  ];
  // SVG layout
  const W = 1000, H = 240;
  const padL = 180, padR = 50, padT = 30, padB = 40;
  const t0 = 2021 + 8/12, t1 = 2026 + 3/12;
  const xOf = (yr) => padL + ((yr - t0) / (t1 - t0)) * (W - padL - padR);
  const years = [2022, 2023, 2024, 2025, 2026];
  const rowH = 36;

  return (
    <svg className="timeline-svg" viewBox={`0 0 ${W} ${H}`}>
      {/* axis */}
      <line className="axis-line" x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} />
      {years.map((y) => (
        <g key={y}>
          <line className="axis-tick" x1={xOf(y)} y1={H - padB} x2={xOf(y)} y2={H - padB + 4} />
          <text className="axis-text" x={xOf(y)} y={H - padB + 18} textAnchor="middle">{y}</text>
        </g>
      ))}
      {/* now line */}
      <line className="now-line" x1={xOf(2026 + 3/12)} y1={padT - 8} x2={xOf(2026 + 3/12)} y2={H - padB} />
      <text className="now-text" x={xOf(2026 + 3/12)} y={padT - 14} textAnchor="middle">NOW</text>

      {/* bars */}
      {items.map((it, i) => {
        const y = padT + i * rowH;
        const x1 = xOf(it.start), x2 = xOf(it.end);
        return (
          <g key={i} className="bar">
            <text className="bar-text" x={padL - 14} y={y + 14} textAnchor="end">{it.co}</text>
            <rect className="bar-rect" x={x1} y={y} width={x2 - x1} height={20} fill={it.color} fillOpacity="0.85" />
            <text x={x1 + 8} y={y + 14} className="bar-text role" fill="var(--bg)">{it.role}</text>
          </g>
        );
      })}
    </svg>
  );
}
window.HorizontalTimeline = HorizontalTimeline;
