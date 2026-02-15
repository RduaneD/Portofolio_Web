"use client";

import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  params: { slug: string };
};

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="relative py-40 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >

          {/* Back */}
          <Link
            href="/#projects"
            className="text-sm text-slate-400 hover:text-accent transition"
          >
            ← Back to Projects
          </Link>

          {/* Hero Header */}
          <div className="mt-10 mb-20">

            {project.badge && (
              <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-medium tracking-wide border border-accent/20">
                {project.badge}
              </span>
            )}

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {project.title}
            </h1>

            <p className="text-accent text-lg font-medium">
              {project.role}
            </p>

          </div>

          {/* Divider */}
          <Divider />

          {/* STORY */}
          <CaseSection
            title="Context & Story"
            content={project.story}
          />

          <Divider />

          {/* CHALLENGE */}
          <CaseSection
            title="Technical Challenge"
            content={project.challenge}
          />

          <Divider />

          {/* ARCHITECTURE */}
          <CaseSection
            title="Architecture Approach"
            content={project.architecture}
          />

          <Divider />

          {/* RESULT */}
          <CaseSection
            title="Outcome & Impact"
            content={project.result}
          />

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2 className="text-2xl font-semibold mb-8 text-white">
              Technology Stack
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <div className="mt-20">

            {project.liveUrl && project.isPublic && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-8 py-4 rounded-2xl
                  bg-accent hover:bg-blue-400
                  text-black font-semibold
                  transition duration-300
                  shadow-lg hover:shadow-blue-500/30
                "
              >
                View Live Demo →
              </a>
            )}

            {!project.isPublic && (
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
      Disclosure
    </p>

    <div className="px-8 py-6 rounded-2xl border border-white/5 bg-slate-900/40 text-slate-400 leading-relaxed">
      <p className="text-white/80 font-medium mb-2">
        Enterprise Confidentiality Context
      </p>

      Detailed architectural implementation, internal workflows, and system
      integrations are protected under a professional NDA agreement.
      This case study intentionally presents a high-level overview to
      demonstrate design thinking and system architecture principles.
    </div>
  </div>
)}

          </div>

        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------
   Case Study Section
--------------------------------*/

function CaseSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        my-20
        p-10
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">
        {title}
      </h2>
      <p className="text-slate-400 leading-relaxed text-lg">
        {content}
      </p>
    </motion.div>
  );
}

/* ------------------------------
   Divider
--------------------------------*/

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />
  );
}
