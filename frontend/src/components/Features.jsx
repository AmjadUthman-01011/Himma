import {
  ClipboardList,
  GraduationCap,
  UserRound,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Centralized Administration",
    description:
      "Comprehensive tools for user provision, course catalog management, and institutional reporting. Maintain control with ease.",
    icon: ClipboardList,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Efficient Instruction",
    description:
      "Streamlined grading workflows, automated attendance tracking, and dynamic syllabus distribution to keep focus on teaching.",
    icon: GraduationCap,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Academic Success",
    description:
      "Clear progress tracking, instant access to course materials, and seamless communication with faculty. Empower students to excel.",
    icon: UserRound,
    color: "bg-blue-100 text-blue-700",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-16">

        {/* Section heading */}
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="text-[25px] font-bold tracking-tight text-slate-950">
            Built for Every Role
          </h2>

          <p className="mt-2 text-[13px] leading-5 text-slate-600">
            Tailored experiences ensuring efficiency and success
            across your entire institution.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title}>
                <div
                  className={`mb-4 flex h-8 w-8 items-center justify-center rounded-md ${feature.color}`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </div>

                <h3 className="text-[15px] font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 max-w-[340px] text-[11px] leading-[1.65] text-slate-500">
                  {feature.description}
                </p>

                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-[10px] font-medium text-[#173b94]"
                >
                  Learn more
                  <ArrowRight size={11} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}