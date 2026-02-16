"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { Cpu, ShieldCheck, Layers } from "lucide-react";

/* --------------------------------
   HIGHLIGHTS — ENGINEERING IDENTITY
-------------------------------- */

const highlights = [
  {
    title: "Systems Architecture Mindset",
    desc: "Designed scalable backend infrastructures and distributed services that support real production usage.",
    icon: Cpu,
  },
  {
    title: "Reliability Engineering",
    desc: "Implemented validation layers, fault handling, and observability structures for resilient systems.",
    icon: ShieldCheck,
  },
  {
    title: "Maintainable by Design",
    desc: "Architected modular systems so future engineers can extend them without structural rewrites.",
    icon: Layers,
  },
];

/* --------------------------------
   STATS
-------------------------------- */

const stats = [
  { value: 8, label: "Systems Built" },
  { value: 15, label: "API Endpoints Designed" },
  { value: 3, label: "Production Deployments" },
];

/* --------------------------------
   SYSTEM LAYERS VISUAL
-------------------------------- */

const layers = [
  "Client Layer",
  "API Gateway",
  "Auth Service",
  "Business Logic",
  "Database Layer",
  "Cloud Infrastructure",
];

/* --------------------------------
   COMPONENT
-------------------------------- */

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  /* Mouse Glow */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const glow = useMotionTemplate`
    radial-gradient(
      700px at ${smoothX}px ${smoothY}px,
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
      id="about"
      onMouseMove={handleMouseMove}
      className="relative py-40 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      <motion.div style={{ scale }} className="relative z-10">
        <Container>
          <div className="max-w-6xl mx-auto">

            {/* TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-center text-accent mb-6"
            >
              About Me
            </motion.h2>

            <p className="text-center text-slate-400 text-lg mb-28 max-w-3xl mx-auto">
              I engineer production-grade systems designed to remain stable,
              scalable, and understandable — even as complexity grows.
            </p>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-24 items-center">

              {/* LEFT TEXT */}
              <div className="space-y-8 text-lg leading-relaxed text-slate-300">

                <Narrative>
                  I specialize in backend architecture, API systems, and cloud deployments. My work spans logistics optimization platforms, enterprise portals, and intelligent systems.
                </Narrative>

                <Narrative delay={0.1}>
                  I focus on designing software that survives real-world usage, not just controlled demo environments.
                </Narrative>

                <Narrative delay={0.2}>
                  Every system I build is structured for clarity, maintainability, and scalability so it can evolve safely as requirements change.
                </Narrative>

                <Narrative delay={0.3}>
                  I treat engineering as architecture design — not feature assembly.
                </Narrative>

              </div>

              {/* RIGHT STATS */}
              <div className="space-y-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ y: -8 }}
                    className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg"
                  >
                    <Counter target={stat.value} />
                    <div className="text-slate-400 text-sm uppercase mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* SYSTEM ARCHITECTURE VISUAL */}
            <div className="my-36">

              <h3 className="text-center text-xl font-semibold mb-12">
                System Architecture Perspective
              </h3>

              <div className="flex flex-col items-center gap-4">

                {layers.map((layer, i) => (
                  <motion.div
                    key={layer}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    animate={{
                      scale: activeLayer === i ? 1.05 : 1,
                      opacity: activeLayer === null || activeLayer === i ? 1 : 0.5,
                    }}
                    className="px-10 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md w-72 text-center"
                  >
                    {layer}
                  </motion.div>
                ))}

              </div>
            </div>

            {/* HIGHLIGHTS */}
            <div className="grid md:grid-cols-3 gap-12">

              {highlights.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-3xl border border-white/10 bg-white/5"
                  >
                    <Icon className="text-accent mb-4" size={26} />

                    <h3 className="font-semibold mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}

            </div>

          </div>
        </Container>
      </motion.div>
    </section>
  );
}

/* --------------------------------
   NARRATIVE
-------------------------------- */

function Narrative({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.p>
  );
}

/* --------------------------------
   COUNTER
-------------------------------- */

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(v) {
        setCount(Math.floor(v));
      },
    });

    return () => controls.stop();
  }, [target]);

  return <div className="text-4xl font-bold text-white">{count}+</div>;
}
