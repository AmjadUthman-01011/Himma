"use client";

import NotificationTableRow from "./TableRow";

export default function NotificationTable({
  notifications,
  loading,
  onDelete,
  onMarkAsRead,
}) {
  return (
    <div className="w-full overflow-x-auto bg-white">
      <table className="w-full table-fixed">

        {/* =================================================
            HEADER
        ================================================= */}

        <thead className="bg-slate-100">
          <tr>

            {/* TITLE */}

            <th
              className="
                w-[18%]
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-[#444651]
              "
            >
              Title
            </th>

            {/* MESSAGE */}

            <th
              className="
                w-[32%]
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-[#444651]
              "
            >
              Message
            </th>

            {/* TYPE */}

            <th
              className="
                w-[14%]
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-[#444651]
              "
            >
              Type
            </th>

            {/* DATE */}

            <th
              className="
                w-[14%]
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-[#444651]
              "
            >
              Date
            </th>

            {/* STATUS */}

            <th
              className="
                w-[12%]
                px-4
                py-3
                text-left
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-[#444651]
              "
            >
              Status
            </th>

            {/* ACTIONS */}

            <th
              className="
                w-[10%]
                px-4
                py-3
                text-center
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-[#444651]
              "
            >
              Actions
            </th>

          </tr>
        </thead>

        {/* =================================================
            BODY
        ================================================= */}

        <tbody>

          {/* LOADING */}

          {loading ? (
            <tr>
              <td
                colSpan={6}
                className="
                  px-5
                  py-10
                  text-center
                  text-sm
                  text-[#757682]
                "
              >
                Loading notifications...
              </td>
            </tr>
          ) : notifications.length === 0 ? (

            /* EMPTY */

            <tr>
              <td
                colSpan={6}
                className="
                  px-5
                  py-10
                  text-center
                  text-sm
                  text-[#757682]
                "
              >
                No notifications found.
              </td>
            </tr>
          ) : (

            /* DATA */

            notifications.map((notification) => (
              <NotificationTableRow
                key={notification.id}
                notification={notification}
                loading={loading}
                onDelete={onDelete}
                onMarkAsRead={onMarkAsRead}
              />
            ))

          )}

        </tbody>

      </table>
    </div>
  );
}