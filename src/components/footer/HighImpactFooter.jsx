import {
  Copy,
  Check,
  ArrowUpRight,
  FileDown,
  Github,
  Linkedin,
  Award,
  ArrowUp,
  Phone,
} from 'lucide-react';
import { EDITORIAL_PROFILE } from '../../data/editorialPortfolioData';
import RevealOnScroll from '../shared/RevealOnScroll';
import { scrollToTarget } from '../shared/SmoothScrollProvider';

export default function HighImpactFooter({ onCopyEmail, emailCopied }) {
  return (
    <footer
      id="contact-section"
      className="relative w-full bg-[#111111] text-[#F4EFE6] pt-20 sm:pt-28 pb-24 sm:pb-20 px-4 sm:px-8 md:px-12 overflow-hidden backstage-grain"
    >
      <div className="max-w-[1380px] mx-auto space-y-14">
        {/* Top Metadata Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6 font-mono text-xs uppercase tracking-[0.1em]">
          <span className="text-[#F4BE2A]">[04 // READY TO ROCK YOUR NEXT PROJECT?]</span>
          <span className="inline-flex items-center gap-2 text-[#10B981]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            OPEN FOR INTERNSHIP, FREELANCE &amp; FULL-TIME ROLES
          </span>
        </div>

        {/* Giant Editorial CTA Typography (PRD F-06) */}
        <RevealOnScroll className="space-y-4">
          <h2
            className="font-condensed uppercase text-[#F4EFE6] leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3.3rem, 10.5vw, 9.8rem)' }}
          >
            LET&apos;S CREATE
            <br />
            <span className="text-[#FF3B00]">SOMETHING</span>{' '}
            <span className="font-serif italic font-normal lowercase text-[#F4EFE6]">
              iconic.
            </span>
          </h2>
        </RevealOnScroll>

        {/* One-Click Copy Email Interactive Banner + Direct Resume Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <button
            type="button"
            onClick={onCopyEmail}
            data-cursor-label={emailCopied ? 'COPIED TO CLIPBOARD ✓' : 'ONE-CLICK COPY'}
            className={`lg:col-span-8 group p-6 sm:p-8 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
              emailCopied
                ? 'bg-[#10B981] border-[#10B981] text-[#111111]'
                : 'bg-[#191919] border-white/15 hover:border-[#FF3B00] hover:bg-[#FF3B00] text-[#F4EFE6]'
            }`}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-75 mb-1">
                {emailCopied
                  ? 'EMAIL COPIED — READY TO PASTE!'
                  : 'ONE-CLICK COPY DIRECT EMAIL'}
              </p>
              <p className="font-sans font-extrabold text-xl sm:text-3xl md:text-4xl tracking-tight break-all">
                {EDITORIAL_PROFILE.email}
              </p>
            </div>

            <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/25 font-mono text-xs font-bold uppercase tracking-wider">
              {emailCopied ? (
                <>
                  <Check size={15} />
                  <span>COPIED TO CLIPBOARD ✓</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>COPY EMAIL</span>
                </>
              )}
            </div>
          </button>

          <a
            href={EDITORIAL_PROFILE.cvUrl}
            download={EDITORIAL_PROFILE.cvFileName}
            data-cursor-label="DOWNLOAD CV ↗"
            className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#F4BE2A] text-[#121212] hover:bg-[#F6F5F0] transition-colors flex flex-col justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider">
              <span>CURRICULUM VITAE</span>
              <FileDown size={18} />
            </div>
            <div>
              <p className="font-condensed uppercase text-3xl leading-none">
                DOWNLOAD CV (.PDF)
              </p>
              <p className="font-mono text-[11px] opacity-80 mt-1">
                Reza Fahmi Alkhamdani · Official 2-Page CV
              </p>
            </div>
          </a>
        </div>

        {/* External Social Links & Back to Top */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={EDITORIAL_PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:bg-[#10B981] hover:border-[#10B981] hover:text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Phone size={14} />
              <span>{EDITORIAL_PROFILE.phone}</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={EDITORIAL_PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#121212] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={EDITORIAL_PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:bg-[#1D4ED8] hover:border-[#1D4ED8] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={EDITORIAL_PROFILE.socials.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:bg-[#F4BE2A] hover:border-[#F4BE2A] hover:text-[#121212] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <Award size={14} />
              <span>IBM Credly Badges</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-[#F4EFE6]/55">
            <span>© 2026 REZA FAHMI ALKHAMDANI</span>
            <button
              type="button"
              onClick={() => scrollToTarget('top')}
              className="w-9 h-9 rounded-full border border-white/20 text-[#F4EFE6] hover:bg-[#FF3B00] hover:border-[#FF3B00] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

