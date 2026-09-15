"use client";

import {
  Search,
  X,
  CheckCheck,
} from "lucide-react";

export default function NotificationFilters({
  search,
  type,
  onSearchChange,
  onTypeChange,
  onClear,
  onMarkAllAsRead,
}) {
  return (
    <div
      className="
        border-b
        border-[#e0e3e5]
        bg-white
        px-5
        py-4
        sm:px-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3

          lg:flex-row
          lg:items-center
        "
      >
        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="relative flex-1">
          <Search
            size={18}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#757682]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search notifications..."
            className="
              h-10
              w-full
              rounded-sm
              border
              border-[#c5c5d3]
              bg-white
              pl-10
              pr-3
              text-sm
              text-[#191c1e]
              outline-none
              transition

              focus:border-[#4e45d5]
              focus:ring-2
              focus:ring-[#4e45d5]/20
            "
          />
        </div>

        {/* =================================================
            TYPE
        ================================================= */}

        <select
          value={type}
          onChange={(e) =>
            onTypeChange(e.target.value)
          }
          className="
            h-10
            w-full
            rounded-sm
            border
            border-[#c5c5d3]
            bg-white
            px-3
            text-sm
            text-[#444651]
            outline-none
            transition

            focus:border-[#4e45d5]
            focus:ring-2
            focus:ring-[#4e45d5]/20

            lg:w-52
          "
        >
          <option value="ALL">
            All Types
          </option>

          <option value="COURSE">
            Course
          </option>

          <option value="TEST">
            Test
          </option>

          <option value="ASSIGNMENT">
            Assignment
          </option>

          <option value="GRADE">
            Grade
          </option>

          <option value="SYSTEM">
            System
          </option>

          <option value="GENERAL">
            General
          </option>
        </select>

        {/* =================================================
            MARK ALL AS READ
        ================================================= */}

        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="
            inline-flex
            h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-sm
            border
            border-[#e0e3e5]
            px-4
            text-sm
            font-semibold
            text-[#1e3a8a]
            transition

            hover:bg-[#f2f4f6]

            lg:w-auto
            lg:shrink-0
          "
        >
          <CheckCheck size={17} />

          Mark All as Read
        </button>

        {/* =================================================
            CLEAR
        ================================================= */}

        {(search || type !== "ALL") && (
          <button
            type="button"
            onClick={onClear}
            className="
              inline-flex
              h-10
              w-full
              items-center
              justify-center
              gap-2
              rounded-sm
              border
              border-[#e0e3e5]
              px-4
              text-sm
              font-semibold
              text-[#4e45d5]
              transition

              hover:bg-[#f2f4f6]

              lg:w-auto
              lg:shrink-0
            "
          >
            <X size={16} />

            Clear
          </button>
        )}
      </div>
    </div>
  );
}