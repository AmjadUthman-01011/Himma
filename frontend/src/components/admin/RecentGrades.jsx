const grades = [
  {
    course: "CS204",
    assessment: "Quiz 3",
    score: "92/100",
    grade: "A",
  },
  {
    course: "PSY101",
    assessment: "Group Pres.",
    score: "88/100",
    grade: "B+",
  },
  {
    course: "ENG301",
    assessment: "Draft 1",
    score: "95/100",
    grade: "A",
  },
];

export default function RecentGrades() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e0e3e5] bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#e0e3e5] px-6 py-5">

        <h2 className="font-[var(--font-jakarta)] text-xl font-semibold text-[#191c1e]">
          Recent Grades
        </h2>

        <button className="text-[#191c1e] hover:text-[#00236f]">
          <span className="text-xl">≡</span>
        </button>

      </div>


      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[500px]">

          <thead className="bg-[#f1f5f9]">

            <tr>

              <th className="px-6 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Course
              </th>

              <th className="px-4 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Assessment
              </th>

              <th className="px-4 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Score
              </th>

              <th className="px-4 py-4 text-left font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-[#444651]">
                Grade
              </th>

            </tr>

          </thead>


          <tbody>

            {grades.map((grade) => (

              <tr
                key={`${grade.course}-${grade.assessment}`}
                className="border-b border-[#e0e3e5] last:border-0 hover:bg-[#f8fafc]"
              >

                <td className="px-6 py-5 font-[var(--font-inter)] text-sm font-medium text-[#191c1e]">
                  {grade.course}
                </td>

                <td className="px-4 py-5 font-[var(--font-inter)] text-sm text-[#444651]">
                  {grade.assessment}
                </td>

                <td className="px-4 py-5 font-[var(--font-inter)] text-sm text-[#444651]">
                  {grade.score}
                </td>

                <td className="px-4 py-5">

                  <span className="rounded bg-[#e3eaff] px-2.5 py-1 font-[var(--font-inter)] text-xs font-semibold text-[#264191]">
                    {grade.grade}
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