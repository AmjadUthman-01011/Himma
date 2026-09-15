"use client";

import {
  Upload,
  Plus,
  CloudUpload,
} from "lucide-react";

export default function TeacherCoursesHeader() {
  return (
    <header className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

      <div>


        <h1 className="text-3xl font-bold tracking-tight text-[#191c1e] md:text-4xl">
          My Courses
        </h1>

      </div>

    </header>
  );
}