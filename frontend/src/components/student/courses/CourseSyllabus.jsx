"use client";

import CourseChapter from "./CourseChapter";

export default function CourseSyllabus({
  chapters,
}) {
  return (
    <div className="space-y-3">

      {chapters.map((chapter) => (
        <CourseChapter
          key={chapter.id}
          chapter={chapter}
        />
      ))}

    </div>
  );
}