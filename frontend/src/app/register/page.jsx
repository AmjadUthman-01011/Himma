import Navbar from "@/components/Navbar";
import ContactHero from "@/components/Contact/ContactHero";
import ContactInformation from "@/components/Contact/ContactInformation";
import RegistrationForm from "../../components/contact/RegistrationForm";
import FAQ from "@/components/Contact/FAQ";
import ContactFooter from "@/components/Contact/ContactFooter";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <Navbar />

      <ContactHero />

      <section className="mx-auto max-w-[1200px] px-5 pb-10 sm:px-8 lg:pb-12">
        <div className="grid gap-6 lg:grid-cols-[375px_1fr]">
          <ContactInformation />
          <RegistrationForm />
        </div>

        <FAQ />
      </section>

      <ContactFooter />
    </main>
  );
}