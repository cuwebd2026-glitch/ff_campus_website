import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/campus-cup/FAQAccordion";

export function Faq() {
  return (
    <main className="cc-site">
      <Header />
      <div className="pt-12">
        <FAQAccordion />
      </div>
      <Footer />
    </main>
  );
}
