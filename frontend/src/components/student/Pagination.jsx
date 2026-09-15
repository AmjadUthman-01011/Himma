"use client";

export default function UserPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}) {
  // No users
  if (!total || totalPages === 0) {
    return (
      <div className="flex items-center justify-between p-5">
        <p className="text-sm text-[#444651]">
          Showing <strong>0</strong> of <strong>0</strong> users
        </p>
      </div>
    );
  }

  // Calculate displayed range
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  // Generate page numbers
  const getPages = () => {
    const pages = [];

    // Small number of pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Near beginning
    if (page <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "...",
        totalPages,
      ];
    }

    // Near end
    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle
    return [
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between p-5">
      {/* Results information */}
      <p className="text-sm text-[#444651]">
        Showing{" "}
        <strong>
          {start}-{end}
        </strong>{" "}
        of <strong>{total.toLocaleString()}</strong> users
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`rounded-sm border px-3 py-2 transition ${
            page === 1
              ? "cursor-not-allowed opacity-40"
              : "hover:bg-gray-100"
          }`}
        >
          ←
        </button>

        {/* Page numbers */}
        {pages.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`rounded-sm border px-3 py-2 transition ${
                pageNumber === page
                  ? "bg-[#1e3a8a] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`rounded-sm border px-3 py-2 transition ${
            page === totalPages
              ? "cursor-not-allowed opacity-40"
              : "hover:bg-gray-100"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
}
