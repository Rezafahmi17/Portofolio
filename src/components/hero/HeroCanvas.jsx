import { useState, useRef } from 'react';
import { Github, Linkedin, Shuffle, Sparkles, ArrowUpRight, FileDown } from 'lucide-react';
import {
  EDITORIAL_PROFILE,
  TOP_MARQUEE_TAGS,
} from '../../data/editorialPortfolioData';
import DraggableArtifact from './DraggableArtifact';
import InteractiveLanyardPass from './InteractiveLanyardPass';
import { scrollToTarget } from '../shared/SmoothScrollProvider';

const PILL_NAV = [
  { label: 'About me', target: 'about-section' },
  { label: 'My portfolio', target: 'project-section' },
  { label: 'My services', target: 'capabilities-section' },
  { label: 'My contacts', target: 'contact-section' },
];

// 10-Point Starburst SVG Polygon (Matches Top-Left Yellow Sticker in Screenshot 1)
function StarburstSticker() {
  return (
    <div className="relative w-[108px] h-[108px] sm:w-[132px] sm:h-[132px] flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-sm"
        aria-hidden="true"
      >
        <polygon
          points="100,4 123,36 162,24 162,64 196,86 172,119 186,157 146,164 134,196 100,175 66,196 54,164 14,157 28,119 4,86 38,64 38,24 77,36"
          fill="#F4BE2A"
          stroke="#121212"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center p-4">
        <span className="font-condensed uppercase text-[12px] sm:text-[14.5px] leading-[1.02] tracking-[0.02em] text-[#121212]">
          BASED IN
          <br />
          LAMPUNG
          <br />
          INDONESIA
        </span>
      </div>
    </div>
  );
}

