"use client";

import {
  Filter,
  Download,
  Eye,
  Pencil,
  Settings,
  PlayCircle,
} from "lucide-react";

const chapters = [
  {
    title: "Ch 8: Dynamic Programming & Memoization",
    resource: "Video (14m) • Lecture Notes (.pdf)",
    course: "CS-301",
    date: "Oct 24, 2024 • 09:20 AM",
    status: "Published",
    views: "78 / 84",
    completion: "88%",
  },
  {
    title: "Ch 6: Convolutional Architectures in PyTorch",
    resource: "Video (48m) • Code Repo (.ipynb)",
    course: "DATA-210",
    date: "Today • 08:05 AM",
    status: "Processing",
    views: "--",
    completion: "--",
  },
  {
    title: "Ch 12: Neural Correlates of Working Memory",
    resource: "Reading Assignments • Research Papers (3 PDFs)",
    course: "PSY-101",
    date: "Yesterday • 04:45 PM",
    status: "Draft Review",
    views: "0 / 120",
    completion: "0%",
  },
  {
    title: "Ch 10: Microservices, REST APIs, & GraphQL",
    resource: "Video (12m) • API Starter Kit (.zip)",
    course: "CS-105",
    date: "Oct 20, 2024 • 02:15 PM",
    status: "Published",
    views: "79 / 82",
    completion: "94%",
  },
];

export default function RecentChaptersTracker() {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#e7e9ec]">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#e7e9ec] p-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#202327]">

            <span className="h-2 w-2 rounded-full bg-[#5146d8]" />

            Recent Chapters & Delivery Tracker

          </h2>

          <p className="mt-1 text-xs text-[#777b84]">
            Real-time status of recently added curriculum content
            and video processing pipelines.
          </p>

        </div>

        <div className="flex gap-2">

          <button className="flex items-center gap-2 rounded-lg bg-[#f2f3f5] px-3 py-2 text-xs font-medium text-[#44484f]">
            <Filter size={14} />
            Filter
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-[#f2f3f5] px-3 py-2 text-xs font-medium text-[#44484f]">
            <Download size={14} />
            Export Log
          </button>

        </div>

      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">

        <table className="w-full">

          <thead className="bg-[#f3f4f6]">

            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-[#555963]">

              <th className="px-5 py-3">
                Chapter / Resource
              </th>

              <th className="px-4 py-3">
                Course
              </th>

              <th className="px-4 py-3">
                Upload Date
              </th>

              <th className="px-4 py-3">
                Status
              </th>

              <th className="px-4 py-3">
                Student Views
              </th>

              <th className="px-4 py-3">
                Avg Completion
              </th>

              <th className="px-4 py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {chapters.map((chapter, index) => (
              <ChapterRow
                key={index}
                chapter={chapter}
              />
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}
      <div className="divide-y md:hidden">

        {chapters.map((chapter, index) => (
          <div key={index} className="p-4">
            <ChapterRowMobile chapter={chapter} />
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between bg-[#f3f4f6] px-5 py-3 text-xs">

        <span className="text-[#666b74]">
          Displaying 4 most recent chapter updates across all cohorts
        </span>

        <button className="font-semibold text-[#173c91]">
          View Full Curriculum History →
        </button>

      </div>

    </section>
  );
}

function ChapterRow({ chapter }) {
  return (
    <tr className="border-t border-[#edf0f2]">

      <td className="px-5 py-4">

        <div className="flex items-start gap-3">

          <PlayCircle
            size={18}
            className="mt-1 text-[#173c91]"
          />

          <div>

            <p className="max-w-[260px] text-sm font-semibold leading-4 text-[#25282c]">
              {chapter.title}
            </p>

            <p className="mt-1 text-[10px] text-[#777b84]">
              {chapter.resource}
            </p>

          </div>

        </div>

      </td>

      <td className="px-4 py-4">
        <span className="rounded bg-[#e5e7e9] px-2 py-1 text-[10px] font-semibold">
          {chapter.course}
        </span>
      </td>

      <td className="px-4 py-4 text-xs text-[#555963]">
        {chapter.date}
      </td>

      <td className="px-4 py-4">
        <Status status={chapter.status} />
      </td>

      <td className="px-4 py-4 text-xs">
        {chapter.views}
      </td>

      <td className="px-4 py-4">

        {chapter.completion !== "--" && (
          <div className="flex items-center gap-2">

            <span className="text-xs font-semibold">
              {chapter.completion}
            </span>

            <div className="h-1.5 w-14 overflow-hidden rounded-full bg-[#dedfe2]">

              <div
                className="h-full rounded-full bg-[#5146d8]"
                style={{
                  width: chapter.completion,
                }}
              />

            </div>

          </div>
        )}

      </td>

      <td className="px-4 py-4">

        <div className="flex gap-2">

          <button className="text-[#666b74]">
            <Eye size={15} />
          </button>

          <button className="text-[#666b74]">
            <Pencil size={15} />
          </button>

        </div>

      </td>

    </tr>
  );
}

function Status({ status }) {
  const styles = {
    Published: "bg-[#e4ddff] text-[#4234a7]",
    Processing: "bg-[#e7e9ec] text-[#30343a]",
    "Draft Review": "bg-[#e7e9ec] text-[#555963]",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      • {status}
    </span>
  );
}

function ChapterRowMobile({ chapter }) {
  return (
    <div>

      <div className="flex items-start gap-3">

        <PlayCircle
          size={18}
          className="mt-1 text-[#173c91]"
        />

        <div className="flex-1">

          <p className="text-sm font-semibold text-[#25282c]">
            {chapter.title}
          </p>

          <p className="mt-1 text-xs text-[#777b84]">
            {chapter.resource}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            <span className="rounded bg-[#e5e7e9] px-2 py-1 text-[10px] font-semibold">
              {chapter.course}
            </span>

            <Status status={chapter.status} />

          </div>

          <p className="mt-2 text-xs text-[#666b74]">
            {chapter.date}
          </p>

        </div>

        <div className="flex gap-2">
          <Eye size={15} />
          <Pencil size={15} />
        </div>

      </div>

    </div>
  );
}