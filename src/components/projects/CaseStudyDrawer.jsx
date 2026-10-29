import { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { SELECTED_WORKS, PLAYGROUND_ARCHIVE } from '../../data/editorialPortfolioData';
import { PROJECT_DETAILS_DATA } from '../../data/projectDetailsData';

/**
 * Normalize either a Flagship SELECTED_WORKS entry OR a slug/entry from PROJECT_DETAILS_DATA
 * into a unified Case Study Drawer payload.
 */
export function resolveCaseStudyItem(itemOrSlug) {
  if (!itemOrSlug) return null;

  const slug = typeof itemOrSlug === 'string' ? itemOrSlug : itemOrSlug.slug;
  const flagship = SELECTED_WORKS.find((w) => w.slug === slug);
  if (flagship) return flagship;

  const detail = PROJECT_DETAILS_DATA[slug];
  if (detail) {
    const shortWords = detail.title.split(' ').slice(0, 3).join(' ').toUpperCase();
    return {
      slug,
      number: 'DOC',
      total: String(PLAYGROUND_ARCHIVE.length),
      title: detail.title,
      shortTitle: shortWords,
      category: detail.category || 'Verified Credential',
      creativeField: detail.category || 'Engineering & AI Credential',
      duration: `${detail.year || '2025–2026'} · Verified Document`,
      year: detail.year || '2026',
      client:
        detail.features
          ?.find((f) => f.toLowerCase().startsWith('penerbit:'))
          ?.replace(/^Penerbit:\s*/i, '') || 'Official Credential Issuer',
      role: 'Reza Fahmi Alkhamdani',
      heroImg: detail.heroImg,
      galleryImgs: [{ src: detail.heroImg, caption: detail.tagline }],
      tagline: detail.tagline,
      challenge:
        detail.tagline ||
        'Dokumentasi kompetensi resmi yang memvalidasi penguasaan materi teknis dan praktik rekayasa perangkat lunak/AI.',
      solution:
        'Menyelesaikan seluruh modul pembelajaran, evaluasi ujian akhir, serta implementasi studi kasus sesuai standar industri penyelenggara.',
      features: detail.features || [],
      impact: detail.impact || [],
      stack: detail.stack || [],
      links: detail.links || {},
      ticketBg: '#F4BE2A',
    };
  }

  return typeof itemOrSlug === 'object' ? itemOrSlug : null;
}

export default function CaseStudyDrawer({ activeItem, onClose, onSelectWork }) {
  const scrollContainerRef = useRef(null);
  const [renderedItem, setRenderedItem] = useState(null);
  const [phase, setPhase] = useState('closed'); // 'closed' | 'entering' | 'open' | 'closing'
  const [contentTransitioning, setContentTransitioning] = useState(false);

  // Smooth two-way enter & exit lifecycle
  useEffect(() => {
    if (activeItem) {
      const nextResolved = resolveCaseStudyItem(activeItem);
      if (renderedItem && renderedItem.slug !== nextResolved?.slug && phase === 'open') {
        // Smooth cross-fade when switching to Next Project inside open drawer
        setContentTransitioning(true);
        const switchTimer = setTimeout(() => {
          setRenderedItem(nextResolved);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
          }
          setContentTransitioning(false);
        }, 180);
        return () => clearTimeout(switchTimer);
      }

      setRenderedItem(nextResolved);
      setPhase('entering');
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('open');
        });
      });
      return () => cancelAnimationFrame(raf1);
    }

    if (renderedItem) {
      setPhase('closing');
      const exitTimer = setTimeout(() => {
        setPhase('closed');
        setRenderedItem(null);
      }, 420);
      return () => clearTimeout(exitTimer);
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  const requestClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!renderedItem) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [renderedItem, requestClose]);

  if (!renderedItem || phase === 'closed') return null;

  const study = renderedItem;
  const isVisible = phase === 'open';

  const currentFlagshipIdx = SELECTED_WORKS.findIndex((w) => w.slug === study.slug);
  const nextWork =
    currentFlagshipIdx >= 0
      ? SELECTED_WORKS[(currentFlagshipIdx + 1) % SELECTED_WORKS.length]
      : SELECTED_WORKS[0];

  const liveUrl = study.links?.live;
  const repoUrl = study.links?.github || study.links?.repo;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${study.title}`}
      className="fixed inset-0 flex flex-col justify-end"
      style={{ zIndex: 500 }}
    >
      {/* Smooth Backdrop Blur Veil */}
      <div
        onClick={requestClose}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Slide-Up / Slide-Down 92vh Editorial Case Study Panel */}
      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        style={{
          transform: isVisible ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 100%, 0)',
          transition: 'transform 0.46s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
        className="relative w-full h-[92vh] bg-[#0E0E0E] text-[#F4EFE6] rounded-t-[28px] sm:rounded-t-[36px] border-t border-white/15 overflow-y-auto overscroll-contain shadow-[0_-24px_80px_rgba(0,0,0,0.85)] backstage-grain"
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-40 bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-white/10 px-5 sm:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.09em]">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block transition-colors duration-300"
              style={{ backgroundColor: study.ticketBg || '#FF3B00' }}
            />
            <span className="text-[#F4EFE6]/70">
              {study.number} / {study.total} — CASE STUDY DRAWER
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF3B00] text-white font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-[#F4BE2A] hover:text-[#121212] transition-colors"
              >
                <span>Live Site / Verify</span>
                <ExternalLink size={12} />
              </a>
            )}
            <button
              type="button"
              onClick={requestClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-[#121212] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Close [ESC]</span>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Cross-fade Wrapper for Next-Project Switching */}
        <div
          style={{
            opacity: contentTransitioning ? 0 : 1,
            transform: contentTransitioning ? 'translate3d(0, 12px, 0)' : 'translate3d(0, 0, 0)',
            transition: 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* 1. Top 4-Column Metadata Row (Screenshot 5) */}
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-8 pb-6 grid grid-cols-2 lg:grid-cols-4 gap-6 border-b border-white/10">
            <div>
              <p className="font-sans text-xs text-[#F4EFE6]/55 mb-1">Creative &amp; Tech field</p>
              <p className="font-sans font-semibold text-sm sm:text-base text-[#F4EFE6]">
                {study.creativeField || study.category}
              </p>
            </div>
            <div>
              <p className="font-sans text-xs text-[#F4EFE6]/55 mb-1">Duration &amp; year</p>
              <p className="font-sans font-semibold text-sm sm:text-base text-[#F4EFE6]">
                {study.duration || study.year}
              </p>
            </div>
            <div>
              <p className="font-sans text-xs text-[#F4EFE6]/55 mb-1">Client / Issuer</p>
              <p className="font-sans font-semibold text-sm sm:text-base text-[#F4EFE6]">
                {study.client}
              </p>
            </div>
            <div>
              <p className="font-sans text-xs text-[#F4EFE6]/55 mb-1">Software &amp; Stack</p>
              <p className="font-sans font-semibold text-sm sm:text-base text-[#F4EFE6]">
                {(study.stack || []).slice(0, 4).join(', ')}
              </p>
            </div>
          </div>

          {/* 2. Giant Edge-to-Edge Background Display Title + Elevated Hero Visual */}
          <div className="relative w-full py-10 sm:py-16 overflow-hidden flex flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="w-full text-center font-condensed uppercase text-[#F4EFE6] leading-[0.84] tracking-[-0.02em] select-none pointer-events-none px-2 whitespace-nowrap overflow-hidden"
              style={{ fontSize: 'clamp(4rem, 15.5vw, 15.5rem)' }}
            >
              {study.shortTitle || study.title}
            </div>

            <div className="relative z-10 -mt-10 sm:-mt-24 md:-mt-32 w-[90%] max-w-[880px] rounded-xl sm:rounded-2xl bg-[#F6F5F0] p-2 sm:p-3.5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/20">
              <div className="w-full max-h-[500px] rounded-lg overflow-hidden bg-[#141414] flex items-center justify-center">
                <img
                  src={study.heroImg}
                  alt={study.title}
                  className="w-full max-h-[490px] object-contain"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 px-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4BE2A] text-[#121212] font-sans font-bold text-sm hover:bg-[#FF3B00] hover:text-white transition-colors shadow-lg"
                >
                  <span>Open Live Deployment / Credential</span>
                  <ExternalLink size={15} />
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 bg-white/5 text-[#F4EFE6] font-sans font-semibold text-sm hover:bg-white hover:text-[#121212] transition-colors"
                >
                  <Github size={16} />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* 3. Magazine Case Study Body */}
          <div className="max-w-[1120px] mx-auto px-5 sm:px-10 py-10 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-white/12 pt-12">
              <div className="lg:col-span-5 space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#FF3B00]">
                  [01 // THE CHALLENGE &amp; CONTEXT]
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#F4EFE6] leading-[1.03]">
                  {study.title}
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <p className="font-sans text-base sm:text-lg text-[#F4EFE6]/90 leading-relaxed">
                  {study.challenge}
                </p>
                {study.solution && (
                  <p className="font-sans text-sm sm:text-base text-[#F4EFE6]/70 leading-relaxed border-l-2 border-[#F4BE2A] pl-4">
                    {study.solution}
                  </p>
                )}
              </div>
            </div>

            {study.galleryImgs && study.galleryImgs.length > 1 && (
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#F4BE2A]">
                  [02 // VISUAL &amp; ARCHITECTURE WALKTHROUGH]
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {study.galleryImgs.map((g, idx) => (
                    <figure
                      key={idx}
                      className="rounded-2xl bg-[#161616] border border-white/10 p-3 flex flex-col justify-between"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black flex items-center justify-center mb-3">
                        <img
                          src={g.src}
                          alt={g.caption || study.title}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {g.caption && (
                        <figcaption className="font-mono text-[11px] text-[#F4EFE6]/70 leading-relaxed px-1">
                          0{idx + 1} — {g.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/12 pt-12">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#161616] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.09em] text-[#F4BE2A]">
                  <Sparkles size={14} />
                  <span>KEY EXECUTION &amp; INFORMATION</span>
                </div>
                <ul className="space-y-3 font-sans text-sm sm:text-[15px] text-[#F4EFE6]/85">
                  {(study.features || []).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#161616] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.09em] text-[#FF3B00]">
                  <span>★ THE SOLUTION &amp; IMPACT</span>
                </div>
                <ul className="space-y-3 font-sans text-sm sm:text-[15px] text-[#F4EFE6]/85">
                  {(study.impact || []).map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-relaxed">
                      <span className="font-mono text-xs font-bold text-[#F4BE2A] mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {study.stack && study.stack.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#F4EFE6]/50 mr-2">
                  STACK &amp; TOPICS:
                </span>
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 font-mono text-xs text-[#F4EFE6]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* 4. Bottom Navigation */}
            <div className="pt-10 pb-12 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button
                type="button"
                onClick={requestClose}
                className="px-7 py-3 rounded-full border border-[#F4EFE6]/50 text-[#F4EFE6] font-sans text-sm hover:bg-[#F4EFE6] hover:text-[#121212] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={15} />
                <span>back to the main page</span>
              </button>

              {nextWork && (
                <button
                  type="button"
                  onClick={() => onSelectWork(nextWork)}
                  data-cursor-label="NEXT PROJECT →"
                  className="group w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#F6F5F0] text-[#121212] hover:bg-[#FF3B00] hover:text-white transition-all duration-300 flex items-center justify-between sm:justify-start gap-5 cursor-pointer shadow-xl"
                >
                  <div className="text-left">
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] opacity-65">
                      NEXT PROJECT ({nextWork.number} / {nextWork.total})
                    </p>
                    <p className="font-condensed uppercase text-xl sm:text-2xl leading-none mt-0.5">
                      {nextWork.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-1.5 shrink-0"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
