export type ProjectDetail = {
  slug: string;
  title: string;
  role: string;
  story: string;
  challenge: string;
  architecture: string;
  result: string;
  tech: string[];
  badge?: string;
  liveUrl?: string;
  isPublic: boolean;
};

export const projects: ProjectDetail[] = [
  {
    slug: "logiro",
    title: "Logiro – Route Optimization App",
    role: "Cloud Computing Engineer",
    story:
      "Logiro was developed as part of Bangkit Academy 2024 Capstone Project (Team C242-RO02), focusing on solving real-world logistics inefficiencies through intelligent route optimization. My responsibility centered on designing and deploying a scalable cloud backend capable of supporting mobile clients and machine learning inference workloads.",
    challenge:
      "The primary challenge was integrating a Reinforcement Learning (DQN) model for solving the Capacitated Vehicle Routing Problem (CVRP) while maintaining low-latency API responses and horizontal scalability. Ensuring reliability under concurrent requests and managing model communication were key concerns.",
    architecture:
      "Mobile Application → Cloud Run REST API → Firestore (Operational Data) → Reinforcement Learning Model Service → Cloud Monitoring & Logging.",
    result:
      "The system successfully delivered optimized delivery routes, demonstrated stable performance under load, and completed full cloud deployment with observability and monitoring enabled.",
    tech: ["GCP", "Cloud Run", "Firestore", "AI", "API"],
    badge: "Bangkit Capstone Project",
    liveUrl: "https://your-live-demo.com",
    isPublic: true,
  },

  {
    slug: "jhonlin-hris",
    title: "Jhonlin HRIS Portal",
    role: "Full-Stack Developer",
    story:
      "This project was developed during my internship at PT. Jhonlin Group as an internal Employee Self-Service (ESS) portal. The system was designed to centralize employee access to attendance, payroll, and HR-related data within a secure internal environment.",
    challenge:
      "The main challenge involved integrating with an existing enterprise Human Capital System (HCS) while enforcing strict authentication, authorization, and role-based access control. Security and data integrity were critical due to the sensitive nature of employee information.",
    architecture:
      "Next.js Frontend → Secure API Layer → Internal HCS System → Enterprise Database.",
    result:
      "The portal was successfully deployed internally and adopted by employees, providing secure access to HR services while reducing manual administrative workflows.",
    tech: ["Next.js", "Express", "MySQL", "JWT"],
    badge: "Internship Project",
    isPublic: false,
  },

  {
    slug: "cascading-location-api",
    title: "Cascading Location API",
    role: "Full-Stack Developer",
    story:
      "A hierarchical regional data service built during my internship to support internal applications requiring structured location data from province to village level.",
    challenge:
      "Designing an efficient relational database schema and RESTful API endpoints that could serve deeply nested data without performance degradation.",
    architecture:
      "Node.js + Express REST API → MariaDB Relational Database → Dockerized Deployment Environment.",
    result:
      "Delivered a stable and reusable internal API service that simplified regional data integration across multiple systems.",
    tech: ["Node.js", "MariaDB", "Docker"],
    badge: "Internship Project",
    isPublic: false,
  },

  {
    slug: "hydrosmart",
    title: "HydroSmart Platform",
    role: "Full-Stack Developer",
    story:
      "HydroSmart was developed as part of the DBS Foundation Coding Camp 2025, aiming to assist hydroponic farming through intelligent monitoring and recommendations.",
    challenge:
      "Integrating machine learning recommendation outputs into a structured backend API while ensuring the frontend could present actionable insights in a clear and usable way.",
    architecture:
      "React + Tailwind Frontend → Hapi.js REST API → Database → Machine Learning Integration Layer.",
    result:
      "Successfully delivered a functional smart farming platform capable of providing real-time recommendations and system insights.",
    tech: ["React", "ML", "Hapi.js"],
    badge: "DBS Coding Camp Project",
    liveUrl: "https://hydrosmart-frontend.vercel.app",
    isPublic: true,
  },

  {
    slug: "digital-eternal",
    title: "DigitalEternal",
    role: "Software Developer",
    story:
      "DigitalEternal is a secure web-based digital asset management system designed to protect sensitive data through structured architecture and security-focused development practices.",
    challenge:
      "Designing a database architecture that minimized attack surfaces while ensuring data consistency and access control.",
    architecture:
      "Web Application → Secured Database Architecture → Vulnerability Assessment & Security Testing.",
    result:
      "Improved overall data protection and reduced potential security risks through architectural hardening and testing.",
    tech: ["Security", "Architecture"],
    badge: "GEMASTIK 2023 Project",
    isPublic: true,
  },

  {
    slug: "carein",
    title: "Carein Pharmacy System",
    role: "Full-Stack Developer",
    story:
      "Carein was developed as a final course project to provide an integrated pharmacy and online health consultation platform.",
    challenge:
      "Building a centralized admin dashboard and ensuring reliable communication between frontend components and RESTful backend services.",
    architecture:
      "React Frontend → REST API Layer → Relational Database.",
    result:
      "Delivered a fully functional e-health system supporting medicine management and online consultation workflows.",
    tech: ["React", "REST", "Database"],
    badge: "Final Course Project",
    liveUrl: "https://frontend-ehealth-ten.vercel.app",
    isPublic: true,
  },

  {
    slug: "nutritrack",
    title: "NutriTrack App",
    role: "Frontend Developer",
    story:
      "NutriTrack is a nutrition monitoring application focused on daily food logging and user-friendly data visualization.",
    challenge:
      "Designing UI logic that ensured food recommendations remained consistent with user dietary input and tracking behavior.",
    architecture:
      "Frontend Interface → Food Logging Logic → Recommendation Processing.",
    result:
      "Delivered a consistent and intuitive nutrition tracking experience with clear user flows.",
    tech: ["Frontend", "UI Logic"],
    badge: "University Assignment",
    isPublic: true,
  },

  {
    slug: "movie-clone",
    title: "Movie Website Clone",
    role: "Frontend Developer",
    story:
      "A responsive movie browsing website built as a practice project using a third-party movie data API.",
    challenge:
      "Optimizing rendering performance while maintaining responsive layouts across devices.",
    architecture:
      "Responsive UI Layer → Third-party Movie API Integration.",
    result:
      "Achieved a fast-loading, responsive movie website clone with smooth user interactions.",
    tech: ["API", "Responsive"],
    badge: "Practice Project",
    isPublic: true,
  },
];
