"use client";

import {
  X,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function DeleteUserModal({
  open,
  user,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!open || !user) return null;

  const name =
    user.student?.firstName ||
    user.teacher?.firstName ||
    user.email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#e0e3e5] bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#e0e3e5] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffdad6]">
              <Trash2
                size={19}
                className="text-[#ba1a1a]"
              />
            </div>

            <div>
              <h2 className="font-[var(--font-jakarta)] text-lg font-semibold text-[#191c1e]">
                Delete User
              </h2>

              <p className="text-xs text-[#757682]">
                This action cannot be undone
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#757682] hover:bg-[#f2f4f6]"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}

        <div className="px-5 py-6 sm:px-6">

          <div className="flex gap-3 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/40 p-4">

            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-[#ba1a1a]"
            />

            <div>
              <p className="text-sm font-semibold text-[#191c1e]">
                Are you sure?
              </p>

              <p className="mt-1 text-sm leading-6 text-[#444651]">
                You are about to permanently delete{" "}
                <span className="font-semibold text-[#191c1e]">
                  {name}
                </span>
                .
              </p>
            </div>

          </div>

          <p className="mt-4 text-sm leading-6 text-[#757682]">
            This may also remove related records
            depending on the database relationships.
          </p>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-[#e0e3e5] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-10 rounded-lg border border-[#e0e3e5] px-5 text-sm font-semibold text-[#4e45d5] hover:bg-[#f2f4f6]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ba1a1a] px-5 text-sm font-semibold text-white transition hover:bg-[#93000a] disabled:cursor-not-allowed disabled:opacity-60"
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

                Delete User
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}