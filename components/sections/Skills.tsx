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

const skills = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MariaDB", icon: SiMariadb },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "GCP", icon: SiGooglecloud },
      { name: "Linux", icon: SiLinux },
    ],
  },
];

export default function Skills() {
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
      800px at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.08),
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
      id="skills"
      className="relative py-40 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      <div className="noise-overlay" />

      <motion.div style={{ scale }} className="relative z-10">
        <Container>
          <div className="text-center mb-28">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-accent"
            >
              Skills
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="h-px bg-accent/40 mx-auto mt-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg mt-6 subtle-float"
            >
              Crafting scalable systems with modern technologies.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {skills.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition duration-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-500" />

                <h3 className="text-lg font-semibold mb-8 text-white relative z-10">
                  {category.title}
                </h3>

                <div className="space-y-6 relative z-10">
                  {category.items.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="group flex items-center gap-4 text-slate-300 text-sm transition"
                      >
                        <Icon className="text-xl opacity-40 group-hover:opacity-100 group-hover:text-blue-400 transition duration-300" />
                        <span className="group-hover:text-white transition">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}