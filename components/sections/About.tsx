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

/* ------------------------------
   Data
--------------------------------*/

const highlights = [
  {
    title: "System Thinking",
    desc: "Designing software as interconnected components, not isolated features.",
    icon: Cpu,
  },
  {
    title: "Reliability First",
    desc: "Every architectural decision anticipates failure, recovery, and observability.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Maintainability",
    desc: "Code should remain understandable months later — even under pressure.",
    icon: Layers,
  },
];

const stats = [
  { value: 12, label: "Projects Engineered" },
  { value: 6, label: "Systems Deployed" },
  { value: 3, label: "Cloud Environments" },
];

/* ------------------------------
   Main Component
--------------------------------*/

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

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
      600px at ${smoothX}px ${smoothY}px,
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
      id="about"
      className="relative py-40 overflow-hidden"
    >
      {/* Reactive Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      <motion.div style={{ scale }} className="relative z-10">
        <Container>
          <div className="max-w-6xl mx-auto">

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-center mb-6 text-accent"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="h-px bg-accent/40 mx-auto mt-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center text-slate-400 text-lg mb-24 max-w-3xl mx-auto"
            >
              I don’t just build features — I engineer systems that remain stable as complexity grows.
            </motion.p>

            {/* Narrative Grid */}
            <div className="grid md:grid-cols-2 gap-24 items-center">

              {/* LEFT — STORY */}
              <div className="space-y-8 text-lg leading-relaxed text-slate-300">
                <Narrative delay={0}>
                  I specialize in backend architecture, secure APIs, and cloud-native infrastructure.
                </Narrative>

                <Narrative delay={0.1}>
                  My focus is ensuring software survives real usage — not just ideal conditions.
                </Narrative>

                <Narrative delay={0.2}>
                  Performance, scalability, and operational clarity guide every technical decision I make.
                </Narrative>
              </div>

              {/* RIGHT — STATS */}
              <div className="space-y-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ y: -8 }}
                    className="relative p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg hover:border-accent transition duration-300"
                  >
                    <Counter target={stat.value} />
                    <div className="text-slate-400 text-sm uppercase tracking-wider mt-2">
                      {stat.label}
                    </div>

                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition duration-500" />
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-32" />

            {/* Principles */}
            <div className="grid md:grid-cols-3 gap-12">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent transition duration-300"
                  >
                    {/* Icon */}
                    <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
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

/* ------------------------------
   Narrative Paragraph
--------------------------------*/

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
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.p>
  );
}

/* ------------------------------
   Counter
--------------------------------*/

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.3,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [target]);

  return <div className="text-4xl font-bold text-white">{count}+</div>;
}
