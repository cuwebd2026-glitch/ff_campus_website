import { useEffect, useRef } from "react";
import { Zap, Trophy, MapPin, Target } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TournamentIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Massive Marquee Scroll Scrub
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Heading Reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100, scale: 0.9, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // Overlapping Cards Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card1Ref.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        card1Ref.current,
        { opacity: 0, x: -100, skewX: 10 },
        { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: "back.out(1.2)" }
      ).fromTo(
        card2Ref.current,
        { opacity: 0, x: 100, skewX: -10 },
        { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tournament" className="relative py-32 bg-[#030303] overflow-hidden" ref={sectionRef}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-ff-orange)]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-ff-gold)]/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Main Aggressive Heading */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-24 text-center perspective-1000">
        <div className="flex items-center justify-center gap-4 mb-6 opacity-60">
          <Target className="w-6 h-6 text-[var(--color-ff-orange)]" />
          <span className="font-sans text-[var(--color-ff-orange)] tracking-[0.4em] uppercase font-bold text-sm">THE ROAD TO COMPETITION</span>
          <Target className="w-6 h-6 text-[var(--color-ff-orange)]" />
        </div>
        <h2 ref={textRef} className="font-display text-6xl md:text-8xl lg:text-9xl italic uppercase tracking-tighter leading-none text-white drop-shadow-2xl">
          ONE CUP.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-ff-orange)] to-yellow-500" style={{ WebkitTextStroke: '2px rgba(255,107,0,0.5)' }}>
            TWO BATTLEGROUNDS
          </span>
        </h2>
      </div>

      {/* Epic Scrolling Marquee for Stats */}
      <div className="relative z-20 w-full overflow-hidden bg-[var(--color-ff-orange)] border-y-4 border-white/20 shadow-[0_0_50px_rgba(255,107,0,0.3)] transform -rotate-2 -mx-4 md:-mx-8 mb-32">
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)' }} />
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap font-display text-7xl md:text-8xl italic uppercase text-black font-black py-4 w-[200vw]"
        >
          {/* Repeating the content to ensure smooth scroll without empty spaces */}
          <span className="inline-block px-8">02 SEASON</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">01 QUALIFIER</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">16-09 DATE</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">CHANDIGARH UNIVERSITY</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">02 SEASON</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">01 QUALIFIER</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">16-09 DATE</span>
          <span className="inline-block px-8 opacity-50">•</span>
          <span className="inline-block px-8">CHANDIGARH UNIVERSITY</span>
          <span className="inline-block px-8 opacity-50">•</span>
        </div>
      </div>

      {/* Asymmetrical Floating Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 perspective-1000">
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
          
          {/* Card 1 - Left Overlapping */}
          <div 
            ref={card1Ref} 
            className="md:absolute left-0 top-0 md:w-3/5 z-20 group"
          >
            <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-10 md:p-14 shadow-2xl transition-all duration-500 hover:border-[var(--color-ff-gold)] transform md:-rotate-2 group-hover:rotate-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ff-gold)]/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <Trophy className="text-[var(--color-ff-gold)] w-12 h-12 mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                <span className="inline-block px-3 py-1 mb-4 bg-white/5 text-[10px] font-bold tracking-widest text-[var(--color-ff-gold)] border border-[var(--color-ff-gold)]/20 uppercase">NATIONAL TOURNAMENT</span>
                <h3 className="font-display text-4xl md:text-6xl italic text-white mb-6 uppercase tracking-wider">The Bigger Arena</h3>
                <p className="font-sans text-white/50 text-lg leading-relaxed max-w-md">Campus Cup Season 2 connects collegiate competitors into a wider national tournament journey beyond campus. Only the elite survive.</p>
              </div>
            </div>
          </div>

          {/* Spacer for mobile / spacing for desktop */}
          <div className="hidden md:block w-full h-[220px]" />

          {/* Card 2 - Right Overlapping */}
          <div 
            ref={card2Ref} 
            className="md:absolute right-0 bottom-[-50px] md:w-1/2 z-30 group"
          >
            <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border-l-4 border-[var(--color-ff-orange)] p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-l-8 transform md:rotate-2 group-hover:rotate-0">
              <div className="absolute inset-0 bg-gradient-to-tl from-[var(--color-ff-orange)]/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <MapPin className="text-[var(--color-ff-orange)] w-12 h-12 mb-6 drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]" />
                <span className="inline-block px-3 py-1 mb-4 bg-[var(--color-ff-orange)]/10 text-[10px] font-bold tracking-widest text-[var(--color-ff-orange)] border border-[var(--color-ff-orange)]/30 uppercase flex items-center gap-2 w-fit">
                  CU COLLEGE QUALIFIER <Zap className="w-3 h-3" />
                </span>
                <h3 className="font-display text-4xl md:text-6xl italic text-white mb-6 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,107,0,0.3)]">Our Drop Zone</h3>
                <p className="font-sans text-white/50 text-lg leading-relaxed">The Chandigarh University event is a distinct college qualifier, organized locally by GFG Community at CU on 15 September 2026. Prepare for combat.</p>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[var(--color-ff-orange)]/20 m-4" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[var(--color-ff-orange)]/20 m-4" />
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom spacer to account for overlapping cards */}
      <div className="h-20 md:h-32" />
    </section>
  );
}
