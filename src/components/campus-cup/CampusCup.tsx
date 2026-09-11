import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Crosshair,
  FileText,
  Flag,
  Gamepad2,
  MapPin,
  Menu,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
  UserRoundCheck,
  UsersRound,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const navItems = [
  ["Tournament", "tournament"],
  ["Rules", "rules"],
  ["Prizes", "prizes"],
  ["Schedule", "schedule"],
  ["FAQ", "faq"],
] as const;

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function PrimaryButton({ children = "Register now", className }: { children?: ReactNode; className?: string }) {
  return (
    <Button className={cn("cc-button-primary", className)} onClick={() => scrollTo("register")}>
      {children}<ArrowRight aria-hidden="true" />
    </Button>
  );
}

export function SecondaryButton({ children = "Explore tournament" }: { children?: ReactNode }) {
  return (
    <Button className="cc-button-secondary" variant="outline" onClick={() => scrollTo("tournament")}>
      {children}<ArrowDownRight aria-hidden="true" />
    </Button>
  );
}

export function Sticker({ children, tone = "ember", className }: { children: ReactNode; tone?: "ember" | "light"; className?: string }) {
  return <span className={cn("cc-sticker", tone === "light" && "cc-sticker-light", className)}>{children}</span>;
}

export function TournamentBadge({ children, index }: { children: ReactNode; index?: string }) {
  return <span className="cc-badge">{index && <b>{index}</b>}<span>{children}</span></span>;
}

export function GamingIcon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <span className="cc-icon" title={label}><Icon aria-label={label} /></span>;
}

function LogoSlot({ label, path }: { label: string; path: string }) {
  const imgSrc =
    path.includes("gfg") || path.includes("GFG")
      ? "/gfgcu_light.png"
      : path.includes("cu") || path.includes("CU") || path.includes("chandigarh")
        ? "/cu_logo.png"
        : path;
  return (
    <div className="cc-logo-slot" title={label}>
      <img src={imgSrc} alt={label} loading="lazy" />
    </div>
  );
}

export function BrandHeader() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={cn("cc-header", compact && "is-compact")}>
      <div className="cc-header-inner">
        <a href="#top" className="cc-brand-lockup" aria-label="Campus Cup home">
          <LogoSlot label="GFG COMMUNITY" path="/branding/gfg-logo.png" />
          <X className="cc-brand-x" aria-hidden="true" />
          <LogoSlot label="CHANDIGARH UNIVERSITY" path="/branding/cu-logo.png" />
        </a>
        <nav className="cc-desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <PrimaryButton className="cc-header-cta" />
        <Button variant="ghost" size="icon" className="cc-menu-trigger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></Button>
      </div>
      <div className={cn("cc-mobile-panel", open && "is-open")} aria-hidden={!open}>
        <div className="cc-mobile-top"><span>CC / S2</span><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button></div>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><b>0{i + 1}</b>{label}<ArrowRight /></a>)}
        </nav>
        <PrimaryButton className="w-full" />
        <p>14 SEP 2026 / CHANDIGARH UNIVERSITY</p>
      </div>
    </header>
  );
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .65, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>;
}

