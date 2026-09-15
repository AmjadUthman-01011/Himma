"use client";
import GlobalCard from "../../../components/ui/GlobalCard"
import { useEffect, useState } from "react";
import { getStudents } from "../../../services/students.service";
import { getCourses } from "../../../services/courses.service";
import { getTests } from "../../../services/tests.service";
import { getTeachers } from "../../../services/teachers.service";

export default function StudentDashboard() {
  const [students, setStudents] = useState(null);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        studentResponse,
        coursesResponse,
        testsResponse,
        teachersResponse
      ] = await Promise.all([
        getStudents(),
        getCourses(),
        getTests(),
        getTeachers(),
      ]);

      setStudents(studentResponse.data);
      setCourses(coursesResponse.data || []);
      setTests(testsResponse.data || []);
      setTeachers(testsResponse.data || []);
    } catch (error) {
      console.error(
        "Failed to load dashboard:",
        error
      );

      setError(
        error.message || "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();
}, []);

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

        {/* Download Transcript */}

        {/*
        <button
          className="
            w-fit
            rounded-lg
            bg-[#1e3a8a]
            px-6
            py-2.5
            font-[var(--font-inter)]
            text-sm
            font-semibold
            tracking-wide
            text-white
            transition
            hover:bg-[#00236f]
          "
        >
          Download Transcript
        </button>
        */}

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
          title="Enrolled Courses"
          value="6"
          icon="book"
        />

        <GlobalCard
          variant="stat"
          title="Enrolled Courses"
          value="6"
          icon="book"
        />

        <GlobalCard
          variant="stat"
          title="Enrolled Courses"
          value="6"
          icon="book"
        />
        <GlobalCard
          variant="stat"
          title="Enrolled Courses"
          value="6"
          icon="book"
        />

        <GlobalCard
          variant="stat"
          title="Enrolled Courses"
          value="6"
          icon="book"
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
          />

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
            }}/>

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
            }}/>

        </div>

      </section>


      {/* ================================================
          BOTTOM SECTION
      ================================================= */}

      {/*
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        <UpcomingAssignments />

        <RecentGrades />

      </section>
      */}

    </div>
  );
}