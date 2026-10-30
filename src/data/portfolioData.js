// ─── Portfolio Data (single source of truth for site content & AI assistant) ────

export const PORTFOLIO_DATA = {
  profile: {
    name: "Reza Fahmi Alkhamdani",
    role: "Junior Web Developer · Full-Stack & AI Engineer",
    bio: "Mahasiswa D3 Manajemen Informatika Politeknik Negeri Lampung dengan pengalaman kepemimpinan organisasi dan pengembangan web full-stack. Terampil pada Frontend (HTML, CSS, JavaScript, React, Vite, Tailwind CSS, PHP), Backend (Node.js, Express, JWT Auth, Multi-Tenant), Database (MySQL, SQL Server, Supabase), Microsoft Office, serta AI Agents (Hermes AI Telegram/WhatsApp & IBM Granite).",
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
      title: "SIM ORMAWA & HMJ — Multi-Tenant Web Application",
      period: "Sep 2026 – Okt 2026",
      description: [
        "Membangun Sistem Informasi Manajemen ORMAWA, HMJ, dan HIMA berbasis web dengan Arsitektur Multi-Tenant.",
        "Isolasi data ketat antar-ORMAWA, antar-HMJ, dan antar-HIMA; komunikasi HIMA terarah ke HMJ induk; monitoring & approval oleh Super Admin.",
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
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Full-Stack Web" },
    { name: "Vite", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "PHP", category: "Frontend / Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "JWT Authentication", category: "Backend Security" },
    { name: "Multi-Tenant Architecture", category: "System Design" },
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
    { name: "GSAP Animations", category: "Frontend" },
    { name: "Postman", category: "API Testing" },
    { name: "Vercel", category: "Deployment" },
    { name: "Netlify", category: "Deployment" },
    { name: "Git & GitHub", category: "Tools" },
  ],
  projects: [
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
      slug: "sim-ormawa-hmj",
      title: "SIM ORMAWA & HMJ — Multi-Tenant",
      category: "Featured Web Project",
      description:
        "Sistem Informasi Manajemen ORMAWA, HMJ, dan HIMA berbasis web dengan Arsitektur Multi-Tenant dan persetujuan Super Admin.",
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
    "Frontend & Full-Stack Web (Next.js, React, Vite, Tailwind CSS, HTML, CSS, PHP)",
    "Backend Development (Node.js, Express, RESTful API, JWT Auth)",
    "Database Systems (PostgreSQL, MySQL, SQL Server, Supabase)",
    "Multi-Tenant Architecture & POS Commerce Systems",
    "AI Agents & Hermes AI (Telegram/WhatsApp Integration)",
    "IBM Granite Data Classification & Summarization",
    "AWS Cloud Basics, Vercel & Netlify Deployment",
    "Microsoft Office & Organizational Leadership",
  ],
};
