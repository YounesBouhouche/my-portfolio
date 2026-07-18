import { useEffect, useRef } from 'react';

/**
 * Canvas-based generative coordinate grid / signal-wave visual.
 * Renders animated primary-tinted dots at grid intersections.
 * Fades out toward edges; pulses radially from center.
 * Respects prefers-reduced-motion (static dots when set).
 */
export default function CoordinateGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let t = 0;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      const spacing = 54;
      const cols = Math.ceil(W / spacing) + 2;
      const rows = Math.ceil(H / spacing) + 2;
      const cx = W * 0.5;
      const cy = H * 0.5;
      const maxDist = Math.hypot(cx, cy);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing - (spacing / 2);
          const y = r * spacing - (spacing / 2);
          const dist = Math.hypot(x - cx, y - cy);
          const prox = Math.max(0, 1 - dist / maxDist);
          const wave = reduced ? 1 : Math.sin(t * 0.6 + dist * 0.009) * 0.5 + 0.5;
          const alpha = prox * 0.45 * (0.15 + wave * 0.85);

          ctx.fillStyle = `rgba(0, 136, 193, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    setSize();
    draw();

    const ro = new ResizeObserver(() => setSize());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
