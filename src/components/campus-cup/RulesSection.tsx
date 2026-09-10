import { Crosshair, FileText, ShieldCheck, Swords, UsersRound } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading, Sticker } from "./common";

const ruleGroups = [
  { icon: UsersRound, title: "Squad & eligibility", label: "ENTRY PROTOCOL", body: "Eligibility, roster size, substitutions, and student verification requirements are awaiting organizer confirmation." },
  { icon: ShieldCheck, title: "Fair play standards", label: "COMPETITION CODE", body: "Official conduct, device, account, and anti-cheat requirements will be published after organizer confirmation." },
  { icon: Swords, title: "Match procedure", label: "BATTLE FORMAT", body: "Lobby timing, map rotation, scoring, and tie-break procedures are not yet confirmed." },
  { icon: FileText, title: "Check-in & reporting", label: "PLAYER OPS", body: "Check-in channels, reporting windows, and result submission instructions will be added to the official brief." },
];

export function RuleCard({ item, index }: { item: typeof ruleGroups[number]; index: number }) {
  const Icon = item.icon;
  return (
    <AccordionItem value={`rule-${index}`} className="cc-rule">
      <AccordionTrigger>
        <span className="cc-rule-number">0{index + 1}</span>
        <Icon />
        <span><small>{item.label}</small>{item.title}</span>
      </AccordionTrigger>
      <AccordionContent>
        <p>{item.body}</p>
        <span className="cc-pending">ORGANIZER CONFIRMATION REQUIRED</span>
      </AccordionContent>
    </AccordionItem>
  );
}

export function RulesSection() {
  return (
    <section id="rules" className="cc-section cc-rules">
      <Reveal>
        <SectionHeading code="04 / RULEBOOK" title={<>KNOW THE<br /><span>ENGAGEMENT.</span></>} side="SCAN / OPEN / PREPARE" />
      </Reveal>
      <div className="cc-rules-layout">
        <div className="cc-rules-visual">
          <Crosshair />
          <strong>04</strong>
          <span>RULE<br />GROUPS</span>
          <Sticker>DROP IN</Sticker>
        </div>
        <Accordion type="single" collapsible defaultValue="rule-0" className="cc-rules-list">
          {ruleGroups.map((item, i) => (
            <RuleCard key={item.title} item={item} index={i} />
          ))}
        </Accordion>
      </div>
    </section>
  );
}