"use client";

import { useEffect, useState } from "react";
import {
  X,
  ShieldCheck,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function ChangeRoleModal({
  open,
  user,
  onClose,
  onSubmit,
}) {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && open) {
      setRole(user.role);
      setError("");
    }
  }, [user, open]);

  if (!open || !user) return null;

  const roleChanged = role !== user.role;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleChanged) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onSubmit(role);
    } catch (err) {
      setError(
        err.message || "Failed to change user role."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#e0e3e5] bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#e0e3e5] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dce1ff]">
              <ShieldCheck
                size={19}
                className="text-[#00236f]"
              />
            </div>

            <div>
              <h2 className="font-[var(--font-jakarta)] text-lg font-semibold text-[#191c1e]">
                Change Role
              </h2>

              <p className="text-xs text-[#757682]">
                Update user permissions
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-sm p-2 text-[#757682] hover:bg-[#f2f4f6]"
          >
            <X size={20} />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="px-5 py-5 sm:px-6">

            {error && (
              <div className="mb-5 rounded-sm border border-[#ffdad6] bg-[#ffdad6]/60 px-4 py-3 text-sm text-[#93000a]">
                {error}
              </div>
            )}

            {/* User */}

            <div className="mb-5 rounded-sm bg-[#f2f4f6] p-4">

              <p className="text-sm font-semibold text-[#191c1e]">
                {user.student?.firstName ||
                  user.teacher?.firstName ||
                  user.email}
              </p>

              <p className="mt-1 text-xs text-[#757682]">
                {user.email}
              </p>

            </div>

            {/* Role */}

            <label className="mb-1.5 block text-sm font-semibold text-[#191c1e]">
              New Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="h-10 w-full rounded-sm border border-[#c5c5d3] bg-white px-3 text-sm text-[#191c1e] outline-none focus:border-[#4e45d5] focus:ring-2 focus:ring-[#4e45d5]/20"
            >
              <option value="STUDENT">
                Student
              </option>

              <option value="TEACHER">
                Teacher
              </option>

              <option value="ADMIN">
                Admin
              </option>
            </select>

            {/* Warning */}

            {roleChanged && (
              <div className="mt-4 flex gap-3 rounded-sm border border-[#f0d9a6] bg-[#fff8e6] p-3">

                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-[#8a6500]"
                />

                <p className="text-xs leading-5 text-[#5f4b00]">
                  Changing the role may change the
                  user's profile. Student and Teacher
                  profiles will be converted automatically.
                </p>

              </div>
            )}

          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#e0e3e5] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-10 rounded-sm border border-[#e0e3e5] px-5 text-sm font-semibold text-[#4e45d5] hover:bg-[#f2f4f6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !roleChanged}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#1e3a8a] px-5 text-sm font-semibold text-white hover:bg-[#00236f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Updating..."
                : "Change Role"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}