import { useEffect, useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./common";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  [
    "Who can register for the CU qualifier?",
    "Participation is open to Indian citizens legitimately enrolled in or authorized to represent Chandigarh University. Players must be at least 16 years old (guardian consent required if aged 16–18) and hold a personally-controlled Free Fire MAX account at level 20 or above.",
  ],
  [
    "How many players can be on a team?",
    "A team consists of 4 starting players and may register one substitute. Every team must nominate a captain or team leader responsible for official communication and submissions.",
  ],
  [
    "What is the registration deadline?",
    "Registration is on a first-come, first-served basis. The final cut-off is 16th September, 8:00 AM — the event begins at 9:00 AM sharp.",
  ],
  [
    "What devices and accounts are permitted?",
    "The qualifier is mobile-only — tablets, emulators, PCs, and unauthorized external devices are not allowed. Players must use a valid, personally-controlled Free Fire MAX account; new, unregistered, or shared accounts are not permitted.",
  ],
  [
    "Where will updates be announced?",
    "All qualifier updates will be shared in the official WhatsApp group, which will be provided to each team's captain after successful registration.",
  ],
];

export function FAQAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const sideCardRef = useRef<HTMLDivElement>(null);
  const questionMarkRef = useRef<HTMLParagraphElement>(null);
  const accordionWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Accordion items staggered reveal
      const items = accordionWrapRef.current?.querySelectorAll('[data-slot="accordion-item"]') || [];
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accordionWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating animation for the mascot
      gsap.to(questionMarkRef.current, {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="ff-section-alt relative overflow-hidden py-24 md:py-32">
      {/* Ambient glow backdrop - REMOVED */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <SectionHeading
            title={<>INTEL BEFORE <span className="text-ff-orange">YOU DROP.</span></>}
          />
        </Reveal>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-14 items-start mt-12">
          <Reveal>
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
              <div
                ref={questionMarkRef}
                className="w-48 md:w-64 mb-6 md:translate-x-10"
              >
                <img 
                  src="/faq_mascot.png" 
                  alt="FAQ Mascot" 
                  className="w-full h-auto object-contain" 
                />
              </div>
              <p className="font-sans text-white/50 text-sm leading-relaxed mb-4 max-w-sm">
                Everything you need to know before you register — straight from the official qualifier rulebook.
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <HelpCircle className="w-3.5 h-3.5 text-[var(--color-ff-orange)]/70 shrink-0" />
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-ff-orange)]/80">
                  Confirmed intel. No guesswork.
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div ref={accordionWrapRef}>
              <Accordion type="single" collapsible>
                {faqs.map(([q, a], i) => (
                  <AccordionItem
                    value={`faq-${i}`}
                    key={q}
                    className="border-b border-white/10 transition-colors duration-300 hover:border-[var(--color-ff-orange)]/30"
                  >
                    <AccordionTrigger className="py-6 hover:no-underline group">
                      <div className="flex items-center gap-5 text-left">
                        <span className="font-display text-3xl md:text-4xl text-[var(--color-ff-orange)]/30 w-10 shrink-0 group-hover:text-[var(--color-ff-orange)]/70 transition-colors duration-300">
                          0{i + 1}
                        </span>
                        <span className="font-sans font-bold text-lg md:text-xl text-white group-hover:text-[var(--color-ff-orange)] transition-colors duration-300">
                          {q}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-[3.75rem] md:pl-[4.25rem]">
                      <p className="font-sans text-white/65 text-base md:text-lg leading-relaxed">{a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}