function SectionHeading({ code, title, side }: { code: string; title: ReactNode; side?: string }) {
  return <div className="cc-section-heading"><p><span>{code}</span>{side ?? "CAMPUS CUP / SEASON 2"}</p><h2>{title}</h2></div>;
}

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const artworkY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 70]);
  return (
    <section id="top" className="cc-hero">
      <div className="cc-hero-grid" aria-hidden="true" />
      <motion.div className="cc-hero-art" style={{ y: artworkY }}>
        <div className="cc-art-corner tl" /><div className="cc-art-corner br" />
        <Crosshair /><strong>HERO ARTWORK</strong><span>OFFICIAL VISUAL<br />PLACEHOLDER</span><small>/branding/campus-cup-logo.png</small>
      </motion.div>
      <div className="cc-hero-copy">
        <motion.div className="cc-hero-kicker cc-enter-one"><span>CU QUALIFIER</span><i />14·09·26</motion.div>
        <motion.h1 className="cc-enter-two">
          <span>CAMPUS</span><span>CUP <em>S2</em></span>
        </motion.h1>
        <motion.div className="cc-hero-sub cc-enter-three">
          <p>Chandigarh University<br /><strong>College Qualifier</strong></p>
          <div><span>Organized by</span>GFG Community<br />Chandigarh University</div>
        </motion.div>
        <motion.div className="cc-hero-actions cc-enter-four"><PrimaryButton /><SecondaryButton /></motion.div>
      </div>
      <div className="cc-hero-date"><span>14</span><div>SEPTEMBER<strong>2026</strong></div></div>
      <Sticker className="cc-hero-sticker">BATTLE READY</Sticker>
      <div className="cc-hero-badges"><TournamentBadge index="01">College qualifier</TournamentBadge><TournamentBadge index="02">Season two</TournamentBadge></div>
      <div className="cc-scroll-cue"><span>SCROLL TO ENTER</span><i /></div>
    </section>
  );
}

export function TournamentStats() {
  return <div className="cc-stats"><div><strong>02</strong><span>Season</span></div><div><strong>01</strong><span>College qualifier</span></div><div><strong>14·09</strong><span>Match date</span></div><div><strong>CU</strong><span>Campus</span></div></div>;
}

export function TournamentIntro() {
  return (
    <section id="tournament" className="cc-section cc-intro">
      <Reveal><SectionHeading code="01 / TOURNAMENT" title={<>ONE CUP.<br /><span>TWO BATTLEGROUNDS.</span></>} side="THE ROAD TO COMPETITION" /></Reveal>
      <div className="cc-intro-map">
        <Reveal className="cc-intro-level national"><div className="cc-level-number">01</div><div><TournamentBadge>NATIONAL TOURNAMENT</TournamentBadge><h3>The bigger arena</h3><p>Campus Cup Season 2 brings collegiate competitors into a wider national tournament journey.</p></div><GamingIcon icon={Trophy} label="National tournament" /></Reveal>
        <div className="cc-route-line"><span /><Zap /><span /></div>
        <Reveal className="cc-intro-level campus" delay={.15}><div className="cc-level-number">02</div><div><TournamentBadge>CU COLLEGE QUALIFIER</TournamentBadge><h3>This is our drop zone</h3><p>The Chandigarh University event is a distinct college qualifier, organized locally by GFG Community at CU.</p></div><GamingIcon icon={MapPin} label="College qualifier" /></Reveal>
      </div>
      <TournamentStats />
    </section>
  );
}

const overviewItems = [
  { icon: CalendarDays, code: "DATE", value: "14 SEPTEMBER 2026", note: "Confirmed event date" },
  { icon: UserRoundCheck, code: "ORGANIZER", value: "GFG COMMUNITY", note: "Chandigarh University" },
  { icon: UsersRound, code: "ELIGIBILITY", value: "TO BE CONFIRMED", note: "Awaiting organizer details" },
  { icon: Gamepad2, code: "TEAM INFO", value: "TO BE CONFIRMED", note: "Roster details pending" },
  { icon: Swords, code: "EVENT FORMAT", value: "TO BE CONFIRMED", note: "Match format pending" },
  { icon: ShieldCheck, code: "PARTICIPATION", value: "OFFICIAL BRIEF PENDING", note: "Check back for instructions" },
];

