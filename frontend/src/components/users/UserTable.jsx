import UserTableRow from "./UserTableRow";

export default function UserTable({users, loading,onEdit, onChangeRole,onToggleStatus,onDelete}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              User
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase">
              Phone
            </th>

            <th className=" px-5 py-3 text-left text-xs font-semibold uppercase">
              Role
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
          {users.filter((user) => user?.student || user?.teacher)
            .map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              userContent = {user?.student || user?.teacher}
              loading={loading}
              onEdit={onEdit}
              onChangeRole={onChangeRole}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}