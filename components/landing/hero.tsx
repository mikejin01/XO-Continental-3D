"use client";

import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';

const TITLE = "X.O. Continental";

function ArrowSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className="-rotate-45"
    >
      <path
        d="M3.54297 8.49996H13.4596M13.4596 8.49996L8.5013 3.54163M13.4596 8.49996L8.5013 13.4583"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimatedTitle() {
  const words = TITLE.split(" ");
  const nonSpaceChars = TITLE.replace(/ /g, "");
  const total = nonSpaceChars.length;

  let charIdx = 0;

  return (
    <h1
      className="break-normal font-bold text-center lg:text-left max-sm:text-[72px] max-xl:text-[96px] xl:text-[118px] 2xl:text-[128px] bg-clip-text text-transparent max-sm:leading-[1.05] leading-[0.95] tracking-[-0.05em]"
      aria-label={TITLE}
    >
      <span aria-hidden="true">
        {words.map((word, wIdx) => {
          const wordStart = charIdx;
          charIdx += word.length;
          return (
            <span key={wIdx}>
              {wIdx > 0 && <span>&nbsp;</span>}
              <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {word.split("").map((char, cIdx) => {
                  const globalIdx = wordStart + cIdx;
                  const bgPos = `${(globalIdx / (total - 1)) * 100}% 0%`;
                  return (
                    <motion.span
                      key={cIdx}
                      className="bg-gradient-to-r from-[#CEA64E] via-[#F6E9C6] to-[#CEA64E] bg-clip-text text-transparent"
                      style={{
                        display: "inline-block",
                        backgroundSize: "1400% 100%",
                        backgroundPosition: bgPos,
                      }}
                      initial={{ opacity: 0, filter: "blur(20px)", y: "5%" }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: "0%" }}
                      transition={{
                        delay: 0.3 + globalIdx * 0.04,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            </span>
          );
        })}
      </span>
    </h1>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="bg-black relative py-20 max-lg:py-0 max-lg:pt-0 max-sm:px-5 max-lg:h-[80vh] max-sm:h-screen max-sm:pt-36 overflow-hidden"
    >
      <div className="bg-[#CEA64E]/10 max-sm:bg-[#CEA64E]/15 w-96 h-96 absolute -left-72 -top-20 z-30 rounded-full blur-3xl" />
      <div className="bg-[#CEA64E]/10 max-sm:bg-[#CEA64E]/15 w-96 h-96 absolute -right-72 top-20 z-30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t h-[300px] from-black via-black/50 max-sm:via-black/20 to-transparent z-20" />
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b h-[400px] from-black via-black/50 to-transparent z-20" />
      <div className="absolute inset-y-0 left-0 w-full lg:w-[42%] bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 pointer-events-none" />

      <div className="flex flex-col items-center h-[85vh] max-lg:h-[65vh] max-sm:max-h-[100vh] container mx-auto gap-2 relative">
        <div className="absolute h-full top-0 left-0 w-full z-10 max-sm:h-screen max-sm:opacity-70">
          <svg
            width="100%"
            height="100%"
            className="absolute left-1/2 -translate-x-1/2 opacity-10 max-lg:h-screen max-sm:w-[150vw]"
          >
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
            <line x1="35%" y1="0" x2="35%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
            <line x1="65%" y1="0" x2="65%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
            <line x1="5%" y1="0" x2="5%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
            <line x1="95%" y1="0" x2="95%" y2="100%" stroke="rgba(255, 255, 255, 0.80)" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-20 flex h-full w-full items-center max-lg:justify-center">
          <div className="flex max-lg:mt-60 flex-col justify-center items-center lg:items-start mt-40 max-sm:mt-0 w-full max-w-[760px] lg:ml-[11%] xl:ml-[12%]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-[#ECF1F1] text-2xl xl:text-3xl font-semibold text-center lg:text-left"
          >
            #1 Digital Marketing Agency in New York
          </motion.span>

          <AnimatedTitle />

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-[#C6C6C6] text-xl max-sm:text-base max-xl:text-lg max-w-[42rem] mt-5 text-center lg:text-left"
          >
            X.O. Continental crafts exceptional digital experiences that transform
            brands and captivate audiences. We&apos;re the strategic partner that
            brings your vision to life.
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="max-sm:w-full lg:self-start"
          >
            <a href="#contact" className="max-sm:w-full">
              <motion.div
                className="h-fit relative group cursor-pointer w-fit mt-10 max-sm:w-full"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <div className="absolute inset-0 pointer-events-none bg-[#9C7425] rounded-full z-10 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse" />
                <div className="bg-gradient-to-r pointer-events-none from-[#9C7425] via-[#9C7425] to-[#9C7425]/45 group-hover:to-[#9C7425] transition-all w-full h-full absolute duration-500 top-0 left-0 rounded-full z-10 blur-sm group-hover:animate-pulse" />
                <div className="p-[2px] rounded-full relative overflow-hidden max-sm:w-full">
                  <div className="bg-gradient-to-r from-[#9C7425] via-transparent to-transparent group-hover:via-[#9C7425] group-hover:to-[#9C7425] transition-all duration-500 ease-out absolute top-0 left-0 w-full h-full rounded-full" />
                  <div className="flex items-center justify-center gap-2 bg-[#0D0F0C] max-sm:py-3.5 rounded-full px-10 py-3 relative z-20 overflow-hidden text-white max-sm:w-full">
                    Start a project
                    <div className="w-4 -ml-1 -mr-1.5 h-4 relative flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        variants={{
                          rest: { x: 0, y: 0 },
                          hover: {
                            x: "110%",
                            y: "-110%",
                            transition: { duration: 0.25, ease: "easeInOut" },
                          },
                        }}
                      >
                        <ArrowSvg />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        variants={{
                          rest: { x: "-110%", y: "110%" },
                          hover: {
                            x: 0,
                            y: 0,
                            transition: { duration: 0.25, ease: "easeInOut" },
                          },
                        }}
                      >
                        <ArrowSvg />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>
          </motion.div>
        </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 w-full h-full">
         <Spline
           className="absolute inset-0 z-0 w-full h-full opacity-75 pointer-events-none"
           scene="https://prod.spline.design/MVm7FpzEmMaOGMKy/scene.splinecode"
         />
         <Spline
           className="relative z-10 w-full h-full scale-[1.12] translate-y-[8%] lg:translate-x-[16%] lg:translate-y-[12%] lg:scale-[1.2]"
          scene="https://prod.spline.design/KLyBMr0IaEtKfBe9/scene.splinecode?v=2"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 z-[5] pointer-events-none" />
      </div>
    </section>
  );
}
