"use client";

import {
  ChevronRight,
} from "lucide-react";

export default function ChapterHeader({
  course,
  chapter,
}) {

  return (
    <div className="mb-6">

      {/* Breadcrumb */}

      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          text-sm
          text-[#555963]
        "
      >

        <span>
          {course.code}
        </span>

        <ChevronRight size={15} />

        <span>
          Chapter {chapter.id}
        </span>

      </div>


      {/* Chapter */}

      <p
        className="
          mb-2
          text-sm
          font-medium
          text-[#444651]
        "
      >
        Chapter {chapter.id}
      </p>


      <h1
        className="
          font-[var(--font-jakarta)]
          text-3xl
          font-bold
          tracking-tight
          text-[#191c1e]
          sm:text-4xl
        "
      >
        {chapter.title}
      </h1>

    </div>
  );
}