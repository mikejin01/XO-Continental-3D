"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/components/landing/data";

const GLOW_DIRS = ["TOP", "LEFT", "BOTTOM", "RIGHT"] as const;
type GlowDir = (typeof GLOW_DIRS)[number];

const GLOW_GRADIENTS: Record<GlowDir, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, #CEA64E 0%, rgba(206,166,78,0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #CEA64E 0%, rgba(206,166,78,0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #CEA64E 0%, rgba(206,166,78,0) 100%)",
  RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, #CEA64E 0%, rgba(206,166,78,0) 100%)",
};
const GLOW_HOVER = "radial-gradient(75% 181.16% at 50% 50%, #CEA64E 0%, rgba(255,255,255,0) 100%)";

function GlowBorderLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [dir, setDir] = useState<GlowDir>("TOP");

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      setDir((prev) => {
        const idx = GLOW_DIRS.indexOf(prev);
        return GLOW_DIRS[(idx + 1) % GLOW_DIRS.length];
      });
    }, 1000);
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex w-fit cursor-pointer items-center justify-center overflow-visible rounded-full p-px transition duration-500 bg-black/20 hover:bg-black/10"
    >
      <div className="relative z-10 flex w-auto items-center gap-2 rounded-[inherit] px-4 py-2 font-semibold text-white">
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)", width: "100%", height: "100%" }}
        animate={{
          background: hovered
            ? [GLOW_GRADIENTS[dir], GLOW_HOVER]
            : GLOW_GRADIENTS[dir],
        }}
        transition={{ ease: "linear", duration: 1 }}
      />
      <div className="absolute inset-[2px] z-[1] rounded-[100px] bg-black" />
    </motion.a>
  );
}

