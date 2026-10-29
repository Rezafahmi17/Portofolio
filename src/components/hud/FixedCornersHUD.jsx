import { useEffect, useState } from 'react';
import { EDITORIAL_PROFILE } from '../../data/editorialPortfolioData';
import { scrollToTarget } from '../shared/SmoothScrollProvider';

const NAV_JUMPS = [
  { code: '[01]', label: 'WORK', targetId: 'project-section' },
  { code: '[02]', label: 'PLAY', targetId: 'playground-section' },
  { code: '[03]', label: 'INFO', targetId: 'about-section' },
];

export default function FixedCornersHUD({ onCopyEmail, emailCopied, isDrawerOpen }) {
  const [activeSection, setActiveSection] = useState('');
  const [pastTopTicker, setPastTopTicker] = useState(false);

  useEffect(() => {
    const ids = ['project-section', 'playground-section', 'about-section', 'contact-section'];
    const handleScroll = () => {
      setPastTopTicker(window.scrollY > 38);
      const scrollMiddle = window.scrollY + window.innerHeight * 0.42;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMiddle) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDrawerOpen) return null;

  const topOffsetClass = pastTopTicker
    ? 'top-3.5 sm:top-5'
    : 'top-[46px] sm:top-[52px]';

  return (
    <>
      {/* ── Blend-Difference Layer: Always Readable Over Pink, Warm Paper & Backstage Dark ── */}
      <nav
        aria-label="Fixed Four-Corners HUD Navigation"
        className="fixed inset-0 pointer-events-none select-none font-mono uppercase text-[11px] sm:text-[12px] tracking-[0.08em] text-white"
        style={{
          zIndex: 900,
          mixBlendMode: 'difference',
        }}
      >
        {/* 1. TOP-LEFT: Brand Identity & Specialization */}
        <button
          type="button"
          onClick={() => scrollToTarget('top')}
          className={`pointer-events-auto fixed ${topOffsetClass} left-4 sm:left-6 text-left group cursor-pointer focus:outline-none transition-[top] duration-300 ease-expo-out`}
        >
          <span className="font-bold tracking-[0.1em] group-hover:underline">
            REZA FAHMI
          </span>
          <span className="hidden md:inline text-white/85">
            {' '}— FULL-STACK &amp; AI ENGINEER
          </span>
        </button>

        {/* 2. TOP-RIGHT: Availability Label */}
        <button
          type="button"
          onClick={() => scrollToTarget('contact-section')}
          className={`pointer-events-auto fixed ${topOffsetClass} right-4 sm:right-6 flex items-center gap-2 cursor-pointer group focus:outline-none transition-[top] duration-300 ease-expo-out`}
        >
          <span className="w-2.5 h-2.5 inline-block opacity-0" aria-hidden="true" />
          <span className="font-semibold tracking-[0.09em] group-hover:underline">
            <span className="hidden sm:inline">{EDITORIAL_PROFILE.availability}</span>
            <span className="sm:hidden">AVAILABLE &apos;26</span>
          </span>
        </button>

        {/* 3. BOTTOM-LEFT: Quick Jump Index */}
        <div className="pointer-events-auto fixed bottom-3.5 left-4 sm:bottom-5 sm:left-6 flex items-center gap-3 sm:gap-5">
          {NAV_JUMPS.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <button
                key={item.targetId}
                type="button"
                onClick={() => scrollToTarget(item.targetId)}
                className={`cursor-pointer transition-opacity duration-200 hover:opacity-100 focus:outline-none ${
                  isActive ? 'opacity-100 font-bold underline underline-offset-4' : 'opacity-75'
                }`}
              >
                <span className="hidden sm:inline">{item.code} </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. BOTTOM-RIGHT: Instant Recruiter / Client Actions */}
        <div className="pointer-events-auto fixed bottom-3.5 right-4 sm:bottom-5 sm:right-6 flex items-center gap-3 sm:gap-5">
          <a
            href={EDITORIAL_PROFILE.cvUrl}
            download={EDITORIAL_PROFILE.cvFileName}
            className="font-semibold opacity-85 hover:opacity-100 hover:underline underline-offset-4 transition-opacity cursor-pointer"
          >
            [RESUME ↗]
          </a>
          <button
            type="button"
            onClick={onCopyEmail}
            data-cursor-label={emailCopied ? 'COPIED ✓' : 'COPY EMAIL'}
            className="font-semibold opacity-90 hover:opacity-100 hover:underline underline-offset-4 transition-opacity cursor-pointer focus:outline-none"
          >
            {emailCopied ? '[COPIED ✓]' : '[COPY EMAIL]'}
          </button>
        </div>
      </nav>

      {/* Non-blended True Emerald Pulsing Status Dot (#10B981) — Mathematically Mirror-Aligned */}
      <div
        aria-hidden="true"
        className={`fixed ${topOffsetClass} right-4 sm:right-6 pointer-events-none select-none font-mono uppercase text-[11px] sm:text-[12px] tracking-[0.08em] flex items-center gap-2 transition-[top] duration-300 ease-expo-out`}
        style={{ zIndex: 901 }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] shadow-[0_0_8px_#10B981]" />
        </span>
        <span className="font-semibold tracking-[0.09em] opacity-0">
          <span className="hidden sm:inline">{EDITORIAL_PROFILE.availability}</span>
          <span className="sm:hidden">AVAILABLE &apos;26</span>
        </span>
      </div>
    </>
  );
}
