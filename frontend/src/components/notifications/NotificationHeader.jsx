"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

export default function NotificationHeader({
  onCreate,
  onDeleteAll,
  hasNotifications,
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
      {/* =================================================
          TITLE
      ================================================= */}

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
          Create and manage system notifications
        </p>
      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div
        className="
          flex
          w-full
          flex-col
          gap-3
          sm:w-auto
          sm:flex-row
        "
      >

        {/* =================================================
            CREATE
        ================================================= */}

        <button
          type="button"
          onClick={onCreate}
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
          Create Notification
        </button>

        {/* =================================================
            DELETE ALL
        ================================================= */}

        {hasNotifications && (
          <button
            type="button"
            onClick={onDeleteAll}
            className="
              inline-flex
              h-10
              w-full
              items-center
              justify-center
              gap-2
              rounded-sm
              border
              border-[#ba1a1a]
              bg-white
              px-4
              text-sm
              font-semibold
              text-[#ba1a1a]
              transition
              hover:bg-[#ffdad6]
              sm:w-auto
              sm:shrink-0
            "
          >
            <Trash2 size={18} />

            Delete All
          </button>
        )}

      </div>
    </div>
  );
}