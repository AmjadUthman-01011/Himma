"use client";

import {
  GraduationCap,
  BookOpen,
  CalendarDays,
  Settings,
  LifeBuoy,
  LogOut,
  ClipboardCheck,
  BellRing,
  LayoutDashboard,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active:true
  },
  {
    label: "Courses",
    icon: BookOpen,
  },
  {
    label: "Tests",
    icon: ClipboardCheck,
  },
  {
    label: "Notifications",
    icon: BellRing,
  },
  {
    label: "Schedule",
    icon: CalendarDays,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export default function StudentSidebar() {
  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        w-[280px]
        border-r
        border-[#c5c5d3]
        bg-[#eceef0]
        lg:flex
        lg:flex-col
      "
    >

      {/* ================================================
          BRAND
      ================================================= */}

      <div className="px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <GraduationCap
              size={25}
              className="text-[#00236f]"
            />
          </div>

          <div>

            <h2 className="font-[var(--font-jakarta)] text-xl font-bold text-[#00236f]">
              EduManage
            </h2>

            <p className="font-[var(--font-inter)] text-sm text-[#444651]">
              University Admin Portal
            </p>

          </div>

        </div>

      </div>


      {/* ================================================
          NAVIGATION
      ================================================= */}

      <nav className="flex-1 px-3 py-6">

        <div className="space-y-1">

          {navigation.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`
                  relative
                  flex
                  h-12
                  w-full
                  items-center
                  gap-4
                  rounded-s
                  px-4
                  font-[var(--font-inter)]
                  text-sm
                  font-semibold
                  transition

                  ${
                    item.active
                      ? "bg-[#635bdf] text-white shadow-sm"
                      : "text-[#444651] hover:bg-white/70 hover:text-[#00236f]"
                  }
                `}
              >

                <Icon size={20} strokeWidth={1.8} />

                <span>{item.label}</span>

                {item.active && (
                  <span className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#00236f]" />
                )}

              </button>
            );

          })}

        </div>

      </nav>


      {/* ================================================
          BOTTOM
      ================================================= */}

      <div className="space-y-5 px-4 pb-6">

        <button
          className="
            flex
            h-10
            w-full
            items-center
            justify-center
            rounded-lg
            border
            border-[#c5c5d3]
            bg-transparent
            font-[var(--font-inter)]
            text-sm
            font-semibold
            tracking-wide
            text-[#00236f]
            transition
            hover:bg-white
          "
        >
          <LifeBuoy
            size={17}
            className="mr-2"
          />

          Support Center
        </button>


        <button
          className="
            flex
            items-center
            gap-4
            px-4
            font-[var(--font-inter)]
            text-sm
            font-semibold
            text-[#444651]
            transition
            hover:text-[#00236f]
          "
        >
          <LogOut size={19} />

          Logout
        </button>

      </div>

    </aside>
  );
}