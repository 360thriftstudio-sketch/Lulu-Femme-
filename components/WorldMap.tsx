/** Simplified line-art world map (decorative). */
export function WorldMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 500"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        {/* graticule */}
        <path d="M0 125h1000M0 250h1000M0 375h1000" strokeDasharray="4 10" opacity="0.6" />
        {/* North America + Greenland */}
        <path d="M120 80l140-20 70 30-30 50-40 20-20 50-40 20-30-30-40-40-40-40z" />
        <path d="M330 40l50-5 10 35-40 15z" />
        {/* South America */}
        <path d="M250 250l50-10 30 40-20 70-30 70-20-20-10-70z" />
        {/* Europe */}
        <path d="M450 80l70-10 20 30-30 30h-40l-15-20z" />
        {/* Africa */}
        <path d="M460 160l80-10 40 50-10 60-30 70-30 20-20-60-30-60z" />
        {/* Asia, Arabia, India */}
        <path d="M540 70l160-20 150 30 30 50-60 40-60 30-60-10-50 30-50-50-40-30z" />
        <path d="M560 170l50 10-20 40z" />
        <path d="M650 200h40l-10 50z" />
        {/* Australia */}
        <path d="M780 300l80-10 30 50-50 30-50-20z" />
      </g>
    </svg>
  );
}
