import { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Award,
  CheckCircle,
  FileText,
  Calendar,
  Layers,
  Code,
  ShieldCheck,
} from 'lucide-react';

export default function CardStudyModal({ card, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!card) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const hasMedia = Boolean(card.videoUrl || card.heroImg || card.img);
  const mediaSrc = card.heroImg || card.img;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-auto"
      style={{
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(24px) saturate(190%)',
        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-xl border border-white/20 bg-[#0c0c10]/95 text-[#dddddd] shadow-2xl flex flex-col font-mono"
        style={{
          boxShadow:
            '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(170, 136, 255, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2a2a2a] bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#aa88ff] animate-pulse" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-[#aa88ff] font-semibold">
                [{card.category || 'DOCUMENTATION'}]
              </span>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                {card.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close modal"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 rounded-lg border border-[#2a2a2a] bg-[#141418] text-[#8a8a8a] hover:text-white hover:border-[#aa88ff] hover:bg-[#1f1f26] transition-colors cursor-pointer z-10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto max-h-[calc(92vh-60px)] divide-y divide-[#2a2a2a]">
          {/* Media Section: Video or High-Res Certificate / Project Screenshot */}
          {hasMedia && (
            <div className="relative w-full bg-black/90 flex items-center justify-center p-2 sm:p-4 group">
              {card.videoUrl ? (
                <div className="relative w-full aspect-video rounded overflow-hidden">
                  <video
                    ref={videoRef}
                    src={card.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded bg-white/10 hover:bg-white/20 backdrop-blur transition"
                      >
                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded bg-white/10 hover:bg-white/20 backdrop-blur transition"
                      >
                        {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      </button>
                      <span className="text-[11px] text-[#cccccc]">{card.subtitle}</span>
                    </div>
                    <div className="text-[11px] text-[#aa88ff]">60 FPS // MOTION STUDY</div>
                  </div>
                </div>
              ) : (
                <div className="relative max-h-[460px] w-full flex items-center justify-center rounded overflow-hidden border border-white/10 bg-[#08080a]">
                  <img
                    src={mediaSrc}
                    alt={card.title}
                    className="max-h-[450px] w-auto max-w-full object-contain rounded drop-shadow-md"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur border border-white/10 text-[10px] text-[#aa88ff] flex items-center gap-1.5">
                    <ShieldCheck size={12} />
                    <span>VERIFIED DOCUMENTATION</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-5 text-xs text-[#cccccc]">
            {/* Tagline / Summary */}
            {card.tagline && (
              <p className="text-sm text-white font-medium leading-relaxed border-l-2 border-[#aa88ff] pl-3 py-0.5">
                {card.tagline}
              </p>
            )}

            {/* Grid of Key Features & Learning Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Features / Details */}
              {card.features && card.features.length > 0 && (
                <div className="p-4 rounded-lg border border-[#2a2a2a] bg-[#121218]/70 space-y-2">
                  <div className="flex items-center gap-2 text-[#aa88ff] font-semibold text-[11px] uppercase">
                    <FileText size={14} />
                    <span>{card.featuresTitle || 'DOCUMENTATION INFORMATION'}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-[#dddddd]">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle size={12} className="text-[#aa88ff] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact / Outcome */}
              {card.impact && card.impact.length > 0 && (
                <div className="p-4 rounded-lg border border-[#2a2a2a] bg-[#121218]/70 space-y-2">
                  <div className="flex items-center gap-2 text-[#aa88ff] font-semibold text-[11px] uppercase">
                    <Award size={14} />
                    <span>{card.impactTitle || 'LEARNING OUTCOME & IMPACT'}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-[#dddddd]">
                    {card.impact.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#aa88ff] font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tech Stack / Topics */}
            {card.stack && card.stack.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] text-[#8a8a8a] uppercase flex items-center gap-1.5">
                  <Code size={13} className="text-[#aa88ff]" />
                  <span>SKILLS / TOPICS COVERED:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.stack.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#1c1c22] border border-[#2a2a2a] text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Links & Footer */}
            <div className="pt-3 border-t border-[#2a2a2a] flex flex-wrap items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-3">
                {card.links?.live && (
                  <a
                    href={card.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#aa88ff] text-black font-semibold hover:bg-white transition-colors"
                  >
                    <span>VISIT LIVE / CREDLY</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {card.links?.github && (
                  <a
                    href={card.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#2a2a2a] bg-[#14141a] text-white hover:border-[#aa88ff] transition-colors"
                  >
                    <span>GITHUB REPOSITORY</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              <div className="text-[#666666] text-[10px]">
                REZA FAHMI ALKHAMDANI // PRESS [ESC] TO CLOSE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
