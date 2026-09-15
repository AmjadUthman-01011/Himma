"use client";

export default function CoursePagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}) {
  if (!total || totalPages <= 1) {
    return null;
  }

  const start =
    (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    total
  );

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const startPage = Math.max(
      2,
      page - 1
    );

    const endPage = Math.min(
      totalPages - 1,
      page + 1
    );

    for (
      let i = startPage;
      i <= endPage;
      i++
    ) {
      pages.push(i);
    }

    if (
      page < totalPages - 2
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 border-t border-[#e0e3e5] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

      {/* RESULTS */}

      <p className="text-sm text-[#444651]">
        Showing{" "}
        <strong>
          {start}-{end}
        </strong>{" "}
        of{" "}
        <strong>
          {total}
        </strong>{" "}
        courses
      </p>

      {/* PAGINATION */}

      <div className="flex items-center gap-1">

        {/* PREVIOUS */}

        <button
          type="button"
          disabled={page === 1}
          onClick={() =>
            onPageChange(
              page - 1
            )
          }
          className="
            flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-sm
            border
            border-[#e0e3e5]
            px-2
            text-sm
            text-[#444651]
            transition
            hover:bg-[#f2f4f6]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          ←
        </button>

        {/* PAGE NUMBERS */}

        {getPages().map(
          (item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-2 text-sm text-[#757682]"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onPageChange(
                    item
                  )
                }
                className={`
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-sm
                  px-2
                  text-sm
                  font-medium
                  transition
                  ${
                    page === item
                      ? "bg-[#1e3a8a] text-white"
                      : "border border-[#e0e3e5] text-[#444651] hover:bg-[#f2f4f6]"
                  }
                `}
              >
                {item}
              </button>
            )
        )}

        {/* NEXT */}

        <button
          type="button"
          disabled={
            page === totalPages
          }
          onClick={() =>
            onPageChange(
              page + 1
            )
          }
          className="
            flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-sm
            border
            border-[#e0e3e5]
            px-2
            text-sm
            text-[#444651]
            transition
            hover:bg-[#f2f4f6]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          →
        </button>

      </div>

    </div>
  );
}