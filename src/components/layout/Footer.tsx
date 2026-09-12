import { X, Instagram, Twitter, Linkedin, ChevronUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030303] pt-24 pb-8 overflow-hidden border-t border-[var(--color-ff-orange)]/20">
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: "linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 100%" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-ff-orange)] to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-ff-orange)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Spans 5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <img src="/gfgcu_light.png" alt="GFG Community" className="h-10 md:h-12 object-contain" />
              <X className="text-[var(--color-ff-orange)] w-4 h-4 opacity-50" />
              <img src="/cu_logo.png" alt="Chandigarh University" className="h-10 md:h-12 object-contain" />
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-sm mb-8">
              The official collegiate qualifier for Campus Cup Season 2, hosted at Chandigarh University. Organized and managed by GFG Community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Event Details (Spans 4 cols) */}
          <div className="md:col-span-4 lg:pl-12">
            <h3 className="font-display text-2xl tracking-widest text-white mb-6 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-ff-orange)]" />
              THE BATTLEGROUND
            </h3>
            <ul className="space-y-5 font-sans">
              <li className="flex flex-col">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">DATE</span>
                <span className="text-white text-sm">14 September 2026</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">VENUE</span>
                <span className="text-white text-sm">Chandigarh University Campus</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[var(--color-ff-gold)]/50 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">ENTRY</span>
                <span className="text-[var(--color-ff-gold)] text-sm uppercase tracking-wider">Free of Charge</span>
              </li>
            </ul>
          </div>

          {/* Contact (Spans 3 cols) */}
          <div className="md:col-span-3">
             <h3 className="font-display text-2xl tracking-widest text-white mb-6 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-ff-orange)]" />
              CONTACT COMMS
            </h3>
            <div className="font-sans text-sm text-white/50 mb-1">
              GFG Community CU
            </div>
            <a href="mailto:contact@gfgcu.com" className="font-sans text-sm font-bold tracking-wider text-[var(--color-ff-orange)] hover:text-white transition-colors relative inline-block group pb-1">
              CONTACT@GFGCU.COM
              <span className="absolute bottom-0 left-0 w-full h-px bg-[var(--color-ff-orange)]/40 group-hover:bg-white/40 transition-colors" />
            </a>
            
            {/* Decorative crosshair */}
            <div className="mt-12 opacity-20">
               <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#FF6B00" strokeWidth="2">
                  <circle cx="50" cy="50" r="28" />
                  <circle cx="50" cy="50" r="6" fill="#FF6B00" />
                  <line x1="50" y1="0" x2="50" y2="20" />
                  <line x1="50" y1="80" x2="50" y2="100" />
                  <line x1="0" y1="50" x2="20" y2="50" />
                  <line x1="80" y1="50" x2="100" y2="50" />
                </svg>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase text-center md:text-left">
            &copy; 2026 GFG COMMUNITY &middot; CHANDIGARH UNIVERSITY<br/>
            <span className="text-white/20">NOT AFFILIATED WITH GARENA. FOR EDUCATIONAL/COMMUNITY PURPOSES ONLY.</span>
          </div>
          
          <div className="flex gap-6 items-center">
            <span className="font-display text-xl text-[var(--color-ff-orange)] tracking-wider">
              "BOOYAH!"
            </span>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-[var(--color-ff-orange)] transition-colors group cursor-pointer"
            >
              BACK TO TOP 
              <span className="w-6 h-6 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-ff-orange)]/50">
                 <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;