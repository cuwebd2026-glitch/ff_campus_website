import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/campus-cup/RegistrationForm";

export function Register() {
  const navigate = useNavigate();

  return (
    <main className="cc-site min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="pt-28 pb-16 px-5 md:px-10 lg:px-16 max-w-[1100px] mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-amber bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to previous page
        </button>

        <RegistrationForm />
      </div>

      <Footer />
    </main>
  );
}