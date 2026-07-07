import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Trophy, Github, Globe, Zap, Shield, Layers, Users } from "lucide-react";
import { Gsap, GsapPresence } from "../utils/gsapAnimate";

const links = {
  github: "https://github.com/Rezafahmi17/kopi-nusantara",
  live: "https://kopi-nusantara-jawa.netlify.app/",
};

const techStack = [
  "JavaScript",
  "React / Vite",
  "Tailwind CSS",
  "Node.js",
  "REST API",
  "MySQL",
  "QR Order Flow",
  "Responsive UI",
];

const highlights = [
  {
    icon: Zap,
    label: "QR Ordering Flow",
    desc: "Customers can scan a QR code, view the menu, and order without queuing at the cashier.",
  },
  {
    icon: Layers,
    label: "Web Product Thinking",
    desc: "The project combines a landing page, order flow, menu display, and admin-ready structure.",
  },
  {
    icon: Shield,
    label: "Back-End Foundation",
    desc: "Aligned with JavaScript and Back-End JavaScript learning: API, server logic, and data handling.",
  },
  {
    icon: Users,
    label: "User-Friendly Experience",
    desc: "Built around a practical coffee-shop use case so customers can order faster and more comfortably.",
  },
];

const TechBadge = ({ children }) => (
  <span className="px-3 py-1.5 bg-black/5 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-black/80 rounded-[2px]">
    {children}
  </span>
);

const HighlightCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="rounded-[6px] border border-black/10 bg-white p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-lime-400/20 border border-lime-500/30 flex items-center justify-center">
          <Icon size={16} className="text-black" />
        </div>
        <h3 className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.14em] text-black/70">
          {item.label}
        </h3>
      </div>
      <p className="text-sm md:text-[15px] leading-7 text-black/60 font-light">{item.desc}</p>
    </div>
  );
};

export default function HackathonDetailModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return createPortal(
    <GsapPresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-10">
          <Gsap.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <Gsap.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative z-10 w-full h-full md:h-auto md:max-h-[90vh] max-w-6xl bg-[#FAF9F6] shadow-2xl md:rounded-lg overflow-y-auto overscroll-contain flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/5">
              <div className="px-6 md:px-10 py-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold tracking-[0.12em] md:tracking-[0.16em] text-black flex items-center gap-2">
                  <Trophy size={14} className="text-lime-500" />
                  Featured Portfolio Project
                </span>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="px-6 md:px-10 pt-8 pb-20 space-y-14">
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] md:tracking-[0.26em] text-black/40 mb-4">
                  The best website in the portfolio
                </p>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-black mb-6">
                  KOPI{" "}
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px black" }}>
                    NUSANTARA
                  </span>
                </h1>

                <p className="text-base md:text-lg leading-7 md:leading-8 text-black/60 max-w-2xl mx-auto">
                  A QR-based coffee ordering website that lets customers browse the menu and place
                  orders from their table, reducing queues while keeping the coffee-shop experience
                  simple, fast, and modern.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-lime-400 text-black px-8 py-3.5 font-bold uppercase text-xs tracking-wider hover:bg-black hover:text-white transition-all duration-300 rounded-[2px] flex items-center gap-2"
                  >
                    <Globe size={16} /> View Live
                  </a>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black/5 text-black px-8 py-3.5 font-bold uppercase text-xs tracking-wider border border-transparent hover:border-black/20 transition-all duration-300 rounded-[2px] flex items-center gap-2"
                  >
                    <Github size={16} /> Repository
                  </a>
                </div>
              </div>

              <div className="max-w-5xl mx-auto border border-black/5 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-full bg-[#FAF9F6] rounded-[4px] overflow-hidden aspect-video relative flex items-center justify-center border border-black/5">
                  <img
                    src="/hackathon-base/base-realms-1.webp"
                    alt="Kopi Nusantara QR Ordering Website"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <HighlightCard key={item.label} item={item} />
                ))}
              </div>

              <div className="max-w-5xl mx-auto border-t border-black/10 pt-10 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
                <div>
                  <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/40 mb-4">
                    Why it matches Reza's certificates
                  </h2>
                  <p className="text-sm md:text-[15px] leading-8 text-black/60 font-light">
                    This project is aligned with the JavaScript certificate for interactive web
                    behavior, the Back-End JavaScript certificate for API and server-side thinking,
                    the AWS Cloud & Gen AI certificate for deployment awareness, and the AI / IBM
                    Granite certificates as a foundation for future smart features such as menu
                    recommendation, order summary, or customer data analysis.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {techStack.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>
            </div>
          </Gsap.div>
        </div>
      )}
    </GsapPresence>,
    document.body,
  );
}
