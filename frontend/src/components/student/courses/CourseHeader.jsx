"use client";


import { useRouter } from "next/navigation";
import {
  Clock3,
  Play,
} from "lucide-react";

export default function CourseHeader({ course, chapter }) {
  
const router = useRouter();

  const handleContinue = () => {
    router.push(`/dashboard/student/courses/${course.id}/chapters/${chapter.id}`);
  };

  return (
    <section
      className="
        rounded-sm
        border
        border-[#cdd1da]
        bg-white
        px-6
        py-6
        shadow-sm
        sm:px-7
      "
    >

      <div
        className="
          flex
          flex-col
          gap-7
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* =================================
            COURSE INFORMATION
        ================================== */}

        <div className="min-w-0">

          {/* Badge */}

          <div className="mb-4">

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-[#e9ecf7]
                px-3
                py-1
                text-xs
                font-semibold
                text-[#00236f]
              "
            >
              {course.code}
              <span className="mx-1">•</span>
              {course.requirement}
            </span>

          </div>


          {/* Title */}

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
            {course.title}
          </h1>


          {/* Instructor + Duration */}

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-sm
              text-[#444651]
            "
          >

            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#dfe4f4]
                  text-xs
                  font-bold
                  text-[#00236f]
                "
              >
                RS
              </div>

              <span>
                {course.instructor}
              </span>

            </div>


            <span className="text-[#9ca0aa]">
              •
            </span>


            <div className="flex items-center gap-2">

              <Clock3 size={16} />

              <span>
                {course.duration}
              </span>

            </div>

          </div>

        </div>


        {/* =================================
            PROGRESS
        ================================== */}

        <div
          className="
            w-full
            lg:max-w-[300px]
          "
        >

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-[#191c1e]">
              Course Progress
            </span>

            <span className="text-sm font-bold text-[#00236f]">
              {course.progress}%
            </span>

          </div>


          {/* Progress */}

          <div
            className="
              h-2
              overflow-hidden
              rounded-full
              bg-[#e0e2e7]
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[#00236f]
              "
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>


          {/* Continue */}

          <button
            type="button"
            onClick={handleContinue}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-lg
              bg-[#061b78]
              px-5
              py-3
              text-sm
              font-bold
              tracking-wide
              text-white
              transition
              hover:bg-[#00236f]
              active:scale-[0.99]
            "
          >

            <span>
              Continue Learning
            </span>

            <Play
              size={16}
              fill="currentColor"
            />

          </button>

        </div>

      </div>

    </section>
  );
}