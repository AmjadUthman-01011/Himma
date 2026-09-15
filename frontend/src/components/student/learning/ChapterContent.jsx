"use client";

export default function ChapterContent({
  chapter,
}) {

  return (
    <article
      className="
        py-8
        text-[15px]
        leading-7
        text-[#30333c]
      "
    >

      <p>
        {chapter.description}
      </p>


      <p className="mt-6">
        In this chapter, we will explore the origins
        and development of psychological thought.
        We will examine the work of early pioneers
        and understand how psychology developed into
        a scientific discipline.
      </p>


      {/* Learning objectives */}

      <div className="mt-8">

        <h2
          className="
            mb-4
            text-lg
            font-semibold
            text-[#191c1e]
          "
        >
          Learning Objectives
        </h2>

        <ul className="space-y-3">

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-[#00236f]" />

            <span>
              Understand the historical foundations
              of psychology.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-[#00236f]" />

            <span>
              Identify major schools of psychological thought.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-[#00236f]" />

            <span>
              Explain the contributions of early
              psychology pioneers.
            </span>
          </li>

        </ul>

      </div>

    </article>
  );
}