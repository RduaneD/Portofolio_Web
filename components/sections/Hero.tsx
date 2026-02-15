"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
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
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(springY, [-200, 200], [6, -6]);
  const rotateY = useTransform(springX, [-200, 200], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - bounds.left - bounds.width / 2);
    mouseY.set(e.clientY - bounds.top - bounds.height / 2);
  };

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = `translate(0px, 0px)`;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Scroll Glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.15),transparent_50%)]"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
        style={{ scale }}
        className="relative z-10 w-full"
      >
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div className="text-center md:text-left">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full
                  border border-blue-400/20
                  bg-blue-500/10
                  px-5 py-2 text-sm
                  text-blue-300
                  backdrop-blur-md"
              >
                <Sparkles size={14} />
                Open to opportunities
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
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
                transition={{ delay: 0.7 }}
                className="mt-12 flex flex-wrap gap-6 justify-center md:justify-start"
              >
                {/* Primary */}
                <a
                  ref={buttonRef}
                  href="#projects"
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
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

                {/* Download CV */}
                <motion.a
                  href="/cv/Muhammad_Riduan_CV.pdf"
                  download
                  whileHover={{ y: -2 }}
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

                {/* Contact */}
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-2xl
                    text-slate-400
                    hover:text-white transition"
                >
                  Contact Me
                </a>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="h-px bg-accent/40 mx-auto mt-6"
            />
            </div>

            {/* RIGHT */}
            <motion.div
              style={{ rotateX, rotateY }}
              className="flex justify-center perspective-1000"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-80 h-80 md:w-[420px] md:h-[420px]"
              >
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl" />

                <Image
                  src="/images/profile.png"
                  alt="Muhammad Riduan"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </motion.div>
    </section>
  );
}
