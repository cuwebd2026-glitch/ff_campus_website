import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScheduleTimeline } from "@/components/campus-cup/ScheduleTimeline";

export function Schedule() {
  return (
    <main className="cc-site">
      <Header />
      <div className="pt-12">
        <ScheduleTimeline />
      </div>
      <Footer />
    </main>
  );
}
