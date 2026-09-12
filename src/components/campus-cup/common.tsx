import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function PrimaryButton({
  children = "Register now",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Button className={cn("cc-button-primary", className)} onClick={() => scrollTo("register")}>
      {children}
      <ArrowRight aria-hidden="true" />
    </Button>
  );
}

export function SecondaryButton({ children = "Explore tournament" }: { children?: ReactNode }) {
  return (
    <Button
      className="cc-button-secondary"
      variant="outline"
      onClick={() => scrollTo("tournament")}
    >
      {children}
      <ArrowDownRight aria-hidden="true" />
    </Button>
  );
}

export function Sticker({
  children,
  tone = "ember",
  className,
}: {
  children: ReactNode;
  tone?: "ember" | "light";
  className?: string;
}) {
  return (
    <span className={cn("cc-sticker", tone === "light" && "cc-sticker-light", className)}>
      {children}
    </span>
  );
}

export function TournamentBadge({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <span className="cc-badge">
      {index && <b>{index}</b>}
      <span>{children}</span>
    </span>
  );
}

export function GamingIcon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="cc-icon" title={label}>
      <Icon aria-label={label} />
    </span>
  );
}

export function LogoSlot({ label, path }: { label: string; path: string }) {
  return (
    <div className="cc-logo-slot" title={`Future asset: ${path}`}>
      <span aria-hidden="true" className="cc-logo-mark" />
      <span>
        {label}
        <small>LOGO SLOT</small>
      </span>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
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
    <div className="cc-section-heading">
      <p>
        <span>{code}</span>
        {side ?? "CAMPUS CUP / SEASON 2"}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

export function TournamentStats() {
  return (
    <div className="cc-stats">
      <div>
        <strong>02</strong>
        <span>Season</span>
      </div>
      <div>
        <strong>01</strong>
        <span>College qualifier</span>
      </div>
      <div>
        <strong>14·09</strong>
        <span>Match date</span>
      </div>
      <div>
        <strong>CU</strong>
        <span>Campus</span>
      </div>
    </div>
  );
}
