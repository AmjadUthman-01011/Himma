const { z } = require("zod");

// =====================================================
// TEST ID PARAM
// =====================================================

const testIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Test ID must be a positive integer"),
});

// =====================================================
// CREATE TEST
// =====================================================

const createTestSchema = z
  .object({
    courseId: z.coerce
      .number()
      .int()
      .positive("Course ID must be a positive integer"),

    title: z
      .string()
      .trim()
      .min(1, "Test title is required")
      .max(200, "Test title cannot exceed 200 characters"),

    description: z
      .string()
      .trim()
      .max(2000, "Description cannot exceed 2000 characters")
      .optional()
      .nullable(),

    startDate: z
      .string()
      .datetime({
        message: "Start date must be a valid ISO date",
      })
      .optional()
      .nullable(),

    endDate: z
      .string()
      .datetime({
        message: "End date must be a valid ISO date",
      })
      .optional()
      .nullable(),

    maxScore: z.coerce
      .number()
      .positive("Maximum score must be greater than 0")
      .max(1000, "Maximum score cannot exceed 1000")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }

      return (
        new Date(data.startDate) <
        new Date(data.endDate)
      );
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

// =====================================================
// UPDATE TEST
// =====================================================

const updateTestSchema = z
  .object({
    courseId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    title: z
      .string()
      .trim()
      .min(1, "Test title cannot be empty")
      .max(200)
      .optional(),

    description: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .nullable(),

    startDate: z
      .string()
      .datetime({
        message: "Start date must be a valid ISO date",
      })
      .optional()
      .nullable(),

    endDate: z
      .string()
      .datetime({
        message: "End date must be a valid ISO date",
      })
      .optional()
      .nullable(),

    maxScore: z.coerce
      .number()
      .positive()
      .max(1000)
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }

      return (
        new Date(data.startDate) <
        new Date(data.endDate)
      );
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

// =====================================================
// TEST QUERY
// =====================================================

const testQuerySchema = z.object({
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
    .default(10),

  search: z
    .string()
    .trim()
    .max(200)
    .optional(),

  courseId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  teacherId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),
});

module.exports = {
  testIdParamSchema,
  createTestSchema,
  updateTestSchema,
  testQuerySchema,
};