export function EventOverview() {
  return (
    <section className="cc-section cc-overview">
      <Reveal><SectionHeading code="02 / QUALIFIER" title={<>YOUR CAMPUS.<br /><span>YOUR BATTLEGROUND.</span></>} side="CHANDIGARH UNIVERSITY" /></Reveal>
      <div className="cc-overview-grid">{overviewItems.map((item, i) => <Reveal key={item.code} delay={i * .04} className={cn("cc-info-block", i < 2 && "confirmed")}><GamingIcon icon={item.icon} label={item.code} /><div><small>{item.code}</small><strong>{item.value}</strong><p>{item.note}</p></div><span className="cc-info-index">0{i + 1}</span></Reveal>)}</div>
      <div className="cc-confirmed-key"><Check /> Confirmed information <span /> Unconfirmed fields are intentionally marked</div>
    </section>
  );
}

export function PrizeCard({ place, title, amount, featured = false }: { place: string; title: string; amount: string; featured?: boolean }) {
  return <motion.div className={cn("cc-prize-card", featured && "featured")} whileHover={{ y: -6 }}><span>{place}</span>{featured ? <Trophy /> : <Target />}<small>{title}</small><strong>{amount}</strong><p>Prize structure awaiting official confirmation</p></motion.div>;
}

export function PrizeSection() {
  return (
    <section id="prizes" className="cc-section cc-prizes">
      <Reveal><SectionHeading code="03 / PRIZES" title={<>CLAIM THE<br /><span>PODIUM.</span></>} side="CHAMPIONSHIP HIERARCHY" /></Reveal>
      <div className="cc-podium"><PrizeCard place="02" title="Runner-up" amount="TBA" /><PrizeCard place="01" title="Champion" amount="TBA" featured /><PrizeCard place="03" title="Finalist" amount="TBA" /></div>
      <Sticker tone="light" className="cc-prize-sticker">PLAY TO WIN</Sticker>
    </section>
  );
}

const ruleGroups = [
  { icon: UsersRound, title: "Squad & eligibility", label: "ENTRY PROTOCOL", body: "Eligibility, roster size, substitutions, and student verification requirements are awaiting organizer confirmation." },
  { icon: ShieldCheck, title: "Fair play standards", label: "COMPETITION CODE", body: "Official conduct, device, account, and anti-cheat requirements will be published after organizer confirmation." },
  { icon: Swords, title: "Match procedure", label: "BATTLE FORMAT", body: "Lobby timing, map rotation, scoring, and tie-break procedures are not yet confirmed." },
  { icon: FileText, title: "Check-in & reporting", label: "PLAYER OPS", body: "Check-in channels, reporting windows, and result submission instructions will be added to the official brief." },
];

export function RuleCard({ item, index }: { item: typeof ruleGroups[number]; index: number }) {
  const Icon = item.icon;
  return <AccordionItem value={`rule-${index}`} className="cc-rule"><AccordionTrigger><span className="cc-rule-number">0{index + 1}</span><Icon /><span><small>{item.label}</small>{item.title}</span></AccordionTrigger><AccordionContent><p>{item.body}</p><span className="cc-pending">ORGANIZER CONFIRMATION REQUIRED</span></AccordionContent></AccordionItem>;
}

export function RulesSection() {
  return <section id="rules" className="cc-section cc-rules"><Reveal><SectionHeading code="04 / RULEBOOK" title={<>KNOW THE<br /><span>ENGAGEMENT.</span></>} side="SCAN / OPEN / PREPARE" /></Reveal><div className="cc-rules-layout"><div className="cc-rules-visual"><Crosshair /><strong>04</strong><span>RULE<br />GROUPS</span><Sticker>DROP IN</Sticker></div><Accordion type="single" collapsible defaultValue="rule-0" className="cc-rules-list">{ruleGroups.map((item, i) => <RuleCard key={item.title} item={item} index={i} />)}</Accordion></div></section>;
}

const stages = [
  ["01", "REGISTRATION", "Details pending", "Registration opening and closing times to be confirmed."],
  ["02", "CHECK-IN", "14 Sep · Time TBA", "Team verification and lobby reporting instructions pending."],
  ["03", "QUALIFIER", "14 Sep 2026", "Chandigarh University College Qualifier."],
  ["04", "RESULTS", "Time TBA", "Result announcement and progression details pending."],
] as const;

