import { CircleHelp } from "lucide-react";

const faqs = [
  {
    question: "How long does verification take?",
    answer:
      "Institutional verification typically takes 2-3 business days after all required documentation has been submitted and reviewed by our onboarding team.",
  },
  {
    question: "What documents are required?",
    answer:
      "We require a formal letter of intent on institution letterhead, proof of accreditation, and primary contact authorization forms.",
  },
  {
    question: "Can we migrate existing data?",
    answer:
      "Yes, our data integration specialists provide secure migration tools for most major legacy Student Information Systems (SIS).",
  },
  {
    question: "Is training provided?",
    answer:
      "Comprehensive digital training modules and dedicated onboarding webinars are included with all tier-one institutional registrations.",
  },
];

export default function FAQ() {
  return (
    <section className="mt-8 rounded-sm border border-slate-300 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-7">

      <h2 className="text-[20px] font-semibold tracking-tight text-[#082b82]">
        Frequently Asked Questions
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-lg border border-slate-200 bg-[#f7f9fc] p-4"
          >
            <div className="flex gap-3">
              <CircleHelp
                size={19}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#082b82]"
              />

              <div>
                <h3 className="text-[13px] font-semibold tracking-wide text-slate-900">
                  {faq.question}
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-slate-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}