"use client";

import {
  MoreVertical,
  Users,
  BookOpen,
  GraduationCap,
  Clock3,
  Upload,
  SlidersHorizontal,
  FileText,
  ClipboardList,
} from "lucide-react";

export default function TeacherCourseCard({ course }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#e7e9ec]">

      {/* Main content */}
      <div className="p-5">

        {/* Header */}
        <div className="mb-4 flex items-start justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfe6ff] text-[#173c91]">
              <BookOpen size={20} />
            </div>

            <div>

              <div className="mb-1 flex items-center gap-2">

                <span className="rounded bg-[#e0e6ff] px-2 py-0.5 text-[10px] font-bold text-[#173c91]">
                  {course.code}
                </span>

                <span className="text-[10px] font-medium text-[#5146d8]">
                  • {course.section}
                </span>

              </div>

              <h2 className="text-lg font-semibold leading-6 text-[#202327]">
                {course.title}
              </h2>

            </div>

          </div>

          <button className="text-[#666b74] hover:text-[#202327]">
            <MoreVertical size={18} />
          </button>

        </div>

        {/* Statistics */}
        <div className="mb-3 grid grid-cols-3 rounded-lg bg-[#f0f1f3]">

          <Info
            label="Students"
            value={course.students}
          />

          <Info
            label="Chapters"
            value={`${course.chapters} / ${course.totalChapters}`}
          />

          <Info
            label="Avg Grade"
            value={course.averageGrade}
            highlight
          />

        </div>

        {/* Next session */}
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-[#f0f1f3] px-3 py-2.5">

          <Clock3
            size={17}
            className="shrink-0 text-[#173c91]"
          />

          <div className="min-w-0 flex-1">

            <p className="text-xs text-[#666b74]">
              Next:
              <span className="ml-1 font-semibold text-[#25282c]">
                {course.nextLecture}
              </span>
            </p>

          </div>

          <span className="hidden text-xs text-[#777b84] sm:block">
            • {course.location}
          </span>

          <span className="rounded bg-white px-2 py-1 text-[10px] font-semibold text-[#173c91]">
            {course.nextChapter}
          </span>

        </div>

        {/* Progress */}
        <div>

          <div className="mb-1 flex items-center justify-between">

            <span className="text-[11px] text-[#44484f]">
              Curriculum Completion
            </span>

            <span className="text-[11px] font-semibold text-[#44484f]">
              {course.completion}% Complete
            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[#e0e2e5]">

            <div
              className="h-full rounded-full bg-[#173c91]"
              style={{
                width: `${course.completion}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-[#edf0f2] bg-[#f5f6f8] px-5 py-3">

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#173c91]
            px-4
            py-2
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-[#102f78]
          "
        >
          <Upload size={15} />

          Upload Chapter
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-white
            px-4
            py-2
            text-xs
            font-semibold
            text-[#33373d]
            ring-1
            ring-[#e1e4e8]
          "
        >
          <BookOpen size={15} />

          Curriculum
        </button>

        <div className="ml-auto flex items-center gap-1">

          <ActionButton icon={Users} />

          <ActionButton icon={FileText} />

          <ActionButton icon={SlidersHorizontal} />

        </div>

      </div>

    </article>
  );
}

function Info({ label, value, highlight }) {
  return (
    <div className="px-3 py-2 text-center">

      <p className="text-[10px] text-[#777b84]">
        {label}
      </p>

      <p
        className={`
          mt-1
          text-sm
          font-semibold
          ${highlight ? "text-[#5146d8]" : "text-[#202327]"}
        `}
      >
        {value}
      </p>

    </div>
  );
}

function ActionButton({ icon: Icon }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#626770] hover:bg-white">
      <Icon size={15} />
    </button>
  );
}