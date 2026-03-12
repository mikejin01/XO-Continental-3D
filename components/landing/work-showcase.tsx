"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/landing/animated-section";
import { workCards } from "@/components/landing/data";

export function WorkShowcase() {
  return (
    <AnimatedSection className="bg-black px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]" id="work">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
            Our work
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
            Our work, your successful story
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
            >
              <div className="relative h-full min-h-[22rem] w-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={card.mediaSrc} />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
              </div>

              <div className="relative z-10 -mt-24 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  {card.outcome}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {card.copy}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
