"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="text-center mb-24 relative">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          text-4xl md:text-5xl
          font-bold
          text-accent
          tracking-tight
        "
      >
        {title}
      </motion.h2>

      {/* Subtle divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="
          mx-auto mt-6
          h-px w-24
          bg-gradient-to-r
          from-transparent via-accent/60 to-transparent
          origin-center
        "
      />
    </div>
  );
}
