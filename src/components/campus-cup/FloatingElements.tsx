import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/* ── SVG FF-style icons ── */
const CrosshairSVG = ({ size = 32, opacity = 1 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF6B00" strokeWidth="2" style={{ opacity }}>
    <circle cx="50" cy="50" r="28" />
    <circle cx="50" cy="50" r="6" fill="#FF6B00" />
    <line x1="50" y1="0" x2="50" y2="18" />
    <line x1="50" y1="82" x2="50" y2="100" />
    <line x1="0" y1="50" x2="18" y2="50" />
    <line x1="82" y1="50" x2="100" y2="50" />
    <line x1="32" y1="32" x2="38" y2="38" strokeWidth="1.5" opacity="0.5" />
    <line x1="62" y1="62" x2="68" y2="68" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const BulletSVG = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 2.5} viewBox="0 0 24 60" fill="#FF6B00" opacity="0.7">
    <path d="M12 0 C8 0, 4 6, 4 18 L4 52 Q4 60 12 60 Q20 60 20 52 L20 18 C20 6 16 0 12 0 Z" />
    <rect x="5" y="30" width="14" height="2" fill="#000" opacity="0.3" rx="1" />
    <rect x="5" y="35" width="14" height="2" fill="#000" opacity="0.3" rx="1" />
  </svg>
);

const DropZoneSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FF6B00" strokeWidth="1.5" opacity="0.8">
    <path d="M24 4 L24 36 M24 36 L16 28 M24 36 L32 28" />
    <path d="M12 32 Q8 36 10 42 Q14 48 24 44 Q34 48 38 42 Q40 36 36 32 Q30 36 24 36 Q18 36 12 32Z" fill="rgba(255,107,0,0.15)" strokeWidth="1" />
  </svg>
);

const HexSVG = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4">
    <polygon points="50,5 95,27 95,73 50,95 5,73 5,27" />
    <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" strokeWidth="0.8" opacity="0.5" />
  </svg>
);

const ParachuteSVG = () => (
  <svg width="48" height="52" viewBox="0 0 80 88" fill="none" stroke="#FF6B00" strokeWidth="2" opacity="0.8">
    <path d="M8 36 Q8 4 40 4 Q72 4 72 36" fill="rgba(255,107,0,0.15)" />
    <line x1="8"  y1="36" x2="40" y2="72" />
    <line x1="40" y1="16" x2="40" y2="72" />
    <line x1="72" y1="36" x2="40" y2="72" />
    <line x1="24" y1="8"  x2="40" y2="72" />
    <line x1="56" y1="8"  x2="40" y2="72" />
    <circle cx="40" cy="76" r="5" fill="#FF6B00" />
  </svg>
);

const elements = [
  { component: "crosshair", top: "12%",  left: "6%",   size: 70,  delay: 0,    duration: 8,   opacity: 0.3 },
  { component: "hex",       top: "22%",  right: "8%",  size: 80,  delay: 1.5,  duration: 10,  opacity: 0.2 },
  { component: "bullet",    top: "45%",  left: "3%",   size: 20,  delay: 0.5,  duration: 7,   opacity: 0.5 },
  { component: "parachute", top: "15%",  right: "18%", size: 48,  delay: 2,    duration: 9,   opacity: 0.4 },
  { component: "crosshair", top: "65%",  right: "5%",  size: 50,  delay: 3,    duration: 11,  opacity: 0.2 },
  { component: "hex",       top: "70%",  left: "8%",   size: 60,  delay: 1,    duration: 8,   opacity: 0.15},
  { component: "dropzone",  top: "50%",  left: "18%",  size: 48,  delay: 4,    duration: 12,  opacity: 0.35},
  { component: "bullet",    top: "78%",  right: "12%", size: 16,  delay: 2.5,  duration: 6,   opacity: 0.4 },
  { component: "crosshair", top: "38%",  right: "28%", size: 35,  delay: 0.8,  duration: 9,   opacity: 0.15},
];

export function FloatingElements() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".ff-float-item");
    items.forEach((el, i) => {
      const e = elements[i];
      // Float up/down with slight rotation
      gsap.to(el, {
        y: -20 - Math.random() * 20,
        rotation: (Math.random() - 0.5) * 20,
        duration: e.duration,
        delay: e.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      // Fade pulse
      gsap.to(el, {
        opacity: (e.opacity * 0.4),
        duration: e.duration * 0.7,
        delay: e.delay + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {elements.map((e, i) => (
        <div
          key={i}
          className="ff-float-item absolute"
          style={{
            top: e.top,
            left: (e as { left?: string }).left,
            right: (e as { right?: string }).right,
            opacity: e.opacity,
            filter: "drop-shadow(0 0 8px rgba(255,107,0,0.5))",
          }}
        >
          {e.component === "crosshair" && <CrosshairSVG size={e.size} />}
          {e.component === "hex"       && <HexSVG size={e.size} />}
          {e.component === "bullet"    && <BulletSVG size={e.size} />}
          {e.component === "parachute" && <ParachuteSVG />}
          {e.component === "dropzone"  && <DropZoneSVG />}
        </div>
      ))}
    </div>
  );
}
