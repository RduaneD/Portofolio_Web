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
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

/* --------------------------------
   COMPONENT
--------------------------------- */

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  /* mouse glow */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const glow = useMotionTemplate`
    radial-gradient(
      800px at ${smoothX}px ${smoothY}px,
      rgba(59,130,246,0.09),
      transparent 60%
    )
  `;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* copy email */

  const copyEmail = async () => {
    await navigator.clipboard.writeText("muhamadridwanbjm@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      onMouseMove={handleMove}
      className="relative py-40 overflow-hidden"
    >
      {/* glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center relative z-10">

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-accent"
          >
            Let’s Build Something Great
          </motion.h2>

          {/* availability */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for projects & roles
          </motion.div>

          {/* SUBTITLE */}
          <p className="text-slate-400 text-lg mb-16">
            Open for collaborations, engineering roles, or technical discussions.
          </p>

          {/* MAIN CONTACT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
          >
            {/* PRIMARY EMAIL */}
            <div className="mb-12">

              <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider">
                Primary Contact
              </p>

              <div className="flex flex-col items-center gap-5">

                <a
                  href="mailto:muhamadridwanbjm@gmail.com"
                  className="text-xl font-semibold text-white hover:text-accent transition"
                >
                  muhamadridwanbjm@gmail.com
                </a>

                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                  {copied ? "Copied!" : "Copy email"}
                </button>

                <p className="text-xs text-slate-500">
                  Typical response time: &lt; 24 hours
                </p>

              </div>
            </div>

            {/* CHANNELS */}
            <div className="flex flex-wrap justify-center gap-10">

              <ContactLink
                href="https://linkedin.com/in/muhammad-riduan-018890256"
                icon={<FaLinkedin />}
                label="LinkedIn"
              />

              <ContactLink
                href="https://github.com/RduaneD"
                icon={<FaGithub />}
                label="GitHub"
              />

              <ContactLink
                href="https://wa.me/6285849985763"
                icon={<FaWhatsapp />}
                label="WhatsApp"
              />

            </div>

            {/* FOOTER TRUST */}
            <div className="mt-14 text-xs text-slate-500">
              Prefer structured communication? Email is recommended for project discussions.
            </div>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------
   CONTACT LINK
--------------------------------- */

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 text-slate-400 hover:text-accent transition"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </motion.a>
  );
}
