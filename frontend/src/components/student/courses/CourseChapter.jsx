"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LockKeyhole,
  CircleCheck,
  PlayCircle,
  FileText,
  ClipboardCheck,
} from "lucide-react";

export default function CourseChapter({
  chapter,
}) {

  const [isOpen, setIsOpen] = useState(
    chapter.status === "completed"
  );

  const isLocked = chapter.status === "locked";

  const getLessonIcon = (type) => {

    if (type === "video") {
      return <PlayCircle size={20} />;
    }

    if (type === "reading") {
      return <FileText size={20} />;
    }

    if (type === "quiz") {
      return <ClipboardCheck size={20} />;
    }

    return <FileText size={20} />;
  };


  return (
    <div
      className={`
        overflow-hidden
        rounded-sm
        border
        bg-white
        ${
          chapter.status === "in-progress"
            ? "border-[#00236f] border-l-4"
            : "border-[#d2d5dc]"
        }
        ${
          isLocked
            ? "opacity-70"
            : ""
        }
      `}
    >

      {/* =========================================
          CHAPTER HEADER
      ========================================== */}

      <button
        type="button"
        disabled={isLocked}
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        className="
          flex
          w-full
          items-center
          gap-4
          px-5
          py-4
          text-left
        "
      >

        {/* Number */}

        <div
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            text-sm
            font-bold
            ${
              chapter.status === "in-progress"
                ? "bg-[#082b8a] text-white"
                : chapter.status === "locked"
                ? "bg-[#e6e8ec] text-[#757982]"
                : "bg-[#e8ebf2] text-[#00236f]"
            }
          `}
        >
          {chapter.id}
        </div>


        {/* Title */}

        <div className="min-w-0 flex-1">

          <h3
            className="
              text-sm
              font-semibold
              tracking-wide
              text-[#191c1e]
            "
          >
            {chapter.title}
          </h3>

          <p className="mt-1 text-xs text-[#555963]">
            {chapter.items} items • {chapter.duration}
          </p>

        </div>


        {/* Status */}

        <div className="hidden items-center gap-3 sm:flex">

          {chapter.status === "completed" && (
            <span
              className="
                rounded-full
                bg-[#efedff]
                px-3
                py-1
                text-xs
                font-semibold
                text-[#5146d8]
              "
            >
              Completed
            </span>
          )}

          {chapter.status === "in-progress" && (
            <span
              className="
                rounded-full
                bg-[#e8edf8]
                px-3
                py-1
                text-xs
                font-semibold
                text-[#00236f]
              "
            >
              In Progress
            </span>
          )}

          {isLocked && (
            <LockKeyhole
              size={17}
              className="text-[#b7bbc5]"
            />
          )}

        </div>


        {/* Arrow */}

        {!isLocked &&
          (isOpen ? (
            <ChevronUp
              size={18}
              className="text-[#a3a7b2]"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-[#a3a7b2]"
            />
          ))}

      </button>


      {/* =========================================
          LESSONS
      ========================================== */}

      {isOpen && !isLocked && (
        <div className="border-t border-[#dfe1e6]">

          {chapter.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="
                flex
                items-center
                gap-4
                border-b
                border-[#e4e6ea]
                px-5
                py-3
                last:border-b-0
              "
            >

              {/* Completed */}

              <div className="shrink-0">

                {lesson.completed ? (
                  <CircleCheck
                    size={20}
                    className="text-green-600"
                  />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-[#d1d4db]" />
                )}

              </div>


              {/* Icon */}

              <div className="shrink-0 text-[#252b3d]">
                {getLessonIcon(lesson.type)}
              </div>


              {/* Title */}

              <span
                className="
                  min-w-0
                  flex-1
                  text-sm
                  text-[#25272d]
                "
              >
                {lesson.title}
              </span>


              {/* Duration / Score */}

              {lesson.score ? (
                <span
                  className="
                    rounded-full
                    bg-[#effaf2]
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-600
                  "
                >
                  Score: {lesson.score}
                </span>
              ) : (
                <span className="text-xs text-[#555963]">
                  {lesson.duration}
                </span>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}