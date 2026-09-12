import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrizeSection } from "@/components/campus-cup/PrizeSection";

export function Prizes() {
  return (
    <main className="cc-site">
      <Header />
      <div className="pt-12">
        <PrizeSection />
      </div>
      <Footer />
    </main>
  );
}
