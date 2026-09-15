"use client";

import {
  Download,
  FileText,
  FolderOpen,
} from "lucide-react";

export default function CourseResources({
  resources,
}) {

  return (
    <div
      className="
        rounded-sm
        border
        border-[#d2d5dc]
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2 className="mb-5 text-xl font-semibold text-[#191c1e]">
        Resources
      </h2>


      <div className="space-y-4">

        {resources.map((resource) => (

          <div
            key={resource.id}
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* File icon */}

            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-md
                ${
                  resource.type === "pdf"
                    ? "bg-[#fff0f0] text-red-500"
                    : "bg-[#edf0f7] text-[#00236f]"
                }
              `}
            >

              {resource.type === "pdf" ? (
                <FileText size={20} />
              ) : (
                <FolderOpen size={20} />
              )}

            </div>


            {/* Information */}

            <div className="min-w-0 flex-1">

              <p
                className="
                  truncate
                  text-xs
                  font-semibold
                  text-[#191c1e]
                "
              >
                {resource.name}
              </p>

              <p className="mt-1 text-[11px] text-[#555963]">
                {resource.size}
              </p>

            </div>


            {/* Download */}

            <button
              type="button"
              className="
                text-[#b2b6c1]
                transition
                hover:text-[#00236f]
              "
              aria-label={`Download ${resource.name}`}
            >
              <Download size={18} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}