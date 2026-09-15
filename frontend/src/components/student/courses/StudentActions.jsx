"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  BookOpenCheck,
  CheckCircle2,
} from "lucide-react";

export default function StudentActions({
  course,
  onEnroll,
  onComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Enroll
  const handleEnroll = () => {
    setIsOpen(false);

    if (onEnroll) {
      onEnroll(course);
    }
  };

  // Complete / Open course
  const handleComplete = () => {
    setIsOpen(false);

    if (onComplete) {
      onComplete(course);
    }

    router.push(`/dashboard/student/courses/${course.id}`);
  };

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* Action button */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-[#757682]
          transition
          hover:bg-[#e6e8ea]
          hover:text-[#191c1e]
        "
        aria-label="Open course actions"
        aria-expanded={isOpen}
      >
        <MoreVertical size={20} />
      </button>

      {/* Action menu */}

      {isOpen && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="
            absolute
            right-0
            top-full
            z-50
            mt-2
            w-48
            overflow-hidden
            rounded-lg
            border
            border-[#e0e3e5]
            bg-white
            py-1
            shadow-lg
          "
        >
          {/* Enroll */}

          <button
            type="button"
            onClick={handleEnroll}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-left
              text-sm
              font-medium
              text-[#191c1e]
              transition
              hover:bg-[#f2f4f6]
            "
          >
            <BookOpenCheck
              size={17}
              className="text-[#4e45d5]"
            />

            <span>Enroll Course</span>
          </button>

          <div className="my-1 border-t border-[#e0e3e5]" />

          {/* Complete */}

          <button
            type="button"
            onClick={handleComplete}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-left
              text-sm
              font-medium
              text-[#191c1e]
              transition
              hover:bg-[#f2f4f6]
            "
          >
            <CheckCircle2
              size={17}
              className="text-green-600"
            />

            <span>Complete Course</span>
          </button>
        </div>
      )}
    </div>
  );
}