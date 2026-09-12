import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
}

const EMBER_COLORS = [
  "249, 115, 22", // Ember Orange
  "245, 158, 11", // Vibrant Amber
  "239, 68, 68", // Crimson Flame
  "254, 240, 138", // Hot Spark White-Gold
  "217, 119, 6", // Deep Burn Gold
];

export function FireEmberCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 65);
    const particles: Particle[] = [];

    const createParticle = (atBottom = true, isBurst = false): Particle => {
      const color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
      const size = Math.random() * 2.8 + 0.8;
      const maxAlpha = Math.random() * 0.65 + 0.35;

      return {
        x: Math.random() * width,
        y: atBottom ? height + Math.random() * 30 : Math.random() * height,
        size: isBurst ? size * 1.5 : size,
        speedY: isBurst ? -(Math.random() * 5 + 3) : -(Math.random() * 1.5 + 0.6),
        speedX: isBurst ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 0.8,
        alpha: isBurst ? maxAlpha : Math.random() * maxAlpha,
        maxAlpha,
        color,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        wobbleAmp: Math.random() * 1.2 + 0.3,
        wobbleOffset: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(false));
    }

    // Burst listener for step changes or submit victory
    const handleBurst = () => {
      for (let i = 0; i < 35; i++) {
        const burstP = createParticle(true, true);
        burstP.y = height * 0.6 + (Math.random() - 0.5) * 200;
        burstP.x = width * 0.5 + (Math.random() - 0.5) * (width * 0.6);
        particles.push(burstP);
      }
    };

    window.addEventListener("cc-ember-burst", handleBurst);

    let time = 0;
    const render = () => {
      if (document.hidden) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 1;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmp;

        // Fade out as it nears top
        const lifeProgress = p.y / height;
        if (lifeProgress < 0.25) {
          p.alpha = Math.max(0, p.maxAlpha * (lifeProgress / 0.25));
        }

        // Draw glowing ember
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
        radGrad.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
        radGrad.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.5})`);
        radGrad.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Respawn if off screen or dead
        if (p.y < -30 || p.alpha <= 0.01) {
          if (particles.length > particleCount) {
            // Remove burst particles once finished
            particles.splice(i, 1);
          } else {
            particles[i] = createParticle(true);
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("cc-ember-burst", handleBurst);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-10 opacity-70 ${className}`}
    />
  );
}

export default FireEmberCanvas;
