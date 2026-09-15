"use client";

import {
  CheckCircle2,
  PlayCircle,
  LockKeyhole,
  FileText,
  ClipboardCheck,
} from "lucide-react";

export default function ChapterSidebar({
  chapter,
}) {

  const getIcon = (lesson) => {

    if (lesson.status === "completed") {
      return (
        <CheckCircle2
          size={22}
          className="text-[#00236f]"
        />
      );
    }

    if (lesson.status === "locked") {
      return (
        <LockKeyhole
          size={20}
          className="text-[#a5a9b3]"
        />
      );
    }

    if (lesson.type === "video") {
      return (
        <PlayCircle
          size={22}
          className="text-[#00236f]"
        />
      );
    }

    if (lesson.type === "reading") {
      return (
        <FileText
          size={20}
          className="text-[#757982]"
        />
      );
    }

    return (
      <ClipboardCheck
        size={20}
        className="text-[#757982]"
      />
    );
  };


  return (
    <aside
      className="
        border-l
        border-[#cfd2da]
        bg-white
        lg:min-h-screen
      "
    >

      {/* =========================================
          HEADER
      ========================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#cfd2da]
          px-5
          py-5
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-[#191c1e]
          "
        >
          Chapter {chapter.id}
        </h2>

        <span
          className="
            text-sm
            font-medium
            text-[#444651]
          "
        >
          {chapter.progress}% Complete
        </span>

      </div>


      {/* =========================================
          PROGRESS
      ========================================== */}

      <div className="px-5 pt-4">

        <div
          className="
            h-1.5
            overflow-hidden
            rounded-full
            bg-[#e1e3e7]
          "
        >

          <div
            className="
              h-full
              rounded-full
              bg-[#00236f]
            "
            style={{
              width: `${chapter.progress}%`,
            }}
          />

        </div>

      </div>


      {/* =========================================
          LESSONS
      ========================================== */}

      <div className="p-2">

        {chapter.lessons.map((lesson) => {

          const isCurrent =
            lesson.status === "current";

          return (
            <button
              key={lesson.id}
              type="button"
              disabled={lesson.status === "locked"}
              className={`
                flex
                w-full
                items-start
                gap-3
                rounded-sm
                px-3
                py-4
                text-left
                transition

                ${
                  isCurrent
                    ? `
                      border
                      border-[#d6dcff]
                      bg-[#f8f9ff]
                    `
                    : "hover:bg-[#f5f6f8]"
                }

                ${
                  lesson.status === "locked"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
            >

              {/* Icon */}

              <div className="mt-0.5 shrink-0">
                {getIcon(lesson)}
              </div>


              {/* Information */}

              <div className="min-w-0 flex-1">

                <p
                  className={`
                    text-sm
                    font-semibold
                    leading-5
                    ${
                      isCurrent
                        ? "text-[#00236f]"
                        : "text-[#30333a]"
                    }
                  `}
                >
                  {lesson.number} {lesson.title}
                </p>


                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-[#686c76]
                  "
                >

                  {lesson.type === "video" && (
                    <PlayCircle size={13} />
                  )}

                  {lesson.type === "reading" && (
                    <FileText size={13} />
                  )}

                  {lesson.type === "quiz" && (
                    <ClipboardCheck size={13} />
                  )}

                  <span>
                    {lesson.duration}
                  </span>

                </div>

              </div>

            </button>
          );
        })}

      </div>

    </aside>
  );
}