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
import { projects } from "@/lib/projects";
import type { ProjectDetail } from "@/lib/projects";

/* --------------------------------
   Component
--------------------------------- */

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  /* scroll depth scale */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  /* spotlight tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const glow = useMotionTemplate`
    radial-gradient(
      700px at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.08),
      transparent 60%
    )
  `;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  /* filter only public projects */
  const visibleProjects = projects;

  return (
    <section
      ref={ref}
      id="projects"
      onMouseMove={handleMove}
      className="relative py-40 overflow-hidden"
    >
      {/* spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      <motion.div style={{ scale }} className="relative z-10">
        <Container>

          {/* HEADER */}
          <div className="text-center mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-accent"
            >
              Project Experience
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 140 }}
              transition={{ delay: 0.2 }}
              className="h-px bg-accent/40 mx-auto mt-6"
            />
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-14">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

        </Container>
      </motion.div>
    </section>
  );
}

/* --------------------------------
   Card Component
--------------------------------- */

function ProjectCard({
  project,
  index,
}: {
  project: ProjectDetail;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;

    x.set(px);
    y.set(py);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        viewport={{ once: true }}
        style={{ rotateX, rotateY }}
        className="
          group relative p-10 rounded-3xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          hover:border-accent
          transition
          cursor-pointer
          will-change-transform
        "
      >

        {/* reflection */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-3xl" />

        {/* badge */}
        {project.badge && (
          <span className="absolute -top-3 -right-3 text-xs px-4 py-1.5 rounded-full bg-accent text-black font-medium shadow-lg">
            {project.badge}
          </span>
        )}

        <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition">
          {project.title}
        </h3>

        <p className="text-accent text-sm mb-4">
          {project.role}
        </p>

        <p className="text-slate-400 mb-6 leading-relaxed">
          {project.summary}
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

        {/* CTA */}
        <div className="mt-8 text-sm text-white/60 group-hover:text-white transition">
          View Case Study →
        </div>

      </motion.div>
    </Link>
  );
}
