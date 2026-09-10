import { motion } from "motion/react";
import { Target, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading, Sticker } from "./common";

export function PrizeCard({ place, title, amount, featured = false }: { place: string; title: string; amount: string; featured?: boolean }) {
  return (
    <motion.div className={cn("cc-prize-card", featured && "featured")} whileHover={{ y: -6 }}>
      <span>{place}</span>
      {featured ? <Trophy /> : <Target />}
      <small>{title}</small>
      <strong>{amount}</strong>
      <p>Prize structure awaiting official confirmation</p>
    </motion.div>
  );
}

export function PrizeSection() {
  return (
    <section id="prizes" className="cc-section cc-prizes">
      <Reveal>
        <SectionHeading code="03 / PRIZES" title={<>CLAIM THE<br /><span>PODIUM.</span></>} side="CHAMPIONSHIP HIERARCHY" />
      </Reveal>
      <div className="cc-podium">
        <PrizeCard place="02" title="Runner-up" amount="TBA" />
        <PrizeCard place="01" title="Champion" amount="TBA" featured />
        <PrizeCard place="03" title="Finalist" amount="TBA" />
      </div>
      <Sticker tone="light" className="cc-prize-sticker">PLAY TO WIN</Sticker>
    </section>
  );
}