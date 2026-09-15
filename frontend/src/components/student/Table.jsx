import StudentTableRow from "./TableRow";

export default function StudentTable({
  students,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Student
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Phone
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Email
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Status
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Created at
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {students
            .filter((user) => user?.student)
            .map((user) => (
              <StudentTableRow
                key={user.id}
                user={user}
                student={user.student}
                loading={loading}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}