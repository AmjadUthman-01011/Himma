"use client";

import { useEffect, useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";

const initialForm = {
  email: "",
  password: "",
  role: "TEACHER",
  firstName: "",
  lastName: "",
  phone: "",
};

export default function CreateTeacherModal({
  open,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    if (!form.firstName || !form.lastName) {
      setError("First name and last name are required.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || null,
      });

      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Failed to create Teacher.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6 backdrop-blur-sm">

      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-sm
          border
          border-[#e0e3e5]
          bg-white
          shadow-xl
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e0e3e5] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dce1ff]">
              <UserPlus
                size={19}
                className="text-[#00236f]"
              />
            </div>

            <div>
              <h2 className="font-[var(--font-jakarta)] text-lg font-semibold text-[#191c1e]">
                Create Teacher
              </h2>

              <p className="text-xs text-[#757682]">
                Add a new system Teacher
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-sm p-2 text-[#757682] transition hover:bg-[#f2f4f6] hover:text-[#191c1e]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>

          <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6">

            {error && (
              <div className="mb-5 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/60 px-4 py-3 text-sm text-[#93000a]">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* First Name */}
              <FormInput
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />

              {/* Last Name */}
              <FormInput
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Smith"
                required
              />

              {/* Email */}
              <div className="sm:col-span-2">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Password */}
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              {/* Phone */}
              <FormInput
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+961..."
              />

            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#e0e3e5] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-10 rounded-sm border border-[#e0e3e5] px-5 text-sm font-semibold text-[#4e45d5] transition hover:bg-[#f2f4f6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#1e3a8a] px-5 text-sm font-semibold text-white transition hover:bg-[#00236f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading ? "Creating..." : "Create Teacher"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block font-[var(--font-inter)] text-sm font-semibold text-[#191c1e]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-lg border border-[#c5c5d3] bg-white px-3 text-sm text-[#191c1e] outline-none transition placeholder:text-[#757682] focus:border-[#4e45d5] focus:ring-2 focus:ring-[#4e45d5]/20"
      />
    </div>
  );
}