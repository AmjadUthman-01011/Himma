"use client";

import { Plus, Bell } from "lucide-react";

export default function NotificationHeader({
  onCreateNotification,
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-b
        border-[#e0e3e5]
        bg-white
        px-5
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-sm
            bg-[#dce1ff]
          "
        >
          <Bell
            size={19}
            className="text-[#00236f]"
          />
        </div>

        <div>
          <h1
            className="
              font-[var(--font-jakarta)]
              text-xl
              font-bold
              text-[#191c1e]
            "
          >
            Notification Management
          </h1>

          <p className="mt-1 text-sm text-[#757682]">
            Create and manage user notifications
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={onCreateNotification}
        className="
          inline-flex
          h-10
          w-full
          items-center
          justify-center
          gap-2
          rounded-sm
          bg-[#1e3a8a]
          px-4
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#00236f]
          sm:w-auto
          sm:shrink-0
        "
      >
        <Plus size={18} />

        Create Notification
      </button>
    </div>
  );
}