// GopherRunner — Chrome dino-style with the Go mascot. No leaderboard.
//
// Controls: Space / ↑ / Click / Tap = jump · ↓ = duck

const GR_W = 1100;
const GR_H = 280;
const GROUND_Y = 232;
const GRAVITY = 0.9;
const JUMP_V = -16.5;
const SPEED_START = 5;
const SPEED_MAX = 14;
const SPEED_RAMP_PER_TICK = 0.0009;
const GOPHER_SCALE = 2;
const GOPHER_W = 32 * GOPHER_SCALE;
const GOPHER_H = 32 * GOPHER_SCALE;

const PHASES = [
  { from: 0,    name: "dev",        sky: "#0a0e12", horizon: "#11161c", ground: "#7FDBFF", grid: "rgba(127,219,255,0.05)", cloud: "rgba(255,255,255,0.05)" },
  { from: 500,  name: "staging",    sky: "#1a1410", horizon: "#2a1c14", ground: "#ffb454", grid: "rgba(255,180,84,0.05)",  cloud: "rgba(255,200,150,0.08)" },
  { from: 1500, name: "production", sky: "#0e0518", horizon: "#1a0a28", ground: "#a78bfa", grid: "rgba(167,139,250,0.05)", cloud: "rgba(200,180,255,0.05)" },
  { from: 3000, name: "scale",      sky: "#000814", horizon: "#001a2a", ground: "#5af5b6", grid: "rgba(90,245,182,0.05)",  cloud: "rgba(150,255,200,0.04)" },
  { from: 5000, name: "incident",   sky: "#1a0006", horizon: "#2a000a", ground: "#ff5b6e", grid: "rgba(255,91,110,0.06)",  cloud: "rgba(255,130,140,0.06)" },
];

function currentPhase(score) {
  let p = PHASES[0];
  for (const ph of PHASES) if (score >= ph.from) p = ph;
  return p;
}

const OBSTACLES = [
  { kind: "panic",    label: "panic",    w: 26, h: 44, color: "#ff5b6e", minSpeed: 0   },
  { kind: "nil",      label: "nil",      w: 22, h: 36, color: "#ffb454", minSpeed: 0   },
  { kind: "deadlock", label: "deadlock", w: 38, h: 32, color: "#a78bfa", minSpeed: 6   },
  { kind: "race",     label: "race",     w: 32, h: 30, color: "#ec4899", minSpeed: 8, flying: true },
  { kind: "panic2x",  label: "panic ×2", w: 56, h: 44, color: "#ff5b6e", minSpeed: 10  },
];

function pickObstacle(speed) {
  const pool = OBSTACLES.filter((o) => speed >= o.minSpeed);
  return pool[Math.floor(Math.random() * pool.length)];
}

function drawSprite(ctx, frame, x, y, scale) {
  const palette = window.GOPHER_PALETTE;
  for (let row = 0; row < frame.length; row++) {
    const line = frame[row];
    for (let col = 0; col < line.length; col++) {
      const ch = line[col];
      if (ch === "." || !palette[ch]) continue;
      ctx.fillStyle = palette[ch];
      ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
    }
  }
}

