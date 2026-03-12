import { BackgroundGrid } from "@/components/landing/background-grid";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { UniverseSection } from "@/components/landing/universe-section";
import { WorkShowcase } from "@/components/landing/work-showcase";

export default function Home() {
  return (
    // overflow-hidden must NOT be on any ancestor of UniverseSection —
    // it would break position:sticky. Each section manages its own overflow.
    <main className="relative min-h-screen bg-background text-foreground">
      <BackgroundGrid />
      <div className="relative z-10">
        <Header />
        <Hero />
        <UniverseSection />
        <Services />
        <WorkShowcase />
        <Footer />
      </div>
    </main>
  );
}
