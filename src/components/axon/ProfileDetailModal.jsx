import { useEffect } from 'react';
import {
  X,
  Mail,
  Github,
  Linkedin,
  FileDown,
  Globe,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function ProfileDetailModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const { profile, experience, capabilities } = PORTFOLIO_DATA;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-auto"
      style={{
        background: 'rgba(0, 0, 0, 0.90)',
        backdropFilter: 'blur(24px) saturate(190%)',
        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-xl border border-white/20 bg-[#0c0c10]/95 text-[#dddddd] shadow-2xl flex flex-col font-mono"
        style={{
          boxShadow:
            '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(170, 136, 255, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2a2a2a] bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase">
              PROFILE DOSSIER // REZA FAHMI ALKHAMDANI
            </h3>
          </div>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#2a2a2a] bg-[#141418] text-[#8a8a8a] hover:text-white hover:border-[#aa88ff] hover:bg-[#1f1f26] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-60px)] p-6 space-y-6">
          {/* Hero Profile Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#2a2a2a]">
            {/* Portrait Image with Glass Border */}
            <div className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl group">
              <img
                src="/profile.webp"
                alt="Reza Fahmi Alkhamdani"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 inset-x-0 text-center">
                <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur border border-white/10 text-[9px] text-emerald-400 font-semibold inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  AVAILABLE
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {profile.name}
                </h2>
                <span className="text-xs text-[#aa88ff] font-semibold mt-0.5">
                  {profile.role}
                </span>
                <span className="text-[11px] text-[#8a8a8a] flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <MapPin size={12} className="text-[#aa88ff]" />
                  <span>{profile.location}</span>
                  <span className="mx-1">•</span>
                  <span>16 VERIFIED CREDENTIALS</span>
                </span>
              </div>

              <p className="text-xs text-[#cccccc] leading-relaxed pt-1">
                {profile.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#aa88ff] text-black text-xs font-semibold hover:bg-white transition-colors"
                >
                  <Mail size={13} />
                  <span>CONTACT ME</span>
                </a>

                <a
                  href="/cv.pdf"
                  download="CV_Reza_Fahmi_Alkhamdani.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#2a2a2a] bg-[#14141a] text-white text-xs hover:border-[#aa88ff] transition-colors"
                >
                  <FileDown size={13} />
                  <span>DOWNLOAD CV</span>
                </a>

                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-[#2a2a2a] bg-[#14141a] text-[#8a8a8a] hover:text-white hover:border-[#aa88ff] transition-colors"
                  title="GitHub Profile"
                >
                  <Github size={15} />
                </a>

                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-[#2a2a2a] bg-[#14141a] text-[#8a8a8a] hover:text-white hover:border-[#aa88ff] transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="space-y-2">
            <h4 className="text-xs text-[#aa88ff] uppercase font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>CORE TECHNICAL CAPABILITIES</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {capabilities.map((cap, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-[11px] bg-[#14141c] border border-[#2a2a2a] text-[#dddddd]"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Experience & Certifications Track */}
          <div className="space-y-3">
            <h4 className="text-xs text-[#aa88ff] uppercase font-semibold flex items-center gap-1.5">
              <Award size={13} />
              <span>EXPERIENCE & LEARNING TRACK</span>
            </h4>
            <div className="space-y-2.5">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-[#2a2a2a] bg-[#121218]/60 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-semibold">{exp.title}</span>
                    <span className="text-[10px] text-[#aa88ff]">{exp.period}</span>
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-[#aaaaaa]">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx}>• {desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
