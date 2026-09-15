"use client";

import { Plus } from "lucide-react";

export default function CourseHeader({
  onCreateCourse,
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-b
        border-[#e0e3e5]
        bg-white
        px-5
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
      "
    >
      {/* HEADER CONTENT */}
      <div>
        <h1
          className="
            font-[var(--font-jakarta)]
            text-xl
            font-bold
            text-[#191c1e]
          "
        >
          Course Management
        </h1>

        <p className="mt-1 text-sm text-[#757682]">
          Manage courses and course information
        </p>
      </div>

      {/* CREATE BUTTON */}
      <button
        type="button"
        onClick={onCreateCourse}
        className="
          inline-flex
            h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-sm
            bg-[#1e3a8a]
            px-4
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#00236f]
            sm:w-auto
            sm:shrink-0
          
        "
      >
        Create Course
      </button>
    </div>
  );
}