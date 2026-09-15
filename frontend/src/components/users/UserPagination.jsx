"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UserPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}) {
  // Normalize values
  const currentPage = Number(page) || 1;
  const pagesCount = Number(totalPages) || 1;
  const totalUsers = Number(total) || 0;
  const pageLimit = Number(limit) || 10;

  // =====================================================
  // NO USERS
  // =====================================================

  if (totalUsers === 0) {
    return (
      <div className="flex items-center justify-between border-t border-[#e0e3e5] px-5 py-4">
        <p className="text-sm text-[#444651]">
          Showing <strong>0</strong> of <strong>0</strong> users
        </p>
      </div>
    );
  }

  // =====================================================
  // DISPLAY RANGE
  // =====================================================

  const start = (currentPage - 1) * pageLimit + 1;

  const end = Math.min(
    currentPage * pageLimit,
    totalUsers
  );

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

  const getPages = () => {
    const pages = [];

    if (pagesCount <= 7) {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Beginning
    if (currentPage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "...",
        pagesCount,
      ];
    }

    // End
    if (currentPage >= pagesCount - 3) {
      return [
        1,
        "...",
        pagesCount - 4,
        pagesCount - 3,
        pagesCount - 2,
        pagesCount - 1,
        pagesCount,
      ];
    }

    // Middle
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      pagesCount,
    ];
  };

  const pages = getPages();

  // =====================================================
  // SAFE PAGE CHANGE
  // =====================================================

  const changePage = (newPage) => {
    const nextPage = Number(newPage);

    if (
      nextPage < 1 ||
      nextPage > pagesCount ||
      nextPage === currentPage
    ) {
      return;
    }

    onPageChange(nextPage);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-[#e0e3e5]
        px-5
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* RESULTS */}

      <p className="text-sm text-[#444651]">
        Showing{" "}
        <strong>
          {start}-{end}
        </strong>{" "}
        of{" "}
        <strong>
          {totalUsers.toLocaleString()}
        </strong>{" "}
        users
      </p>

      {/* PAGINATION */}

      <div className="flex items-center gap-1.5">

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={() =>
            changePage(currentPage - 1)
          }
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-sm
            border
            border-[#d5d7dc]
            text-[#444651]
            transition
            hover:bg-[#f2f4f6]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft size={17} />
        </button>

        {/* PAGE NUMBERS */}

        {pages.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  text-sm
                  text-[#757682]
                "
              >
                ...
              </span>
            );
          }

          const isActive =
            pageNumber === currentPage;

          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() =>
                changePage(pageNumber)
              }
              aria-current={
                isActive
                  ? "page"
                  : undefined
              }
              className={`
                inline-flex
                h-9
                min-w-9
                items-center
                justify-center
                rounded-sm
                border
                px-2.5
                text-sm
                font-medium
                transition

                ${
                  isActive
                    ? "border-[#1e3a8a] bg-[#1e3a8a] text-white"
                    : "border-[#d5d7dc] text-[#444651] hover:bg-[#f2f4f6]"
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* NEXT */}

        <button
          type="button"
          onClick={() =>
            changePage(currentPage + 1)
          }
          disabled={
            currentPage >= pagesCount
          }
          aria-label="Next page"
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-sm
            border
            border-[#d5d7dc]
            text-[#444651]
            transition
            hover:bg-[#f2f4f6]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronRight size={17} />
        </button>

      </div>
    </div>
  );
}