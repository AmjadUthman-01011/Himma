import {
  BookOpen,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";

const icons = {
  book: BookOpen,
  gpa: GraduationCap,
  attendance: CalendarCheck,
  test: ClipboardList,
};

export default function StatCard({
  title,
  value,
  icon,
  change,
  danger = false,
}) {
  const Icon = icons[icon];

  return (
    <div
      className="
        rounded-s
        border
        border-[#e0e3e5]
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <div className="flex items-center justify-between">

        <p className="font-[var(--font-inter)] text-sm font-semibold tracking-wide text-[#444651]">
          {title}
        </p>

      </div>


      <div className="mt-8 flex items-end justify-between">

        <span
          className={`
            font-[var(--font-jakarta)]
            text-4xl
            font-bold
            ${
              danger
                ? "text-[#ba1a1a]"
                : icon === "gpa"
                  ? "text-[#4e45d5]"
                  : "text-[#00236f]"
            }
          `}
        >
          {value}
        </span>


        <div className="flex items-center gap-2">

          {change && (
            <span className="rounded-full bg-[#e3dfff] px-2.5 py-1 text-xs font-semibold text-[#372abf]">
              {change}
            </span>
          )}

          <Icon
            size={25}
            strokeWidth={1.8}
            className={
              danger
                ? "text-[#ba1a1a]"
                : "text-[#00236f]"
            }
          />

        </div>

      </div>

    </div>
  );
}