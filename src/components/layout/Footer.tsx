import { X } from "lucide-react";
import { LogoSlot } from "@/components/campus-cup/common";

export function Footer() {
  return (
    <footer className="cc-footer">
      <div>
        <div className="cc-footer-brand">
          <strong>
            CC<span>S2</span>
          </strong>
          <p>
            Campus Cup Season 2<br />
            Chandigarh University College Qualifier
          </p>
        </div>
        <div className="cc-footer-logos">
          <LogoSlot label="GFG COMMUNITY" path="/branding/gfg-logo.png" />
          <X />
          <LogoSlot label="CHANDIGARH UNIVERSITY" path="/branding/cu-logo.png" />
        </div>
      </div>
      <div className="cc-footer-base">
        <span>ORGANIZED BY GFG COMMUNITY, CHANDIGARH UNIVERSITY</span>
        <span>14 SEPTEMBER 2026</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
