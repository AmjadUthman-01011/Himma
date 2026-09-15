"use client";

import {
  Search,
  Bell,
  Grid3X3,
  Menu,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../store/slices/authSlice";

export default function StudentHeader() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // =====================================================
  // USER DATA
  // =====================================================

  const user = useSelector(
    (state) => state.auth.user
  );

  const firstName =
    user?.student?.firstName ||
    user?.firstName ||
    "";

  const lastName =
    user?.student?.lastName ||
    user?.lastName ||
    "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user?.email ||
    "User";

  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      

      // Redux logout action
      await dispatch(logout()).unwrap();

      // Redirect to login
      router.replace("/login");

    } catch (error) {
      console.error("Logout failed:", error);

      // Even if backend logout fails,
      // redirect user to login
      router.replace("/login");

    } finally {
      setLoggingOut(false);
      setShowProfileMenu(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-[72px]
        w-full
        border-b
        border-[#e0e3e5]
        bg-white
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-7
        "
      >

        {/* MOBILE MENU */}

        <button
          type="button"
          className="
            rounded-lg
            p-2
            text-[#444651]
            hover:bg-[#f2f4f6]
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        {/* SEARCH */}

        <div
          className="
            relative
            hidden
            sm:block
            sm:w-[280px]
            lg:ml-auto
            lg:mr-7
            lg:w-[275px]
          "
        >
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
              rounded-sm
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

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}

          <button
            type="button"
            className="
              rounded-lg
              p-2
              text-[#191c1e]
              hover:bg-[#f2f4f6]
            "
          >
            <Bell size={21} />
          </button>

          {/* APPS */}

          <button
            type="button"
            className="
              hidden
              rounded-lg
              p-2
              text-[#191c1e]
              hover:bg-[#f2f4f6]
              sm:block
            "
          >
            <Grid3X3 size={21} />
          </button>

          {/* DIVIDER */}

          <div
            className="
              hidden
              h-10
              w-px
              bg-[#c5c5d3]
              sm:block
            "
          />

          {/* USER */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowProfileMenu((prev) => !prev)
              }
              className="
                flex
                items-center
                gap-3
                rounded-lg
                p-1
                transition
                hover:bg-[#f2f4f6]
              "
            >

              {/* AVATAR */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#dce1ff]
                  font-semibold
                  text-[#00236f]
                "
              >
                {initials}
              </div>

              {/* USER INFO */}

              <div className="hidden text-left md:block">

                <p
                  className="
                    font-[var(--font-inter)]
                    text-sm
                    font-semibold
                    text-[#191c1e]
                  "
                >
                  {fullName}
                </p>

                <p
                  className="
                    font-[var(--font-inter)]
                    text-xs
                    text-[#444651]
                  "
                >
                  Profile Settings
                </p>

              </div>

              <ChevronDown
                size={16}
                className="
                  hidden
                  text-[#757682]
                  md:block
                "
              />

            </button>

            {/* PROFILE MENU */}

            {showProfileMenu && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-56
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#e0e3e5]
                  bg-white
                  shadow-lg
                "
              >

                {/* USER */}

                <div className="border-b border-[#e0e3e5] px-4 py-3">

                  <p className="text-sm font-semibold text-[#191c1e]">
                    {fullName}
                  </p>

                  <p className="mt-1 truncate text-xs text-[#757682]">
                    {user?.email}
                  </p>

                </div>

                {/* PROFILE */}

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    router.push("/dashboard/student/profile");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-[#444651]
                    transition
                    hover:bg-[#f2f4f6]
                  "
                >
                  <User size={18} />

                  <span>
                    Profile Settings
                  </span>
                </button>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-t
                    border-[#e0e3e5]
                    px-4
                    py-3
                    text-sm
                    text-red-600
                    transition
                    hover:bg-red-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <LogOut size={18} />

                  <span>
                    {loggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </span>
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}