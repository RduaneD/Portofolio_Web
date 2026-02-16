export type PlatformType = "web" | "mobile" | "desktop" | "api";

export type ProjectDetail = {
  slug: string;
  title: string;
  role: string;

  /* preview (used in project cards / section) */
  summary: string;

  /* platform */
  platform?: PlatformType;

  /* core content */
  story: string;
  challenge: string;
  architecture: string;
  result: string;

  /* stack */
  tech: string[];

  /* meta */
  badge?: string;
  isPublic: boolean;

  /* links */
  liveUrl?: string;
  apk?: string;
  githubFrontend?: string;
  githubBackend?: string;
  githubMachineLearning?: string[];

  /* documentation */
  usage?: string[];

  /* cinematic assets */
  video?: string;

  /* optional note */
  note?: string;
};

export const projects: ProjectDetail[] = [
  {
    slug: "logiro",
    title: "Logiro – Route Optimization App",
    role: "Cloud Computing Engineer",
    summary:
      "Scalable logistics backend with Reinforcement Learning model to solve CVRP routing.",
    platform: "mobile",

    story:
      "Logiro was developed as part of Bangkit Academy 2024 Capstone Project focusing on solving logistics inefficiencies through intelligent route optimization. I handled the cloud infrastructure and API layer enabling scalable mobile and machine learning integration.",

    challenge:
      "Integrating Reinforcement Learning (DQN) for CVRP optimization while maintaining low-latency API responses and scalable cloud architecture under concurrent load.",

    architecture:
      "Mobile Application → Cloud Run REST API → Firestore → ML Model Service → Monitoring",

    result:
      "Successfully deployed scalable backend capable of serving optimized routes in real-time with stable performance and observability enabled.",

    tech: ["GCP", "Cloud Run", "Firestore", "AI", "API"],
    badge: "Capstone",
    isPublic: true,

    githubBackend: "https://github.com/RduaneD/logiro-backend",
    githubFrontend: "https://github.com/fillahiakbar/optimize-route",
    githubMachineLearning: [
      "https://github.com/NikolausVico/MLcapstoneProject"
    ],

    usage: [
      "Clone backend repository",
      "Install dependencies",
      "Set environment variables",
      "Run backend server",
      "Run mobile app client"
    ],

    apk: "/apps/Logiro.apk",
    video: "/videos/logiro-demo.mp4"
  },

  {
    slug: "hydrosmart",
    title: "HydroSmart Platform",
    role: "Full-Stack Developer",
    summary:
      "Smart hydroponic assistant platform integrating ML-driven plant recommendations.",
    platform: "web",

    story:
      "Developed during DBS Coding Camp to assist hydroponic farming through real-time monitoring and intelligent plant recommendations powered by machine learning.",

    challenge:
      "Integrating ML recommendation engine with backend API and responsive frontend interface.",

    architecture:
      "React Frontend → Hapi API → Database → ML Engine",

    result:
      "Delivered working smart farming platform with live monitoring and recommendation features.",

    tech: ["React", "ML", "Hapi.js"],
    badge: "Capstone",
    isPublic: true,

    liveUrl: "https://hydrosmart-frontend.vercel.app",
    githubFrontend: "https://github.com/RduaneD/hydrosmart-frontend",
    githubBackend: "https://github.com/RduaneD/hydro-backend",
    githubMachineLearning: [
      "https://github.com/RduaneD/diagnosis-flask",
      "https://github.com/RduaneD/plant-recommendation"
    ],

    usage: [
      "Clone frontend and backend repositories",
      "Install dependencies",
      "Run backend server",
      "Run frontend client",
      "Connect API endpoint"
    ],

    video: "/videos/hydrosmart-demo.mov"
  },

  {
    slug: "jhonlin-hris",
    title: "Jhonlin HRIS Portal",
    role: "Full-Stack Developer",
    summary:
      "Enterprise-grade employee self-service portal with JWT authentication and role-based access control.",
    platform: "web",

    story:
      "Built during internship as an internal Employee Self-Service portal to centralize employee HR access securely and streamline administrative workflows.",

    challenge:
      "Integrating with enterprise Human Capital System while enforcing strict authentication, RBAC, and data protection standards.",

    architecture:
      "Next.js Frontend → Secure API Layer → Internal HCS → Enterprise Database",

    result:
      "Successfully deployed internally and adopted by employees to manage HR processes more efficiently.",

    tech: ["Next.js", "Express", "MySQL", "JWT"],
    badge: "Internship",
    isPublic: false
  },

  {
    slug: "cascading-location-api",
    title: "Cascading Location API",
    role: "Backend Developer",
    summary:
      "Hierarchical regional API with optimized relational queries and Dockerized deployment.",
    platform: "api",

    story:
      "Hierarchical regional API service built to support enterprise applications requiring structured geographic data across multiple administrative levels.",

    challenge:
      "Designing relational schema capable of serving nested queries efficiently while maintaining performance consistency.",

    architecture:
      "REST API → MariaDB → Docker",

    result:
      "Delivered stable and reusable API consumed across internal enterprise systems.",

    tech: ["Node.js", "MariaDB", "Docker"],
    badge: "Internship",
    isPublic: false
  },

  {
    slug: "carein",
    title: "Carein Pharmacy System",
    role: "Full-Stack Developer",
    summary:
      "Pharmacy and consultation system with relational database and REST API integration.",
    platform: "web",

    story:
      "Final academic project building integrated pharmacy and consultation platform for managing prescriptions and healthcare workflows.",

    challenge:
      "Designing dashboard interface with reliable API communication and structured relational database.",

    architecture:
      "React Frontend → REST API → Relational Database",

    result:
      "Delivered complete e-health platform supporting pharmacy and consultation features.",

    tech: ["React", "REST", "Database"],
    badge: "Academic",
    isPublic: true,

    liveUrl: "https://frontend-ehealth-ten.vercel.app",
    githubFrontend: "https://github.com/RduaneD/frontend-ehealth",

    usage: [
      "Clone repository",
      "Install dependencies",
      "Run backend",
      "Run frontend"
    ]
  },

  {
    slug: "nutritrack",
    title: "NutriTrack App",
    role: "Frontend Developer",
    summary:
      "Nutrition tracking mobile UI with food logging and recommendation logic.",
    platform: "mobile",

    story:
      "Nutrition tracking application designed for daily food logging, calorie monitoring, and visualized nutritional insights.",

    challenge:
      "Ensuring recommendation logic stays consistent with dynamic user input.",

    architecture:
      "Mobile UI → State Logic → Recommendation Engine",

    result:
      "Delivered intuitive nutrition tracking experience optimized for usability.",

    tech: ["Frontend", "UI Logic"],
    badge: "Academic",
    isPublic: true,

    note:
      "Mobile application project — source repository not publicly available."
  },

  {
    slug: "yummychef",
    title: "YummyChef Recipe App",
    role: "Flutter Developer",
    summary:
      "Mobile recipe application built with Flutter using clean architecture and scalable state management.",
    platform: "mobile",

    story:
      "Mobile recipe browsing application built using Flutter with emphasis on smooth user experience and scalable frontend architecture.",

    challenge:
      "Designing modular frontend structure and preparing Firebase authentication and Firestore integration.",

    architecture:
      "Flutter App → Provider State Management → Firebase Auth → Firestore",

    result:
      "Delivered fully functional mobile frontend ready for backend integration.",

    tech: [
      "Flutter",
      "Dart",
      "Provider",
      "Firebase",
      "Firestore",
      "Firebase Auth"
    ],

    badge: "Academic",
    isPublic: true,

    apk: "https://drive.google.com/file/d/16Ite-xjrWfSvonad6fbWN1WLCCMvOL-q/view?usp=drive_link",

    note:
      "Currently frontend-only build. Backend architecture prepared but not deployed.",

    video: "https://www.youtube.com/embed/Z7RJOZfvDFQ"
  },

  {
    slug: "digital-eternal",
    title: "DigitalEternal",
    role: "Software Developer",
    summary:
      "Secure digital asset management system with database protection and security testing.",
    platform: "web",

    story:
      "Secure digital asset management system focused on protecting sensitive data through strong database architecture and defensive design.",

    challenge:
      "Designing database structure minimizing attack surface and improving overall system resilience.",

    architecture:
      "Web Application → Secure Database → Security Testing Layer",

    result:
      "Improved system security posture and reduced potential vulnerabilities.",

    tech: ["Security", "Architecture"],
    badge: "Competition",
    isPublic: true,

    video: "/videos/digitaleternal-Demo.mp4"
  },

  {
    slug: "movie-clone",
    title: "Movie Website Clone",
    role: "Frontend Developer",
    summary:
      "Responsive movie browsing website integrated with third-party movie API.",
    platform: "web",

    story:
      "Responsive movie browsing website consuming third-party API to display trending and searchable film data.",

    challenge:
      "Optimizing performance and responsiveness across devices.",

    architecture:
      "Responsive UI → External Movie API",

    result:
      "Delivered fast-loading movie browsing experience with clean UI.",

    tech: ["API", "Responsive"],
    badge: "Personal",
    isPublic: true,

    note: "Project not deployed yet."
  }
];
