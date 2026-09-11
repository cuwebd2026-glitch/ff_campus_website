import { type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SectionHeading({
  code,
  title,
  side,
}: {
  code: string;
  title: ReactNode;
  side?: string;
}) {
  return (
    <div className="ff-section-header">
      <p className="font-sans text-[var(--color-ff-orange)] tracking-[0.2em] uppercase font-bold text-sm mb-4">
        {code} <span className="text-white/30 mx-2">/</span> {side ?? "CAMPUS CUP"}
      </p>
      <h2 className="ff-section-title">{title}</h2>
    </div>
  );
}