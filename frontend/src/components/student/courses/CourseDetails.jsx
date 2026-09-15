"use client";

import {
  Award,
  Users,
  CalendarDays,
  Languages,
} from "lucide-react";

export default function CourseDetails({
  course,
}) {

  return (
    <div
      className="
        rounded-sm
        border
        border-[#d2d5dc]
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          mb-5
          text-xl
          font-semibold
          text-[#191c1e]
        "
      >
        Course Details
      </h2>


      <Detail
        icon={<Award size={18} />}
        label="Credits"
        value={`${course.credits} Units`}
      />

      <Detail
        icon={<Users size={18} />}
        label="Enrolled"
        value={`${course.enrolled} Students`}
      />

      <Detail
        icon={<CalendarDays size={18} />}
        label="Term"
        value={course.term}
      />

      <Detail
        icon={<Languages size={18} />}
        label="Language"
        value={course.language}
        last
      />

    </div>
  );
}


function Detail({
  icon,
  label,
  value,
  last = false,
}) {

  return (
    <div
      className={`
        flex
        items-center
        gap-3
        py-4
        ${
          !last
            ? "border-b border-[#e0e2e7]"
            : ""
        }
      `}
    >

      <div className="text-[#252b3d]">
        {icon}
      </div>

      <span className="flex-1 text-sm text-[#444651]">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#191c1e]">
        {value}
      </span>

    </div>
  );
}