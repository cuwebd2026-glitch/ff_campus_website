import { CircleHelp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./common";

const faqs = [
  ["Who can register for the CU qualifier?", "Official eligibility criteria have not yet been confirmed by the organizer."],
  ["How many players can be on a team?", "Roster size and substitution rules are awaiting the official tournament brief."],
  ["What is the registration deadline?", "The registration deadline has not been supplied yet."],
  ["What devices and accounts are permitted?", "Device, account, and game-version requirements will be included in the confirmed rules."],
  ["Where will updates be announced?", "The organizer’s official update channel has not yet been supplied."],
];

export function FAQAccordion() {
  return (
    <section id="faq" className="cc-section cc-faq">
      <Reveal>
        <SectionHeading code="06 / FAQ" title={<>INTEL BEFORE<br /><span>YOU DROP.</span></>} side="PLAYER QUESTIONS" />
      </Reveal>
      <div className="cc-faq-layout">
        <div className="cc-faq-aside">
          <CircleHelp />
          <p>Answers are deliberately marked when organizer confirmation is still needed.</p>
          <span>NO ASSUMPTIONS.<br />ONLY CONFIRMED INTEL.</span>
        </div>
        <Accordion type="single" collapsible className="cc-faq-list">
          {faqs.map(([q, a], i) => (
            <AccordionItem value={`faq-${i}`} key={q}>
              <AccordionTrigger><b>0{i + 1}</b><span>{q}</span></AccordionTrigger>
              <AccordionContent>
                <p>{a}</p>
                <small>STATUS / PENDING CONFIRMATION</small>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}