export default function HeroCanvas({ onOpenQuickProject }) {
  const stageCardRef = useRef(null);
  const [stageMode, setStageMode] = useState('pink'); // 'pink' (Screenshot 1) | 'paper' (PRD Warm Paper)
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [offsets, setOffsets] = useState([
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
  ]);

  const handleShuffleOrReset = () => {
    if (shuffleSeed % 3 === 2) {
      setOffsets([
        { x: 0, y: 0, r: 0 },
        { x: 0, y: 0, r: 0 },
        { x: 0, y: 0, r: 0 },
        { x: 0, y: 0, r: 0 },
      ]);
    } else {
      const rand = (range) => Math.round((Math.random() - 0.5) * range);
      setOffsets([
        { x: rand(26), y: rand(20), r: rand(14) },
        { x: rand(34), y: rand(24), r: rand(12) },
        { x: rand(34), y: rand(24), r: rand(14) },
        { x: rand(28), y: rand(20), r: rand(12) },
      ]);
    }
    setShuffleSeed((s) => s + 1);
  };

  const isPink = stageMode === 'pink';

  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#0E0E0E] pt-0 pb-4 sm:pb-6 px-2.5 sm:px-5 md:px-7 overflow-hidden"
    >
      {/* ── 1. Top Scrolling Specialty Marquee Bar (Screenshot 1 Purple Ticker) ── */}
      <div className="-mx-2.5 sm:-mx-5 md:-mx-7 mb-2.5 sm:mb-4 bg-[#5B46E5] border-b border-black/30 py-2 overflow-hidden select-none">
        <div className="animate-marquee-left flex items-center gap-8 font-mono text-[11px] sm:text-xs font-medium tracking-[0.06em] text-[#F4EFE6]">
          {[...TOP_MARQUEE_TAGS, ...TOP_MARQUEE_TAGS, ...TOP_MARQUEE_TAGS].map((tag, idx) => (
            <span key={idx} className="whitespace-nowrap opacity-95">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── 2. Framed Editorial Backstage Canvas Card (Hosts Continuous Lanyard Rope!) ── */}
      <div
        ref={stageCardRef}
        className={`relative w-full min-h-[88vh] sm:min-h-[91vh] rounded-[24px] sm:rounded-[34px] overflow-hidden flex flex-col justify-between transition-colors duration-500 border ${
          isPink
            ? 'bg-[#E83677] text-[#121212] border-white/10 editorial-grain'
            : 'bg-[#F6F5F0] text-[#121212] border-black/15 editorial-grain'
        }`}
      >
        {/* Subtle 12-Column Editorial Background Hairlines (z-index: 1) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-4 md:grid-cols-12 gap-4 px-5 sm:px-10 pointer-events-none opacity-25"
          style={{ zIndex: 1 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border-x border-[#121212]/10 ${i >= 4 ? 'hidden md:block' : ''}`}
            />
          ))}
        </div>

        {/* ── Top Stage Bar: Starburst Sticker + Center Black Pill Nav + Social Circles ── */}
        <div className="relative z-40 flex items-start justify-between px-4 sm:px-8 md:px-12 pt-9 sm:pt-11 pointer-events-none">
          {/* Draggable Artifact #1: Based in Lampung Indonesia Starburst */}
          <div className="-mt-1 -ml-1 sm:ml-0 pointer-events-auto" style={{ zIndex: 52 }}>
            <DraggableArtifact
              initialRotate={-11}
              resetSignal={shuffleSeed}
              shuffleOffset={offsets[0]}
            >
              <StarburstSticker />
            </DraggableArtifact>
          </div>

          {/* Center Floating Black Pill Navigation (Exact Screenshot 1 Bar) */}
          <div className="hidden lg:flex items-center gap-1 bg-[#111111] text-[#F6F5F0] px-2.5 py-2 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.3)] border border-white/10 pointer-events-auto">
            {PILL_NAV.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToTarget(item.target)}
                className="px-4 py-1.5 rounded-full font-sans text-[13px] font-medium text-[#F6F5F0]/90 hover:bg-[#F6F5F0] hover:text-[#111111] transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Top-Right Social & Stage Theme Controls */}
          <div className="flex items-center gap-2 pt-1 pointer-events-auto">
            <button
              type="button"
              onClick={() => setStageMode(isPink ? 'paper' : 'pink')}
              title="Switch Canvas Tone (Stage Pink / Editorial Paper)"
              className="px-3 py-2 rounded-full bg-[#111111] text-[#F6F5F0] font-mono text-[10px] uppercase tracking-[0.08em] hover:bg-[#FF3B00] transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Sparkles size={11} />
              <span className="hidden sm:inline">{isPink ? 'PAPER ZINE' : 'STAGE PINK'}</span>
            </button>

            <a
              href={EDITORIAL_PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Reza Fahmi"
              className="w-10 h-10 rounded-full bg-[#111111] text-[#F6F5F0] flex items-center justify-center hover:bg-[#FF3B00] hover:scale-105 transition-all shadow-md"
            >
              <Github size={17} />
            </a>
            <a
              href={EDITORIAL_PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Reza Fahmi"
              className="w-10 h-10 rounded-full bg-[#111111] text-[#F6F5F0] flex items-center justify-center hover:bg-[#1D4ED8] hover:scale-105 transition-all shadow-md"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </div>

        {/* ── Middle Interactive Canvas: Statement Typography + Continuous Physics Lanyard ── */}
        <div className="relative z-30 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-5 sm:px-10 md:px-14 pt-4 pb-6">
          {/* Left Column: Bold Editorial Statement & Instant Status */}
          <div className="lg:col-span-6 space-y-5 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#121212]/25 bg-white/25 backdrop-blur-sm font-mono text-[10.5px] uppercase tracking-[0.1em] font-semibold">
              <span>INTERACTIVE EDITORIAL PORTFOLIO // 2026</span>
            </div>

            <h1
              className="font-condensed uppercase text-[#121212] tracking-[-0.02em] leading-[0.91]"
              style={{ fontSize: 'clamp(3.1rem, 6.4vw, 5.8rem)' }}
            >
              {EDITORIAL_PROFILE.heroHeadlineTop}
              <br />
              <span className="inline-flex flex-wrap items-baseline gap-x-3">
                <span>{EDITORIAL_PROFILE.heroHeadlineBottom}</span>
                <span className="font-serif italic font-normal lowercase text-[0.78em] tracking-normal underline decoration-[#121212]/40 decoration-2 underline-offset-4">
                  for web &amp; AI
                </span>
              </span>
            </h1>

            <p className="font-sans text-[15.5px] sm:text-[17px] leading-[1.58] text-[#121212]/90 max-w-[46ch] font-medium">
              {EDITORIAL_PROFILE.heroSubheadline}
            </p>

            {/* Primary Instant CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollToTarget('project-section')}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#111111] text-[#F6F5F0] font-sans text-xs sm:text-sm font-semibold hover:bg-[#FF3B00] transition-colors cursor-pointer shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Available for new projects</span>
                <ArrowUpRight size={15} />
              </button>

              <a
                href={EDITORIAL_PROFILE.cvUrl}
                download={EDITORIAL_PROFILE.cvFileName}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full border-[1.5px] border-[#121212] bg-[#F6F5F0]/85 text-[#121212] font-mono text-[11px] font-bold uppercase tracking-[0.07em] hover:bg-[#121212] hover:text-[#F6F5F0] transition-colors"
              >
                <FileDown size={14} />
                <span>Download CV</span>
              </a>

              <button
                type="button"
                onClick={handleShuffleOrReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-[#121212]/30 bg-black/5 hover:bg-black/15 font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#121212] transition-colors cursor-pointer"
                title="Acak atau ayunkan stiker & nametag"
              >
                <Shuffle size={12} />
                <span className="md:hidden">Tap to Swing</span>
                <span className="hidden md:inline">Swing &amp; Shuffle</span>
              </button>
            </div>

            {/* Secondary Floating Draggable Stickers Cluster */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <DraggableArtifact
                initialRotate={-4}
                resetSignal={shuffleSeed}
                shuffleOffset={offsets[1]}
              >
                <div className="px-3.5 py-2 rounded-xl bg-[#F6F5F0] border-2 border-[#121212] shadow-md flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#FF3B00] text-white font-mono text-[10px] font-bold">
                    19×
                  </span>
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#121212]">
                    VERIFIED WORKS &amp; CERTS
                  </span>
                </div>
              </DraggableArtifact>

              <DraggableArtifact
                initialRotate={5}
                resetSignal={shuffleSeed}
                shuffleOffset={offsets[2]}
              >
                <div className="px-3.5 py-2 rounded-lg bg-[#6E44FF] text-[#F6F5F0] border-2 border-[#121212] shadow-md font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>★ REACT · PHP · EXPRESS · SQL</span>
                </div>
              </DraggableArtifact>
            </div>
          </div>

          {/* Right Column: Continuous Physics Lanyard Nametag + Live App Polaroid */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[430px] sm:min-h-[460px] pt-14 lg:pt-4">
            {/* Draggable Artifact #4: Mini Live App Polaroid Sticker (Peeking Left of Lanyard) */}
            <div className="hidden sm:block absolute left-0 xl:left-4 bottom-4" style={{ zIndex: 51 }}>
              <DraggableArtifact
                initialRotate={-8}
                resetSignal={shuffleSeed}
                shuffleOffset={offsets[3]}
                onTap={() => onOpenQuickProject?.('kopi-nusantara')}
              >
                <div className="w-[156px] p-2 pb-3 rounded-lg bg-[#F6F5F0] border-2 border-[#121212] shadow-xl">
                  <div className="aspect-[4/3] rounded overflow-hidden bg-black border border-[#121212]/20 mb-2">
                    <img
                      src="/hackathon-base/base-realms-1.webp"
                      alt="Kopi Nusantara QR Preview"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[8.5px] font-bold uppercase text-[#121212]">
                    <span>KOPI QR // LIVE</span>
                    <span className="text-[#FF3B00]">TAP ↗</span>
                  </div>
                </div>
              </DraggableArtifact>
            </div>

            {/* Centerpiece Physics-Driven Continuous Lanyard & VIP Nametag */}
            <div className="relative lg:mr-6 xl:mr-14 lg:-mb-12">
              <InteractiveLanyardPass
                stageRef={stageCardRef}
                resetSignal={shuffleSeed}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom Edge-to-Edge Massive Condensed Display Name (Exact Screenshot 1 Signature) ── */}
        <div
          className="relative z-10 w-full px-3 sm:px-6 pt-2 overflow-hidden select-none pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-full text-center font-condensed uppercase text-[#111111] tracking-[-0.025em] leading-[0.79] whitespace-nowrap"
            style={{ fontSize: 'clamp(4.1rem, 17.6vw, 19rem)' }}
          >
            {EDITORIAL_PROFILE.displayBannerName}
          </div>
        </div>
      </div>
    </section>
  );
}
