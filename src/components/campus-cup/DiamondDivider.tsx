export function DiamondDivider() {
  return (
    <div className="relative w-full flex items-center justify-center pb-6 md:pb-10 pt-2 z-20 -mt-2 md:-mt-4">
      {/* Left Line */}
      <div className="h-[2px] flex-1 max-w-[150px] md:max-w-[300px] bg-gradient-to-r from-transparent via-[var(--color-ff-orange)] to-[var(--color-ff-orange)] opacity-80" />
      
      {/* Center Diamond / Shape */}
      <div className="relative mx-3 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute w-12 h-12 bg-[var(--color-ff-orange)] blur-xl opacity-30 rounded-full" />
        {/* Diamond Outline */}
        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-[var(--color-ff-orange)] rotate-45" />
        {/* Inner Solid Diamond */}
        <div className="absolute w-2 h-2 md:w-2.5 md:h-2.5 bg-[var(--color-ff-orange)] rotate-45" />
      </div>

      {/* Right Line */}
      <div className="h-[2px] flex-1 max-w-[150px] md:max-w-[300px] bg-gradient-to-l from-transparent via-[var(--color-ff-orange)] to-[var(--color-ff-orange)] opacity-80" />
    </div>
  );
}
