import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { FireEmberCanvas } from "@/components/registration/FireEmberCanvas";

export function Register() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".reg-page-back", {
        opacity: 0,
        x: -25,
        duration: 0.6,
      }).from(
        ".reg-page-content",
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
          duration: 0.8,
        },
        "-=0.3",
      );
    },
    { scope: containerRef },
  );

  return (
    <main className="cc-site relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Free Fire Dynamic Ember Particles */}
      <FireEmberCanvas />

      <Header />

      <div
        ref={containerRef}
        className="relative z-20 pt-32 pb-20 px-4 md:px-8 max-w-[1100px] mx-auto"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="reg-page-back mb-8 inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-amber bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to previous page
        </button>

        <div className="reg-page-content">
          <RegistrationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Register;
