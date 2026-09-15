import {
  MoreVertical,
  UserRound,
} from "lucide-react";

export default function CourseCard({
  code,
  title,
  teacher,
  credits,
  progress,
  nextClass,
}) {
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

      {/* Header */}

      <div className="flex items-start justify-between">

        <span className="rounded-full bg-[#e3eaff] px-3 py-1 font-[var(--font-inter)] text-xs font-semibold text-[#264191]">
          {code}
        </span>

        <button className="text-[#191c1e] hover:text-[#00236f]">
          <MoreVertical size={20} />
        </button>

      </div>


      {/* Course name */}

      <h3 className="mt-3 font-[var(--font-jakarta)] text-xl font-semibold text-[#191c1e]">
        {title}
      </h3>


      {/* Teacher */}

      <div className="mt-4 flex items-center gap-3">

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dce1ff]">
          <UserRound
            size={15}
            className="text-[#00236f]"
          />
        </div>

        <span className="font-[var(--font-inter)] text-sm text-[#444651]">
          {teacher}
        </span>

        <span className="h-1 w-1 rounded-full bg-[#c5c5d3]" />

        <span className="font-[var(--font-inter)] text-sm text-[#444651]">
          {credits} Credits
        </span>

      </div>


      {/* Progress */}

      <div className="mt-8 flex items-center gap-5">

        <div
          className="
            relative
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            border-[4px]
            border-[#e6e8ea]
          "
        >

          <div
            className="
              absolute
              inset-[-4px]
              rounded-full
              border-[4px]
              border-[#4e45d5]
            "
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          />

          <span className="relative font-[var(--font-inter)] text-xs font-semibold text-[#191c1e]">
            {progress}%
          </span>

        </div>


        <div className="flex-1">

          <p className="font-[var(--font-inter)] text-sm text-[#444651]">
            Next Class:{" "}
            <span className="font-medium text-[#191c1e]">
              {nextClass}
            </span>
          </p>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0e3e5]">

            <div
              className="h-full rounded-full bg-[#00236f]"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}