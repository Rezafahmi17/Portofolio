import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { EDITORIAL_PROFILE } from '../data/editorialPortfolioData';
import SmoothScrollProvider, { scrollToTarget } from '../components/shared/SmoothScrollProvider';
import CustomCursor from '../components/shared/CustomCursor';
import FixedCornersHUD from '../components/hud/FixedCornersHUD';
import HeroCanvas from '../components/hero/HeroCanvas';
import EditorialShowcase from '../components/projects/EditorialShowcase';
import PlaygroundVault from '../components/projects/PlaygroundVault';
import BehindTheCurtainsSection from '../components/about/BehindTheCurtainsSection';
import HighImpactFooter from '../components/footer/HighImpactFooter';
import CaseStudyDrawer, { resolveCaseStudyItem } from '../components/projects/CaseStudyDrawer';

export default function Home() {
  const { slug: routeSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCaseStudy, setActiveCaseStudy] = useState(() =>
    routeSlug ? resolveCaseStudyItem(routeSlug) : null
  );
  const [emailCopied, setEmailCopied] = useState(false);
  const copyTimerRef = useRef(null);

  // Sync deep-linked /projects/:slug route into CaseStudyDrawer
  useEffect(() => {
    if (routeSlug) {
      const resolved = resolveCaseStudyItem(routeSlug);
      if (resolved) setActiveCaseStudy(resolved);
    }
  }, [routeSlug]);

  // Support ?scrollTo=... query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const target = params.get('scrollTo');
    if (target) {
      const timer = setTimeout(() => scrollToTarget(target), 120);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location.search]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleOpenCaseStudy = useCallback((itemOrSlug) => {
    const resolved = resolveCaseStudyItem(itemOrSlug);
    if (resolved) {
      setActiveCaseStudy(resolved);
    }
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setActiveCaseStudy(null);
    if (routeSlug) {
      navigate('/', { replace: true });
    }
  }, [navigate, routeSlug]);

  const handleCopyEmail = useCallback(async () => {
    const email = EDITORIAL_PROFILE.email;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const temp = document.createElement('textarea');
        temp.value = email;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
    } catch {
      // Fallback silent
    }

    setEmailCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setEmailCopied(false);
    }, 2500);
  }, []);

  const isDrawerOpen = Boolean(activeCaseStudy);

  return (
    <SmoothScrollProvider isLocked={isDrawerOpen}>
      {/* Desktop Contextual Custom Cursor (z-index: 9999) */}
      <CustomCursor />

      {/* Fixed Four-Corners HUD Navigation (z-index: 900, mix-blend-mode: difference) */}
      <FixedCornersHUD
        onCopyEmail={handleCopyEmail}
        emailCopied={emailCopied}
        isDrawerOpen={isDrawerOpen}
      />

      {/* Main Interactive Editorial & Backstage Scrollable Canvas */}
      <main className="relative w-full min-h-screen bg-[#0E0E0E] selection:bg-[#FF3B00] selection:text-[#F6F5F0]">
        {/* Section 01: Interactive Backstage Hero + Draggable Stickers & VIP Lanyard */}
        <HeroCanvas onOpenQuickProject={handleOpenCaseStudy} />

        {/* Section 02: Selected Works (Fanning Ticket Deck + Ticket / Asymmetric Grid / Hover Index) */}
        <EditorialShowcase onSelectWork={handleOpenCaseStudy} />

        {/* Section 04: The Full Setlist Services & Complete 17-Item Verified Credential Vault */}
        <PlaygroundVault onOpenBySlug={handleOpenCaseStudy} />

        {/* Section 05: Behind The Curtains Concert Ticket Bio + Warm Paper Scrapbook Desk */}
        <BehindTheCurtainsSection />

        {/* Section 06: Monumental High-Impact Footer + One-Click Copy Email */}
        <HighImpactFooter
          onCopyEmail={handleCopyEmail}
          emailCopied={emailCopied}
        />
      </main>

      {/* Section 03: Contextual 92vh Slide-Up Case Study Drawer (z-index: 500) */}
      <CaseStudyDrawer
        activeItem={activeCaseStudy}
        onClose={handleCloseCaseStudy}
        onSelectWork={handleOpenCaseStudy}
      />

      {/* Global Tactile Toast Notification for One-Click Copy Email (PRD F-06) */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-14 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-expo-out ${
          emailCopied
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        }`}
        style={{ zIndex: 950 }}
      >
        <div className="px-5 py-2.5 rounded-full bg-[#10B981] text-[#111111] font-mono text-xs font-bold uppercase tracking-[0.08em] shadow-[0_14px_35px_rgba(16,185,129,0.45)] border border-black/20 flex items-center gap-2 whitespace-nowrap">
          <Check size={15} strokeWidth={2.5} />
          <span>COPIED TO CLIPBOARD ✓ ({EDITORIAL_PROFILE.email})</span>
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
