"use client";

import GlobalCard from "../../../components/ui/GlobalCard";
import StudentActions from "../../../components/student/courses/StudentActions";

export default function StudentDashboard() {

  const handleEnroll = (course) => {
    console.log("Enroll course:", course);

    // Later:
    // POST /api/enrollments
  };

  const handleComplete = (course) => {
    console.log("Complete course:", course);

    // Later:
    // PATCH /api/enrollments/:id/complete
  };

  return (
    <div className="w-full">

      {/* ================================================
          PAGE HEADER
      ================================================= */}

      <section className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        <div>
          <h1
            className="
              font-[var(--font-jakarta)]
              text-3xl
              font-bold
              tracking-tight
              text-[#191c1e]
              sm:text-4xl
            "
          >
            Welcome back, John!
          </h1>

          <p
            className="
              mt-2
              font-[var(--font-inter)]
              text-base
              text-[#444651]
              sm:text-lg
            "
          >
            Here is a summary of your academic progress.
          </p>
        </div>

      </section>


      {/* ================================================
          STATISTICS
      ================================================= */}

      <section
        className="
          mb-8
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        <GlobalCard
          variant="stat"
          title="Overall Progress"
          value="60%"
          icon="trend"
        />

        <GlobalCard
          variant="stat"
          title="Enrolled Courses"
          value="6"
          icon="book"
        />

        <GlobalCard
          variant="stat"
          title="Upcoming Tests"
          value="3"
          icon="test"
        />

        <GlobalCard
          variant="stat"
          title="Current GPA"
          value="3.82"
          icon="grade"
        />

      </section>


      {/* ================================================
          COURSES
      ================================================= */}

      <section className="mb-8">

        <div className="mb-5 flex items-center justify-between">

          <h2
            className="
              font-[var(--font-jakarta)]
              text-2xl
              font-semibold
              text-[#191c1e]
            "
          >
            My Courses
          </h2>

          <button
            className="
              font-[var(--font-inter)]
              text-sm
              font-semibold
              text-[#00236f]
              transition
              hover:text-[#4e45d5]
            "
          >
            View All
          </button>

        </div>


        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-3
          "
        >

          {/* Course 1 */}

          <GlobalCard
            variant="course"
            code="PSY101"
            title="Intro to Psychology"
            instructor="Dr. Sarah Jenkins"
            credits={3}
            progress={75}
            nextClass="Tomorrow, 10:00 AM"
            course={{
              id: 1,
              code: "PSY101",
              title: "Intro to Psychology",
            }}
            actions={
              <StudentActions
                course={{
                  id: 1,
                  code: "PSY101",
                  title: "Intro to Psychology",
                }}
                onEnroll={handleEnroll}
                onComplete={handleComplete}
              />
            }
          />


          {/* Course 2 */}

          <GlobalCard
            variant="course"
            code="CS201"
            title="Data Structures"
            instructor="Dr. Michael Smith"
            credits={4}
            progress={60}
            nextClass="Monday, 9:00 AM"
            course={{
              id: 2,
              code: "CS201",
              title: "Data Structures",
            }}
            actions={
              <StudentActions
                course={{
                  id: 2,
                  code: "CS201",
                  title: "Data Structures",
                }}
                onEnroll={handleEnroll}
                onComplete={handleComplete}
              />
            }
          />


          {/* Course 3 */}

          <GlobalCard
            variant="course"
            code="ENG201"
            title="Academic Writing"
            instructor="Dr. Sarah Williams"
            credits={3}
            progress={90}
            nextClass="Wednesday, 11:00 AM"
            course={{
              id: 3,
              code: "ENG201",
              title: "Academic Writing",
            }}
            actions={
              <StudentActions
                course={{
                  id: 3,
                  code: "ENG201",
                  title: "Academic Writing",
                }}
                onEnroll={handleEnroll}
                onComplete={handleComplete}
              />
            }
          />

        </div>

      </section>

    </div>
  );
}