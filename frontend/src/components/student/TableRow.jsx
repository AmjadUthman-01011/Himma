import StudentActions from "./StudentActions";

export default function StudentTableRow({
  student,
  user,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      
      {/* Student */}
      <td className="px-5 py-4">
        <p className="font-semibold text-[#191c1e]">
          {student.firstName} {student.lastName}
        </p>
      </td>

      {/* Phone */}
      <td className="px-5 py-4">
        <p className="text-sm text-[#444651]">
          {student.phone || "-"}
        </p>
      </td>

      {/* Email */}
      <td className="px-5 py-4">
        <p className="text-sm text-[#444651]">
          {user.email}
        </p>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              user.isActive
                ? "bg-green-500"
                : "bg-slate-400"
            }`}
          />

          <span className="text-sm">
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </td>

      {/* Created */}
      <td className="px-5 py-4 text-sm">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <StudentActions
          user={user}
          student={student}
          loading={loading}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}