"use client";

import {
  Search,
  X,
} from "lucide-react";

export default function TestFilters({
  search,
  courseId,
  courses,
  onSearchChange,
  onCourseChange,
  onClear,
}) {
  return (
    <div className="border-b border-[#e0e3e5] bg-white px-5 py-4 sm:px-6">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

        {/* SEARCH */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#757682]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value
              )
            }
            placeholder="Search tests..."
            className="
              h-10
              w-full
              rounded-sm
              border
              border-[#c5c5d3]
              bg-white
              pl-10
              pr-3
              text-sm
              outline-none
              focus:border-[#4e45d5]
              focus:ring-2
              focus:ring-[#4e45d5]/20
            "
          />

        </div>

        {/* COURSE */}

        <select
          value={courseId}
          onChange={(e) =>
            onCourseChange(
              e.target.value
            )
          }
          className="
            h-10
            w-full
            rounded-sm
            border
            border-[#c5c5d3]
            bg-white
            px-3
            text-sm
            text-[#444651]
            outline-none
            focus:border-[#4e45d5]
            focus:ring-2
            focus:ring-[#4e45d5]/20

            lg:w-64
          "
        >
          <option value="ALL">
            All Courses
          </option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.code} - {course.name}
            </option>
          ))}
        </select>

        {/* CLEAR */}

        {(search ||
          courseId !== "ALL") && (
          <button
            type="button"
            onClick={onClear}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-[#e0e3e5]
              px-4
              text-sm
              font-semibold
              text-[#4e45d5]
              hover:bg-[#f2f4f6]
            "
          >
            <X size={16} />

            Clear
          </button>
        )}

      </div>

    </div>
  );
}