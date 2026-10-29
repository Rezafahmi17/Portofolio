import {
  FileDown,
  MapPin,
  Sparkles,
  Server,
  Bot,
  Database,
  Cloud,
  CheckCircle2,
  ArrowUpRight,
  GraduationCap,
  Trophy,
  Phone,
} from 'lucide-react';
import {
  EDITORIAL_PROFILE,
  BACKSTAGE_INSTRUMENTS,
  EXPERIENCE_TIMELINE,
  EDUCATION_HISTORY,
  PRESTASI_LIST,
  STACK_MATRIX,
} from '../../data/editorialPortfolioData';
import DraggableArtifact from '../hero/DraggableArtifact';
import RevealOnScroll from '../shared/RevealOnScroll';

function InstrumentStickerShape({ item }) {
  const renderIcon = () => {
    const props = { size: 34, strokeWidth: 1.75, className: 'text-[#F6F5F0]' };
    switch (item.iconType) {
      case 'sparkles':
        return <Sparkles {...props} />;
      case 'server':
        return <Server {...props} />;
      case 'bot':
        return <Bot {...props} />;
      case 'database':
        return <Database {...props} />;
      default:
        return <Cloud {...props} />;
    }
  };

  return (
    <div className="group flex flex-col items-center gap-2.5 select-none">
      <div
        style={{ backgroundColor: item.color }}
        className="relative w-32 h-24 sm:w-36 sm:h-28 rounded-[28px] border-2 border-[#F4EFE6]/25 shadow-[0_14px_30px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Decorative Inner Line Ring */}
        <div className="w-full h-full rounded-[20px] border border-white/35 flex flex-col items-center justify-center gap-1 px-1">
          {renderIcon()}
          <span className="font-condensed uppercase text-[12px] tracking-wide text-[#F6F5F0] leading-none mt-1 text-center">
            {item.title}
          </span>
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#F4EFE6]/70 text-center">
        {item.subtitle}
      </span>
    </div>
  );
}

