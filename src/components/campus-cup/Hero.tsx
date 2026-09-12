import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Crosshair } from "lucide-react";
import { PrimaryButton, SecondaryButton, Sticker, TournamentBadge } from "./common";

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const artworkY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 70]);

  return (
    <section id="top" className="cc-hero">
      <div className="cc-hero-grid" aria-hidden="true" />
      <motion.div className="cc-hero-art" style={{ y: artworkY }}>
        <div className="cc-art-corner tl" />
        <div className="cc-art-corner br" />
        <Crosshair />
        <strong>HERO ARTWORK</strong>
        <span>
          OFFICIAL VISUAL
          <br />
          PLACEHOLDER
        </span>
        <small>/branding/campus-cup-logo.png</small>
      </motion.div>
      <div className="cc-hero-copy">
        <motion.div className="cc-hero-kicker cc-enter-one">
          <span>CU QUALIFIER</span>
          <i />
          14·09·26
        </motion.div>
        <motion.h1 className="cc-enter-two">
          <span>CAMPUS</span>
          <span>
            CUP <em>S2</em>
          </span>
        </motion.h1>
        <motion.div className="cc-hero-sub cc-enter-three">
          <p>
            Chandigarh University
            <br />
            <strong>College Qualifier</strong>
          </p>
          <div>
            <span>Organized by</span>GFG Community
            <br />
            Chandigarh University
          </div>
        </motion.div>
        <motion.div className="cc-hero-actions cc-enter-four">
          <PrimaryButton />
          <SecondaryButton />
        </motion.div>
      </div>
      <div className="cc-hero-date">
        <span>14</span>
        <div>
          SEPTEMBER<strong>2026</strong>
        </div>
      </div>
      <Sticker className="cc-hero-sticker">BATTLE READY</Sticker>
      <div className="cc-hero-badges">
        <TournamentBadge index="01">College qualifier</TournamentBadge>
        <TournamentBadge index="02">Season two</TournamentBadge>
      </div>
      <div className="cc-scroll-cue">
        <span>SCROLL TO ENTER</span>
        <i />
      </div>
    </section>
  );
}
