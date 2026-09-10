import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function RegistrationCTA() {
  return (
    <div className="border border-border bg-card p-8 text-center md:p-12">
      <div className="cc-sticker mx-auto mb-4">SLOTS OPEN</div>
      <h2 className="font-display text-4xl font-black italic uppercase md:text-5xl">
        READY TO <span className="text-primary">COMPETE?</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
        Lock in your squad for the Chandigarh University qualifier before slots fill up.
      </p>
      <div className="mt-8 flex justify-center">
        <Link
          to="/register"
          className="cc-button-primary inline-flex items-center gap-2 px-8 py-3 no-underline"
        >
          <span>REGISTER SQUAD NOW</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}