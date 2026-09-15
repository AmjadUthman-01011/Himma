import CourseActions from "./TestActions";

export default function CourseTableRow({
  test,
  loading,
  onEdit,
  onDelete,
}) {
  console.log("table row",test)
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">

      {/* COURSE */}

      <td className="px-5 py-4">

        <p className="font-semibold text-[#191c1e]">
          {test.title}
        </p>

      </td>

      {/* CODE */}

      <td className="px-5 py-4">

        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-[#444651]">
          {test.course.code || "—"}
        </span>

      </td>

      {/* DESCRIPTION */}

      <td className="max-w-xs px-5 py-4">

        <p className="truncate text-sm text-[#444651]">
          {test.teacher.firstName} {test.teacher.lastName}
        </p>

      </td>

      {/* CREATED */}

      <td className="px-5 py-4 text-sm text-[#444651]">

        {test.createdAt
          ? new Date(
              test.createdAt
            ).toLocaleDateString()
          : "—"}

      </td>

      {/* ACTIONS */}
            <td className="px-5 py-4">

        {test.maxScore}

      </td>

      <td className="px-5 py-4">

        <CourseActions
          test={test}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </td>

    </tr>
  );
}