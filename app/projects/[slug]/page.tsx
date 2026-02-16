"use client";

import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  params: { slug: string };
};

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  /* ---------------- SMART MEDIA DETECTION ---------------- */

  const videoSrc = project.video;
  const isMobile = project.platform === "mobile";
  const hasAPK = project.apk;

  function getVideoType(src?: string) {
    if (!src) return null;

    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      return "youtube";
    }

    if (src.includes("drive.google.com")) {
      return "drive";
    }

    if (src.startsWith("/")) {
      return "local";
    }

    return "external";
  }

  const videoType = getVideoType(videoSrc);

  /* ---------------- SCROLL PROGRESS ---------------- */

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress(window.scrollY / height);
    };

    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  /* ---------------- SECTION TRACKING ---------------- */

  const sections = ["story", "challenge", "architecture", "result", "usage"];
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ---------------- 3D TILT ---------------- */

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [18, -18]);
  const rotateY = useTransform(x, [-150, 150], [-18, 18]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  /* ---------------- ARCHITECTURE ---------------- */

  const architectureNodes = project.architecture
    .split("→")
    .map((n) => n.trim());

  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-black" />

      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
        <div
          style={{ width: `${progress * 100}%` }}
          className="h-full bg-accent transition-all"
        />
      </div>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40">
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`w-3 h-3 rounded-full border transition ${
              active === id
                ? "bg-accent border-accent scale-125"
                : "border-white/30"
            }`}
          />
        ))}
      </div>

      <Container>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/#projects" className="text-slate-400 hover:text-accent">
            ← Back
          </Link>

          <div className="mt-12 mb-28 text-center">
            {project.badge && (
              <span className="px-5 py-2 rounded-full bg-accent/15 text-accent text-xs border border-accent/30">
                {project.badge}
              </span>
            )}

            <h1 className="text-4xl md:text-6xl font-bold mt-8 mb-6">
              {project.title}
            </h1>

            <p className="text-accent">{project.role}</p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  className="px-6 py-3 rounded-xl bg-accent text-black font-semibold hover:scale-105 transition"
                >
                  Live Demo
                </a>
              )}

              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  className="px-6 py-3 rounded-xl border border-white/20 hover:border-accent transition"
                >
                  Frontend
                </a>
              )}

              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  className="px-6 py-3 rounded-xl border border-white/20 hover:border-accent transition"
                >
                  Backend
                </a>
              )}

              {project.githubMachineLearning?.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  className="px-6 py-3 rounded-xl border border-white/20 hover:border-accent transition"
                >
                  ML Repo {i + 1}
                </a>
              ))}

              {hasAPK && (
                <a
                  href={project.apk}
                  download
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
                >
                  Download APK
                </a>
              )}
            </div>
          </div>

          <Divider />

          <Section id="story" title="Context & Story">
            {project.story}
          </Section>

          <Divider />

          <Section id="challenge" title="Technical Challenge">
            {project.challenge}
          </Section>

          <Divider />

          <Section id="architecture" title="Architecture Flow">
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {architectureNodes.map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.08 }}
                  className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur text-sm"
                >
                  {node}
                </motion.div>
              ))}
            </div>
          </Section>

          <Divider />

          <Section id="result" title="Outcome & Impact">
            <Timeline />
            <p className="mt-10 text-slate-400">{project.result}</p>
          </Section>

          {project.isPublic && project.usage && (
            <>
              <Divider />
              <Section id="usage" title="How To Run">
                <div className="space-y-3">
                  {project.usage.map((step, i) => (
                    <p key={i}>
                      {i + 1}. {step}
                    </p>
                  ))}
                </div>
              </Section>
            </>
          )}

          <div className="mt-32 text-center">
            <h2 className="text-2xl mb-10">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-1 rounded-full border border-white/10 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {videoSrc && (
            <div className="mt-40 text-center">
              <h2 className="text-3xl mb-12">Project Showcase</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Visual overview of the completed application
              </p>

              <motion.div
                ref={ref}
                onMouseMove={handleMove}
                onMouseLeave={reset}
                style={{ rotateX, rotateY }}
                className="mx-auto perspective-[1200px] relative group"
              >
                <div className="absolute inset-0 bg-accent blur-3xl opacity-0 group-hover:opacity-30 transition" />

                {isMobile ? (
                  <div className="relative w-[280px] h-[560px] rounded-[42px] border-[12px] border-black overflow-hidden shadow-2xl">
                    {videoType === "local" && (
                      <video
                        src={videoSrc}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}

                    {(videoType === "drive" ||
                      videoType === "youtube") && (
                      <iframe
                        src={videoSrc}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    )}
                  </div>
                ) : (
                  <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    {videoType === "local" && (
                      <video
                        src={videoSrc}
                        controls
                        className="aspect-video w-full"
                      />
                    )}

                    {(videoType === "drive" ||
                      videoType === "youtube") && (
                      <iframe
                        src={videoSrc}
                        className="aspect-video w-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {!project.isPublic && (
            <div className="mt-32 text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                Disclosure
              </p>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-slate-400">
                Enterprise system details are restricted under NDA.
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* SECTION */
function Section({ id, title, children }: any) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-24 p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 className="text-2xl mb-6">{title}</h2>
      <div className="text-slate-400 leading-relaxed">{children}</div>
    </motion.div>
  );
}

/* TIMELINE */
function Timeline() {
  const steps = [
    "Planning",
    "Architecture",
    "Development",
    "Testing",
    "Deployment",
  ];

  return (
    <div className="relative flex justify-between mt-10">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10" />
      {steps.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="relative z-10 text-center"
        >
          <div className="w-5 h-5 rounded-full bg-accent mx-auto mb-2" />
          <p className="text-xs text-slate-400">{s}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* DIVIDER */
function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-20" />
  );
}
