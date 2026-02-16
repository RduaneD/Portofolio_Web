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
     Scroll Background
  -------------------------------- */

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --------------------------------
     Active Section Observer
  -------------------------------- */

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
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    links.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     Smooth Scroll Handler
  -------------------------------- */

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 70,
      behavior: "smooth",
    });
    setOpen(false);
  };

  /* --------------------------------
     JSX
  -------------------------------- */

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`
          fixed top-0 left-0 w-full z-50
          transition duration-300
          ${
            scrolled
              ? "bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-xl"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <button
            onClick={() => scrollTo("about")}
            className="text-xl font-bold tracking-wide text-accent hover:opacity-80 transition"
          >
            Riduan
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium relative">
            {links.map((link) => {
              const isActive = active === link.id;

              return (
                <motion.button
                  key={link.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollTo(link.id)}
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
                </motion.button>
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

        {/* Scroll Progress */}
        <motion.div
          className="h-[2px] bg-accent origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-slate-950/95 backdrop-blur border-t border-white/10"
            >
              <div className="flex flex-col items-center gap-8 py-10">
                {links.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-[80px]" />
    </>
  );
}
