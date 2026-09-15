import {
  CalendarDays,
} from "lucide-react";

const assignments = [
  {
    name: "Midterm Essay",
    course: "PSY101",
    due: "2 days left",
    status: "PENDING",
  },
  {
    name: "Binary Tree Project",
    course: "CS204",
    due: "4 days left",
    status: "IN PROGRESS",
  },
  {
    name: "Poetry Analysis",
    course: "ENG301",
    due: "Next Week",
    status: "NOT STARTED",
  },
];

export default function UpcomingAssignments() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e0e3e5] bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#e0e3e5] px-6 py-5">

        <h2 className="font-[var(--font-jakarta)] text-xl font-semibold text-[#191c1e]">
          Upcoming Assignments
        </h2>

        <CalendarDays
          size={21}
          className="text-[#191c1e]"
        />

      </div>


      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[550px]">

          <thead className="bg-[#f1f5f9]">

            <tr>

              <th className="px-6 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Assignment Name
              </th>

              <th className="px-4 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Course
              </th>

              <th className="px-4 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Due Date
              </th>

              <th className="px-4 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {assignments.map((assignment) => (

              <tr
                key={assignment.name}
                className="border-b border-[#e0e3e5] last:border-0 hover:bg-[#f8fafc]"
              >

                <td className="px-6 py-5 font-[var(--font-inter)] text-sm font-medium text-[#191c1e]">
                  {assignment.name}
                </td>

                <td className="px-4 py-5 font-[var(--font-inter)] text-sm text-[#444651]">
                  {assignment.course}
                </td>

                <td className="px-4 py-5 font-[var(--font-inter)] text-sm text-[#444651]">
                  {assignment.due}
                </td>

                <td className="px-4 py-5">

                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      font-[var(--font-inter)]
                      text-[10px]
                      font-semibold
                      tracking-wide

                      ${
                        assignment.status === "PENDING"
                          ? "bg-[#ffdad6] text-[#ba1a1a]"
                          : assignment.status === "IN PROGRESS"
                            ? "bg-[#e3dfff] text-[#372abf]"
                            : "bg-[#e0e3e5] text-[#444651]"
                      }
                    `}
                  >
                    {assignment.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}