export default function BehindTheCurtainsSection() {
  const stubBarcode = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2];

  return (
    <section id="about-section" className="w-full overflow-hidden">
      {/* ======================================================================= */}
      {/* PART A: DARK BACKSTAGE "BEHIND THE CURTAINS" (Exact Screenshot 2 Vibe)  */}
      {/* ======================================================================= */}
      <div className="relative bg-[#0E0E0E] text-[#F4EFE6] py-20 sm:py-28 px-4 sm:px-8 md:px-12 backstage-grain">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4BE2A] mb-3">
              [03 // ABOUT &amp; BACKSTAGE STORY]
            </p>

            {/* Giant Cream Condensed Headline */}
            <h2
              className="font-condensed uppercase text-[#F4EFE6] leading-[0.94] tracking-[-0.015em] mb-8 sm:mb-10"
              style={{ fontSize: 'clamp(2.5rem, 6.2vw, 5.5rem)' }}
            >
              BEHIND THE CURTAINS: MEET REZA FAHMI
            </h2>
          </RevealOnScroll>

          {/* Tilted Pink Perforated Backstage Concert Ticket Stub (Screenshot 2 Centerpiece) */}
          <div className="my-4 sm:my-6">
            <DraggableArtifact initialRotate={-7}>
              <div className="relative flex items-stretch w-[310px] sm:w-[440px] md:w-[500px] bg-[#E85396] text-[#121212] rounded-md shadow-[0_24px_55px_rgba(0,0,0,0.65)] border-2 border-[#121212] overflow-hidden">
                {/* Left Side Punch Cutout */}
                <span
                  aria-hidden="true"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0E0E0E] border-r-2 border-[#121212]"
                />
                {/* Right Side Punch Cutout */}
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0E0E0E] border-l-2 border-[#121212]"
                />

                {/* Ticket Main Body */}
                <div className="flex-1 p-4 sm:p-5 text-left flex items-center justify-between gap-3">
                  <div className="space-y-2">
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] opacity-80 border-b border-[#121212]/25 pb-1">
                      ADMIT ONE · POLINELA INFORMATICS
                    </div>
                    <p className="font-mono text-[10px] font-bold">★ ★ ★</p>
                    <div className="font-condensed uppercase text-xl sm:text-2xl leading-[0.95] text-[#121212]">
                      REZA FAHMI —
                      <br />
                      BEHIND THE SCENES
                    </div>
                  </div>

                  {/* Stylized Portrait Sticker inside Ticket */}
                  <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#121212] bg-[#F6F5F0] shadow-md">
                    <img
                      src={EDITORIAL_PROFILE.avatar}
                      alt={EDITORIAL_PROFILE.fullName}
                      className="w-full h-full object-cover contrast-110"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Perforated Tear-Off Barcode Stub */}
                <div className="w-[82px] sm:w-[98px] border-l-2 border-dashed border-[#121212]/55 p-3 flex flex-col items-center justify-center bg-[#DF468B]">
                  <div className="flex flex-col gap-[2px] w-10 sm:w-12 py-1">
                    {stubBarcode.map((h, idx) => (
                      <span
                        key={idx}
                        style={{ height: `${h + 1}px` }}
                        className="w-full bg-[#121212] block"
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[7.5px] font-bold tracking-widest mt-1.5 uppercase">
                    RF-2026
                  </span>
                </div>
              </div>
            </DraggableArtifact>
          </div>

          {/* 2-Paragraph Editorial Narrative (PRD F-05) */}
          <div className="max-w-[66ch] space-y-4 mt-6 font-sans text-[15.5px] sm:text-[17px] leading-[1.68] text-[#F4EFE6]/85">
            {EDITORIAL_PROFILE.narrative.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* "CURRENTLY JAMMING AT" Highlight Statement */}
          <div className="mt-8 sm:mt-10 inline-flex flex-wrap items-center justify-center gap-2 font-condensed uppercase text-2xl sm:text-4xl tracking-tight">
            <span className="text-[#F4EFE6]">CURRENTLY ACTIVE AT</span>
            <a
              href={EDITORIAL_PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="VISIT GITHUB ↗"
              className="text-[#F4BE2A] hover:text-[#FF3B00] transition-colors inline-flex items-center gap-1"
            >
              <span>{EDITORIAL_PROFILE.jammingAt}</span>
              <sup className="w-4 h-4 rounded-full bg-[#F4BE2A] text-[#121212] font-mono text-[9px] font-bold inline-flex items-center justify-center">
                i
              </sup>
            </a>
          </div>

          {/* 5 Colorful Draggable Instrument / Skill Stickers */}
          <div className="mt-14 sm:mt-16 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {BACKSTAGE_INSTRUMENTS.map((item) => (
              <DraggableArtifact key={item.id} initialRotate={item.rotate}>
                <InstrumentStickerShape item={item} />
              </DraggableArtifact>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* PART B: INTERACTIVE SCRAPBOOK DESK, CV SKILLS, EDUCATION & PRESTASI     */}
      {/* ======================================================================= */}
      <div className="bg-[#F6F5F0] text-[#121212] py-20 sm:py-28 px-4 sm:px-8 md:px-12 editorial-grain">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column (4 Cols): Scrapbook Taped Portrait + Contact + Prominent CV Download */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
            <div className="relative p-4 pb-6 bg-white rounded-2xl border border-[#121212]/15 shadow-[0_20px_45px_rgba(18,18,18,0.08)] rotate-[-1.5deg]">
              {/* Editorial Masking Tape Strip at Top */}
              <div
                aria-hidden="true"
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#F4BE2A]/85 border border-[#121212]/20 rotate-2 shadow-sm"
              />

              <div className="relative aspect-[4/4.4] rounded-xl overflow-hidden bg-[#EBE9E1] border border-[#121212]/15">
                <img
                  src={EDITORIAL_PROFILE.avatar}
                  alt={EDITORIAL_PROFILE.fullName}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-35" />
                <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-full bg-[#121212]/85 backdrop-blur text-[#F6F5F0] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#FF3B00] shrink-0" />
                  <span className="truncate">{EDITORIAL_PROFILE.location}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-3xl text-[#121212]">
                    {EDITORIAL_PROFILE.fullName}
                  </h3>
                  <CheckCircle2 size={18} className="text-[#10B981] shrink-0" />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.06em] text-[#FF3B00] font-bold">
                  {EDITORIAL_PROFILE.role}
                </p>
                <p className="font-sans text-xs text-[#6E6D68] leading-snug pt-0.5">
                  {EDITORIAL_PROFILE.degree}
                </p>

                {/* Direct Phone / WhatsApp Line from CV */}
                <div className="pt-2 border-t border-[#121212]/10 flex items-center justify-between font-mono text-[11px] text-[#121212]/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone size={12} className="text-[#10B981]" />
                    <span>{EDITORIAL_PROFILE.phone}</span>
                  </span>
                  <a
                    href={EDITORIAL_PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#121212] underline hover:text-[#FF3B00] transition-colors"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Prominent Download CV Button (Downloads the Exact Real 2-Page CV PDF!) */}
            <a
              href={EDITORIAL_PROFILE.cvUrl}
              download={EDITORIAL_PROFILE.cvFileName}
              data-cursor-label="DOWNLOAD CV PDF ↗"
              className="w-full py-4 px-6 rounded-2xl bg-[#FF3B00] text-[#F6F5F0] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.09em] flex items-center justify-between hover:bg-[#121212] transition-colors shadow-[0_14px_30px_rgba(255,59,0,0.28)]"
            >
              <span className="flex items-center gap-2.5">
                <FileDown size={18} />
                <span>DOWNLOAD FULL CV (PDF)</span>
              </span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Right Column (8 Cols): Complete CV Sections — Experience, Skills, Education & Prestasi */}
          <div className="lg:col-span-8 space-y-16">
            {/* 1. Experience & Leadership Track Table (CV: PENGALAMAN) */}
            <div id="experience-section" className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#121212] pb-3">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#121212]">
                  Pengalaman Proyek &amp; <span className="italic">Kepemimpinan</span>
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6E6D68]">
                  2018 — 2027
                </span>
              </div>

              <div className="divide-y divide-[#121212]/12 border-b border-[#121212]/12">
                {EXPERIENCE_TIMELINE.map((exp, idx) => (
                  <div
                    key={idx}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start hover:bg-[#EBE9E1]/60 px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <div className="sm:col-span-3 font-mono text-xs uppercase tracking-[0.06em] text-[#FF3B00] font-semibold pt-0.5">
                      {exp.period}
                    </div>
                    <div className="sm:col-span-9 space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-sans font-bold text-[16.5px] sm:text-[17px] text-[#121212]">
                          {exp.role}
                        </h4>
                        <span className="font-mono text-[11px] uppercase text-[#6E6D68]">
                          {exp.org}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-[#121212]/75 leading-relaxed">
                        {exp.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Complete CV Skills & Engineering Stack Matrix (CV: KETERAMPILAN) */}
            <div id="tech-stack-section" className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#121212] pb-3">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#121212]">
                  Keahlian &amp; <span className="italic">Tech Stack</span>
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6E6D68]">
                  FULL CV TOOLKIT
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#121212]/15">
                {STACK_MATRIX.map((group) => (
                  <div
                    key={group.category}
                    className="p-5 sm:p-6 border-r border-b border-[#121212]/15 bg-white/55 space-y-3"
                  >
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#FF3B00]">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#EBE9E1] border border-[#121212]/15 font-sans text-xs font-semibold text-[#121212] hover:bg-[#121212] hover:text-[#F6F5F0] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Education & Prestasi Grid (CV: PENDIDIKAN & PRESTASI) */}
            <div id="education-prestasi-section" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left 7 Cols: Pendidikan */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between border-b border-[#121212] pb-3">
                  <h3 className="font-serif text-3xl text-[#121212] flex items-center gap-2.5">
                    <GraduationCap size={24} className="text-[#FF3B00]" />
                    <span>Pendidikan</span>
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6D68]">
                    ACADEMIC
                  </span>
                </div>

                <div className="space-y-4">
                  {EDUCATION_HISTORY.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white/65 border border-[#121212]/15 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#FF3B00]">
                          {edu.period}
                        </span>
                        <span className="font-mono text-[11px] uppercase text-[#6E6D68]">
                          {edu.institution}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-base sm:text-lg text-[#121212]">
                        {edu.degree}
                      </h4>
                      <ul className="space-y-1.5 font-sans text-xs sm:text-[13.5px] text-[#121212]/75 leading-relaxed list-disc pl-4">
                        {edu.highlights.map((hl, hIdx) => (
                          <li key={hIdx}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Prestasi Kejuaraan */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#121212] pb-3">
                  <h3 className="font-serif text-3xl text-[#121212] flex items-center gap-2">
                    <Trophy size={22} className="text-[#FF3B00]" />
                    <span>Prestasi</span>
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6D68]">
                    4 TROPHIES
                  </span>
                </div>

                <div className="divide-y divide-[#121212]/12 rounded-xl bg-white/65 border border-[#121212]/15 overflow-hidden">
                  {PRESTASI_LIST.map((ach, idx) => (
                    <div key={idx} className="p-4 space-y-1 hover:bg-[#EBE9E1]/65 transition-colors">
                      <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase">
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            ach.badge === 'JUARA 1'
                              ? 'bg-[#F4BE2A] text-[#121212]'
                              : 'bg-[#121212] text-[#F6F5F0]'
                          }`}
                        >
                          {ach.badge}
                        </span>
                        <span className="text-[#6E6D68] font-semibold">{ach.year}</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-[#121212] pt-0.5">
                        {ach.title}
                      </h4>
                      <p className="font-mono text-[11px] text-[#6E6D68]">{ach.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
