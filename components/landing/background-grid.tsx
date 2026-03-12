export function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-35"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(206,166,78,0.22),transparent_30%),radial-gradient(circle_at_30%_35%,rgba(184,141,51,0.16),transparent_24%),radial-gradient(circle_at_75%_28%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute inset-y-0 left-[10%] w-px bg-white/8" />
      <div className="absolute inset-y-0 left-[32%] w-px bg-white/8" />
      <div className="absolute inset-y-0 left-[58%] w-px bg-white/8" />
      <div className="absolute inset-y-0 left-[82%] w-px bg-white/8" />
      <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-[#CEA64E]/15 blur-3xl" />
      <div className="absolute bottom-20 right-[-6rem] h-72 w-72 rounded-full bg-[#B88D33]/10 blur-3xl" />
    </div>
  );
}
