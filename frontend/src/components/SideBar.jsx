
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Bell,
  Settings,
  GraduationCap,
  UserRoundCheck,
} from "lucide-react";
import { navigation } from "../../src/config/navigations";



// =====================================================
// SIDEBAR
// =====================================================

export default function Sidebar() {
  const pathname = usePathname();
  const user = useSelector(
      (state) => state.auth.user
    );
    const role = user?.role;

  console.log("User role in Sidebar:",user);
  // ---------------------------------------------------
  // FILTER NAVIGATION BY ROLE
  // ---------------------------------------------------

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(role)
  );

  // ---------------------------------------------------
  // SECTION TITLE
  // ---------------------------------------------------

  const sectionTitle =
    role === "ADMIN"
      ? "Administration"
      : role === "TEACHER"
        ? "Teaching"
        : "Student Portal";

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
        border-[#e0e3e5]
        bg-white
        lg:block
      "
    >
      {/* =================================================
          LOGO
      ================================================= */}

      <div className="flex h-20 items-center px-6">
        <Link
          href="/dashboard"
          className="
            font-[var(--font-jakarta)]
            text-xl
            font-bold
            text-[#00236f]
          "
        >
          Hemmah | هِمَّة
        </Link>
      </div>

      {/* =================================================
          USER ROLE
      ================================================= */}

      <div className="px-6 pb-3">
        <div
          className="
            inline-flex
            rounded-full
            bg-[#dce1ff]/60
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-[#00236f]
          "
        >
          {role}
        </div>
      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="px-3 py-4">
        <p
          className="
            mb-3
            px-3
            font-[var(--font-inter)]
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-[#757682]
          "
        >
          {sectionTitle}
        </p>

        <div className="space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;

            /*
             * Dashboard needs exact matching.
             *
             * Example:
             *
             * /dashboard/admin/users
             *
             * should NOT activate:
             *
             * /dashboard
             */

            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group
                  relative
                  flex
                  h-11
                  items-center
                  gap-3
                  rounded-sm
                  px-3
                  font-[var(--font-inter)]
                  text-sm
                  font-semibold
                  transition-colors

                  ${
                    isActive
                      ? "bg-[#dce1ff]/60 text-[#00236f]"
                      : "text-[#444651] hover:bg-[#f2f4f6] hover:text-[#191c1e]"
                  }
                `}
              >
                {/* ACTIVE INDICATOR */}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-6
                      w-1
                      -translate-y-1/2
                      rounded-r-full
                      bg-[#00236f]
                    "
                  />
                )}

                {/* ICON */}

                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 2}
                />

                {/* LABEL */}

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

