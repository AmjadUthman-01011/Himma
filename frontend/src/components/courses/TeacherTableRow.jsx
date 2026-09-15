import UserActions from "./UserActions";

export default function UserTableRow({ user,
              loading,
              onEdit,
              onToggleStatus,
              onDelete,}) {
                
          
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-[#191c1e]">
            {user.name}
          </p>

          <p className="text-sm text-[#444651]">
            {user.email}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
          {user.role}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              user.isActive
                ? "bg-green-500"
                : "bg-slate-400"
            }`}
          />

          <span>{user.status}</span>
        </div>
      </td>

      <td className="px-5 py-4 text-sm">
        {user.createdAt}
      </td>

      <td className="px-5 py-4">
        <UserActions user={user}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete} />
      </td>
    </tr>
  );
}