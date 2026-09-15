"use client";

import {
  BookOpen,
  Users,
  Presentation,
  ClipboardCheck,
} from "lucide-react";

export default function TeacherCourseStats({ courses = [] }) {
  // =====================================================
  // CALCULATE STATISTICS FROM API DATA
  // =====================================================

  const totalCourses = courses.length;

  const totalStudents = courses.reduce(
    (total, course) =>
      total + (course.students?.length || 0),
    0
  );

  const totalChapters = courses.reduce(
    (total, course) =>
      total + (course.chapters?.length || 0),
    0
  );

  const stats = [
    {
      title: "ASSIGNED COURSES",
      value: `${totalCourses} Courses`,
      description: "Currently assigned to you",
      icon: BookOpen,
    },

    {
      title: "ENROLLED COHORT",
      value: `${totalStudents} Students`,
      description: "Students across your courses",
      icon: Users,
    },

    {
      title: "CURRICULUM CHAPTERS",
      value: `${totalChapters} Published`,
      description: "Chapters across your courses",
      icon: Presentation,
    },

    {
      title: "SUBMISSIONS & GRADING",
      value: "24 Awaiting",
      description: "Submissions requiring attention",
      icon: ClipboardCheck,
      danger: true,
      extra: "across your courses",
    },
  ];

  // =====================================================
  // EMPTY STATE
  // =====================================================

  //if (courses.length === 0) {
  //  return (
  //    <section className="mb-6">
  //      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
  //        <BookOpen
  //          size={32}
  //          className="mx-auto mb-3 text-slate-400"
  //        />
//
  //        <h2 className="text-lg font-semibold text-slate-800">
  //          No courses found
  //        </h2>
//
  //        <p className="mt-1 text-sm text-slate-500">
  //          You don't have any assigned courses yet.
  //        </p>
  //      </div>
  //    </section>
  //  );
  //}

  // =====================================================
  // STATS
  // =====================================================

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              min-h-[140px]
              rounded-xl
              bg-white
              p-4
              shadow-sm
              ring-1
              ring-[#e7e9ec]
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold tracking-wide text-[#777b84]">
                {stat.title}
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef1fa] text-[#173c91]">
                <Icon size={17} />
              </div>
            </div>

            {/* Content */}
            <div className="mt-5">
              <div className="flex items-center justify-between gap-2">
                <h2
                  className={`
                    text-2xl
                    font-semibold
                    ${
                      stat.danger
                        ? "text-red-600"
                        : "text-[#202327]"
                    }
                  `}
                >
                  {stat.value}
                </h2>

                {stat.extra && (
                  <span className="text-right text-[10px] text-[#666b74]">
                    {stat.extra}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-[#555963]">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}