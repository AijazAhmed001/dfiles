const navLinks = [
  { label: "About", href: "#showcase" },
  { label: "Projects", href: "#performance" },
  { label: "Skills", href: "#features" },
  { label: "Experience", href: "#highlights" },
  { label: "Contact", href: "#contact" },
];

const noChangeParts = [
  "Object_84", "Object_37", "Object_34", "Object_12", "Object_80",
  "Object_35", "Object_36", "Object_13", "Object_125", "Object_76",
  "Object_33", "Object_42", "Object_58", "Object_52", "Object_21", "Object_10",
];

const performanceImages = [
  { id: "p1", src: "/performance1.png", alt: "Enterprise dashboard interface" },
  { id: "p2", src: "/performance2.png", alt: "Modern application interface" },
  { id: "p3", src: "/performance3.png", alt: "Analytics and reporting interface" },
  { id: "p4", src: "/performance4.png", alt: "Software project interface" },
  { id: "p5", src: "/performance5.jpg", alt: "Featured development project" },
  { id: "p6", src: "/performance6.png", alt: "Responsive product experience" },
  { id: "p7", src: "/performance7.png", alt: "Full stack application screen" },
];

const performanceImgPositions = [
  { id: "p1", left: 5, bottom: 65 },
  { id: "p2", right: 10, bottom: 60 },
  { id: "p3", right: -5, bottom: 45 },
  { id: "p4", right: -10, bottom: 0 },
  { id: "p5", left: 20, bottom: 50 },
  { id: "p6", left: 2, bottom: 30 },
  { id: "p7", left: -5, bottom: 0 },
];

const features = [
  {
    id: 1,
    icon: "/feature-icon1.svg",
    highlight: "Frontend Engineering.",
    text: "Responsive React and TypeScript interfaces with accessible components and polished interactions.",
    styles: "left-5 md:left-20 top-[20%] opacity-0 translate-y-5",
  },
  {
    id: 2,
    icon: "/feature-icon2.svg",
    highlight: "Backend Systems.",
    text: "Secure ASP.NET Core and FastAPI services built with clean architecture and maintainable layers.",
    styles: "right-5 md:right-20 top-[30%] opacity-0 translate-y-5",
  },
  {
    id: 3,
    icon: "/feature-icon3.svg",
    highlight: "Data Engineering.",
    text: "Structured SQL Server, PostgreSQL and MongoDB solutions with reliable reporting and audit-ready data.",
    styles: "left-5 md:left-20 top-[50%] opacity-0 translate-y-5",
  },
  {
    id: 4,
    icon: "/feature-icon4.svg",
    highlight: "Cloud & DevOps.",
    text: "Docker, CI/CD, Azure and modern deployment workflows that move software safely into production.",
    styles: "right-5 md:right-20 top-[70%] opacity-0 translate-y-5",
  },
  {
    id: 5,
    icon: "/feature-icon5.svg",
    highlight: "AI Integration.",
    text: "Practical AI assistants, RAG workflows and contextual business tools integrated into real applications.",
    styles: "left-5 md:left-20 top-[90%] opacity-0 translate-y-5",
  },
];

const featureSequence = [
  { videoPath: "/videos/feature-1.mp4", boxClass: ".box1", delay: 1 },
  { videoPath: "/videos/feature-2.mp4", boxClass: ".box2", delay: 0 },
  { videoPath: "/videos/feature-3.mp4", boxClass: ".box3", delay: 0 },
  { videoPath: "/videos/feature-4.mp4", boxClass: ".box4", delay: 0 },
  { videoPath: "/videos/feature-5.mp4", boxClass: ".box5", delay: 0 },
];

const footerLinks = [
  { label: "GitHub", link: "https://github.com/AijazAhmed001" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/aijaz-ahmed-605a89249" },
  { label: "Projects", link: "#performance" },
  { label: "Skills", link: "#features" },
  { label: "Contact", link: "mailto:aijazahmed@example.com" },
];

export {
  features,
  featureSequence,
  footerLinks,
  navLinks,
  noChangeParts,
  performanceImages,
  performanceImgPositions,
};
