import { useState, useMemo } from 'react';
import CardStudyModal from './CardStudyModal';
import ProfileDetailModal from './ProfileDetailModal';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { PROJECT_DETAILS_DATA } from '../../data/projectDetailsData';
import {
  ShieldCheck,
  FileDown,
  ExternalLink,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Award,
  Code,
  ArrowUpRight,
} from 'lucide-react';

const TAGS = [
  'ALL',
  'WEB APPS',
  'AI & AGENTS',
  'IBM GRANITE',
  'BACKEND & CLOUD',
  'JAVASCRIPT',
  'ACHIEVEMENTS',
];

// Verified 13 Real Portfolio Items (Zero empty / zero mock items)
const VERIFIED_ITEMS = [
  {
    id: 'proj-kopi',
    slug: 'kopi-nusantara',
    title: 'Kopi Nusantara QR Ordering',
    subtitle: 'Featured Web Project // Full-Stack',
    category: 'WEB APPS',
    filterTag: 'WEB APPS',
    img: '/hackathon-base/base-realms-1.webp',
    heroImg: '/hackathon-base/base-realms-1.webp',
    tagline:
      'Website pemesanan kopi berbasis QR Code — pelanggan memesan menu langsung dari meja tanpa mengantre ke kasir.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Pemesanan kopi langsung dari meja menggunakan QR code.',
      'Menu real-time interaktif dengan filter kategori dan pesanan.',
      'Full-stack architecture: React/Vite, Tailwind CSS, Node.js REST API, MySQL.',
      'Deployed live di Netlify dengan repositori GitHub publik.',
    ],
    impact: [
      'Mengurangi antrean kasir dan mempercepat proses layanan pemesanan kedai kopi.',
      'Membuktikan kompetensi implementasi arsitektur client-server full-stack modern.',
    ],
    stack: ['JavaScript', 'React / Vite', 'Tailwind CSS', 'Node.js', 'REST API', 'MySQL'],
    links: {
      live: 'https://kopi-nusantara-jawa.netlify.app/',
      github: 'https://github.com/Rezafahmi17/kopi-nusantara',
    },
  },
  {
    id: 'proj-portfolio',
    slug: 'portfolio-website-smanrp',
    title: 'Portfolio Website SMAN 1 RP',
    subtitle: 'Featured Web Project // React + GSAP',
    category: 'WEB APPS',
    filterTag: 'WEB APPS',
    img: '/hackathon-base/sman1-portfolio.png',
    heroImg: '/hackathon-base/sman1-portfolio.png',
    tagline:
      'Website portofolio interaktif Reza Fahmi Alkhamdani dengan animasi GSAP, showcase sertifikat, dan AI Assistant.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Arsitektur React + Vite performa tinggi dengan animasi scroll GSAP.',
      'Galeri interaktif dokumentasi sertifikat dan pencapaian.',
      'AI Chat Assistant untuk navigasi dan tanya jawab profil.',
      'Deployed secara live di Netlify.',
    ],
    impact: [
      'Representasi digital resmi untuk rekruter dan partner kolaborasi.',
      'Menunjukkan penguasaan UI/UX modern, animasi performan, dan deployment cloud.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'JavaScript', 'Netlify'],
    links: {
      live: 'https://sma-n-1-rajabasa-permai-plus.netlify.app/',
    },
  },
  {
    id: 'cert-backend-js',
    slug: 'backend-js-dicoding',
    title: 'Back-End JavaScript',
    subtitle: 'Dicoding Indonesia Certificate',
    category: 'BACKEND & CLOUD',
    filterTag: 'BACKEND & CLOUD',
    img: '/certificates/backend-js-dicoding.webp',
    heroImg: '/certificates/backend-js-dicoding.webp',
    tagline:
      'Sertifikat kelulusan kelas Belajar Back-End Pemula dengan JavaScript dari Dicoding untuk Reza Fahmi Alkhamdani.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: Dicoding Indonesia.',
      'Kelas: Belajar Back-End Pemula dengan JavaScript.',
      'Tanggal kelulusan: 02 Desember 2025.',
      'Kode sertifikat: ERZR2N862PYV.',
      'Berlaku hingga: 02 Desember 2028.',
    ],
    impact: [
      'Mempelajari peran back-end, komunikasi client-server HTTP, dan arsitektur RESTful API.',
      'Mempelajari dasar Node.js, NPM, modularization, filesystem, dan stream.',
      'Membangun web service serta menguji RESTful API menggunakan Postman.',
    ],
    stack: ['JavaScript', 'Node.js', 'RESTful API', 'Hapi Framework', 'Postman', 'Amazon EC2'],
    links: {},
  },
  {
    id: 'cert-ai-agents',
    slug: 'skillsbuild-ai-agents',
    title: 'Unleashing AI Agents',
    subtitle: 'IBM SkillsBuild Certificate',
    category: 'AI & AGENTS',
    filterTag: 'AI & AGENTS',
    img: '/certificates/skillsbuild-ai-agents.webp',
    heroImg: '/certificates/skillsbuild-ai-agents.webp',
    tagline:
      'Completion Certificate IBM SkillsBuild untuk Unleashing the Power of AI Agents — September 2026.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: IBM SkillsBuild.',
      'Kelas: Unleashing the Power of AI Agents.',
      'Kode modul: ALM-COURSE_3825456.',
      'Tanggal selesai: 27 September 2026 (GMT).',
    ],
    impact: [
      'Mempelajari konsep dan arsitektur AI Agents serta cara kerjanya dalam ekosistem modern.',
      'Memahami otomatisasi tugas otonom berbasis LLM dan integrasi tools eksternal.',
    ],
    stack: ['AI Agents', 'IBM SkillsBuild', 'Agentic AI', 'Automation', 'LLM'],
    links: {},
  },
  {
    id: 'cert-granite-credly',
    slug: 'ibm-granite-credly',
    title: 'IBM Granite Data (Credly)',
    subtitle: 'IBM SkillsBuild Verified Credly',
    category: 'IBM GRANITE',
    filterTag: 'IBM GRANITE',
    img: '/certificates/ibm-granite-credly.webp',
    heroImg: '/certificates/ibm-granite-credly.webp',
    tagline:
      'Sertifikat IBM SkillsBuild untuk Data Classification and Summarization Using IBM Granite.',
    features: [
      'Penerima: Reza Fahmi.',
      'Penerbit: IBM SkillsBuild.',
      'Program: Data Classification and Summarization Using IBM Granite.',
      'Tanggal terbit: 28 Agustus 2025.',
      'Verifikasi: Credly badge resmi tersedia.',
    ],
    impact: [
      'Mempelajari penggunaan model IBM Granite untuk klasifikasi dan peringkasan data.',
      'Melatih pemanfaatan generative AI IBM untuk produktivitas analisis teks.',
    ],
    stack: ['IBM Granite', 'Data Classification', 'Data Summarization', 'AI'],
    links: {},
  },
  {
    id: 'cert-cloud-aws',
    slug: 'cloud-genai-aws-dicoding',
    title: 'Cloud & Gen AI AWS',
    subtitle: 'Dicoding x AWS Certificate',
    category: 'BACKEND & CLOUD',
    filterTag: 'BACKEND & CLOUD',
    img: '/certificates/cloud-genai-aws-dicoding.webp',
    heroImg: '/certificates/cloud-genai-aws-dicoding.webp',
    tagline:
      'Sertifikat kelulusan kelas Belajar Dasar Cloud dan Gen AI di AWS dari Dicoding untuk Reza Fahmi Alkhamdani.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: Dicoding Indonesia x AWS.',
      'Tanggal kelulusan: 11 November 2025.',
      'Kode sertifikat: GRX5J0WGKX0M.',
      'Berlaku hingga: 11 November 2028.',
    ],
    impact: [
      'Memahami infrastruktur AWS Cloud, global region, keamanan, dan model pricing.',
      'Mempelajari dasar generative AI dan pemanfaatannya dalam ekosistem AWS.',
    ],
    stack: ['AWS Cloud', 'Cloud Computing', 'AWS Security', 'AWS Pricing', 'Generative AI'],
    links: {},
  },
  {
    id: 'cert-js-dasar',
    slug: 'javascript-dicoding',
    title: 'Dasar JavaScript',
    subtitle: 'Dicoding Indonesia Certificate',
    category: 'JAVASCRIPT',
    filterTag: 'JAVASCRIPT',
    img: '/certificates/javascript-dicoding.webp',
    heroImg: '/certificates/javascript-dicoding.webp',
    tagline:
      'Sertifikat kelulusan kelas Belajar Dasar Pemrograman JavaScript dari Dicoding untuk Reza Fahmi Alkhamdani.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: Dicoding Indonesia.',
      'Tanggal kelulusan: 24 November 2025.',
      'Kode sertifikat: MEPJ23RGWP3V.',
      'Berlaku hingga: 24 November 2028.',
    ],
    impact: [
      'Menguasai sintaks, tipe data, functions, data structures, OOP, dan asynchronous programming.',
      'Fondasi kuat untuk pengembangan aplikasi Node.js dan front-end modern.',
    ],
    stack: ['JavaScript', 'Node.js', 'OOP', 'Functional Programming', 'Async', 'Code Quality'],
    links: {},
  },
  {
    id: 'cert-ai-dasar',
    slug: 'dasar-ai-dicoding',
    title: 'Dasar AI & Machine Learning',
    subtitle: 'Dicoding Indonesia Certificate',
    category: 'AI & AGENTS',
    filterTag: 'AI & AGENTS',
    img: '/certificates/dasar-ai-dicoding.webp',
    heroImg: '/certificates/dasar-ai-dicoding.webp',
    tagline:
      'Sertifikat kelulusan kelas Belajar Dasar AI dari Dicoding untuk Reza Fahmi Alkhamdani.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: Dicoding Indonesia.',
      'Tanggal kelulusan: 28 Oktober 2025.',
      'Kode sertifikat: MEPJ22G2WP3V.',
      'Berlaku hingga: 28 Oktober 2028.',
    ],
    impact: [
      'Mempelajari konsep Artificial Intelligence, Machine Learning, dan Deep Learning.',
      'Memahami peran dataset dan preprocessing dalam pelatihan model AI.',
    ],
    stack: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Data for AI'],
    links: {},
  },
  {
    id: 'cert-data-credly',
    slug: 'skillsbuild-getting-started-data-credly',
    title: 'Getting Started with Data',
    subtitle: 'IBM SkillsBuild Credly Badge',
    category: 'IBM GRANITE',
    filterTag: 'IBM GRANITE',
    img: '/certificates/skillsbuild-getting-started-data-credly.webp',
    heroImg: '/certificates/skillsbuild-getting-started-data-credly.webp',
    tagline:
      'IBM SkillsBuild Credly Badge — Getting Started with Data. Diterbitkan resmi untuk Reza Fahmi.',
    features: [
      'Penerima: Reza Fahmi.',
      'Penerbit: IBM SkillsBuild.',
      'Tanggal terbit: 27 September 2026.',
      'Badge terverifikasi langsung di platform Credly.',
    ],
    impact: [
      'Memvalidasi kompetensi pemahaman dan literasi data terstruktur.',
      'Kredensial resmi IBM yang dapat diverifikasi publik.',
    ],
    stack: ['Data Fundamentals', 'IBM SkillsBuild', 'Credly Badge', 'Data Literacy'],
    links: {
      live: 'https://www.credly.com/badges/a6331d31-90b0-48fb-9127-6b26d723d1c9',
    },
  },
  {
    id: 'cert-granite-2026',
    slug: 'skillsbuild-classifying-data-2026',
    title: 'Classifying Data (IBM Granite)',
    subtitle: 'IBM SkillsBuild 2026',
    category: 'IBM GRANITE',
    filterTag: 'IBM GRANITE',
    img: '/certificates/skillsbuild-classifying-data-2026.webp',
    heroImg: '/certificates/skillsbuild-classifying-data-2026.webp',
    tagline:
      'Completion Certificate IBM SkillsBuild untuk Classifying Data Using IBM Granite — September 2026.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: IBM SkillsBuild.',
      'Kode modul: ALM-COURSE_4058910.',
      'Tanggal selesai: 27 September 2026.',
    ],
    impact: [
      'Eksplorasi lanjutan klasifikasi dan pengelompokan data teks dengan IBM Granite AI.',
    ],
    stack: ['IBM Granite', 'Data Classification', 'AI', 'SkillsBuild'],
    links: {},
  },
  {
    id: 'cert-hacktiv8-data',
    slug: 'hacktiv8-data-classification-summarization',
    title: 'Student Developer Initiative',
    subtitle: 'Hacktiv8 x IBM SkillsBuild',
    category: 'IBM GRANITE',
    filterTag: 'IBM GRANITE',
    img: '/certificates/hacktiv8-data-classification-summarization.webp',
    heroImg: '/certificates/hacktiv8-data-classification-summarization.webp',
    tagline:
      'Certificate of Completion untuk kelas Data Classification and Summarization pada Student Developer Initiative.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penyelenggara: Hacktiv8 Indonesia x IBM SkillsBuild.',
      'Periode: Agustus - September 2025.',
    ],
    impact: [
      'Menyelesaikan sesi eksplorasi data processing dan aplikasi AI bersama komunitas developer.',
    ],
    stack: ['Data Classification', 'Data Summarization', 'IBM SkillsBuild', 'Hacktiv8'],
    links: {},
  },
  {
    id: 'cert-futsal',
    slug: 'futsal-juara-1',
    title: 'Juara 1 Turnamen Futsal',
    subtitle: 'Achievement Certificate',
    category: 'ACHIEVEMENTS',
    filterTag: 'ACHIEVEMENTS',
    img: '/certificates/futsal-juara-1.webp',
    heroImg: '/certificates/futsal-juara-1.webp',
    tagline:
      'Sertifikat penghargaan Juara 1 pada Turnamen Piala Futsal Umum Putra — 06 Februari 2026.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Prestasi: Juara 1 Piala Futsal Umum Putra.',
      'Tanggal: 06 Februari 2026.',
    ],
    impact: [
      'Membuktikan semangat juang, disiplin tinggi, sportivitas, dan kepemimpinan kerja sama tim.',
    ],
    stack: ['Teamwork', 'Leadership', 'Discipline', 'Competition'],
    links: {},
  },
  {
    id: 'cert-al-banna',
    slug: 'ukm-al-banna-peserta',
    title: 'UKM Al Banna Polinela',
    subtitle: 'Achievement Certificate',
    category: 'ACHIEVEMENTS',
    filterTag: 'ACHIEVEMENTS',
    img: '/certificates/ukm-al-banna-peserta.webp',
    heroImg: '/certificates/ukm-al-banna-peserta.webp',
    tagline:
      'Sertifikat keikutsertaan kegiatan kemahasiswaan Unit Kegiatan Mahasiswa Al Banna Politeknik Negeri Lampung.',
    features: [
      'Penerima: Reza Fahmi Alkhamdani.',
      'Penerbit: UKM Al Banna Politeknik Negeri Lampung.',
      'Nomor sertifikat: 089/UKM AL BANNA/C/2025.',
    ],
    impact: [
      'Mendukung pengembangan karakter, etika, dan keaktifan organisasi di lingkungan kampus.',
    ],
    stack: ['Keorganisasian', 'Kegiatan Mahasiswa', 'Karakter', 'Polinela'],
    links: {},
  },
];

