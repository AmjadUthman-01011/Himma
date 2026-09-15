const { z } = require("zod");

// =====================================================
// SUBMISSION ID
// =====================================================

const submissionIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Submission ID must be a positive integer"),
});

// =====================================================
// CREATE SUBMISSION
// =====================================================

const createSubmissionSchema = z.object({
  testId: z.coerce
    .number()
    .int()
    .positive("Test ID must be a positive integer"),

  fileUrl: z
    .string()
    .trim()
    .url("File URL must be a valid URL")
    .optional()
    .nullable(),
});

// =====================================================
// UPDATE SUBMISSION
// Student can update file while IN_PROGRESS
// =====================================================

const updateSubmissionSchema = z.object({
  fileUrl: z
    .string()
    .trim()
    .url("File URL must be a valid URL")
    .optional()
    .nullable(),
});

// =====================================================
// GRADE SUBMISSION
// Teacher/Admin only
// =====================================================

const gradeSubmissionSchema = z.object({
  score: z.coerce
    .number()
    .min(0, "Score cannot be negative")
    .max(
      100000,
      "Score is too large"
    ),

  feedback: z
    .string()
    .trim()
    .max(
      5000,
      "Feedback cannot exceed 5000 characters"
    )
    .optional()
    .nullable(),

  status: z
    .enum(["GRADED", "SUBMITTED"])
    .optional(),
});

// =====================================================
// UPDATE STATUS
// =====================================================

const submissionStatusSchema = z.object({
  status: z.enum([
    "IN_PROGRESS",
    "SUBMITTED",
    "GRADED",
  ]),
});

// =====================================================
// QUERY
// =====================================================

const submissionQuerySchema = z.object({
  testId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  studentId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  status: z
    .enum([
      "IN_PROGRESS",
      "SUBMITTED",
      "GRADED",
    ])
    .optional(),

  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(20),
});

module.exports = {
  submissionIdParamSchema,
  createSubmissionSchema,
  updateSubmissionSchema,
  gradeSubmissionSchema,
  submissionStatusSchema,
  submissionQuerySchema,
};