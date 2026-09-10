import { CalendarDays, Check, Gamepad2, ShieldCheck, Swords, UserRoundCheck, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { GamingIcon, Reveal, SectionHeading } from "./common";

const overviewItems = [
  { icon: CalendarDays, code: "DATE", value: "14 SEPTEMBER 2026", note: "Confirmed event date" },
  { icon: UserRoundCheck, code: "ORGANIZER", value: "GFG COMMUNITY", note: "Chandigarh University" },
  { icon: UsersRound, code: "ELIGIBILITY", value: "TO BE CONFIRMED", note: "Awaiting organizer details" },
  { icon: Gamepad2, code: "TEAM INFO", value: "TO BE CONFIRMED", note: "Roster details pending" },
  { icon: Swords, code: "EVENT FORMAT", value: "TO BE CONFIRMED", note: "Match format pending" },
  { icon: ShieldCheck, code: "PARTICIPATION", value: "OFFICIAL BRIEF PENDING", note: "Check back for instructions" },
];

export function EventOverview() {
  return (
    <section className="cc-section cc-overview">
      <Reveal>
        <SectionHeading code="02 / QUALIFIER" title={<>YOUR CAMPUS.<br /><span>YOUR BATTLEGROUND.</span></>} side="CHANDIGARH UNIVERSITY" />
      </Reveal>
      <div className="cc-overview-grid">
        {overviewItems.map((item, i) => (
          <Reveal key={item.code} delay={i * 0.04} className={cn("cc-info-block", i < 2 && "confirmed")}>
            <GamingIcon icon={item.icon} label={item.code} />
            <div>
              <small>{item.code}</small>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </div>
            <span className="cc-info-index">0{i + 1}</span>
          </Reveal>
        ))}
      </div>
      <div className="cc-confirmed-key">
        <Check /> Confirmed information <span /> Unconfirmed fields are intentionally marked
      </div>
    </section>
  );
}