function AnimatedNavLink({ label, href }: { label: string; href: string }) {
  const chars = label.split("");
  return (
    <motion.a
      className="relative block overflow-hidden font-semibold"
      href={href}
      initial="initial"
      whileHover="hovered"
    >
      <span className="relative block">
        <span className="block">
          {chars.map((ch, i) => (
            <motion.span
              key={`t-${i}`}
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ duration: 0.25, ease: "easeInOut", delay: 0.025 * i }}
              className="inline-block"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </span>
        <span className="absolute inset-0 block text-[#CEA64E]">
          {chars.map((ch, i) => (
            <motion.span
              key={`b-${i}`}
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ duration: 0.25, ease: "easeInOut", delay: 0.025 * i }}
              className="inline-block"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </span>
      </span>
    </motion.a>
  );
}

function ArrowButton() {
  return (
    <motion.div
      initial={false}
      whileHover={{
        x: [0, 20, -20, 0],
        y: [0, -20, 20, 0],
        transition: { duration: 0.25, times: [0, 0.5, 0.5001, 1], ease: "linear" },
      }}
    >
      <div className="flex items-center justify-center bg-[#CEA64E] rounded-full w-10 h-10 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" className="-rotate-45">
          <path d="M3.54297 8.49996H13.4596M13.4596 8.49996L8.5013 3.54163M13.4596 8.49996L8.5013 13.4583" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

function SmallLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="32" viewBox="0 0 38 32" fill="none">
      <path d="M1.28573 6.91186C-3.02736 18.8151 17.4925 31.0392 19.1785 31.9994V5.38369C15.3124 -1.66502 4.65778 -2.38708 1.28573 6.91186Z" fill="#CEA64E" />
      <path d="M37.0315 6.91243C33.6581 -2.38397 23.0048 -1.70393 19.1387 5.38426V32C20.8247 31.0398 41.3511 18.8156 37.0315 6.91243Z" fill="#B88D33" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="container mx-auto -mb-32 max-lg:-mb-0">
      <div className="z-[9999999] max-lg:fixed w-full max-sm:px-5">
        {/* Mobile overlay menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              style={{ height: "100vh" }}
              className="fixed top-0 left-0 pt-16 w-full bg-black/50 backdrop-blur-sm z-[999] flex flex-col px-5 max-lg:px-12 max-lg:pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between w-full">
                <a href="#top" className="group pb-10 text-lg font-bold text-white inline-flex items-center gap-2">
                  <img
                    src="images/XO-Logo.avif"
                    alt="XO Continental logo"
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] object-contain transition-transform duration-300 ease-out group-hover:rotate-90"
                  />
                  X.O. Continental
                </a>
                <span className="text-white w-8 -mr-1.5 -mt-0.5 cursor-pointer" onClick={() => setMobileOpen(false)}>
                  <svg className="w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M17 7L7 17M7 7L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <motion.div
                className="flex flex-col justify-start text-white text-xl w-full gap-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 10, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    className="hover:text-[#CEA64E] transition-all duration-300 relative font-bold text-2xl md:text-4xl lg:text-4xl"
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main wrapper — pt-24 creates height, logo + right controls sit at bottom */}
        <motion.div
          initial={{ top: -200 }}
          animate={{ top: 0 }}
          transition={{ duration: 2, type: "spring", stiffness: 100, damping: 20 }}
          className="container max-lg:fixed max-sm:w-[90%] max-lg:top-0 relative flex justify-center max-lg:justify-between items-center text-white z-[99] max-lg:mt-5 max-lg:bg-[#080808] max-lg:border max-lg:border-[#1C1C1C] max-lg:py-2.5 max-lg:rounded-full max-lg:px-5"
          style={{ paddingTop: 96 }}
        >
          {/* Logo — desktop: absolute bottom-left of the pt-24 wrapper */}
          <a
            href="#top"
            className="group lg:absolute left-0 bottom-3 z-[9999] max-lg:hidden text-lg font-bold tracking-[-0.04em] text-white inline-flex items-center gap-2"
          >
            <img
              src="images/XO-Logo.avif"
              alt="XO Continental logo"
              width={34}
              height={34}
              className="h-[34px] w-[34px] object-contain transition-transform duration-300 ease-out group-hover:rotate-90"
            />
            X.O. Continental
          </a>

          {/* Glass nav pill — fixed at viewport top:42 on desktop */}
          <motion.div
            className="glass-pill max-lg:hidden fixed flex items-center gap-10 rounded-full py-4 z-[999] overflow-hidden"
            initial={{ top: -200 }}
            animate={{
              paddingLeft: scrolled ? 85 : 42,
              paddingRight: scrolled ? 85 : 42,
              top: 42,
            }}
            transition={{
              duration: 0.3,
              ease: "easeIn",
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="relative">
              {/* Small logo — slides in from left on scroll */}
              <a href="#top" className="absolute -left-[70px] -top-1">
                <motion.div
                  animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : -5 }}
                  initial={false}
                  transition={{ duration: 0.3, delay: scrolled ? 0.2 : 0 }}
                >
                  <SmallLogo />
                </motion.div>
              </a>

              {/* Nav links */}
              <ul className="flex gap-10 justify-between">
                {navItems.map((item) => (
                  <li key={item.label} className="relative">
                    <AnimatedNavLink label={item.label} href={item.href} />
                  </li>
                ))}
              </ul>

              {/* Green arrow button — slides in from right on scroll */}
              <a href="#contact" className="absolute -right-20 -top-2.5 group transition-all duration-300 hover:cursor-pointer">
                <motion.div
                  initial={false}
                  animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 5 }}
                  transition={{ duration: 0.3, delay: scrolled ? 0.2 : 0 }}
                >
                  <ArrowButton />
                </motion.div>
              </a>
            </div>
          </motion.div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex justify-center">
            <button className="text-white py-2" onClick={() => setMobileOpen(true)}>
              <svg className="w-10 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M9 18H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right side — desktop: absolute bottom-right of wrapper */}
          <div className="flex items-center gap-4 flex-row-reverse max-lg:hidden absolute right-0 bottom-0 z-[999]">
            {/* Start a project — rotating glow border */}
            <GlowBorderLink href="#contact">Start a project</GlowBorderLink>

            {/* Language toggle */}
            <div className="glass-pill flex gap-2 items-center rounded-full py-2 px-3 relative">
              <div className="relative">
                <div
                  className="absolute -left-3 -top-1.5 bg-[#CEA64E] rounded-full"
                  style={{ width: 34, height: 28, transform: "translateX(11.5px) translateY(6px)" }}
                />
                <button className="text-sm px-2 py-1 rounded-full transition-all duration-300 cursor-pointer relative z-10 hover:text-white font-semibold text-white">
                  EN
                </button>
                <button className="text-sm px-2 py-1 rounded-full transition-all duration-300 cursor-pointer relative z-10 font-semibold text-white/50 hover:text-white">
                  中文
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
