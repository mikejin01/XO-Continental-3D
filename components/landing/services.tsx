"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/landing/animated-section";
import { serviceCards } from "@/components/landing/data";
import { cn } from "@/lib/utils";

const serviceImageBackgrounds: Record<string, string> = {
  "Product Design": "/images/product-design.avif",
  "UX/UI Design": "/images/ux-ui-design.avif",
  "Video Editing": "/images/video-editing.avif",
};

export function Services() {
  return (
    <AnimatedSection className="bg-black px-5 py-28 sm:px-8 lg:px-10" delay={0.05}>
      <div className="mx-auto max-w-[1440px]" id="services">
        <div className="mb-7 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[clamp(38px,4.6vw,72px)] font-bold leading-[0.95] tracking-[-0.04em] text-transparent bg-gradient-to-r from-[#CEA64E] via-[#F6E9C6] to-[#CEA64E] bg-clip-text">
            Our Services
          </h2>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CEA64E]/40 px-6 py-3.5 text-sm text-white shadow-[0_0_24px_rgba(206,166,78,0.25)] transition hover:-translate-y-0.5"
          >
            Learn more ↗
          </a>
        </div>

        <div className="grid overflow-hidden border border-white/12 bg-[#020202] lg:grid-cols-[1.03fr_1fr_1fr] lg:[grid-template-areas:'product_uxui_uxui''mobile_dev_video']">
          {serviceCards.map((card, index) => {
            const imageBackgroundSrc = serviceImageBackgrounds[card.title];

            return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={cn(
                "group relative min-h-[320px] overflow-hidden border-b border-r border-white/12 bg-[#020202]",
                card.size === "large" && "lg:min-h-[420px] lg:[grid-area:product]",
                card.size === "wide" && "lg:min-h-[420px] lg:[grid-area:uxui]",
                card.title === "Mobile Applications" && "lg:[grid-area:mobile]",
                card.title === "Development" && "lg:[grid-area:dev]",
                card.title === "Video Editing" && "lg:[grid-area:video]",
                index === serviceCards.length - 1 && "border-r-0",
                index === 1 && "lg:border-r-0"
              )}
            >
              <div className="absolute inset-0">
                {imageBackgroundSrc ? (
                  <img
                    src={imageBackgroundSrc}
                    alt=""
                    className="h-full w-full object-cover transition-all duration-500 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover transition-all duration-500 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(event) => {
                      void event.currentTarget.play().catch(() => {});
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.pause();
                      // Optional: reset video to start
                      // event.currentTarget.currentTime = 0;
                    }}
                  >
                    <source src={card.mediaSrc} type="video/mp4" />
                  </video>
                )}
                {/* Overlay gradient — darker when inactive to make text pop, lighter on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition duration-500 group-hover:opacity-40" />
              </div>

              <div className="absolute left-4 top-4 z-20 h-[11px] w-[11px] rounded-full border border-white/90 transition group-hover:bg-white" />

              <div className="relative z-20 flex h-full flex-col justify-end p-7">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-[clamp(28px,2.5vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white/75 transition duration-300 group-hover:-translate-y-14 group-hover:bg-gradient-to-r group-hover:from-[#CEA64E] group-hover:via-[#F6E9C6] group-hover:to-[#CEA64E] group-hover:bg-clip-text group-hover:text-transparent">
                      {card.title}
                  </h3>
                  <span className="translate-y-3 text-[26px] leading-none text-transparent transition duration-300 group-hover:-translate-y-14 group-hover:text-white">
                      ↗
                  </span>
                </div>
                <p className="mt-4 max-w-[90%] text-[15px] leading-[1.45] text-white/0 transition duration-300 group-hover:-translate-y-4 group-hover:text-white/90">
                  {card.description}
                </p>
              </div>
            </motion.article>
          );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
