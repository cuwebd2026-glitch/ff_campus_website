import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./common";

const faqs = [
  ["Who can register for the CU qualifier?", "Official eligibility criteria have not yet been confirmed by the organizer."],
  ["How many players can be on a team?", "Roster size and substitution rules are awaiting the official tournament brief."],
  ["What is the registration deadline?", "The registration deadline has not been supplied yet."],
  ["What devices and accounts are permitted?", "Device, account, and game-version requirements will be included in the confirmed rules."],
  ["Where will updates be announced?", "The organizer's official update channel has not yet been supplied."],
];

export function FAQAccordion() {
  return (
    <section id="faq" className="ff-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            code="06"
            title={<>INTEL BEFORE <span className="text-ff-orange">YOU DROP.</span></>}
            side="PLAYER QUESTIONS"
          />
        </Reveal>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <Reveal>
            <div className="border border-white/10 p-8">
              <p className="font-display text-6xl text-[var(--color-ff-orange)] mb-4">?</p>
              <p className="font-sans text-white/60 text-sm leading-relaxed mb-6">
                Answers are marked when organizer confirmation is still needed. No assumptions — only confirmed intel.
              </p>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-ff-orange)]/70">
                NO ASSUMPTIONS.<br />ONLY CONFIRMED INTEL.
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible>
              {faqs.map(([q, a], i) => (
                <AccordionItem value={`faq-${i}`} key={q} className="border-b border-white/10">
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left">
                      <span className="font-display text-2xl text-[var(--color-ff-orange)]/30 w-8 shrink-0">0{i + 1}</span>
                      <span className="font-sans font-semibold text-white group-hover:text-[var(--color-ff-orange)] transition-colors">{q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-12">
                    <p className="font-sans text-white/60 mb-3">{a}</p>
                    <span className="font-sans text-xs tracking-widest text-[var(--color-ff-orange)]/50">STATUS / PENDING</span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}