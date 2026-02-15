"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const links = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  /* --------------------------------
     Scroll Background Effect
  --------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --------------------------------
     IntersectionObserver (Active Section)
  --------------------------------- */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    links.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        }}
        className={`
          fixed top-0 left-0 w-full z-50
          transition-colors duration-300
          ${
            scrolled
              ? "bg-slate-950/70 border-b border-white/10 shadow-xl"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-wide text-accent hover:opacity-80 transition"
          >
            Riduan
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium relative">
            {links.map((link) => {
              const isActive = active === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`
                    relative px-1 transition-colors
                    ${
                      isActive
                        ? "text-accent"
                        : "text-slate-300 hover:text-white"
                    }
                  `}
                >
                  {link.name}

                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute left-0 -bottom-2 h-[2px] w-full bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Scroll Progress Bar (NOW BELOW NAVBAR CONTENT) */}
        <motion.div
          className="h-[2px] bg-accent origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-950/95 backdrop-blur border-t border-white/10"
            >
              <div className="flex flex-col items-center gap-8 py-10">
                {links.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`
                      text-lg transition
                      ${
                        active === link.id
                          ? "text-accent"
                          : "text-slate-300 hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-[80px]" />
    </>
  );
}
