"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export default function UserFilters({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onClear,
}) {
  const hasFilters =
    search || role !== "ALL" || status !== "ALL";

  return (
    <section
      className="
        
        rounded-sm
        border
        border-[#e0e3e5]
        bg-white
        p-4
        sm:p-5
      "
    >
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal
          size={18}
          className="text-[#00236f]"
        />

        <h2
          className="
            font-[var(--font-inter)]
            text-sm
            font-semibold
            text-[#191c1e]
          "
        >
          Filters
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* Search */}
        <div className="relative md:col-span-2 xl:col-span-1">
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
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users..."
            className="
              h-10
              w-full
              rounded-sm
              border
              border-[#c5c5d3]
              bg-white
              pl-10
              pr-3
              font-[var(--font-inter)]
              text-sm
              text-[#191c1e]
              outline-none
              transition
              placeholder:text-[#757682]
              focus:border-[#4e45d5]
              focus:ring-2
              focus:ring-[#4e45d5]/20
            "
          />
        </div>

        {/* Role */}
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="
            h-10
            w-full
            rounded-sm
            border
            border-[#c5c5d3]
            bg-white
            px-3
            font-[var(--font-inter)]
            text-sm
            text-[#191c1e]
            outline-none
            focus:border-[#4e45d5]
            focus:ring-2
            focus:ring-[#4e45d5]/20
          "
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="TEACHER">Teacher</option>
          <option value="STUDENT">Student</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="
            h-10
            w-full
            rounded-sm
            border
            border-[#c5c5d3]
            bg-white
            px-3
            font-[var(--font-inter)]
            text-sm
            text-[#191c1e]
            outline-none
            focus:border-[#4e45d5]
            focus:ring-2
            focus:ring-[#4e45d5]/20
          "
        >
          <option value="ALL">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="
            
           
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-sm
              border
              border-[#e0e3e5]
              px-4
              font-[var(--font-inter)]
              text-sm
              font-semibold
              text-[#4e45d5]
              transition
              hover:bg-[#f2f4f6]
            "
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>
    </section>
  );
}