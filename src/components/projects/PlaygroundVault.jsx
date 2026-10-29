import { useState, useMemo } from 'react';
import { ArrowUpRight, ShieldCheck, Layers } from 'lucide-react';
import {
  PLAYGROUND_ARCHIVE,
  SERVICES_SETLIST,
} from '../../data/editorialPortfolioData';

const ARCHIVE_FILTERS = [
  'ALL',
  'WEB APPS',
  'AI & AGENTS',
  'IBM GRANITE & DATA',
  'BACKEND & CLOUD',
  'ACHIEVEMENTS',
];

export default function PlaygroundVault({ onOpenBySlug }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'ALL') return PLAYGROUND_ARCHIVE;
    return PLAYGROUND_ARCHIVE.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="playground-section"
      className="relative w-full bg-[#F6F5F0] text-[#121212] py-20 sm:py-28 px-4 sm:px-8 md:px-12 editorial-grain border-y border-[#121212]/12"
    >
      <div className="max-w-[1380px] mx-auto space-y-24">
        {/* ── PART 1: "THE FULL SETLIST: MY ENGINEERING SERVICES" (Screenshot 4 Bottom) ── */}
        <div id="capabilities-section" className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#121212]/15 pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#FF3B00] font-bold mb-2">
                [02 // CAPABILITIES &amp; SERVICES]
              </p>
              <h2
                className="font-condensed uppercase text-[#121212] leading-[0.94] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.6rem)' }}
              >
                THE FULL SETLIST: WHAT I BUILD &amp; DELIVER
              </h2>
            </div>
            <p className="font-serif italic text-xl sm:text-2xl text-[#6E6D68] max-w-md">
              Menggabungkan ketajaman visual editorial dengan rekayasa web &amp; kecerdasan buatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_SETLIST.map((srv) => (
              <div
                key={srv.number}
                className="group p-6 rounded-2xl bg-[#EBE9E1] border border-[#121212]/15 flex flex-col justify-between hover:bg-[#121212] hover:text-[#F6F5F0] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-5">
                    <span className="px-2.5 py-1 rounded-full bg-[#121212] text-[#F6F5F0] group-hover:bg-[#FF3B00] transition-colors">
                      TRACK {srv.number}
                    </span>
                    <Layers size={16} className="opacity-50" />
                  </div>
                  <h3 className="font-sans font-bold text-xl leading-snug mb-2.5">
                    {srv.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed opacity-80 mb-6">
                    {srv.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-current/15">
                  {srv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded font-mono text-[10px] uppercase border border-current/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PART 2: THE PLAYGROUND / COMPLETE VERIFIED CREDENTIAL VAULT (PRD Section 04) ── */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#6E6D68] mb-2">
                [ARCHIVE // {PLAYGROUND_ARCHIVE.length} VERIFIED PROJECTS, CERTIFICATES &amp; ACHIEVEMENTS]
              </p>
              <h2
                className="font-serif text-[#121212] leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
              >
                The Playground &amp;{' '}
                <span className="italic text-[#FF3B00]">Credential Vault</span>
              </h2>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {ARCHIVE_FILTERS.map((cat) => {
                const active = activeFilter === cat;
                const count =
                  cat === 'ALL'
                    ? PLAYGROUND_ARCHIVE.length
                    : PLAYGROUND_ARCHIVE.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#121212] text-[#F6F5F0] border-[#121212] font-bold shadow-sm'
                        : 'bg-white/75 text-[#121212]/80 border-[#121212]/15 hover:border-[#121212]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Archive Cards Grid */}
          <div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-view-enter"
          >
            {filteredItems.map((item) => (
              <article
                key={item.slug}
                onClick={() => onOpenBySlug?.(item.slug)}
                data-cursor-label="INSPECT DOC ↗"
                className="group rounded-xl bg-white border border-[#121212]/15 p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-expo-out hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(18,18,18,0.12)] hover:border-[#121212]"
              >
                <div>
                  {/* Top Serial Header */}
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6D68] mb-2 px-0.5">
                    <span className="flex items-center gap-1.5 font-semibold text-[#121212]">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: item.accent }}
                      />
                      {item.code}
                    </span>
                    <span>{item.year}</span>
                  </div>

                  {/* Image Preview */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#EBE9E1] border border-[#121212]/10 mb-3">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#121212]/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-[#6E6D68] mb-0.5">
                    {item.issuer}
                  </p>
                  <h3 className="font-sans font-bold text-[15.5px] leading-snug text-[#121212] group-hover:text-[#FF3B00] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#121212]/10 flex items-center justify-between font-mono text-[10px] uppercase text-[#6E6D68]">
                  <span className="inline-flex items-center gap-1 text-[#121212]/80">
                    <ShieldCheck size={12} className="text-[#10B981]" />
                    Verified
                  </span>
                  <span className="group-hover:text-[#121212] font-semibold">
                    Open Drawer →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

