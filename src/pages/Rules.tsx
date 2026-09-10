import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RulesSection } from "@/components/campus-cup/RulesSection";

export function Rules() {
  return (
    <main className="cc-site">
      <Header />
      <div className="pt-12">
        <RulesSection />
      </div>
      <Footer />
    </main>
  );
}