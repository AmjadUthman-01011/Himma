"use client";

import Image from "next/image";
import {
  MoreVertical,
  BookOpen,
  GraduationCap,
  FileText,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Users,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

const statusStyles = {
  active: "bg-green-50 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  graduated: "bg-blue-50 text-blue-700",

  upcoming: "bg-blue-50 text-blue-700",
  ongoing: "bg-orange-50 text-orange-700",
  completed: "bg-green-50 text-green-700",
};

export default function GlobalCard({
  variant,
  className = "",
  onClick,
  showMenu = true,
  actions,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative w-full
        rounded-2xl
        border border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-lg
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* ============================= */}
      {/* CARD HEADER */}
      {/* ============================= */}

      <div className="flex items-start justify-between">
        {/* COURSE */}
        {variant === "course" && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {props.code}
          </span>
        )}

        {/* STUDENT */}
        {variant === "student" && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
            Student
          </span>
        )}

        {/* TEST */}
        {variant === "test" && (
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            Test
          </span>
        )}

        {actions ? (
          actions
        ) : (
          showMenu && (
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-gray-400
                transition
                hover:bg-gray-100
              "
            >
              <MoreVertical size={19} />
            </button>
          )
        )}
      </div>

      {/* ============================= */}
      {/* COURSE */}
      {/* ============================= */}

      {variant === "course" && (
        <CourseContent {...props} />
      )}

      {/* ============================= */}
      {/* STUDENT */}
      {/* ============================= */}

      {variant === "student" && (
        <StudentContent {...props} />
      )}

      {/* ============================= */}
      {/* TEST */}
      {/* ============================= */}

      {variant === "test" && (
        <TestContent {...props} />
      )}
      {variant === "stat" && (
        <StatContent {...props} />
      )}
    </div>
  );
}

/* =====================================================
   COURSE CARD
===================================================== */

function CourseContent({
  title,
  instructor,
  instructorAvatar,
  credits,
  progress,
  nextClass,
  category,
}) {
  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  return (
    <>
      {/* Course title */}
      <div className="mt-4">
        <h3 className="line-clamp-1 text-xl font-semibold text-gray-900">
          {title}
        </h3>

        {category && (
          <p className="mt-1 text-sm text-gray-500">
            {category}
          </p>
        )}
      </div>

      {/* Instructor */}
      <div className="mt-4 flex items-center gap-3">
        {instructorAvatar ? (
          <Image
            src={instructorAvatar}
            alt={instructor}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <GraduationCap
              size={16}
              className="text-gray-500"
            />
          </div>
        )}

        <span className="truncate text-sm text-gray-600">
          {instructor}
        </span>

        <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />

        <span className="shrink-0 text-sm text-gray-600">
          {credits} {credits === 1 ? "Credit" : "Credits"}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-6 flex items-center gap-4">
        {/* Circular progress */}
        <div className="relative h-12 w-12 shrink-0">
          <svg
            className="-rotate-90"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-200"
            />

            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-indigo-600"
              strokeDasharray={`${2 * Math.PI * 19}`}
              strokeDashoffset={
                2 * Math.PI * 19 -
                (safeProgress / 100) *
                  (2 * Math.PI * 19)
              }
            />
          </svg>

          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
            {safeProgress}%
          </span>
        </div>

        {/* Next class */}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400">
            Next Class
          </p>

          <p className="mt-1 truncate text-sm font-medium text-gray-700">
            {nextClass || "No upcoming class"}
          </p>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${safeProgress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* =====================================================
   STUDENT CARD
===================================================== */

function StudentContent({
  name,
  email,
  avatar,
  studentId,
  department,
  year,
  status = "active",
  gpa,
}) {
  return (
    <>
      {/* Student profile */}
      <div className="mt-5 flex items-center gap-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <GraduationCap
              size={25}
              className="text-gray-500"
            />
          </div>
        )}

        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {name}
          </h3>

          <p className="truncate text-sm text-gray-500">
            {email}
          </p>
        </div>
      </div>

      {/* Student information */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoItem
          icon={<Award size={15} />}
          label="Student ID"
          value={studentId}
        />

        {department && (
          <InfoItem
            icon={<BookOpen size={15} />}
            label="Department"
            value={department}
          />
        )}

        {year && (
          <InfoItem
            icon={<GraduationCap size={15} />}
            label="Year"
            value={year}
          />
        )}

        {gpa !== undefined && (
          <InfoItem
            icon={<Award size={15} />}
            label="GPA"
            value={gpa.toFixed(2)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span
          className={`
            rounded-full
            px-3 py-1
            text-xs
            font-medium
            capitalize
            ${statusStyles[status]}
          `}
        >
          {status}
        </span>

        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View Profile
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
}

/* =====================================================
   TEST CARD
===================================================== */

function TestContent({
  title,
  course,
  date,
  time,
  duration,
  questions,
  status = "upcoming",
  score,
}) {
  return (
    <>
      {/* Test title */}
      <div className="mt-4">
        <h3 className="line-clamp-2 text-xl font-semibold text-gray-900">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <BookOpen
            size={15}
            className="shrink-0 text-gray-400"
          />

          <span className="truncate text-sm text-gray-500">
            {course}
          </span>
        </div>
      </div>

      {/* Test information */}
      <div className="mt-5 space-y-3">
        <InfoItem
          icon={<Calendar size={15} />}
          label="Date"
          value={date}
        />

        {time && (
          <InfoItem
            icon={<Clock size={15} />}
            label="Time"
            value={time}
          />
        )}

        {duration && (
          <InfoItem
            icon={<Clock size={15} />}
            label="Duration"
            value={duration}
          />
        )}

        {questions !== undefined && (
          <InfoItem
            icon={<FileText size={15} />}
            label="Questions"
            value={questions.toString()}
          />
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span
          className={`
            rounded-full
            px-3 py-1
            text-xs
            font-medium
            capitalize
            ${statusStyles[status]}
          `}
        >
          {status}
        </span>

        {score !== undefined ? (
          <span className="text-sm font-semibold text-gray-800">
            Score: {score}%
          </span>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View Test
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </>
  );
}
function StatContent({
  title,
  value,
  icon = "book",
  description,
  trend,
}) {
  const icons = {
    book: BookOpen,
    student: GraduationCap,
    users: Users,
    test: FileText,
    assignment: ClipboardCheck,
    grade: Award,
    trend: TrendingUp,
  };

  const Icon = icons[icon] || BookOpen;

  return (
    <div>
      <div className="flex items-start justify-between">
        {/* Text */}

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-gray-400">
              {description}
            </p>
          )}
        </div>

        {/* Icon */}

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
          <Icon size={24} />
        </div>
      </div>

      {/* Trend */}

      {trend && (
        <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
          <span className="text-sm font-semibold text-green-600">
            {trend}
          </span>

          <span className="text-xs text-gray-400">
            from last month
          </span>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   INFO ITEM
===================================================== */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="shrink-0 text-gray-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] text-gray-400">
          {label}
        </p>

        <p className="truncate text-sm font-medium text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}