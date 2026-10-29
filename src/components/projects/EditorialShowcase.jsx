import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, LayoutGrid, List, Ticket, ExternalLink, Sparkles, Github } from 'lucide-react';
import { SELECTED_WORKS, PLAYGROUND_ARCHIVE } from '../../data/editorialPortfolioData';
import PerforatedTicketCard from '../shared/PerforatedTicketCard';
import RevealOnScroll from '../shared/RevealOnScroll';
import { scrollToTarget } from '../shared/SmoothScrollProvider';

// Vintage Pointing Hand SVG (Exact Homage to Screenshot 4 Bottom CTA)
function VintagePointingHand({ flip = false }) {
  return (
    <svg
      width="56"
      height="32"
      viewBox="0 0 64 36"
      fill="none"
      aria-hidden="true"
      className={`text-[#F4EFE6] shrink-0 hidden sm:block ${flip ? '-scale-x-100' : ''}`}
    >
      <path
        d="M4 21 C10 21, 14 19, 19 16 L27 10 C30 8, 33 10, 31 13 L26 17 H55 C59 17, 59 22, 55 22 H37 M37 22 H44 C47 22, 47 26, 43 26 H35 M35 26 H41 C44 26, 44 30, 40 30 H32 M32 30 H37 C39 30, 39 33, 35 33 H22 C15 33, 12 29, 4 29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EditorialShowcase({ onSelectWork }) {
  const [viewMode, setViewMode] = useState('tickets'); // 'tickets' | 'editorial' | 'index'
  const [deckFanned, setDeckFanned] = useState(false);
  const [hoveredIndexWork, setHoveredIndexWork] = useState(null);

  const totalFlagship = String(SELECTED_WORKS.length).padStart(2, '0');

  // Cursor-following preview refs for Index View (PRD F-03)
  const previewRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, curX: 0, curY: 0 });

  useEffect(() => {
    if (viewMode !== 'index') return undefined;

    let rafId;
    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const loop = () => {
      const m = mouseRef.current;
      m.curX += (m.x - m.curX) * 0.18;
      m.curY += (m.y - m.curY) * 0.18;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${m.curX + 28}px, ${m.curY - 110}px, 0) rotate(3deg)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [viewMode]);

  // Stacked 6-Ticket Deck Fan Transforms (Screenshot 3 Reference)
  const fanTransforms = [
    deckFanned
      ? 'translate(-155px, -42px) rotate(-15deg)'
      : 'translate(-72px, -34px) rotate(-10deg)',
    deckFanned
      ? 'translate(-94px, -16px) rotate(-9deg)'
      : 'translate(-44px, -14px) rotate(-5deg)',
    deckFanned
      ? 'translate(-30px, 8px) rotate(-3deg)'
      : 'translate(-14px, 6px) rotate(-2deg)',
    deckFanned
      ? 'translate(34px, -4px) rotate(4deg)'
      : 'translate(18px, 2px) rotate(3deg)',
    deckFanned
      ? 'translate(96px, 12px) rotate(10deg)'
      : 'translate(46px, 14px) rotate(7deg)',
    deckFanned
      ? 'translate(154px, 30px) rotate(15deg)'
      : 'translate(74px, 28px) rotate(11deg)',
  ];

  return (
    <section
      id="project-section"
      className="relative w-full bg-[#0E0E0E] text-[#F4EFE6] py-20 sm:py-28 px-4 sm:px-8 md:px-12 overflow-hidden backstage-grain"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* ── 1. Scrollytelling Header + Interactive Stacked Ticket Deck (Screenshot 3) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16 sm:mb-24">
          {/* Left Headline */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#F4BE2A]">
              <span>[01 // SELECTED WORKS]</span>
              <span className="w-8 h-[1px] bg-[#F4BE2A]/50" />
              <span>CURATED {totalFlagship}</span>
            </div>

            <h2
              className="font-condensed uppercase text-[#F4EFE6] leading-[0.94] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.4rem)' }}
            >
              COME ON IN!
              <br />
              EXPLORE MY
              <br />
              CREATIVE SHOWCASE
            </h2>

            <p className="font-sans text-base sm:text-[17px] text-[#F4EFE6]/75 max-w-[50ch] leading-relaxed">
              Kurasi proyek web aplikasi produksi dan spesialisasi inti di bidang{' '}
              <span className="text-[#F4EFE6] font-semibold">Full-Stack Web (React, PHP, Node/Express)</span>,{' '}
              <span className="text-[#F4EFE6] font-semibold">Arsitektur Multi-Tenant &amp; JWT</span>, serta{' '}
              <span className="text-[#F4EFE6] font-semibold">Hermes AI &amp; IBM Granite</span>.
              Klik tiket mana saja untuk membuka studi kasus lengkap.
            </p>
          </div>

          {/* Right Interactive Fanning Ticket Collage */}
          <div
            onMouseEnter={() => setDeckFanned(true)}
            onMouseLeave={() => setDeckFanned(false)}
            onClick={() => setDeckFanned((v) => !v)}
            className="lg:col-span-6 relative h-[320px] sm:h-[380px] flex items-center justify-center cursor-pointer select-none"
          >
            {/* Custom Illustrated Creator Star Badge Peeking Behind Top-Right */}
            <div
              className={`absolute top-2 right-6 sm:right-14 z-10 transition-transform duration-500 ease-expo-out ${
                deckFanned ? 'translate-x-4 -translate-y-4 rotate-12' : 'rotate-6'
              }`}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                  <polygon
                    points="100,8 126,44 170,34 164,78 194,108 160,136 168,180 124,172 100,196 76,172 32,180 40,136 6,108 36,78 30,34 74,44"
                    fill="#F4BE2A"
                    stroke="#121212"
                    strokeWidth="5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                  <Sparkles size={18} className="text-[#121212] mb-0.5" />
                  <span className="font-condensed uppercase text-[12px] leading-tight text-[#121212]">
                    CLICK ANY
                    <br />
                    TICKET!
                  </span>
                </div>
              </div>
            </div>

            {/* Stacked 6 Mini Perforated Tickets */}
            {SELECTED_WORKS.map((work, idx) => (
              <div
                key={work.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectWork(work);
                }}
                data-cursor-label="OPEN CASE ↗"
                style={{
                  transform: fanTransforms[idx] || fanTransforms[0],
                  zIndex: 12 + idx,
                  backgroundColor: work.ticketBg,
                }}
                className="absolute w-[158px] sm:w-[190px] p-2.5 rounded-sm border-2 border-[#121212] text-[#121212] shadow-[0_18px_38px_rgba(0,0,0,0.65)] transition-all duration-500 ease-expo-out hover:!scale-110 hover:!z-40"
              >
                <div className="border border-[#121212]/35 p-2">
                  <div className="font-mono text-[8px] uppercase flex justify-between pb-1 mb-1.5 border-b border-[#121212]/25">
                    <span>#{work.number}</span>
                    <span>{work.year}</span>
                  </div>
                  <div className="aspect-[4/3] bg-[#121212] overflow-hidden mb-2 border border-[#121212]/40">
                    <img
                      src={work.heroImg}
                      alt={work.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-condensed uppercase text-sm sm:text-base leading-none text-center truncate">
                    {work.ticketTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. View Switcher Bar (PRD F-03: Ticket Stage / Editorial Asymmetric Grid / Hover Index) ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/15">
          <div className="font-mono text-xs uppercase tracking-[0.09em] text-[#F4EFE6]/70">
            SHOWING{' '}
            <span className="text-[#F4EFE6] font-bold">
              {totalFlagship} FLAGSHIP CASE STUDIES
            </span>{' '}
            — SELECT VIEW MODE:
          </div>

          <div
            role="tablist"
            aria-label="Project showcase view switcher"
            className="inline-flex items-center p-1 rounded-full bg-[#1A1A1A] border border-white/15 font-mono text-[11px] uppercase tracking-[0.07em]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'tickets'}
              onClick={() => setViewMode('tickets')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'tickets'
                  ? 'bg-[#F4BE2A] text-[#121212] font-bold shadow-sm'
                  : 'text-[#F4EFE6]/75 hover:text-white'
              }`}
            >
              <Ticket size={13} />
              <span>TICKET VIEW</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'editorial'}
              onClick={() => setViewMode('editorial')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'editorial'
                  ? 'bg-[#F6F5F0] text-[#121212] font-bold shadow-sm'
                  : 'text-[#F4EFE6]/75 hover:text-white'
              }`}
            >
              <LayoutGrid size={13} />
              <span>GRID VIEW</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'index'}
              onClick={() => setViewMode('index')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'index'
                  ? 'bg-[#FF3B00] text-white font-bold shadow-sm'
                  : 'text-[#F4EFE6]/75 hover:text-white'
              }`}
            >
              <List size={13} />
              <span>INDEX VIEW</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* MODE A: PERFORATED CONCERT TICKET STAGE (Balanced 2x3 Ticket Rack)     */}
        {/* ===================================================================== */}
        {viewMode === 'tickets' && (
          <div className="space-y-12 animate-view-enter">
            {/* Primary 3-Ticket Row: All 3 Real Production Web Apps from CV */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start pt-2">
              {SELECTED_WORKS.slice(0, 3).map((work, idx) => {
                const tiltClass =
                  idx === 0
                    ? 'md:-rotate-1'
                    : idx === 1
                    ? 'md:-rotate-2 md:-translate-y-2'
                    : 'md:rotate-2';
                return (
                  <RevealOnScroll key={work.id} delay={idx * 80}>
                    <div className={`transition-transform ${tiltClass}`}>
                      <PerforatedTicketCard work={work} onClick={onSelectWork} />
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>

            {/* Secondary 3-Ticket Row: AI Agents/Hermes, Backend/AWS, & IBM Granite */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start pt-2">
              {SELECTED_WORKS.slice(3, 6).map((work, idx) => {
                const tiltClass =
                  idx === 0
                    ? 'md:rotate-1'
                    : idx === 1
                    ? 'md:-rotate-1 md:translate-y-1'
                    : 'md:-rotate-2';
                return (
                  <RevealOnScroll key={work.id} delay={idx * 90}>
                    <div className={`transition-transform ${tiltClass}`}>
                      <PerforatedTicketCard work={work} onClick={onSelectWork} />
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE B: ASYMMETRIC EDITORIAL ZINE GRID (PRD F-03 12-Col Spec)         */}
        {/* ===================================================================== */}
        {viewMode === 'editorial' && (
          <div className="rounded-[24px] bg-[#F6F5F0] text-[#121212] p-5 sm:p-10 md:p-14 editorial-grain space-y-20 sm:space-y-28 border border-white/10 animate-view-enter">
            {/* Project 01: 7 Columns Left + Editorial Caption in Col 8–12 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
              <div
                onClick={() => onSelectWork(SELECTED_WORKS[0])}
                data-cursor-label="OPEN CASE ↗"
                className="lg:col-span-7 group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#121212] border border-[#121212]/15 shadow-lg">
                  <img
                    src={SELECTED_WORKS[0].heroImg}
                    alt={SELECTED_WORKS[0].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#121212] text-[#F6F5F0] font-mono text-xs">
                    01 / {totalFlagship}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-3 pb-2">
                <p className="font-mono text-xs uppercase tracking-[0.09em] text-[#6E6D68]">
                  01 / {totalFlagship} — {SELECTED_WORKS[0].category} · {SELECTED_WORKS[0].duration}
                </p>
                <h3 className="font-serif text-4xl sm:text-5xl leading-[1.02] text-[#121212]">
                  {SELECTED_WORKS[0].title}
                </h3>
                <p className="font-sans text-[16px] text-[#121212]/80 leading-relaxed">
                  {SELECTED_WORKS[0].tagline}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectWork(SELECTED_WORKS[0])}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121212] text-[#F6F5F0] font-mono text-xs uppercase hover:bg-[#FF3B00] transition-colors cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>
                  {SELECTED_WORKS[0].links?.live && (
                    <a
                      href={SELECTED_WORKS[0].links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#121212]/25 font-mono text-xs uppercase hover:bg-[#121212] hover:text-white transition-colors"
                    >
                      <span>Live App</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Project 02: 5 Columns Right-Aligned Staggered Offset (Negative Space) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.09em] text-[#6E6D68]">
                  02 / {totalFlagship} — {SELECTED_WORKS[1].category} · {SELECTED_WORKS[1].duration}
                </p>
                <h3 className="font-serif italic text-4xl sm:text-5xl leading-[1.02] text-[#121212]">
                  {SELECTED_WORKS[1].title}
                </h3>
                <p className="font-sans text-[16px] text-[#121212]/80 leading-relaxed">
                  {SELECTED_WORKS[1].tagline}
                </p>
                <div className="pt-1 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectWork(SELECTED_WORKS[1])}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121212] text-[#F6F5F0] font-mono text-xs uppercase hover:bg-[#FF3B00] transition-colors cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>
                  {SELECTED_WORKS[1].links?.github && (
                    <a
                      href={SELECTED_WORKS[1].links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#121212]/25 font-mono text-xs uppercase hover:bg-[#121212] hover:text-white transition-colors"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              <div
                onClick={() => onSelectWork(SELECTED_WORKS[1])}
                data-cursor-label="OPEN CASE ↗"
                className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 group cursor-pointer lg:translate-y-6"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#121212] border border-[#121212]/15 shadow-lg">
                  <img
                    src={SELECTED_WORKS[1].heroImg}
                    alt={SELECTED_WORKS[1].title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-expo-out group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F4BE2A] text-[#121212] font-mono font-bold text-xs">
                    02 / {totalFlagship}
                  </span>
                </div>
              </div>
            </div>

            {/* Project 03: Flagship Full-Width 12-Column Editorial Spread (SIM ORMAWA & HMJ Multi-Tenant) */}
            <div className="pt-4 space-y-5">
              <div
                onClick={() => onSelectWork(SELECTED_WORKS[2])}
                data-cursor-label="OPEN CASE ↗"
                className="group cursor-pointer relative aspect-[16/10] sm:aspect-[21/10] rounded-2xl overflow-hidden bg-[#0D1117] border border-[#121212]/15 shadow-xl"
              >
                <img
                  src={SELECTED_WORKS[2].heroImg}
                  alt={SELECTED_WORKS[2].title}
                  loading="lazy"
                  className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-700 ease-expo-out group-hover:scale-[1.02]"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#5CC2E8] text-[#121212] font-mono font-bold text-xs">
                  03 / {totalFlagship} — MULTI-TENANT ARCHITECTURE
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#121212]/15 pb-6">
                <div className="max-w-3xl space-y-1.5">
                  <p className="font-mono text-xs uppercase tracking-[0.09em] text-[#6E6D68]">
                    {SELECTED_WORKS[2].category} · {SELECTED_WORKS[2].duration}
                  </p>
                  <h3 className="font-serif text-4xl sm:text-5xl text-[#121212]">
                    {SELECTED_WORKS[2].title}
                  </h3>
                  <p className="font-sans text-[15.5px] text-[#121212]/75">
                    {SELECTED_WORKS[2].tagline}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectWork(SELECTED_WORKS[2])}
                  className="self-start md:self-auto shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF3B00] text-white font-mono text-xs uppercase font-bold hover:bg-[#121212] transition-colors cursor-pointer"
                >
                  <span>Inspect Multi-Tenant Case</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Projects 04, 05 & 06: Editorial Credential Trio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {SELECTED_WORKS.slice(3, 6).map((work, idx) => (
                <div
                  key={work.id}
                  onClick={() => onSelectWork(work)}
                  data-cursor-label="OPEN CASE ↗"
                  className={`group cursor-pointer space-y-3 ${
                    idx === 1 ? 'md:mt-8' : idx === 2 ? 'md:mt-16' : ''
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#121212]/15 p-2 shadow-md">
                    <img
                      src={work.heroImg}
                      alt={work.title}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#6E6D68] uppercase">
                    <span>
                      {work.number} / {totalFlagship} — {work.category}
                    </span>
                    <span>{work.year}</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#121212] group-hover:text-[#FF3B00] transition-colors">
                    {work.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE C: HOVER-LIST INDEX VIEW WITH FLOATING PREVIEW (PRD F-03)        */}
        {/* ===================================================================== */}
        {viewMode === 'index' && (
          <div className="relative divide-y divide-white/15 border-y border-white/15 animate-view-enter">
            {SELECTED_WORKS.map((work) => (
              <div
                key={work.id}
                onMouseEnter={(e) => {
                  if (!hoveredIndexWork) {
                    mouseRef.current.x = e.clientX;
                    mouseRef.current.y = e.clientY;
                    mouseRef.current.curX = e.clientX;
                    mouseRef.current.curY = e.clientY;
                  }
                  setHoveredIndexWork(work);
                }}
                onMouseLeave={() => setHoveredIndexWork(null)}
                onClick={() => onSelectWork(work)}
                data-cursor-label="OPEN CASE ↗"
                className="group py-6 sm:py-8 px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm text-[#F4BE2A]">
                    {work.number} / {work.total}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-5xl text-[#F4EFE6] group-hover:italic group-hover:text-[#FF3B00] transition-all">
                    {work.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 font-mono text-xs uppercase tracking-[0.08em] text-[#F4EFE6]/65">
                  <span>{work.category}</span>
                  <span className="text-[#F4EFE6]">{work.duration || work.year}</span>
                  <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF3B00] group-hover:border-[#FF3B00] group-hover:text-white transition-colors">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            ))}

            {/* Floating Cursor-Tracking Preview Window (Desktop Only) */}
            <div
              ref={previewRef}
              aria-hidden="true"
              className={`hidden lg:block fixed top-0 left-0 pointer-events-none z-50 w-[300px] p-2.5 rounded-xl border-2 border-[#121212] shadow-2xl transition-opacity duration-200 ${
                hoveredIndexWork ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundColor: hoveredIndexWork?.ticketBg || '#F4BE2A',
              }}
            >
              {hoveredIndexWork && (
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#121212] mb-2">
                    <img
                      src={hoveredIndexWork.heroImg}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase text-[#121212] px-1">
                    <span>{hoveredIndexWork.ticketTitle}</span>
                    <span>CLICK TO OPEN ↗</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 3. Bottom Vintage Hand CTA to Playground Vault ── */}
        <div className="mt-16 sm:mt-20 flex items-center justify-center gap-5">
          <VintagePointingHand />
          <button
            type="button"
            onClick={() => scrollToTarget('playground-section')}
            className="px-7 py-3.5 rounded-full bg-[#F4BE2A] text-[#121212] font-sans font-bold text-sm sm:text-base hover:bg-[#FF3B00] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(244,190,42,0.28)] cursor-pointer"
          >
            Check out all {PLAYGROUND_ARCHIVE.length} verified projects &amp; credentials
          </button>
          <VintagePointingHand flip />
        </div>
      </div>
    </section>
  );
}
