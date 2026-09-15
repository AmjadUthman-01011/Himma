"use client";

import {
  Search,
  Bell,
  Grid3X3,
  Menu,
} from "lucide-react";

export default function StudentHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-[72px]
        border-b
        border-[#e0e3e5]
        bg-white
      "
    >

      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-7">

        {/* Mobile menu */}

        <button
          className="rounded-lg p-2 text-[#444651] hover:bg-[#f2f4f6] lg:hidden"
        >
          <Menu size={22} />
        </button>


        {/* Search */}

        <div className="relative hidden sm:block sm:w-[280px] lg:ml-auto lg:mr-7 lg:w-[275px]">

          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#757682]
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              h-10
              w-full
              rounded-full
              border-none
              bg-[#f2f4f6]
              pl-11
              pr-4
              font-[var(--font-inter)]
              text-sm
              text-[#191c1e]
              outline-none
              placeholder:text-[#757682]
              focus:ring-2
              focus:ring-[#4e45d5]/20
            "
          />

        </div>


        {/* Right side */}

        <div className="flex items-center gap-4">

          <button className="rounded-lg p-2 text-[#191c1e] hover:bg-[#f2f4f6]">
            <Bell size={21} />
          </button>

          <button className="hidden rounded-lg p-2 text-[#191c1e] hover:bg-[#f2f4f6] sm:block">
            <Grid3X3 size={21} />
          </button>


          <div className="hidden h-10 w-px bg-[#c5c5d3] sm:block" />


          <button className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce1ff] font-semibold text-[#00236f]">
              JD
            </div>

            <div className="hidden text-left md:block">

              <p className="font-[var(--font-inter)] text-sm font-semibold text-[#191c1e]">
                John Doe
              </p>

              <p className="font-[var(--font-inter)] text-xs text-[#444651]">
                Profile Settings
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}