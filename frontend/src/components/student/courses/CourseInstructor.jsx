"use client";

import {
  Mail,
} from "lucide-react";

export default function CourseInstructor({
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

      <h2 className="mb-5 text-xl font-semibold text-[#191c1e]">
        Instructor
      </h2>


      <div className="flex items-center gap-4">

        {/* Avatar */}

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#dfe4f4]
            text-sm
            font-bold
            text-[#00236f]
          "
        >
          RS
        </div>


        {/* Information */}

        <div className="min-w-0">

          <p className="text-sm font-semibold text-[#191c1e]">
            {course.instructor}
          </p>

          <p className="mt-1 text-xs text-[#555963]">
            {course.instructorDepartment}
          </p>

          <button
            type="button"
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-[#00236f]
              hover:text-[#4e45d5]
            "
          >
            <Mail size={14} />

            Contact Instructor
          </button>

        </div>

      </div>

    </div>
  );
}