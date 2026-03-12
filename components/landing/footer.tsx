"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/landing/animated-section";

export function Footer() {
  return (
    <AnimatedSection className="bg-black px-5 pb-16 pt-10 sm:px-8 lg:px-10">
      <div
        id="contact"
        className="mx-auto max-w-[1440px] overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]"
      >
        <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden px-8 py-16 sm:px-10">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="videos/hero-video-2.webm" />
            </video>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8 text-center">
            <p className="text-2xl font-semibold text-[#D2D2D2] sm:text-4xl">
              Let&apos;s see if we are a good fit
            </p>
            <a
              href="mailto:hello@xocontinental.com"
              className="inline-flex min-h-[96px] w-full max-w-5xl items-center justify-center rounded-full border-2 border-[#1C1C1C] bg-white/5 px-6 text-center text-2xl font-bold uppercase text-white backdrop-blur transition hover:shadow-[inset_0_0_45px_rgba(206,166,78,0.5)] sm:min-h-[118px] sm:text-5xl"
            >
              Let&apos;s collaborate
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-4"
        >
          <div className="bg-black p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">About us</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">X.O. Continental</h3>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Premium digital marketing, creative strategy, and performance growth systems.
            </p>
          </div>
          <div className="bg-black p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">Email</p>
            <a href="mailto:hello@xocontinental.com" className="mt-4 block text-lg text-white">
              hello@xocontinental.com
            </a>
          </div>
          <div className="bg-black p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">Phone</p>
            <p className="mt-4 text-lg text-white">+1 (212) 555-0199</p>
          </div>
          <div className="bg-black p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">Address</p>
            <p className="mt-4 text-lg text-white">New York, NY</p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