function drawObstacle(ctx, ob) {
  const def = ob.def;
  ctx.fillStyle = def.color;
  if (def.kind === "panic" || def.kind === "panic2x") {
    const count = def.kind === "panic2x" ? 2 : 1;
    const w = def.w / count;
    for (let i = 0; i < count; i++) {
      const x0 = ob.x + i * w;
      ctx.beginPath();
      ctx.moveTo(x0, ob.y + def.h);
      ctx.lineTo(x0 + w / 2 - 2, ob.y + 6);
      ctx.lineTo(x0 + w / 2, ob.y);
      ctx.lineTo(x0 + w / 2 + 2, ob.y + 6);
      ctx.lineTo(x0 + w, ob.y + def.h);
      ctx.closePath();
      ctx.fill();
    }
  } else if (def.kind === "nil") {
    ctx.fillRect(ob.x, ob.y + 6, def.w, def.h - 6);
    ctx.fillRect(ob.x - 2, ob.y, def.w + 4, 6);
    ctx.fillStyle = "#0a0a0a";
    ctx.font = "bold 9px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("nil", ob.x + def.w / 2, ob.y + def.h - 8);
  } else if (def.kind === "deadlock") {
    ctx.fillRect(ob.x, ob.y, def.w, def.h);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(ob.x + 4, ob.y + 6, def.w - 8, 3);
    ctx.fillRect(ob.x + 4, ob.y + 13, def.w - 8, 3);
    ctx.fillRect(ob.x + 4, ob.y + 20, def.w - 8, 3);
  } else if (def.kind === "race") {
    ctx.beginPath();
    ctx.moveTo(ob.x + def.w / 2, ob.y);
    ctx.lineTo(ob.x + def.w, ob.y + def.h / 2);
    ctx.lineTo(ob.x + def.w / 2, ob.y + def.h);
    ctx.lineTo(ob.x, ob.y + def.h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.moveTo(ob.x + def.w / 2, ob.y + 6);
    ctx.lineTo(ob.x + def.w - 8, ob.y + def.h / 2);
    ctx.lineTo(ob.x + def.w / 2, ob.y + def.h - 6);
    ctx.lineTo(ob.x + 8, ob.y + def.h / 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "10px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(def.label, ob.x + def.w / 2, ob.y - 6);
}

function GopherRunner({ t }) {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const stateRef = React.useRef(null);
  const [running, setRunning] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [phaseName, setPhaseName] = React.useState(PHASES[0].name);
  const [best, setBest] = React.useState(() => {
    try { return parseInt(localStorage.getItem("gopher_best") || "0", 10); } catch { return 0; }
  });

  const reset = () => {
    stateRef.current = {
      gopher: {
        x: 100,
        // anchor feet at GROUND_Y
        y: GROUND_Y - GOPHER_H,
        vy: 0,
        h: GOPHER_H,
        w: GOPHER_W,
        ducking: false,
        onGround: true,
      },
      obstacles: [],
      speed: SPEED_START,
      distance: 0,
      tick: 0,
      groundOffset: 0,
      cloudOffset: 0,
      starOffset: 0,
      flash: 0,
      phaseHi: 0,
      clouds: [
        { x: 200, y: 50,  s: 1.0 },
        { x: 480, y: 80,  s: 0.8 },
        { x: 760, y: 35,  s: 1.2 },
        { x: 980, y: 70,  s: 0.9 },
      ],
      stars: Array.from({ length: 30 }, () => ({
        x: Math.random() * GR_W, y: Math.random() * (GROUND_Y - 30), s: Math.random() < 0.3 ? 2 : 1,
      })),
    };
    setScore(0);
    setLevel(1);
    setPhaseName(PHASES[0].name);
    setGameOver(false);
  };

  React.useEffect(() => { reset(); }, []);

  const start = () => {
    if (!stateRef.current || gameOver) reset();
    setRunning(true);
  };

  const jump = () => {
    if (!running) { start(); return; }
    const g = stateRef.current.gopher;
    if (g.onGround && !g.ducking) {
      g.vy = JUMP_V;
      g.onGround = false;
    }
  };

  const setDuck = (on) => {
    if (!running) return;
    const g = stateRef.current.gopher;
    g.ducking = on && g.onGround;
  };

  React.useEffect(() => {
    const isTyping = () => {
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      return tag === "INPUT" || tag === "TEXTAREA";
    };
    const inView = () => {
      const wrap = wrapRef.current;
      if (!wrap) return false;
      const rect = wrap.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
    };
    const onKey = (e) => {
      if (isTyping() || !inView()) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        setDuck(true);
      }
    };
    const onKeyUp = (e) => {
      if (e.code === "ArrowDown") setDuck(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [running, gameOver]);

  const onDeath = (finalScore) => {
    setRunning(false);
    setGameOver(true);
    if (finalScore > best) {
      setBest(finalScore);
      try { localStorage.setItem("gopher_best", String(finalScore)); } catch {}
    }
  };

  // game loop
  React.useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let frameCount = 0;

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;
      s.tick++;
      frameCount++;

      const g = s.gopher;
      g.vy += GRAVITY;
      g.y += g.vy;

      // duck shrinks the hitbox; standing height is GOPHER_H
      const targetH = g.ducking ? GOPHER_H * 0.6 : GOPHER_H;
      g.h = targetH;
      // anchor feet to GROUND_Y when on ground
      if (g.y + g.h >= GROUND_Y) {
        g.y = GROUND_Y - g.h;
        g.vy = 0;
        g.onGround = true;
      } else {
        g.onGround = false;
      }

      if (s.speed < SPEED_MAX) s.speed += SPEED_RAMP_PER_TICK;
      s.distance += s.speed;
      const sc = Math.floor(s.distance / 4);

      // spawn
      const minGap = Math.max(280, 700 - s.speed * 22);
      const lastOb = s.obstacles[s.obstacles.length - 1];
      const gapOk = !lastOb || (GR_W - lastOb.x > minGap + Math.random() * 220);
      if (gapOk && Math.random() < 0.022 + Math.min(0.02, s.speed * 0.001)) {
        const def = pickObstacle(s.speed);
        const flying = def.flying;
        const baseY = GROUND_Y - def.h;
        const y = flying ? GROUND_Y - GOPHER_H - 18 - Math.random() * 22 : baseY;
        s.obstacles.push({ x: GR_W + 30, y, def });
      }
      s.obstacles.forEach((o) => { o.x -= s.speed; });
      s.obstacles = s.obstacles.filter((o) => o.x + o.def.w > -10);

      // collision (forgiving hitbox)
      for (const o of s.obstacles) {
        const padX = 10, padY = 8;
        const gx = g.x + padX, gy = g.y + padY, gw = g.w - padX * 2, gh = g.h - padY * 2;
        if (gx < o.x + o.def.w && gx + gw > o.x && gy < o.y + o.def.h && gy + gh > o.y) {
          onDeath(sc);
          return;
        }
      }

      const ph = currentPhase(sc);
      const phIdx = PHASES.indexOf(ph);
      if (phIdx > s.phaseHi) {
        s.phaseHi = phIdx;
        s.flash = 30;
        setPhaseName(ph.name);
      }
      const lvl = 1 + Math.floor(sc / 500);
      if (lvl !== level) setLevel(lvl);

      s.groundOffset = (s.groundOffset + s.speed) % 24;
      s.cloudOffset = (s.cloudOffset + s.speed * 0.25) % (GR_W + 200);
      s.starOffset = (s.starOffset + s.speed * 0.05) % GR_W;

      setScore(sc);

      // ===== DRAW =====
      const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
      sky.addColorStop(0, ph.sky);
      sky.addColorStop(1, ph.horizon);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, GR_W, GROUND_Y);

      if (phIdx >= 2) {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        s.stars.forEach((st) => {
          const x = ((st.x - s.starOffset) % GR_W + GR_W) % GR_W;
          ctx.fillRect(x, st.y, st.s, st.s);
        });
      }

      ctx.fillStyle = ph.grid;
      for (let x = -((s.distance) % 60); x < GR_W; x += 60) {
        ctx.fillRect(x, 0, 1, GROUND_Y);
      }
      for (let y = 30; y < GROUND_Y; y += 50) {
        ctx.fillRect(0, y, GR_W, 1);
      }

      ctx.fillStyle = ph.cloud;
      s.clouds.forEach((c) => {
        const x = ((c.x - s.cloudOffset) % (GR_W + 200) + (GR_W + 200)) % (GR_W + 200) - 100;
        const w = 50 * c.s, h = 6 * c.s;
        ctx.fillRect(x, c.y, w, h);
        ctx.fillRect(x + 8 * c.s, c.y - 4 * c.s, w - 16 * c.s, h);
        ctx.fillRect(x + 16 * c.s, c.y - 8 * c.s, w - 32 * c.s, h);
      });

      ctx.fillStyle = phIdx >= 2 ? "#04080c" : "#06090c";
      ctx.fillRect(0, GROUND_Y, GR_W, GR_H - GROUND_Y);

      ctx.strokeStyle = ph.ground + "88";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 1);
      ctx.lineTo(GR_W, GROUND_Y + 1);
      ctx.stroke();

      ctx.fillStyle = ph.ground + "44";
      for (let x = -s.groundOffset; x < GR_W; x += 24) {
        ctx.fillRect(x, GROUND_Y + 8, 8, 2);
      }
      ctx.fillStyle = ph.ground + "22";
      for (let x = -s.groundOffset * 0.6; x < GR_W; x += 36) {
        ctx.fillRect(x, GROUND_Y + 18, 4, 1);
      }

      // gopher frame select
      let frameKey;
      if (!g.onGround) frameKey = "jump";
      else if (g.ducking) frameKey = "duck";
      else {
        const runFrames = ["run1", "run2", "run3", "run4"];
        const speedFactor = Math.max(2, Math.floor(36 / s.speed));
        frameKey = runFrames[Math.floor(frameCount / speedFactor) % runFrames.length];
      }
      const frame = window.GOPHER_FRAMES[frameKey];
      // anchor feet at GROUND_Y. Sprite is 32 rows × scale.
      const drawY = GROUND_Y - frame.length * GOPHER_SCALE;
      drawSprite(ctx, frame, g.x, drawY, GOPHER_SCALE);

      s.obstacles.forEach((o) => drawObstacle(ctx, o));

      if (s.flash > 0) {
        ctx.fillStyle = `rgba(127,219,255,${0.08 * (s.flash / 30)})`;
        ctx.fillRect(0, 0, GR_W, GROUND_Y);
        s.flash--;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, best, level]);

  // overlay (idle / game-over)
  React.useEffect(() => {
    if (running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const ph = PHASES[0];
    const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    sky.addColorStop(0, ph.sky);
    sky.addColorStop(1, ph.horizon);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, GR_W, GROUND_Y);

    ctx.fillStyle = ph.grid;
    for (let x = 0; x < GR_W; x += 60) ctx.fillRect(x, 0, 1, GROUND_Y);
    for (let y = 30; y < GROUND_Y; y += 50) ctx.fillRect(0, y, GR_W, 1);

    ctx.fillStyle = "#06090c";
    ctx.fillRect(0, GROUND_Y, GR_W, GR_H - GROUND_Y);
    ctx.strokeStyle = ph.ground + "88";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 1);
    ctx.lineTo(GR_W, GROUND_Y + 1);
    ctx.stroke();
    ctx.fillStyle = ph.ground + "44";
    for (let x = 0; x < GR_W; x += 24) ctx.fillRect(x, GROUND_Y + 8, 8, 2);

    const frame = window.GOPHER_FRAMES.idle;
    const drawY = GROUND_Y - frame.length * GOPHER_SCALE;
    drawSprite(ctx, frame, 100, drawY, GOPHER_SCALE);

    ctx.textAlign = "center";
    if (gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, GR_W, GROUND_Y);
      ctx.fillStyle = "#ff5b6e";
      ctx.font = "bold 22px 'JetBrains Mono', monospace";
      ctx.fillText("panic: runtime error", GR_W / 2, GR_H / 2 - 26);
      ctx.fillStyle = "rgba(220,230,235,0.95)";
      ctx.font = "13px 'JetBrains Mono', monospace";
      ctx.fillText(`uptime: ${score}ms  ·  level ${level}  ·  best: ${best}ms`, GR_W / 2, GR_H / 2);
      ctx.fillStyle = "rgba(180,200,210,0.7)";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillText(t.game.restart || "press space / tap to restart", GR_W / 2, GR_H / 2 + 24);
    } else {
      ctx.fillStyle = "rgba(220,230,235,0.95)";
      ctx.font = "16px 'JetBrains Mono', monospace";
      ctx.fillText(t.game.tap, GR_W / 2, GR_H / 2 - 8);
      ctx.fillStyle = "rgba(180,200,210,0.6)";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillText(t.game.controls, GR_W / 2, GR_H / 2 + 18);
    }
  }, [running, gameOver, score, level, best, t]);

  return (
    <div className="game-wrap" ref={wrapRef}>
      <div className="game-hud">
        <div className="game-hud-l">
          <span className="game-tag">{t.game.tag}</span>
          <span className="game-title-inline">{t.game.subtitle}</span>
        </div>
        <div className="game-hud-r">
          <div className="game-stat"><span className="k">phase</span><span className="v">{phaseName}</span></div>
          <div className="game-stat"><span className="k">lvl</span><span className="v">{level}</span></div>
          <div className="game-stat"><span className="k">score</span><span className="v">{String(score).padStart(5, "0")}</span></div>
          <div className="game-stat"><span className="k">best</span><span className="v">{String(best).padStart(5, "0")}</span></div>
        </div>
      </div>
      <div
        className="game-canvas-wrap"
        tabIndex={0}
        role="button"
        onClick={() => jump()}
        onTouchStart={(e) => { e.preventDefault(); jump(); }}
      >
        <canvas
          ref={canvasRef}
          width={GR_W}
          height={GR_H}
          className="game-canvas"
        />
      </div>
      <div className="game-foot">
        <div className="game-keys">
          <span><kbd>space</kbd> / <kbd>↑</kbd> {t.game.jump}</span>
          <span><kbd>↓</kbd> {t.game.duck}</span>
          <span>{t.game.touch}</span>
        </div>
        <div className="game-legend">
          <span className="lg"><i style={{ background: "#ff5b6e" }}></i>panic</span>
          <span className="lg"><i style={{ background: "#ffb454" }}></i>nil</span>
          <span className="lg"><i style={{ background: "#a78bfa" }}></i>deadlock</span>
          <span className="lg"><i style={{ background: "#ec4899" }}></i>race</span>
        </div>
      </div>
    </div>
  );
}

window.GopherRunner = GopherRunner;
