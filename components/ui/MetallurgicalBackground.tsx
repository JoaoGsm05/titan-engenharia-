"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   MetallurgicalBackground
   Canvas-based animation: molten copper/tin flow + rising sparks
   + sinusoidal metal-stream lines.
   Designed to layer ABOVE the hero photo but BELOW all text.
   ───────────────────────────────────────────────────────────────── */

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  phase: number;
  phaseSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  r: number;
  g: number;
  b: number;
}

interface StreamLine {
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  opacity: number;
  width: number;
  r: number;
  g: number;
  b: number;
}

// Palette
const COLORS = [
  { r: 184, g: 115, b: 51  }, // copper   #B87333
  { r: 232, g: 130, b: 12  }, // amber    #E8820C
  { r: 204, g:  32, b: 32  }, // titan-red #CC2020
  { r: 184, g: 192, b: 200 }, // tin      #B8C0C8
  { r: 220, g: 160, b:  80 }, // warm gold
] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function MetallurgicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const gfx: CanvasRenderingContext2D = rawCtx;

    let raf: number;
    let W = 0;
    let H = 0;
    const c = canvas; // stable non-null reference for closures

    /* ── Resize ── */
    function resize() {
      W = c.offsetWidth;
      H = c.offsetHeight;
      c.width = W;
      c.height = H;
      initStreams();
    }

    /* ── Molten orbs (large, slow, gaseous blobs) ── */
    const orbs: Orb[] = [];
    function initOrbs() {
      orbs.length = 0;
      const count = 6;
      for (let i = 0; i < count; i++) {
        const c = pick(COLORS);
        orbs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: lerp(140, 280, Math.random()),
          r: c.r,
          g: c.g,
          b: c.b,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.002 + Math.random() * 0.003,
        });
      }
    }

    /* ── Metallic stream lines (sinusoidal) ── */
    const streams: StreamLine[] = [];
    function initStreams() {
      streams.length = 0;
      const count = 5;
      for (let i = 0; i < count; i++) {
        const c = i % 2 === 0 ? COLORS[0] : COLORS[1]; // copper / amber alternating
        streams.push({
          y: H * (0.15 + (i / count) * 0.7),
          amplitude: 12 + Math.random() * 20,
          frequency: 0.003 + Math.random() * 0.004,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.012,
          opacity: 0.04 + Math.random() * 0.06,
          width: 1 + Math.random() * 1.5,
          r: c.r,
          g: c.g,
          b: c.b,
        });
      }
    }

    /* ── Sparks / rising particles ── */
    const sparks: Spark[] = [];
    const MAX_SPARKS = 55;

    function spawnSpark() {
      const c = pick(COLORS);
      const maxLife = 90 + Math.random() * 130;
      sparks.push({
        x: Math.random() * W,
        y: H * 0.6 + Math.random() * H * 0.4,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.4 + Math.random() * 1.4),
        size: 0.8 + Math.random() * 2.2,
        opacity: 0,
        life: 0,
        maxLife,
        r: c.r,
        g: c.g,
        b: c.b,
      });
    }

    /* ── Draw one stream line ── */
    function drawStream(s: StreamLine, t: number) {
      gfx.beginPath();
      gfx.lineWidth = s.width;
      for (let x = 0; x <= W; x += 3) {
        const y = s.y + Math.sin(x * s.frequency + s.phase + t * s.speed) * s.amplitude;
        x === 0 ? gfx.moveTo(x, y) : gfx.lineTo(x, y);
      }
      // fade left → center → right
      const grad = gfx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0,   `rgba(${s.r},${s.g},${s.b},0)`);
      grad.addColorStop(0.2, `rgba(${s.r},${s.g},${s.b},${s.opacity})`);
      grad.addColorStop(0.8, `rgba(${s.r},${s.g},${s.b},${s.opacity})`);
      grad.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);
      gfx.strokeStyle = grad;
      gfx.stroke();
    }

    /* ── Main render loop ── */
    let tick = 0;
    function draw() {
      gfx.clearRect(0, 0, W, H);

      /* 1. Molten orbs */
      for (const orb of orbs) {
        orb.phase += orb.phaseSpeed;
        // Subtle pulsing radius
        const r = orb.radius * (1 + 0.08 * Math.sin(orb.phase));
        const grad = gfx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        const alpha = 0.09 + 0.04 * Math.sin(orb.phase * 1.3);
        grad.addColorStop(0,   `rgba(${orb.r},${orb.g},${orb.b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${orb.r},${orb.g},${orb.b},${alpha * 0.4})`);
        grad.addColorStop(1,   `rgba(${orb.r},${orb.g},${orb.b},0)`);
        gfx.beginPath();
        gfx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        gfx.fillStyle = grad;
        gfx.fill();

        // Move
        orb.x += orb.vx;
        orb.y += orb.vy;
        // Soft wrap (re-enter from opposite edge)
        if (orb.x < -r) orb.x = W + r;
        if (orb.x > W + r) orb.x = -r;
        if (orb.y < -r) orb.y = H + r;
        if (orb.y > H + r) orb.y = -r;
      }

      /* 2. Metallic stream lines */
      for (const s of streams) {
        drawStream(s, tick);
      }

      /* 3. Sparks */
      if (tick % 4 === 0 && sparks.length < MAX_SPARKS) {
        spawnSpark();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life++;

        const progress = p.life / p.maxLife;
        // Ease in, hold, ease out
        if (progress < 0.2) {
          p.opacity = (progress / 0.2) * 0.55;
        } else if (progress > 0.75) {
          p.opacity = ((1 - progress) / 0.25) * 0.55;
        } else {
          p.opacity = 0.55;
        }

        // Slight horizontal drift like rising heat shimmer
        p.x += p.vx + Math.sin(p.life * 0.07) * 0.25;
        p.y += p.vy;
        // Buoyancy decelerates slightly
        p.vy *= 0.997;

        // Draw as glowing dot
        const grd = gfx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grd.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.opacity})`);
        grd.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
        gfx.beginPath();
        gfx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        gfx.fillStyle = grd;
        gfx.fill();

        if (p.life >= p.maxLife) sparks.splice(i, 1);
      }

      tick++;
      raf = requestAnimationFrame(draw);
    }

    resize();
    initOrbs();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    />
  );
}
