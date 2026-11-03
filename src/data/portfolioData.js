// ─── Portfolio Data (single source of truth for site content & AI assistant) ────

export const PORTFOLIO_DATA = {
  profile: {
    name: "Reza Fahmi Alkhamdani",
    role: "Junior Web Developer · Full-Stack & AI Engineer",
    bio: "Mahasiswa D3 Manajemen Informatika Politeknik Negeri Lampung dengan pengalaman kepemimpinan organisasi, pengembangan web full-stack, serta pencipta terdaftar Hak Cipta resmi Kemenkumham RI (No. 001584450). Terampil pada Frontend (Next.js, TypeScript, React, Vite, Tailwind CSS, HTML, CSS, PHP), Backend (Node.js, Express, Prisma ORM, JWT Auth, Multi-Tenant), Database (PostgreSQL, MySQL, SQL Server, Supabase), Microsoft Office, serta AI Agents (Hermes AI Telegram/WhatsApp, IBM SkillsBuild AI Agent & IBM Granite).",
    location: "Bandar Mataram, Lampung Tengah, Lampung",
    phone: "+62 812 7873 4115",
    email: "rezaalkhamdani@gmail.com",
    socials: {
      github: "https://github.com/Rezafahmi17",
      linkedin: "https://www.linkedin.com/in/reza-fahmi-alkhamdani-4318ba380",
      whatsapp: "https://wa.me/6281278734115",
    },
  },
  experience: [
    {
      title: "SIM ORMAWA, HMJ & HIMA — Politeknik Negeri Lampung",
      period: "Sep 2026 – Nov 2026",
      description: [
        "Membangun portal terpusat berbasis Multi-Tenant untuk ORMAWA/UKM, HMJ (8 Jurusan), dan HIMA (43 Prodi) di Politeknik Negeri Lampung menggunakan Next.js, TypeScript, Express, dan Prisma ORM.",
        "Mengelola kepengurusan, program kerja, proposal kegiatan, anggaran keuangan, realisasi LPJ, inventaris, serta Audit Log SHA-256.",
        "Tercatat resmi Hak Cipta Program Komputer di Kementerian Hukum RI (DJKI No. 001584450 / EC002026218676, masa perlindungan 50 tahun).",
      ],
    },
    {
      title: "Kasirin — Aplikasi Kasir & Multi-Tenant Commerce",
      period: "2026",
      description: [
        "Membangun platform POS & Multi-Tenant Commerce modern dengan Next.js, React, Node.js, Express, dan PostgreSQL.",
        "Fitur kasir penjualan & penyewaan (rental), isolasi toko multi-tenant, row-level locking stok aman, cetak struk digital, dan ekspor laporan keuangan.",
      ],
    },
    {
      title: "Kepala Departemen Pembinaan — UKM Olahraga Politeknik Negeri Lampung",
      period: "Feb 2026 – Jan 2027",
      description: [
        "Melakukan pengembangan, pengawasan, dan evaluasi terhadap divisi-divisi UKM Olahraga.",
        "Memberikan saran serta arahan terhadap kepala divisi dan anggota divisi UKM Olahraga.",
        "Ketua Pelaksana DIREKTUR CUP Se-Lampung dan membangun kerja sama tim (teamwork) dengan baik.",
      ],
    },
    {
      title: "Website Sekolah — SMA N 1 Rajabasa Permai Plus",
      period: "Agus 2026 – Sep 2026",
      description: [
        "Membangun Halaman Publik (Beranda berita & statistik, Profil Sekolah, Ekstrakurikuler, Galeri interaktif, Berita).",
        "Membangun Dashboard Admin dengan login terautentikasi JWT dan manajemen konten CRUD lengkap.",
      ],
    },
    {
      title: "Projek Website UMKM — Kedai Kopi Nusantara",
      period: "Mar 2026 – Mei 2026",
      description: [
        "Landing page produk UMKM dengan pemesanan menu melalui kode QR serta fitur order tracking.",
        "Fitur katalog menu, pemesanan online, manajemen data, dan Panel Admin.",
      ],
    },
    {
      title: "Kepala Kebersihan — Pondok Pesantren Hidayatul Qur'an Lampung Timur",
      period: "Sep 2018 – Mar 2024",
      description: [
        "Melakukan pengontrolan, pengawasan, dan pengaturan jadwal kebersihan harian serta membangun kerja sama tim.",
      ],
    },
  ],
  education: [
    {
      degree: "Diploma III (D3) Manajemen Informatika",
      institution: "Politeknik Negeri Lampung",
      period: "Sep 2024 – Sekarang",
    },
    {
      degree: "Ilmu Pengetahuan Alam (IPA)",
      institution: "MAN 1 Lampung Timur",
      period: "Sep 2022 – Mar 2024",
    },
  ],
  techStack: [
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend / Backend" },
    { name: "TypeScript", category: "Frontend / Backend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Full-Stack Web" },
    { name: "Vite", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "PHP", category: "Frontend / Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "Prisma ORM", category: "Backend / Database" },
    { name: "Zod", category: "Schema Validation" },
    { name: "JWT Authentication", category: "Backend Security" },
    { name: "Multi-Tenant Architecture", category: "System Design" },
    { name: "SHA-256 Audit Log", category: "Security" },
    { name: "RESTful API", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "SQL Server", category: "Database" },
    { name: "Supabase", category: "Database" },
    { name: "Microsoft Office", category: "Productivity" },
    { name: "Hermes AI (Telegram/WhatsApp)", category: "AI Agents" },
    { name: "AI Agents", category: "AI" },
    { name: "IBM Granite", category: "Generative AI" },
    { name: "AWS Cloud & EC2", category: "Cloud" },
    { name: "Turborepo", category: "Monorepo Tooling" },
    { name: "GSAP Animations", category: "Frontend" },
    { name: "Postman", category: "API Testing" },
    { name: "Vercel", category: "Deployment" },
    { name: "Netlify", category: "Deployment" },
    { name: "Git & GitHub", category: "Tools" },
  ],
  projects: [
    {
      slug: "sim-ormawa-hmj",
      title: "SIM ORMAWA, HMJ & HIMA — Politeknik Negeri Lampung",
      category: "Featured Web Project",
      description:
        "Portal kemahasiswaan terpusat berbasis Multi-Tenant untuk mengelola kepengurusan, program kerja, proposal, anggaran keuangan, LPJ, inventaris, dan Audit Log SHA-256 pada 8 Jurusan & 43 Prodi Polinela (Hak Cipta Kemenkumham No. 001584450).",
    },
    {
      slug: "hak-cipta-sim-ormawa",
      title: "Surat Pencatatan Hak Cipta SIM ORMAWA (Kemenkumham RI)",
      category: "Hak Cipta Resmi DJKI",
      description:
        "Surat Pencatatan Hak Cipta resmi dari Kementerian Hukum Republik Indonesia (DJKI No. 001584450 / EC002026218676) kategori Program Komputer atas nama tim pengembang (Reza Fahmi Alkhamdani, Kurniawan Saputra, Tego Saputra) dengan masa perlindungan 50 tahun.",
    },
    {
      slug: "ibm-skillsbuild-ai-agent-cert",
      title: "Data - AI Agent for Data Analysis (IBM SkillsBuild)",
      category: "IBM SkillsBuild Certificate",
      description:
        "Sertifikasi dan Transkrip Resmi IBM SkillsBuild University Education bersama Hacktiv8 Indonesia untuk jalur Data - AI Agent for Data Analysis dengan Nilai Akhir Proyek 90/100 (No. 14523/H8/CSR/ISUE/V/2026).",
    },
    {
      slug: "kasirin",
      title: "Kasirin — Aplikasi Kasir & Multi-Tenant Commerce",
      category: "Featured Web Project",
      description:
        "Platform Kasir POS dan Multi-Tenant Commerce yang menyatukan etalase customer, transaksi jual & sewa, stok, struk digital, dan laporan omzet real-time.",
    },
    {
      slug: "kopi-nusantara",
      title: "Kopi Nusantara — QR Ordering & Tracking",
      category: "Featured Web Project",
      description:
        "Landing page UMKM Kedai Kopi Nusantara dengan pemesanan menu via QR Code, live order tracking, manajemen data, dan Panel Admin.",
    },
    {
      slug: "portfolio-website-smanrp",
      title: "Website Sekolah SMA N 1 Rajabasa Permai Plus",
      category: "Featured Web Project",
      description:
        "Website sekolah dengan Halaman Publik interaktif dan Dashboard Admin terautentikasi JWT untuk CRUD Berita, Ekstrakurikuler, Galeri, Profil, & Statistik.",
    },
    {
      slug: "hermes-ai-telegram-whatsapp",
      title: "Membangun AI Agent Otomatis dengan Hermes AI (Telegram/WhatsApp)",
      category: "xcode.or.id Certificate",
      description:
        "Pembuatan AI Agent otomatis dengan Hermes AI serta integrasi kanal pesan Telegram dan WhatsApp.",
    },
  ],
  achievements: [
    {
      title: "Surat Pencatatan Hak Cipta SIM ORMAWA — Kemenkumham RI (2026)",
      project: "DJKI Kementerian Hukum Republik Indonesia",
      description: "Terdaftar resmi Hak Cipta Program Komputer No. 001584450 / EC002026218676 dengan masa perlindungan 50 tahun atas nama Reza Fahmi Alkhamdani, Kurniawan Saputra, dan Tego Saputra.",
      techStack: ["Hak Cipta Resmi", "DJKI", "HAKI", "Program Komputer"],
      links: { pdf: "/certificates/hak-cipta-sim-ormawa-polinela.pdf" },
    },
    {
      title: "Data - AI Agent for Data Analysis — Nilai 90/100 (2026)",
      project: "IBM SkillsBuild x Hacktiv8 Indonesia",
      description: "Sertifikasi dan Transkrip Resmi No. 14523/H8/CSR/ISUE/V/2026 dengan perolehan skor Proyek Akhir 90/100 (Arsitektur 93, Kelengkapan 91).",
      techStack: ["IBM Granite", "AI Agents", "Langflow", "IBM Bob", "Vibe Coding"],
      links: { pdf: "/certificates/ibm-skillsbuild-ai-agent-cert.pdf", transcript: "/certificates/ibm-skillsbuild-ai-agent-transcript.pdf" },
    },
    {
      title: "Juara 1 Futsal Umum UKM Katolik (2026)",
      project: "Bandar Lampung, Lampung",
      description: "Juara 1 turnamen futsal umum UKM Katolik di Bandar Lampung tahun 2026.",
      techStack: ["Teamwork", "Leadership", "Discipline"],
      links: {},
    },
    {
      title: "Juara 1 Futsal Umum Putra Tulang Bawang Barat (2026)",
      project: "Tulang Bawang Barat, Lampung",
      description: "Juara 1 turnamen futsal umum putra tingkat daerah di Tulang Bawang Barat tahun 2026.",
      techStack: ["Teamwork", "Strategy"],
      links: {},
    },
    {
      title: "Juara 1 Futsal Umum Putra Lampung Timur (2026)",
      project: "Lampung Timur, Lampung",
      description: "Juara 1 turnamen futsal umum putra di Lampung Timur tahun 2026.",
      techStack: ["Teamwork", "Competitive Spirit"],
      links: {},
    },
    {
      title: "Juara 3 Futsal KMHIPO CUP (2025)",
      project: "Bandar Lampung, Lampung",
      description: "Juara 3 turnamen futsal KMHIPO CUP di Bandar Lampung tahun 2025.",
      techStack: ["Teamwork", "Collaboration"],
      links: {},
    },
  ],
  capabilities: [
    "Frontend & Full-Stack Web (Next.js, TypeScript, React, Vite, Tailwind CSS, HTML, CSS, PHP)",
    "Backend Development (Node.js, Express, Prisma ORM, Zod, RESTful API, JWT Auth)",
    "Database Systems (PostgreSQL, MySQL, SQL Server, Supabase)",
    "Multi-Tenant Architecture, SHA-256 Audit Log & POS Commerce Systems",
    "AI Agents & Hermes AI (Telegram/WhatsApp Integration)",
    "IBM Granite Data Classification & Summarization",
    "AWS Cloud Basics, Turborepo, Vercel & Netlify Deployment",
    "Microsoft Office & Organizational Leadership",
    "Hak Cipta Terdaftar Resmi Kemenkumham RI (Program Komputer No. 001584450)",
    "Data - AI Agent for Data Analysis (IBM SkillsBuild x Hacktiv8 · Nilai 90/100)",
  ],
};
