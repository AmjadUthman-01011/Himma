"use client";

import { useEffect, useState } from "react";

import TeacherCoursesHeader from "./TeacherCourseHeader";
import TeacherCourseStats from "./TeacherCourseStats";
import TeacherCourseCard from "./TeacherCourseCard";
import RecentChaptersTracker from "./RecentChaptersTracker";
import Loading from "../../ui/Loading";
import { getMyCourses } from "../../../services/teachers.service";

export default function TeacherCoursesDashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getMyCourses();

                console.log("Teacher courses:", response);

                // Adjust this depending on your api() response format
                const data = response?.data || response;

                setCourses(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(
                    "Failed to load teacher courses:",
                    error
                );

                setError(
                    error?.message ||
                    "Failed to load courses"
                );
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    if (loading) {
        return (
            <Loading message="Loading courses..." />
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#f7f9fb] px-5 py-6 md:px-8">
                <div className="mx-auto max-w-[1450px]">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                        <h2 className="font-semibold text-red-700">
                            Failed to load courses
                        </h2>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f9fb] px-5 py-6 md:px-8">
            <div className="mx-auto max-w-[1450px]">

                <TeacherCoursesHeader />
            {courses.length === 0 ? (
                <>
                <TeacherCourseStats
                    courses={courses}
                />
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <h2 className="text-lg font-semibold text-slate-800">
                            No courses found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            You don't have any courses assigned yet.
                        </p>
                    </div>
                    </>
                ) : (
                    <>
                    <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
                        {courses.map((course) => (
                            <TeacherCourseCard
                                key={course.id}
                                course={course}
                            />
                        ))}
                    </section>

                    <RecentChaptersTracker
                    courses={courses}
                />
                </>
                )}

                

            </div>
        </main>
    );
}