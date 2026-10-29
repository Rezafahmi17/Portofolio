import { ArrowUpRight } from 'lucide-react';

/**
 * Authentic Readymag-inspired Perforated Vintage Concert Ticket Card
 * Matches Screenshots 3 & 4: serrated top/bottom edges, central punch notches,
 * corner software ribbons (e.g. JS / AI), framed visual, italic category, and condensed display title.
 */
export default function PerforatedTicketCard({
  work,
  onClick,
  className = '',
  style = {},
  compact = false,
}) {
  const bg = work.ticketBg || '#7348FF';
  const ink = work.ticketFg || '#121212';

  return (
    <article
      onClick={() => onClick?.(work)}
      data-cursor-label="OPEN CASE ↗"
      style={{
        backgroundColor: bg,
        color: ink,
        ...style,
      }}
      className={`group relative select-none cursor-pointer transition-all duration-300 ease-expo-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.55)] ${className}`}
    >
      {/* Top Serrated Zig-Zag Edge */}
      <div
        aria-hidden="true"
        className="w-full h-2.5 overflow-hidden flex"
        style={{
          backgroundImage: `radial-gradient(circle at 8px 0px, #0E0E0E 5px, transparent 5.5px)`,
          backgroundSize: '16px 10px',
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Top Central Semicircle Ticket Notch */}
      <div
        aria-hidden="true"
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-7 rounded-full bg-[#0E0E0E] pointer-events-none"
      />

      {/* Top-Right Software / Stack Ribbon Badges (like Ai / Ps in Screenshot 4) */}
      {work.toolBadges && work.toolBadges.length > 0 && (
        <div className="absolute top-0 right-5 z-20 flex gap-1">
          {work.toolBadges.map((badge, i) => (
            <span
              key={badge}
              className={`px-2 py-2 text-[10px] font-mono font-bold tracking-tight shadow-sm ${
                i === 0
                  ? 'bg-[#121212] text-[#F4EFE6]'
                  : 'bg-[#121212]/80 text-[#F4BE2A]'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Inner Vintage Hairline Ticket Frame */}
      <div className={`${compact ? 'px-3.5 py-3' : 'px-4 sm:px-5 py-4'}`}>
        <div
          className="border p-2.5 sm:p-3 flex flex-col justify-between"
          style={{ borderColor: 'rgba(18, 18, 18, 0.35)' }}
        >
          {/* Ticket Top Serial Strip */}
          <div
            className="flex items-center justify-between pb-2 mb-2.5 border-b font-mono text-[9.5px] uppercase tracking-[0.08em]"
            style={{ borderColor: 'rgba(18, 18, 18, 0.28)' }}
          >
            <span>NO. {work.number || '01'} // {work.year}</span>
            <span className="font-bold flex items-center gap-0.5">
              ADMIT ONE <ArrowUpRight size={11} />
            </span>
          </div>

          {/* Framed Artwork Window */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#121212] border border-[#121212]/40">
            <img
              src={work.heroImg || work.img}
              alt={work.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 ease-expo-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Category & Bold Condensed Ticket Title */}
          <div className="pt-3.5 pb-2 text-center">
            <p className="font-sans text-[11px] sm:text-xs font-medium opacity-80 tracking-wide mb-1">
              {work.category}
            </p>
            <h3
              className={`font-condensed uppercase tracking-[-0.01em] leading-[0.95] ${
                compact ? 'text-2xl' : 'text-2xl sm:text-[30px]'
              }`}
            >
              {work.ticketTitle || work.title}
            </h3>
          </div>

          {/* Bottom Stamp & Barcode Row */}
          <div
            className="pt-2 mt-1 border-t flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.08em]"
            style={{ borderColor: 'rgba(18, 18, 18, 0.28)' }}
          >
            <span className="opacity-75">STAGE PASS</span>
            <span className="w-5 h-5 rounded-full border border-[#121212]/60 flex items-center justify-center font-bold text-[9px]">
              RF
            </span>
            <span className="opacity-75">VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Bottom Central Semicircle Ticket Notch */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-7 rounded-full bg-[#0E0E0E] pointer-events-none"
      />

      {/* Bottom Serrated Zig-Zag Edge */}
      <div
        aria-hidden="true"
        className="w-full h-2.5 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 8px 10px, #0E0E0E 5px, transparent 5.5px)`,
          backgroundSize: '16px 10px',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </article>
  );
}

