"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";

/* --------------------------------
   Types
--------------------------------- */

type Project = {
  slug: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  badge?: string;
};

/* --------------------------------
   Data
--------------------------------- */

const projects: Project[] = [
  {
    slug: "logiro",
    title: "Logiro – Route Optimization App",
    role: "Cloud Computing Engineer",
    description:
      "Scalable logistics backend with Reinforcement Learning model to solve CVRP routing.",
    tech: ["GCP", "Cloud Run", "Firestore", "AI", "API"],
    badge: "Bangkit Capstone Project",
  },
  {
    slug: "jhonlin-hris",
    title: "Jhonlin HRIS Portal",
    role: "Full-Stack Developer",
    description:
      "Enterprise-grade employee self-service portal with JWT auth & role-based access.",
    tech: ["Next.js", "Express", "MySQL", "JWT"],
    badge: "Internship Project",
  },
  {
    slug: "cascading-location-api",
    title: "Cascading Location API",
    role: "Full-Stack Developer",
    description:
      "Hierarchical regional API with optimized queries & Docker deployment.",
    tech: ["Node.js", "MariaDB", "Docker"],
    badge: "Internship Project",
  },
  {
    slug: "hydrosmart",
    title: "HydroSmart Platform",
    role: "Full-Stack Developer",
    description:
      "Smart hydroponic assistant with ML integration & plant recommendations.",
    tech: ["React", "ML", "Hapi.js"],
    badge: "DBS Coding Camp Capstone",
  },
  {
    slug: "digital-eternal",
    title: "DigitalEternal",
    role: "Software Developer",
    description:
      "Secure digital asset architecture with database protection & security testing.",
    tech: ["Security", "Architecture"],
    badge: "GEMASTIK 2023 Project",
  },
  {
    slug: "carein",
    title: "Carein Pharmacy System",
    role: "Full-Stack Developer",
    description:
      "Pharmacy & consultation system with relational DB & API testing.",
    tech: ["React", "REST", "Database"],
    badge: "Final Course Project",
  },
  {
    slug: "nutritrack",
    title: "NutriTrack App",
    role: "Frontend Developer",
    description:
      "Nutrition tracking UI with food logging & recommendation logic.",
    tech: ["Frontend", "UI Logic"],
    badge: "University Assignment",
  },
  {
    slug: "movie-clone",
    title: "Movie Website Clone",
    role: "Frontend Developer",
    description:
      "Responsive movie site integrated with third-party API.",
    tech: ["API", "Responsive"],
    badge: "Practice Project",
  },
];

/* --------------------------------
   Component
--------------------------------- */

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 20 });

  const glow = useMotionTemplate`
    radial-gradient(
      900px at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.07),
      transparent 60%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - bounds.left);
    mouseY.set(e.clientY - bounds.top);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      id="projects"
      className="relative py-40 overflow-hidden"
    >
      {/* Cinematic Lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      {/* Noise */}
      <div className="noise-overlay" />

      <motion.div style={{ scale }} className="relative z-10">
        <Container>

          {/* Heading */}
          <div className="text-center mb-28">
            <motion.h2
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-accent"
            >
              Project Experience
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="h-px bg-accent/40 mx-auto mt-6"
            />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">

            {projects.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -12 }}
                  className="group relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent transition duration-300 cursor-pointer"
                >
                  {/* Badge */}
                  {project.badge && (
                    <span className="absolute -top-3 -right-3 z-20 text-xs px-4 py-1.5 rounded-full bg-accent text-black font-medium shadow-lg">
                      {project.badge}
                    </span>
                  )}

                  {/* Gradient Edge Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative z-10">

                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition">
                      {project.title}
                    </h3>

                    <p className="text-accent text-sm mb-4">
                      {project.role}
                    </p>

                    <p className="text-slate-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 text-sm text-white/60 group-hover:text-white transition">
                      View Project →
                    </div>

                  </div>

                </motion.div>
              </Link>
            ))}

          </div>

        </Container>
      </motion.div>
    </section>
  );
}
