"use client";

import { useState } from "react";

import {
  AlertTriangle,
  X,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function DeleteTestModal({
  open,
  test,
  onClose,
  onConfirm,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    setError("");
    onClose();
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {
    if (!test || loading) return;

    setError("");

    try {
      setLoading(true);

      await onConfirm();

      // Parent normally closes the modal
    } catch (err) {
      console.error(
        "Delete test error:",
        err
      );

      setError(
        err?.message ||
          "Failed to delete test. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  if (!open || !test) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
        py-6
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-sm
          border
          border-[#e0e3e5]
          bg-white
          shadow-2xl
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#e0e3e5]
            px-5
            py-4
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-sm
                bg-[#ffdad6]
              "
            >
              <Trash2
                size={19}
                className="text-[#ba1a1a]"
              />
            </div>

            <div>
              <h2
                className="
                  font-[var(--font-jakarta)]
                  text-lg
                  font-semibold
                  text-[#191c1e]
                "
              >
                Delete Test
              </h2>

              <p className="text-xs text-[#757682]">
                This action cannot be undone
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              rounded-sm
              p-2
              text-[#757682]
              transition
              hover:bg-[#f2f4f6]
              hover:text-[#191c1e]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="px-5 py-6 sm:px-6">

          {/* ERROR */}

          {error && (
            <div
              className="
                mb-5
                flex
                items-start
                gap-3
                rounded-sm
                border
                border-[#ffdad6]
                bg-[#ffdad6]/60
                px-4
                py-3
                text-sm
                text-[#93000a]
              "
            >
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-semibold">
                  Delete failed
                </p>

                <p className="mt-1 leading-5">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* WARNING */}

          <div
            className="
              flex
              gap-3
              rounded-sm
              border
              border-[#ffdad6]
              bg-[#ffdad6]/40
              p-4
            "
          >
            <AlertTriangle
              size={20}
              className="
                mt-0.5
                shrink-0
                text-[#ba1a1a]
              "
            />

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-[#191c1e]
                "
              >
                Are you sure?
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-[#444651]
                "
              >
                You are about to permanently
                delete{" "}

                <span
                  className="
                    font-semibold
                    text-[#191c1e]
                  "
                >
                  {test.title}
                </span>
                .
              </p>

            </div>
          </div>

          {/* TEST INFORMATION */}

          <div
            className="
              mt-4
              rounded-sm
              border
              border-[#e0e3e5]
              bg-[#f7f9fb]
              p-4
            "
          >

            <div className="space-y-2 text-sm">

              {/* COURSE */}

              <div className="flex justify-between gap-4">
                <span className="text-[#757682]">
                  Course
                </span>

                <span className="text-right font-medium text-[#191c1e]">
                  {test.course?.code ||
                    test.courseCode ||
                    "—"}
                </span>
              </div>

              {/* MAX SCORE */}

              <div className="flex justify-between gap-4">
                <span className="text-[#757682]">
                  Max Score
                </span>

                <span className="font-medium text-[#191c1e]">
                  {test.maxScore ?? "—"}
                </span>
              </div>

              {/* START DATE */}

              <div className="flex justify-between gap-4">
                <span className="text-[#757682]">
                  Starts
                </span>

                <span className="text-right font-medium text-[#191c1e]">
                  {test.startDate
                    ? new Date(
                        test.startDate
                      ).toLocaleString()
                    : "—"}
                </span>
              </div>

              {/* END DATE */}

              <div className="flex justify-between gap-4">
                <span className="text-[#757682]">
                  Ends
                </span>

                <span className="text-right font-medium text-[#191c1e]">
                  {test.endDate
                    ? new Date(
                        test.endDate
                      ).toLocaleString()
                    : "—"}
                </span>
              </div>

            </div>

          </div>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-[#757682]
            "
          >
            Deleting this test may also remove
            its questions, options, submissions,
            and answers depending on your
            database relationships.
          </p>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-[#e0e3e5]
            bg-white
            px-5
            py-4
            sm:flex-row
            sm:justify-end
            sm:px-6
          "
        >

          {/* CANCEL */}

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              h-10
              rounded-sm
              border
              border-[#d5d7dc]
              px-5
              text-sm
              font-semibold
              text-[#4e45d5]
              transition
              hover:bg-[#f2f4f6]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-sm
              bg-[#ba1a1a]
              px-5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#93000a]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={17} />

                Delete Test
              </>
            )}

          </button>

        </div>

      </div>
    </div>
  );
}