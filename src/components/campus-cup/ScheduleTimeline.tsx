import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./common";

const stages = [
  ["01", "REGISTRATION", "Details pending", "Registration opening and closing times to be confirmed."],
  ["02", "CHECK-IN", "14 Sep · Time TBA", "Team verification and lobby reporting instructions pending."],
  ["03", "QUALIFIER", "14 Sep 2026", "Chandigarh University College Qualifier."],
  ["04", "RESULTS", "Time TBA", "Result announcement and progression details pending."],
] as const;

export function ScheduleTimeline() {
  return (
    <section id="schedule" className="cc-section cc-schedule">
      <Reveal>
        <SectionHeading code="05 / SCHEDULE" title={<>FROM ENTRY<br /><span>TO FINAL ZONE.</span></>} side="14 SEPTEMBER 2026" />
      </Reveal>
      <div className="cc-timeline">
        {stages.map(([n, title, time, text], i) => (
          <Reveal key={n} className={cn("cc-stage", i === 2 && "active")} delay={i * 0.08}>
            <div className="cc-stage-marker"><span>{n}</span></div>
            <div>
              <small>STAGE {n}</small>
              <h3>{title}</h3>
              <strong>{time}</strong>
              <p>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}