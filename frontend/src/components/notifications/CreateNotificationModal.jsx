"use client";

import { useState } from "react";

import {
  X,
  Bell,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function CreateNotificationModal({
  open,
  users,
  onClose,
  onSubmit,
}) {
  
  const [form, setForm] = useState({
    userId: "",
    title: "",
    message: "",
    type: "COURSE",
  });

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setForm({
      userId: "",
      title: "",
      message: "",
      type: "COURSE",
    });

    setErrors({});
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const next = {
        ...prev,
      };

      delete next[name];
      delete next._form;

      return next;
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const data = {
      userId: Number(form.userId),
      title: form.title.trim(),
      message: form.message.trim(),
      type: form.type,
    };

    // ===================================================
    // CLIENT VALIDATION
    // ===================================================

    const newErrors = {};

    if (!form.userId) {
      newErrors.userId =
        "Please select a user.";
    }

    if (!data.title) {
      newErrors.title =
        "Title is required.";
    }

    if (!data.message) {
      newErrors.message =
        "Message is required.";
    }

    if (!data.type) {
      newErrors.type =
        "Notification type is required.";
    }

    if (
      Object.keys(newErrors).length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    // ===================================================
    // API
    // ===================================================

    try {
      setLoading(true);

      await onSubmit(data);

      resetForm();
    } catch (err) {
      console.error(
        "Create notification error:",
        err
      );

      if (
        err?.message ===
          "Validation failed" &&
        Array.isArray(err?.errors)
      ) {
        const backendErrors = {};

        err.errors.forEach((error) => {
          if (
            error?.field &&
            error?.message
          ) {
            backendErrors[
              error.field
            ] = error.message;
          }
        });

        if (
          Object.keys(
            backendErrors
          ).length
        ) {
          setErrors(
            backendErrors
          );
        } else {
          setErrors({
            _form:
              "Validation failed.",
          });
        }
      } else {
        setErrors({
          _form:
            err?.message ||
            "Failed to create notification.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
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
          flex
          w-full
          max-w-2xl
          max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-sm
          border
          border-[#e0e3e5]
          bg-white
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
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
                items-center
                justify-center
                rounded-sm
                bg-[#dce1ff]
              "
            >
              <Bell
                size={19}
                className="text-[#00236f]"
              />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-[#191c1e]
                "
              >
                Create Notification
              </h2>

              <p className="text-xs text-[#757682]">
                Send a notification to a user
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
              hover:bg-[#f2f4f6]
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              px-5
              py-5
              sm:px-6
            "
          >

            {errors._form && (
              <div
                className="
                  mb-5
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
                {errors._form}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* USER */}

              <FormSelect
                label="Recipient"
                name="userId"
                value={form.userId}
                onChange={handleChange}
                error={errors.userId}
                required
              >
                <option value="">
                  Select a user
                </option>

                {users.map((user) => (
                  
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.firstName ||
                    user.lastName
                      ? `${user.firstName || ""} ${
                          user.lastName || ""
                        }`.trim()
                      : user.email ||
                        `User #${user.id}`}
                  </option>
                ))}
              </FormSelect>

              {/* TYPE */}

              <FormSelect
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                error={errors.type}
                required
              >
                <option value="COURSE">
                  Course
                </option>

                <option value="TEST">
                  Test
                </option>

                <option value="ASSIGNMENT">
                  Assignment
                </option>

                <option value="GRADE">
                  Grade
                </option>

                <option value="SYSTEM">
                  System
                </option>

                <option value="GENERAL">
                  General
                </option>
              </FormSelect>

              {/* TITLE */}

              <FormInput
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. New Course"
                error={errors.title}
                required
              />

              {/* MESSAGE */}

              <div className="sm:col-span-2">

                <label
                  className="
                    mb-1.5
                    block
                    text-sm
                    font-semibold
                    text-[#191c1e]
                  "
                >
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter notification message..."
                  className={`
                    w-full
                    resize-none
                    rounded-sm
                    border
                    px-3
                    py-2.5
                    text-sm
                    text-[#191c1e]
                    outline-none

                    ${
                      errors.message
                        ? "border-[#ba1a1a]"
                        : "border-[#c5c5d3]"
                    }
                  `}
                />

                {errors.message && (
                  <FieldError
                    message={
                      errors.message
                    }
                  />
                )}

              </div>

            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-[#e0e3e5]
              px-5
              py-4
              sm:flex-row
              sm:justify-end
              sm:px-6
            "
          >

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
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-sm
                bg-[#1e3a8a]
                px-5
                text-sm
                font-semibold
                text-white
                hover:bg-[#00236f]
                disabled:opacity-60
              "
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Creating..."
                : "Create Notification"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

// =====================================================
// INPUT
// =====================================================

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
}) {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-sm
          font-semibold
          text-[#191c1e]
        "
      >
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          h-10
          w-full
          rounded-sm
          border
          px-3
          text-sm
          outline-none

          ${
            error
              ? "border-[#ba1a1a]"
              : "border-[#c5c5d3]"
          }
        `}
      />

      {error && (
        <FieldError
          message={error}
        />
      )}
    </div>
  );
}

// =====================================================
// SELECT
// =====================================================

function FormSelect({
  label,
  name,
  value,
  onChange,
  error,
  required,
  children,
}) {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-sm
          font-semibold
          text-[#191c1e]
        "
      >
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          h-10
          w-full
          rounded-sm
          border
          bg-white
          px-3
          text-sm
          outline-none

          ${
            error
              ? "border-[#ba1a1a]"
              : "border-[#c5c5d3]"
          }
        `}
      >
        {children}
      </select>

      {error && (
        <FieldError
          message={error}
        />
      )}
    </div>
  );
}

// =====================================================
// ERROR
// =====================================================

function FieldError({
  message,
}) {
  return (
    <div
      className="
        mt-1.5
        flex
        items-start
        gap-1.5
        text-xs
        font-medium
        text-[#ba1a1a]
      "
    >
      <AlertCircle
        size={13}
        className="mt-0.5"
      />

      <span>{message}</span>
    </div>
  );
}