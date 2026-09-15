import CourseActions from "./CourseActions";

export default function CourseTableRow({
  course,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">

      {/* COURSE */}

      <td className="px-5 py-4">

        <p className="font-semibold text-[#191c1e]">
          {course.name}
        </p>

      </td>

      {/* CODE */}

      <td className="px-5 py-4">

        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-[#444651]">
          {course.code || "—"}
        </span>

      </td>

      {/* DESCRIPTION */}

      <td className="max-w-xs px-5 py-4">

        <p className="truncate text-sm text-[#444651]">
          {course.description || "—"}
        </p>

      </td>

      {/* CREATED */}

      <td className="px-5 py-4 text-sm text-[#444651]">

        {course.createdAt
          ? new Date(
              course.createdAt
            ).toLocaleDateString()
          : "—"}

      </td>

      {/* ACTIONS */}

      <td className="px-5 py-4">

        <CourseActions
          course={course}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </td>

    </tr>
  );
}