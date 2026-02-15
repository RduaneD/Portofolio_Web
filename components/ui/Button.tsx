"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="
        relative inline-flex items-center justify-center
        px-8 py-4 rounded-2xl font-semibold
        text-black
        bg-accent
        overflow-hidden
        transition
      "
    >
      {/* Glow */}
      <span
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.5),transparent_70%)]
          opacity-0 hover:opacity-100
          transition duration-300
        "
      />

      {/* Border highlight */}
      <span
        className="
          absolute inset-0 rounded-2xl
          ring-1 ring-white/20
        "
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
