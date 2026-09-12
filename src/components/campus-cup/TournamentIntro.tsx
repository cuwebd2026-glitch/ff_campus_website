import { MapPin, Trophy, Zap } from "lucide-react";
import { GamingIcon, Reveal, SectionHeading, TournamentBadge, TournamentStats } from "./common";

export function TournamentIntro() {
  return (
    <section id="tournament" className="cc-section cc-intro">
      <Reveal>
        <SectionHeading
          code="01 / TOURNAMENT"
          title={
            <>
              ONE CUP.
              <br />
              <span>TWO BATTLEGROUNDS.</span>
            </>
          }
          side="THE ROAD TO COMPETITION"
        />
      </Reveal>
      <div className="cc-intro-map">
        <Reveal className="cc-intro-level national">
          <div className="cc-level-number">01</div>
          <div>
            <TournamentBadge>NATIONAL TOURNAMENT</TournamentBadge>
            <h3>The bigger arena</h3>
            <p>
              Campus Cup Season 2 brings collegiate competitors into a wider national tournament
              journey.
            </p>
          </div>
          <GamingIcon icon={Trophy} label="National tournament" />
        </Reveal>
        <div className="cc-route-line">
          <span />
          <Zap />
          <span />
        </div>
        <Reveal className="cc-intro-level campus" delay={0.15}>
          <div className="cc-level-number">02</div>
          <div>
            <TournamentBadge>CU COLLEGE QUALIFIER</TournamentBadge>
            <h3>This is our drop zone</h3>
            <p>
              The Chandigarh University event is a distinct college qualifier, organized locally by
              GFG Community at CU.
            </p>
          </div>
          <GamingIcon icon={MapPin} label="College qualifier" />
        </Reveal>
      </div>
      <TournamentStats />
    </section>
  );
}
