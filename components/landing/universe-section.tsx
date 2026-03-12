"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Matches original GSAP timeline: 0.4s rise + 0.8s expand + 4.2s hold = 5.4s total
// ScrollTrigger end: "+=5400", scrub: 3
const TOTAL = 5.4;
const P1 = 0.4 / TOTAL;
const P2 = 1.2 / TOTAL;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function UniverseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [animData, setAnimData] = useState<object | null>(null);
  const [ready, setReady] = useState(false);
  const dimsRef = useRef({ w: 1440, h: 900, mobile: false });

  useEffect(() => {
    fetch("/lottie-hero.json")
      .then((r) => r.json())
      .then(setAnimData);

    function measure() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimsRef.current = { w, h, mobile: w < 768 };
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothP = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.0005,
  });

  useMotionValueEvent(smoothP, "change", (p) => {
    const inner = innerRef.current;
    if (!inner) return;

    const { w, h, mobile } = dimsRef.current;
    const sw = mobile ? 500 : 1500;
    const sh = mobile ? 400 : 700;
    const eh = mobile ? h * 0.65 : h;

    let width: number;
    if (p <= P1) width = sw;
    else if (p >= P2) width = w;
    else width = lerp(sw, w, easeInOut((p - P1) / (P2 - P1)));

    let height: number;
    if (p <= P1) height = sh;
    else if (p >= P2) height = eh;
    else height = lerp(sh, eh, easeInOut((p - P1) / (P2 - P1)));

    let radius: number;
    if (p <= P1) radius = 20;
    else if (p >= P2) radius = 0;
    else radius = lerp(20, 0, easeInOut((p - P1) / (P2 - P1)));

    const startY = mobile ? sh * 0.22 : sh * 0.16;
    let yOff: number;
    if (p <= 0) yOff = startY;
    else if (p >= P1) yOff = 0;
    else yOff = lerp(startY, 0, easeInOut(p / P1));

    inner.style.width = `${width}px`;
    inner.style.height = `${height}px`;
    inner.style.borderRadius = `${radius}px`;
    inner.style.transform = `translateY(${yOff}px)`;

    // Text scale effect: matches container expansion
    // Container expands from sw -> w. Ratio = sw/w.
    // Text should scale from sw/w -> 1.
    const textEl = textRef.current;
    if (textEl) {
      // Calculate expansion progress t (0 to 1 during Phase 2)
      let t = 0;
      if (p <= P1) t = 0;
      else if (p >= P2) t = 1;
      else t = easeInOut((p - P1) / (P2 - P1));

      const startScale = sw / w;
      const currentScale = lerp(startScale, 1, t);
      
      textEl.style.transform = `scale(${currentScale})`;
      textEl.style.opacity = "1";
    }

    if (lottieRef.current && ready) {
      const totalFrames = lottieRef.current.getDuration(true) || 180;
      const frame = Math.max(0, Math.min(totalFrames - 1, Math.floor(p * (totalFrames - 1))));
      try {
        lottieRef.current.goToAndStop(frame, true);
      } catch {
        // player may not be ready yet
      }
    }
  });

  function handleLottieDOMLoaded() {
    try {
      const currentP = smoothP.get();
      const totalFrames = lottieRef.current?.getDuration(true) || 180;
      const frame = Math.max(0, Math.min(totalFrames - 1, Math.floor(currentP * (totalFrames - 1))));
      lottieRef.current?.goToAndStop(frame, true);
    } catch {
      // ignore
    }
    setReady(true);
  }

  return (
    <div ref={containerRef} style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          ref={innerRef}
          className="bg-black text-white overflow-hidden shadow-2xl relative transition-colors duration-500"
          style={{
            width: "1500px",
            height: "700px",
            borderRadius: "20px",
            transform: "translateY(110px)",
            maxWidth: "100vw",
            maxHeight: "100vh",
            willChange: "width, height, border-radius, transform",
          }}
        >
          {/* Lottie animation — fills container, scrubs with scroll */}
          {animData && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animData}
                  autoplay={false}
                  loop={false}
                  onDOMLoaded={handleLottieDOMLoaded}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                    progressiveLoad: true,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "2000px",
                    maxHeight: "2000px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Custom text overlay — replaces Lottie's baked-in text */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div
              ref={textRef}
              className="text-center px-6"
              style={{ willChange: "transform" }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
                #1 Digital Marketing Agency
                <br />
                in New York
              </h2>
              <p className="mt-5 text-base md:text-xl lg:text-2xl font-medium text-white/50 tracking-wide">
                X.O. Continental Marketing &amp; Branding CO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
