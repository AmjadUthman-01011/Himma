import TestTableRow from "./TableRow";

export default function TestTable({
  
  tests,
  loading,
  onEdit,
  onDelete,
}) {
  console.log(tests);
  return (
    <div className="w-full overflow-x-auto bg-white">

      <table className="w-full table-fixed">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Test
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Course
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Teacher
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Date
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-[#444651]">
              Score
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
                colSpan={7}
                className="px-5 py-10 text-center text-sm text-[#757682]"
              >
                Loading tests...
              </td>
            </tr>
          ) : tests.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-10 text-center text-sm text-[#757682]"
              >
                No tests found.
              </td>
            </tr>
          ) : (
            tests.map((test) => (
              
              <TestTableRow
                key={test.id}
                test={test}
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