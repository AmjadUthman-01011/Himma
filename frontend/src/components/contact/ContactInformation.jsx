import {
  Phone,
  Mail,
  Clock3,
  MapPin,
} from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    content: (
      <>
        +1 (555) EDU-HELP
      </>
    ),
  },
  {
    icon: Mail,
    title: "Email",
    content: (
      <span className="text-[#082b82]">
        registration@edumanage.edu
      </span>
    ),
  },
  {
    icon: Clock3,
    title: "Office Hours",
    content: (
      <>
        Monday - Friday
        <br />
        8:00 AM - 6:00 PM EST
      </>
    ),
  },
  {
    icon: MapPin,
    title: "Address",
    content: (
      <>
        123 Academic Plaza,
        <br />
        University City, ST 54321
      </>
    ),
  },
];

export default function ContactInformation() {
  return (
    <div className="rounded-sm border border-slate-300 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-7">
      <h2 className="text-[20px] font-semibold tracking-tight text-[#082b82]">
        Contact Information
      </h2>

      <p className="mt-2 text-[13px] leading-5 text-slate-600">
        Reach out to our admissions and support teams directly.
      </p>

      <div className="mt-7 space-y-5">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9edf8] text-[#082b82]">
                <Icon size={19} strokeWidth={1.8} />
              </div>

              <div className="pt-0.5">
                <h3 className="text-[13px] font-semibold tracking-wide text-slate-900">
                  {item.title}
                </h3>

                <div className="mt-0.5 text-[14px] leading-5 text-slate-600">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}