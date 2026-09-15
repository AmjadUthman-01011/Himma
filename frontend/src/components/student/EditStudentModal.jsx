"use client";

import { useEffect, useState } from "react";
import { X, UserPen, Loader2 } from "lucide-react";

export default function EditStudentModal({
  open,
  user,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && open) {
      const profile = user.student || user.teacher;

      setForm({
        email: user.email || "",
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        phone: profile?.phone || "",
      });

      setError("");
    }
  }, [user, open]);

  if (!open || !user) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.firstName || !form.lastName) {
      setError(
        "Email, first name, and last name are required."
      );
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || null,
      });
    } catch (err) {
      setError(err.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell
      title="Edit User"
      description="Update user profile information"
      icon={<UserPen size={19} className="text-[#00236f]" />}
      onClose={onClose}
      loading={loading}
    >
      <form onSubmit={handleSubmit}>

        <div className="px-5 py-5 sm:px-6">

          {error && (
            <ErrorMessage message={error} />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <FormInput
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <div className="sm:col-span-2">
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <FormInput
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        <ModalFooter
          onClose={onClose}
          loading={loading}
          submitText="Save Changes"
        />

      </form>
    </ModalShell>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#191c1e]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-10 w-full rounded-lg border border-[#c5c5d3] px-3 text-sm outline-none focus:border-[#4e45d5] focus:ring-2 focus:ring-[#4e45d5]/20"
      />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="mb-5 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/60 px-4 py-3 text-sm text-[#93000a]">
      {message}
    </div>
  );
}

function ModalShell({
  title,
  description,
  icon,
  onClose,
  loading,
  children,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-sm border border-[#e0e3e5] bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-[#e0e3e5] px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dce1ff]">
              {icon}
            </div>

            <div>
              <h2 className="font-[var(--font-jakarta)] text-lg font-semibold text-[#191c1e]">
                {title}
              </h2>

              <p className="text-xs text-[#757682]">
                {description}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-sm-2 text-[#757682] hover:bg-[#f2f4f6]"
          >
            <X size={20} />
          </button>

        </div>

        {children}

      </div>
    </div>
  );
}

function ModalFooter({
  onClose,
  loading,
  submitText,
}) {
  return (
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
        disabled={loading}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#1e3a8a] px-5 text-sm font-semibold text-white hover:bg-[#00236f] disabled:opacity-60"
      >
        {loading && (
          <Loader2
            size={17}
            className="animate-spin"
          />
        )}

        {loading ? "Saving..." : submitText}
      </button>

    </div>
  );
}