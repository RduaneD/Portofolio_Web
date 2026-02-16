"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDownRight, Sparkles, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Container from "@/components/ui/Container";

const roles = [
  "Full-Stack Engineer",
  "Backend Specialist",
  "Cloud Architect",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  /* Scroll Motion */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  /* Role Cycle */
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % roles.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  /* Mouse Physics */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(smoothY, [-200, 200], [7, -7]);
  const rotateY = useTransform(smoothX, [-200, 200], [-7, 7]);

  /* Spotlight */
  const glow = useMotionTemplate`
    radial-gradient(
      700px at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.15),
      transparent 70%
    )
  `;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  /* Magnetic Button */
  function magnetic(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }

  function reset(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.transform = "translate(0,0)";
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient Glow */}
      <motion.div
        style={{ background: glow }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Floating Gradient Background */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_60%)]"
      />

      {/* Content */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 w-full"
      >
        <Container>
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <div className="text-center md:text-left">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full
                  border border-blue-400/20
                  bg-blue-500/10
                  px-5 py-2 text-sm text-blue-300 backdrop-blur-md"
              >
                <Sparkles size={14} />
                Open to opportunities
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6
                bg-gradient-to-b from-blue-400 to-white
                bg-clip-text text-transparent"
              >
                Muhammad Riduan
              </motion.h1>

              {/* Roles */}
              <div className="h-10 mb-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={roles[index]}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                    transition={{ duration: 0.7 }}
                    className="absolute w-full text-xl md:text-2xl font-medium text-blue-400"
                  >
                    {roles[index]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 text-lg leading-relaxed max-w-xl"
              >
                I architect scalable backend systems and cloud-native platforms
                engineered for reliability, performance, and production-grade
                deployment.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex flex-wrap gap-6 justify-center md:justify-start"
              >
                <a
                  href="#projects"
                  onMouseMove={magnetic}
                  onMouseLeave={reset}
                  className="group inline-flex items-center gap-2
                    bg-blue-500 hover:bg-blue-400
                    text-white font-semibold
                    px-8 py-4 rounded-2xl transition"
                >
                  View Projects
                  <ArrowDownRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                  />
                </a>

                <motion.a
                  href="/cv/Muhammad_Riduan_CV.pdf"
                  download
                  whileHover={{ y: -3 }}
                  className="inline-flex items-center gap-2
                    px-8 py-4 rounded-2xl
                    border border-blue-400/30
                    text-blue-300
                    hover:border-blue-400
                    hover:text-blue-400
                    transition backdrop-blur"
                >
                  <Download size={18} />
                  Download CV
                </motion.a>
              </motion.div>
            </div>

            {/* RIGHT IMAGE */}
            <motion.div
              style={{ rotateX, rotateY }}
              className="flex justify-center perspective-[1200px]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative w-80 h-80 md:w-[440px] md:h-[440px]"
              >
                {/* glow */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

                <Image
                  src="/images/profile.png"
                  alt="Muhammad Riduan"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_80px_rgba(59,130,246,0.35)]"
                />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </motion.div>
    </section>
  );
}
