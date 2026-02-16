"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiMariadb,
  SiDocker,
  SiGooglecloud,
  SiLinux,
} from "react-icons/si";

/* -------------------------
   DATA
--------------------------*/

const skills = [
  { name: "React", icon: SiReact, group: "frontend", links: ["Next.js"] },
  { name: "Next.js", icon: SiNextdotjs, group: "frontend", links: ["React"] },
  { name: "Tailwind", icon: SiTailwindcss, group: "frontend", links: [] },
  { name: "TypeScript", icon: SiTypescript, group: "frontend", links: ["Node.js"] },

  { name: "Node.js", icon: SiNodedotjs, group: "backend", links: ["Express"] },
  { name: "Express", icon: SiExpress, group: "backend", links: ["Node.js"] },

  { name: "MySQL", icon: SiMysql, group: "data", links: [] },
  { name: "MongoDB", icon: SiMongodb, group: "data", links: [] },
  { name: "MariaDB", icon: SiMariadb, group: "data", links: [] },

  { name: "Docker", icon: SiDocker, group: "infra", links: ["Linux"] },
  { name: "GCP", icon: SiGooglecloud, group: "infra", links: ["Docker"] },
  { name: "Linux", icon: SiLinux, group: "infra", links: ["Docker"] },
];

const filters = [
  { label: "All", key: "all" },
  { label: "Frontend", key: "frontend" },
  { label: "Backend", key: "backend" },
  { label: "Data", key: "data" },
  { label: "Infrastructure", key: "infra" },
];

/* -------------------------
   COMPONENT
--------------------------*/

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  /* mouse glow */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const glow = useMotionTemplate`
    radial-gradient(
      900px at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.08),
      transparent 60%
    )
  `;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const visible =
    filter === "all"
      ? skills
      : skills.filter((s) => s.group === filter);

  const isRelated = (skill: string) =>
    active &&
    skills.find((s) => s.name === active)?.links.includes(skill);

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      id="skills"
      className="relative py-40 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      <Container>
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-accent mb-6">
            Engineering Capability Map
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Interactive visualization of my engineering stack and technology focus.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm transition
                ${
                  filter === f.key
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {visible.map((skill) => {
            const Icon = skill.icon;
            const isActive = active === skill.name;
            const related = isRelated(skill.name);

            return (
              <motion.div
                key={skill.name}
                onMouseEnter={() => setActive(skill.name)}
                onMouseLeave={() => setActive(null)}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition
                  ${
                    isActive
                      ? "border-blue-400 bg-blue-500/10"
                      : related
                      ? "border-blue-400/30 bg-white/5"
                      : "border-white/10 bg-white/5"
                  }`}
              >
                <Icon
                  className={`text-3xl transition
                    ${
                      isActive
                        ? "text-blue-400"
                        : related
                        ? "text-slate-300"
                        : "text-slate-400"
                    }`}
                />

                <span
                  className={`text-sm transition
                    ${
                      isActive
                        ? "text-white"
                        : related
                        ? "text-slate-300"
                        : "text-slate-400"
                    }`}
                >
                  {skill.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeSkill"
                    className="absolute inset-0 rounded-2xl border border-blue-400"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="text-center mt-20 text-sm text-slate-500">
          Hover a skill to highlight its focus area
        </div>
      </Container>
    </section>
  );
}
