import CourseTableRow from "./TableRow";

export default function CourseTable({
  courses,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Course
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Code
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Description
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Created At
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {loading ? (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-10 text-center text-sm text-[#757682]"
              >
                Loading courses...
              </td>
            </tr>
          ) : courses.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-10 text-center text-sm text-[#757682]"
              >
                No courses found.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <CourseTableRow
                key={course.id}
                course={course}
                loading={loading}
                onEdit={onEdit}
                
                onDelete={onDelete}
              />
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}