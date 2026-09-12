interface SectionDividerProps {
  flipY?: boolean;
}

export function SectionDivider({ flipY = false }: SectionDividerProps) {
  return (
    <div className={`relative w-full h-12 bg-[#050505] overflow-visible z-20 -my-6 ${flipY ? "scale-y-[-1]" : ""}`}>
      <svg 
        viewBox="0 0 1440 40" 
        preserveAspectRatio="none" 
        className="w-full h-full"
      >
        {/* Fill for the top part (matching background) */}
        <path d="M0,0 L1440,0 L1440,10 L1200,10 L1170,30 L270,30 L240,10 L0,10 Z" fill="#000000" />
        
        {/* The clean FF geometric stroke */}
        <path d="M0,10 L240,10 L270,30 L1170,30 L1200,10 L1440,10" 
              fill="none" 
              stroke="var(--color-ff-gold)" 
              strokeWidth="4" 
        />
        
        {/* Accent bright highlight on the bottom line */}
        <path d="M270,30 L1170,30" 
              fill="none" 
              stroke="#FFF" 
              strokeWidth="1" 
              opacity="0.5"
        />
      </svg>
    </div>
  );
}
