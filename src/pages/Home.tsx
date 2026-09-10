import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/campus-cup/Hero";
import { TournamentIntro } from "@/components/campus-cup/TournamentIntro";
import { EventOverview } from "@/components/campus-cup/EventOverview";
import { PrizeSection } from "@/components/campus-cup/PrizeSection";
import { RulesSection } from "@/components/campus-cup/RulesSection";
import { ScheduleTimeline } from "@/components/campus-cup/ScheduleTimeline";
import { FAQAccordion } from "@/components/campus-cup/FAQAccordion";
import { RegistrationCTA } from "@/components/campus-cup/RegistrationCTA";

export function Home() {
  return (
    <main className="cc-site">
      <Header />
      <Hero />
      <TournamentIntro />
      <EventOverview />
      <PrizeSection />
      <RulesSection />
      <ScheduleTimeline />
      <FAQAccordion />
      <RegistrationCTA />
      <Footer />
    </main>
  );
}