"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  X,
  ClipboardCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  updateTestSchema,
} from "../validators/test.validator";

export default function EditTestModal({
  open,
  test,
  courses,
  onClose,
  onSubmit,
}) {
  // =====================================================
  // FORM
  // =====================================================

  const [form, setForm] = useState({
    courseId: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    maxScore: "",
  });

  // =====================================================
  // UI STATE
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // =====================================================
  // LOAD TEST
  // =====================================================

  useEffect(() => {
    if (test && open) {
      setForm({
        courseId:
          test.courseId !== undefined &&
          test.courseId !== null
            ? String(test.courseId)
            : "",

        title: test.title || "",

        description:
          test.description || "",

        startDate: test.startDate
          ? formatDateTimeLocal(test.startDate)
          : "",

        endDate: test.endDate
          ? formatDateTimeLocal(test.endDate)
          : "",

        maxScore:
          test.maxScore !== undefined &&
          test.maxScore !== null
            ? String(test.maxScore)
            : "",
      });

      setErrors({});
    }
  }, [test, open]);

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    setErrors({});
    onClose();
  };

  // =====================================================
  // HANDLE CHANGE
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
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const data = {
      courseId:
        form.courseId === ""
          ? undefined
          : Number(form.courseId),

      title: form.title.trim(),

      description:
        form.description.trim(),

      startDate: form.startDate
        ? new Date(
            form.startDate
          ).toISOString()
        : undefined,

      endDate: form.endDate
        ? new Date(
            form.endDate
          ).toISOString()
        : undefined,

      maxScore:
        form.maxScore === ""
          ? undefined
          : Number(form.maxScore),
    };

    const result =
      updateTestSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach(
        (issue) => {
          const field =
            issue.path[0];

          if (
            field &&
            !fieldErrors[field]
          ) {
            fieldErrors[field] =
              issue.message;
          }
        }
      );

      setErrors(fieldErrors);

      return null;
    }

    return result.data;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validatedData =
      validateForm();

    if (!validatedData) {
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Updating test:",
        validatedData
      );

      await onSubmit(validatedData);

      setErrors({});
    } catch (err) {
      console.error(
        "Update test error:",
        err
      );

      // =================================================
      // BACKEND VALIDATION ERROR
      // =================================================

      if (
        err?.message ===
          "Validation failed" &&
        Array.isArray(err?.errors)
      ) {
        const backendErrors = {};

        err.errors.forEach(
          (error) => {
            if (
              error?.field &&
              error?.message
            ) {
              if (
                !backendErrors[
                  error.field
                ]
              ) {
                backendErrors[
                  error.field
                ] =
                  error.message;
              }
            }
          }
        );

        if (
          Object.keys(
            backendErrors
          ).length > 0
        ) {
          setErrors(
            backendErrors
          );
        } else {
          setErrors({
            _form:
              "Validation failed. Please check the form.",
          });
        }

        return;
      }

      // =================================================
      // GENERAL ERROR
      // =================================================

      setErrors({
        _form:
          err?.message ||
          "Failed to update test. Please try again.",
      });
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
          flex
          max-h-[90vh]
          w-full
          max-w-2xl
          flex-col
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
                shrink-0
                items-center
                justify-center
                rounded-sm
                bg-[#dce1ff]
              "
            >
              <ClipboardCheck
                size={19}
                className="text-[#00236f]"
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
                Edit Test
              </h2>

              <p className="text-xs text-[#757682]">
                Update test information
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
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
            flex
            min-h-0
            flex-1
            flex-col
          "
        >

          {/* =================================================
              BODY
          ================================================= */}

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
              <GeneralError
                message={errors._form}
              />
            )}

            <div
              className="
                grid
                grid-cols-1
                gap-x-5
                gap-y-5
                sm:grid-cols-2
              "
            >

              {/* =================================================
                  COURSE CODE
              ================================================= */}

              <FormSelect
                label="Course Code"
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                error={errors.courseId}
                required
              >
                <option value="">
                  Select a course
                </option>

                {courses?.map(
                  (course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.code}
                      {course.name
                        ? ` — ${course.name}`
                        : ""}
                    </option>
                  )
                )}
              </FormSelect>

              {/* =================================================
                  TITLE
              ================================================= */}

              <FormInput
                label="Test Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Data Structures Test 1"
                error={errors.title}
                required
              />

              {/* =================================================
                  START DATE
              ================================================= */}

              <FormInput
                label="Start Date"
                name="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={handleChange}
                error={errors.startDate}
                required
              />

              {/* =================================================
                  END DATE
              ================================================= */}

              <FormInput
                label="End Date"
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                error={errors.endDate}
                required
              />

              {/* =================================================
                  MAX SCORE
              ================================================= */}

              <FormInput
                label="Maximum Score"
                name="maxScore"
                type="number"
                value={form.maxScore}
                onChange={handleChange}
                placeholder="e.g. 100"
                error={errors.maxScore}
                min="1"
                step="1"
                required
              />

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="sm:col-span-2">

                <label
                  htmlFor="description"
                  className="
                    mb-1.5
                    block
                    text-sm
                    font-semibold
                    text-[#191c1e]
                  "
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                  rows={5}
                  placeholder="Enter a description for this test..."
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
                    transition
                    placeholder:text-[#9a9ba3]

                    ${
                      errors.description
                        ? `
                          border-[#ba1a1a]
                          focus:border-[#ba1a1a]
                          focus:ring-2
                          focus:ring-[#ba1a1a]/15
                        `
                        : `
                          border-[#c5c5d3]
                          focus:border-[#4e45d5]
                          focus:ring-2
                          focus:ring-[#4e45d5]/20
                        `
                    }
                  `}
                />

                {errors.description && (
                  <FieldError
                    message={
                      errors.description
                    }
                  />
                )}

              </div>

            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              flex
              shrink-0
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
                transition
                hover:bg-[#00236f]
                disabled:cursor-not-allowed
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
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

// =====================================================
// DATE FORMATTER
// =====================================================

function formatDateTimeLocal(date) {
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "";
  }

  const pad = (value) =>
    String(value).padStart(2, "0");

  return `${d.getFullYear()}-${pad(
    d.getMonth() + 1
  )}-${pad(
    d.getDate()
  )}T${pad(
    d.getHours()
  )}:${pad(
    d.getMinutes()
  )}`;
}

// =====================================================
// INPUT
// =====================================================

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  min,
  step,
}) {
  return (
    <div>

      <label
        htmlFor={name}
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
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        className={`
          h-10
          w-full
          rounded-sm
          border
          px-3
          text-sm
          text-[#191c1e]
          outline-none
          transition
          placeholder:text-[#9a9ba3]

          ${
            error
              ? `
                border-[#ba1a1a]
                focus:border-[#ba1a1a]
                focus:ring-2
                focus:ring-[#ba1a1a]/15
              `
              : `
                border-[#c5c5d3]
                focus:border-[#4e45d5]
                focus:ring-2
                focus:ring-[#4e45d5]/20
              `
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
  required = false,
  children,
}) {
  return (
    <div>

      <label
        htmlFor={name}
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
        id={name}
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
          text-[#191c1e]
          outline-none
          transition

          ${
            error
              ? `
                border-[#ba1a1a]
                focus:border-[#ba1a1a]
                focus:ring-2
                focus:ring-[#ba1a1a]/15
              `
              : `
                border-[#c5c5d3]
                focus:border-[#4e45d5]
                focus:ring-2
                focus:ring-[#4e45d5]/20
              `
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
// FIELD ERROR
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
        className="mt-0.5 shrink-0"
      />

      <span>{message}</span>
    </div>
  );
}

// =====================================================
// GENERAL ERROR
// =====================================================

function GeneralError({
  message,
}) {
  return (
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

      <span>{message}</span>
    </div>
  );
}