"use client";

import {
  useState,
} from "react";

export default function ChapterTabs() {

  const [activeTab, setActiveTab] =
    useState("notes");

  return (
    <div className="mt-5">

      <div
        className="
          flex
          gap-8
          border-b
          border-[#cfd2da]
        "
      >

        <button
          type="button"
          onClick={() => setActiveTab("notes")}
          className={`
            relative
            pb-3
            text-sm
            font-semibold
            tracking-wide
            transition
            ${
              activeTab === "notes"
                ? "text-[#00236f]"
                : "text-[#444651]"
            }
          `}
        >
          Notes

          {activeTab === "notes" && (
            <span
              className="
                absolute
                bottom-[-1px]
                left-0
                right-0
                h-0.5
                bg-[#00236f]
              "
            />
          )}
        </button>


        <button
          type="button"
          onClick={() => setActiveTab("discussion")}
          className={`
            relative
            pb-3
            text-sm
            font-semibold
            tracking-wide
            transition
            ${
              activeTab === "discussion"
                ? "text-[#00236f]"
                : "text-[#444651]"
            }
          `}
        >
          Discussion

          {activeTab === "discussion" && (
            <span
              className="
                absolute
                bottom-[-1px]
                left-0
                right-0
                h-0.5
                bg-[#00236f]
              "
            />
          )}
        </button>

      </div>

    </div>
  );
}