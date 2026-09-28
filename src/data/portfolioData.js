// ─── Portfolio Data (single source of truth for site content) ────
// This data is read by the site and the optional AI assistant.

export const PORTFOLIO_DATA = {
  profile: {
    name: "Reza Fahmi Alkhamdani",
    role: "Web Developer & AI/Data Learner",
    bio: "Web developer learner focused on JavaScript, Back-End API, AI fundamentals, AWS Cloud basics, and IBM Granite data classification/summarization. Building practical portfolio projects such as a QR-based coffee ordering website.",
    location: "Indonesia",
    email: "rezaalkhamdani@gmail.com",
    socials: {
      github: "https://github.com/Rezafahmi17",
      linkedin: "https://www.linkedin.com/in/reza-fahmi-alkhamdani-4318ba380",
    },
  },
  experience: [
    {
      title: "IBM Granite Data AI - IBM SkillsBuild x Hacktiv8",
      period: "Aug 2025 - Sep 2025",
      description: [
        "Completed data classification and summarization learning using IBM Granite.",
        "Joined the Student Developer Initiative session for exploratory and experimental data learning.",
      ],
    },
    {
      title: "Artificial Intelligence Foundation - Dicoding Academy",
      period: "Oct 2025",
      description: [
        "Completed Belajar Dasar AI and studied AI, data for AI, Machine Learning, and Deep Learning fundamentals.",
      ],
    },
    {
      title: "Cloud & Gen AI Foundation - Dicoding Academy x AWS",
      period: "Nov 2025",
      description: [
        "Completed Belajar Dasar Cloud dan Gen AI di AWS and learned AWS Cloud, infrastructure, security, monitoring, pricing, and Gen AI basics.",
      ],
    },
    {
      title: "JavaScript Foundation - Dicoding Academy",
      period: "Nov 2025",
      description: [
        "Completed Belajar Dasar Pemrograman JavaScript covering syntax, functions, data structures, OOP, functional programming, async, and code quality.",
      ],
    },
    {
      title: "Back-End JavaScript - Dicoding Academy x AWS",
      period: "Dec 2025",
      description: [
        "Completed Belajar Back-End Pemula dengan JavaScript covering Node.js, RESTful API, web service basics, Postman testing, and Amazon EC2 deployment concepts.",
      ],
    },
    {
      title: "IBM SkillsBuild — Getting Started with Data & AI Agents",
      period: "Sep 2026",
      description: [
        "Completed Getting Started with Data (Earn a credential!) — earned a verified IBM Credly badge for foundational data literacy.",
        "Completed Unleashing the Power of AI Agents — studied agentic AI architecture, LLM-based automation, and AI agent design patterns.",
        "Completed Classifying Data Using IBM Granite — advanced hands-on data classification using IBM Granite generative AI.",
      ],
    },
  ],
  techStack: [
    { name: "JavaScript", category: "Programming" },
    { name: "Node.js", category: "Backend" },
    { name: "RESTful API", category: "Backend" },
    { name: "Hapi / Express-style Service", category: "Backend" },
    { name: "Postman", category: "API Testing" },
    { name: "React", category: "Frontend" },
    { name: "Vite", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "GSAP Animations", category: "Frontend" },
    { name: "MySQL", category: "Database" },
    { name: "Supabase", category: "Backend / Database" },
    { name: "Artificial Intelligence", category: "AI" },
    { name: "AI Agents", category: "AI" },
    { name: "Machine Learning", category: "AI" },
    { name: "Deep Learning Basics", category: "AI" },
    { name: "IBM Granite", category: "Generative AI" },
    { name: "Data Classification", category: "Data" },
    { name: "Data Summarization", category: "Data" },
    { name: "Data Fundamentals", category: "Data" },
    { name: "Data Literacy", category: "Data" },
    { name: "AWS Cloud", category: "Cloud" },
    { name: "Amazon EC2", category: "Cloud" },
    { name: "Netlify", category: "Deployment" },
    { name: "Git", category: "Tools" },
  ],
  projects: [
    {
      slug: "kopi-nusantara",
      title: "Kopi Nusantara QR Ordering",
      category: "Featured Web Project",
      description: "QR-based coffee ordering website that lets customers view the menu and order without queuing at the cashier.",
    },
    {
      slug: "portfolio-website-smanrp",
      title: "Portfolio Website (SMAN 1 Rajabasa Permai)",
      category: "Featured Web Project",
      description: "Personal portfolio website built with React + Vite, GSAP animations, AI chat assistant, and deployed on Netlify.",
    },
    {
      slug: "backend-js-dicoding",
      title: "Back-End JavaScript Certificate",
      category: "Dicoding Certificate",
      description: "Back-end foundation with Node.js, RESTful API, web service, Postman, and Amazon EC2 deployment concepts.",
    },
    {
      slug: "javascript-dicoding",
      title: "Dasar JavaScript Certificate",
      category: "Dicoding Certificate",
      description: "JavaScript fundamentals for web and Node.js development.",
    },
    {
      slug: "dasar-ai-dicoding",
      title: "Dasar AI Certificate",
      category: "Dicoding Certificate",
      description: "AI, Machine Learning, Deep Learning, and data fundamentals.",
    },
    {
      slug: "cloud-genai-aws-dicoding",
      title: "Cloud & Gen AI AWS Certificate",
      category: "Dicoding Certificate",
      description: "AWS Cloud basics, infrastructure, security, monitoring, pricing, and Generative AI fundamentals.",
    },
    {
      slug: "ibm-granite-credly",
      title: "IBM Granite Data Certificate",
      category: "IBM SkillsBuild",
      description: "Data classification and summarization using IBM Granite.",
    },
    {
      slug: "skillsbuild-classifying-data-2026",
      title: "Classifying Data Using IBM Granite (2026)",
      category: "IBM SkillsBuild",
      description: "Advanced data classification using IBM Granite — completed Sep 2026. Learning hours: 1h 30m.",
    },
    {
      slug: "skillsbuild-getting-started-data",
      title: "Getting Started with Data",
      category: "IBM SkillsBuild",
      description: "IBM SkillsBuild credential for foundational data literacy and data management concepts — Sep 2026.",
    },
    {
      slug: "skillsbuild-ai-agents",
      title: "Unleashing the Power of AI Agents",
      category: "IBM SkillsBuild",
      description: "Deep dive into AI Agents, agentic AI architecture, and LLM-powered automation — completed Sep 2026.",
    },
    {
      slug: "skillsbuild-getting-started-data-credly",
      title: "Getting Started with Data (Credly Badge)",
      category: "IBM SkillsBuild",
      description: "Verified Credly badge from IBM SkillsBuild for Getting Started with Data — Sep 2026.",
    },
  ],
  achievements: [
    {
      title: "The best website in the portfolio",
      project: "Kopi Nusantara QR Ordering",
      description:
        "A coffee ordering website using QR codes where customers can enjoy the coffee-shop atmosphere without waiting in line to order from the cashier.",
      techStack: ["JavaScript", "React / Vite", "Tailwind CSS", "Node.js", "REST API", "MySQL"],
      links: {
        github: "https://github.com/Rezafahmi17/kopi-nusantara",
        live: "https://kopi-nusantara-jawa.netlify.app/",
      },
    },
    {
      title: "Personal Portfolio Website",
      project: "Portfolio SMAN 1 Rajabasa Permai",
      description:
        "Professional portfolio website built with React + Vite, GSAP scroll animations, AI Chat Assistant, and deployed live on Netlify — showcasing all certificates, projects, and skills.",
      techStack: ["React", "Vite", "Tailwind CSS", "GSAP", "JavaScript", "Netlify"],
      links: {
        live: "https://sma-n-1-rajabasa-permai-plus.netlify.app/",
      },
    },
    {
      title: "Juara 1 Futsal",
      project: "Piala Futsal Umum Putra",
      description: "Achievement certificate for teamwork, discipline, and competitive spirit.",
      techStack: ["Teamwork", "Discipline", "Collaboration"],
      links: {},
    },
  ],
  capabilities: [
    "JavaScript & Node.js",
    "RESTful API Development",
    "AI Fundamentals & AI Agents",
    "IBM Granite Data Processing",
    "Data Fundamentals & Literacy",
    "AWS Cloud Basics",
    "Responsive Web Development",
    "React + Vite Web Apps",
    "Deployment (Netlify / AWS EC2)",
  ],
};