export default function AxonUI({
  tiltX = 0,
  tiltY = 0,
  hasGyro = false,
  permissionState = 'prompt',
  onRequestPermission = () => {},
}) {
  const [activeTag, setActiveTag] = useState('ALL');
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Filter cards based on active tag
  const filteredCards = useMemo(() => {
    if (activeTag === 'ALL') return VERIFIED_ITEMS;
    return VERIFIED_ITEMS.filter((item) => item.filterTag === activeTag);
  }, [activeTag]);

  return (
    <>
      {/* 3D Gyroscope/Tilt Parallax Wrapper */}
      <div
        className="ui fixed inset-0 z-10 pointer-events-none overflow-hidden select-none"
        style={{
          fontFamily: '"SF Mono", "Menlo", "Consolas", "Liberation Mono", monospace',
          textTransform: 'uppercase',
          fontSize: '13px',
          lineHeight: '1.35',
          letterSpacing: '0.02em',
          transform: `perspective(1200px) rotateX(${tiltY * -4.0}deg) rotateY(${tiltX * 4.0}deg) translateZ(0)`,
          transition: 'transform 0.12s cubic-bezier(0.1, 0.5, 0.1, 1)',
        }}
      >
        {/* TOP BAR BRAND (LEFT) */}
        <div
          className="brand absolute top-[20px] left-[24px] flex items-center gap-[12px] pointer-events-auto cursor-pointer group"
          onClick={() => setIsProfileModalOpen(true)}
          title="Buka Profil Lengkap Reza Fahmi Alkhamdani"
        >
          {/* Circular Glass Lens Avatar */}
          <div className="relative w-11 h-11 rounded-full p-[2px] glass-panel transition-transform duration-300 group-hover:scale-105 group-hover:border-[#aa88ff]">
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
              <img
                src="/profile.webp"
                alt="Reza Fahmi Alkhamdani"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Emerald Online Status Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-bold tracking-wider text-white group-hover:text-[#aa88ff] transition-colors">
                REZA FAHMI
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8.5px] bg-[#aa88ff]/20 text-[#aa88ff] border border-[#aa88ff]/40 font-semibold">
                VERIFIED
              </span>
            </div>
            <span className="text-[11px] text-[#8a8a8a] tracking-normal">
              AI & Full-Stack Developer
            </span>
          </div>
        </div>

        {/* TOP BAR COUNTER & SENSOR BADGE (RIGHT) */}
        <div className="absolute top-[20px] right-[24px] flex items-center gap-3 pointer-events-auto">
          {/* Gyroscope / Tilt Sensor Badge */}
          <button
            onClick={onRequestPermission}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#101016]/80 text-[10px] text-[#aaaaaa] hover:text-white hover:border-[#aa88ff] transition-colors backdrop-blur cursor-pointer"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                hasGyro ? 'bg-emerald-400' : 'bg-[#aa88ff]'
              } animate-pulse`}
            />
            <span>{hasGyro ? 'GYRO LINKED' : '3D TILT ACTIVE'}</span>
          </button>

          {/* Counter Badge */}
          <div
            className="w-[46px] h-[46px] rounded-full border border-white/15 bg-[#0e0e14]/90 flex flex-col items-center justify-center cursor-pointer glass-panel transition-all duration-300 hover:border-[#aa88ff] hover:scale-105"
            onClick={() => setActiveTag('ALL')}
            title="13 Dokumen Terverifikasi"
          >
            <span className="font-mono font-bold text-[13px] text-white leading-none">
              13
            </span>
            <span className="text-[7.5px] text-[#8a8a8a] mt-0.5 font-semibold">DOCS</span>
          </div>
        </div>

        {/* FILTER TAGS (CHIPS) */}
        <div className="tags absolute top-[100px] left-[24px] w-[350px] flex flex-wrap gap-[6px] pointer-events-auto z-20">
          {TAGS.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-[8.5px] py-[4.5px] text-[10.5px] rounded-[3px] transition-all duration-200 cursor-pointer font-mono select-none border ${
                  isActive
                    ? 'bg-white text-black font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.4)] scale-[1.02]'
                    : 'bg-[#14141c]/90 text-[#b0b0b8] border-white/10 hover:border-[#aa88ff]/60 hover:text-white hover:bg-[#1e1e28]'
                }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* LEFT COLUMN: VERIFIED DOCUMENTS & PROJECTS LIST */}
        <div
          className="list absolute top-[205px] left-[24px] bottom-[20px] w-[340px] overflow-y-auto pointer-events-auto pr-2 z-20 space-y-3"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filteredCards.map((card) => {
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group p-2.5 rounded-lg border border-white/10 bg-[#0c0c12]/80 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-[#aa88ff]/70 hover:shadow-[0_8px_30px_rgba(170,136,255,0.18)] hover:-translate-y-0.5"
              >
                {/* Thumbnail Image Container */}
                <div className="relative h-[155px] rounded overflow-hidden bg-black/60 border border-white/10">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top-Right Action Pill */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[9px] text-[#aa88ff] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-mono">
                    <ArrowUpRight size={11} />
                    <span>INSPECT</span>
                  </div>

                  {/* Bottom-Left Category Tag */}
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur border border-white/15 text-[8.5px] text-white/90 font-mono">
                    {card.category}
                  </div>
                </div>

                {/* Card Title & Meta Row */}
                <div className="mt-2.5 flex items-start justify-between gap-2 text-[11px] font-mono leading-tight">
                  <div className="text-white font-medium group-hover:text-[#aa88ff] transition-colors line-clamp-1">
                    {card.title}
                  </div>
                  <div className="text-[#8a8a8a] text-right shrink-0 text-[10px]">
                    VERIFIED
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCards.length === 0 && (
            <div className="py-8 text-xs text-[#8a8a8a] font-mono text-center">
              TIDAK ADA DOKUMEN PADA KATEGORI [{activeTag}].
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: REZA FAHMI PROFILE & WORK DOSSIER */}
        <div
          className="about absolute right-[40px] top-1/2 -translate-y-1/2 w-[390px] pointer-events-auto z-20 p-6 rounded-xl border border-white/15 bg-[#0a0a10]/85 backdrop-blur-xl shadow-2xl text-[#dddddd]"
          style={{
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="space-y-4">
            {/* Section 1: Profile & Bio */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-[#aa88ff] font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>[PROFILE // REZA FAHMI]</span>
                </span>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-[9.5px] text-[#aaaaaa] underline hover:text-white transition-colors cursor-pointer"
                >
                  FULL DOSSIER
                </button>
              </div>
              <p className="text-[11.5px] text-[#cccccc] leading-relaxed">
                {PORTFOLIO_DATA.profile.bio}
              </p>
            </div>

            {/* Section 2: Experience & Certifications Track */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] text-[#aa88ff] font-semibold tracking-wider flex items-center gap-1.5 mb-1.5">
                <Award size={12} />
                <span>[EXPERIENCE & CREDENTIALS]</span>
              </span>
              <ul className="space-y-1 text-[11px] text-[#bbbbbb] leading-normal">
                <li>• IBM SkillsBuild — AI Agents & Data (2026)</li>
                <li>• Dicoding x AWS — Back-End & Cloud Gen AI (2025)</li>
                <li>• IBM SkillsBuild x Hacktiv8 — IBM Granite (2025)</li>
                <li>• Dicoding Academy — AI & JavaScript (2025)</li>
              </ul>
            </div>

            {/* Section 3: Core Technical Capabilities */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] text-[#aa88ff] font-semibold tracking-wider flex items-center gap-1.5 mb-1.5">
                <Code size={12} />
                <span>[CORE CAPABILITIES]</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PORTFOLIO_DATA.capabilities.slice(0, 7).map((cap, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[9.5px] bg-[#14141e] border border-white/10 text-[#dddddd]"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 4: Action Links & Contact */}
            <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
              <a
                href="/cv.pdf"
                download="CV_Reza_Fahmi_Alkhamdani.pdf"
                className="flex items-center justify-between p-2 rounded bg-[#aa88ff] text-black font-bold hover:bg-white transition-colors"
              >
                <span>DOWNLOAD CV (.PDF)</span>
                <FileDown size={13} />
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[10.5px]">
                <a
                  href={PORTFOLIO_DATA.profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded border border-white/10 bg-[#12121a] hover:border-[#aa88ff] transition-colors text-white"
                >
                  <Github size={12} />
                  <span>GITHUB</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded border border-white/10 bg-[#12121a] hover:border-[#aa88ff] transition-colors text-white"
                >
                  <Linkedin size={12} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL DOKUMENTASI / SERTIFIKAT */}
      {selectedCard && (
        <CardStudyModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {/* MODAL PROFIL DOSSIER LENGKAP */}
      {isProfileModalOpen && (
        <ProfileDetailModal onClose={() => setIsProfileModalOpen(false)} />
      )}
    </>
  );
}
