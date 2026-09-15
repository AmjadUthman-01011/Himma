import NotificationActions from "./NotificationActions";

export default function NotificationTableRow({
  notification,
  loading,
  onDelete,
  onMarkAsRead
}) {
  const user = notification.user;

  return (
    <tr
      className="
        border-b
        border-slate-200
        hover:bg-slate-50
      "
    >

      {/* TITLE */}

      <td className="px-3 py-3">

        <p className="font-semibold text-[#191c1e]">
          {notification.title}
        </p>

      </td>

      {/* MESSAGE */}

      <td className="max-w-sm px-5 py-4">

        <p
          className="
            truncate
            text-sm
            text-[#444651]
          "
          title={notification.message}
        >
          {notification.message}
        </p>

      </td>

      {/* TYPE */}

      <td className="px-5 py-4">

        <span
          className="
            rounded-md
            bg-slate-100
            px-2
            py-1
            text-xs
            font-semibold
            text-[#444651]
          "
        >
          {notification.type || "—"}
        </span>

      </td>

      {/* DATE */}

      <td className="px-5 py-4 text-sm text-[#444651]">

        {notification.createdAt
          ? new Date(
              notification.createdAt
            ).toLocaleDateString()
          : "—"}

      </td>
      <td className="px-5 py-4 text-sm text-[#444651]">

        {notification.isRead
          ? "Read"
          : "Not Read"}

      </td>

      {/* ACTIONS */}

      <td className="px-5 py-4">

        <NotificationActions
          notification={notification}
          loading={loading}
          onDelete={onDelete}
          onMarkAsRead={onMarkAsRead}
        />

      </td>

    </tr>
  );
}