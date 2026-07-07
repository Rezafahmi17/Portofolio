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
    { name: "MySQL", category: "Database" },
    { name: "Supabase", category: "Backend / Database" },
    { name: "Artificial Intelligence", category: "AI" },
    { name: "Machine Learning", category: "AI" },
    { name: "Deep Learning Basics", category: "AI" },
    { name: "IBM Granite", category: "Generative AI" },
    { name: "Data Classification", category: "Data" },
    { name: "Data Summarization", category: "Data" },
    { name: "AWS Cloud", category: "Cloud" },
    { name: "Amazon EC2", category: "Cloud" },
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
    "AI Fundamentals",
    "IBM Granite Data Processing",
    "AWS Cloud Basics",
    "Responsive Web Development",
  ],
};
