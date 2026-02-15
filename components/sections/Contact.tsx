"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const glow = useMotionTemplate`
    radial-gradient(
      700px at ${smoothX}px ${smoothY}px,
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
      id="contact"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative py-40 overflow-hidden"
    >
      {/* Cinematic Lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      <Container>
        <div className="relative z-10 max-w-3xl mx-auto text-center">

          {/* Title (BACK TO ACCENT BLUE) */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold mb-8 text-accent tracking-tight"
          >
            Let’s Work Together
          </motion.h2>
          <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="h-px bg-accent/40 mx-auto mt-6"
            />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg mb-16"
          >
            Interested in collaborating, hiring, or discussing a project?
          </motion.p>

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
          >
            <div className="flex flex-wrap justify-center gap-10 text-lg">

              <ContactLink
                href="mailto:muhamadridwanbjm@gmail.com"
                icon={<FaEnvelope />}
                label="Email"
              />

              <ContactLink
                href="https://linkedin.com/in/muhammad-riduan-018890256"
                icon={<FaLinkedin />}
                label="LinkedIn"
                external
              />

              <ContactLink
                href="https://github.com/RduaneD"
                icon={<FaGithub />}
                label="GitHub"
                external
              />

              <ContactLink
                href="https://wa.me/6285849985763"
                icon={<FaWhatsapp />}
                label="WhatsApp"
                external
              />

            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

/* --------------------------------
   Reusable Contact Link
--------------------------------- */

function ContactLink({
  href,
  icon,
  label,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 text-slate-300 hover:text-accent transition duration-300"
    >
      <span className="text-xl">{icon}</span>
      {label}
    </motion.a>
  );
}