export function ScheduleTimeline() {
  return <section id="schedule" className="cc-section cc-schedule"><Reveal><SectionHeading code="05 / SCHEDULE" title={<>FROM ENTRY<br /><span>TO FINAL ZONE.</span></>} side="14 SEPTEMBER 2026" /></Reveal><div className="cc-timeline">{stages.map(([n, title, time, text], i) => <Reveal key={n} className={cn("cc-stage", i === 2 && "active")} delay={i * .08}><div className="cc-stage-marker"><span>{n}</span></div><div><small>STAGE {n}</small><h3>{title}</h3><strong>{time}</strong><p>{text}</p></div></Reveal>)}</div></section>;
}

const faqs = [
  ["Who can register for the CU qualifier?", "Official eligibility criteria have not yet been confirmed by the organizer."],
  ["How many players can be on a team?", "Roster size and substitution rules are awaiting the official tournament brief."],
  ["What is the registration deadline?", "The registration deadline has not been supplied yet."],
  ["What devices and accounts are permitted?", "Device, account, and game-version requirements will be included in the confirmed rules."],
  ["Where will updates be announced?", "The organizer’s official update channel has not yet been supplied."],
];

export function FAQAccordion() {
  return <section id="faq" className="cc-section cc-faq"><Reveal><SectionHeading code="06 / FAQ" title={<>INTEL BEFORE<br /><span>YOU DROP.</span></>} side="PLAYER QUESTIONS" /></Reveal><div className="cc-faq-layout"><div className="cc-faq-aside"><CircleHelp /><p>Answers are deliberately marked when organizer confirmation is still needed.</p><span>NO ASSUMPTIONS.<br />ONLY CONFIRMED INTEL.</span></div><Accordion type="single" collapsible className="cc-faq-list">{faqs.map(([q, a], i) => <AccordionItem value={`faq-${i}`} key={q}><AccordionTrigger><b>0{i + 1}</b><span>{q}</span></AccordionTrigger><AccordionContent><p>{a}</p><small>STATUS / PENDING CONFIRMATION</small></AccordionContent></AccordionItem>)}</Accordion></div></section>;
}

export function RegistrationCTA() {
  return <section id="register" className="cc-registration"><div className="cc-registration-lines" aria-hidden="true" /><Reveal><Sticker>SQUAD UP</Sticker><p>CHANDIGARH UNIVERSITY / 14·09·26</p><h2>READY TO<br /><span>ENTER THE CUP?</span></h2><div className="cc-registration-status"><Flag /><div><small>REGISTRATION STATUS</small><strong>OFFICIAL LINK COMING SOON</strong></div></div><Button className="cc-button-primary cc-button-disabled" disabled>Registration link pending</Button><small className="cc-registration-note">The organizer has not supplied the official registration link yet.</small></Reveal></section>;
}

export function Footer() {
  return <footer className="cc-footer"><div><div className="cc-footer-brand"><strong>CC<span>S2</span></strong><p>Campus Cup Season 2<br />Chandigarh University College Qualifier</p></div><div className="cc-footer-logos"><LogoSlot label="GFG COMMUNITY" path="/branding/gfg-logo.png" /><X /><LogoSlot label="CHANDIGARH UNIVERSITY" path="/branding/cu-logo.png" /></div></div><div className="cc-footer-base"><span>ORGANIZED BY GFG COMMUNITY, CHANDIGARH UNIVERSITY</span><span>14 SEPTEMBER 2026</span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}

export function CampusCup() {
  return <main className="cc-site"><BrandHeader /><Hero /><TournamentIntro /><EventOverview /><PrizeSection /><RulesSection /><ScheduleTimeline /><FAQAccordion /><RegistrationCTA /><Footer /></main>;
}