const { z } = require("zod");

// =====================================================
// QUESTION TYPES
// =====================================================

const questionTypes = [
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "SHORT_ANSWER",
];

// =====================================================
// QUESTION ID PARAM
// =====================================================

const questionIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Question ID must be a positive integer"),
});

// =====================================================
// CREATE QUESTION
// =====================================================

const createQuestionSchema = z.object({
  testId: z.coerce
    .number()
    .int()
    .positive("Test ID must be a positive integer"),

  text: z
    .string()
    .trim()
    .min(1, "Question text is required")
    .max(
      2000,
      "Question text cannot exceed 2000 characters"
    ),

  type: z.enum(questionTypes, {
    message:
      "Question type must be MULTIPLE_CHOICE, TRUE_FALSE, or SHORT_ANSWER",
  }),

  points: z.coerce
    .number()
    .positive("Points must be greater than 0")
    .max(1000, "Points cannot exceed 1000")
    .optional(),

  order: z.coerce
    .number()
    .int()
    .positive("Order must be a positive integer")
    .optional(),
});

// =====================================================
// UPDATE QUESTION
// =====================================================

const updateQuestionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Question text cannot be empty")
    .max(2000)
    .optional(),

  type: z
    .enum(questionTypes, {
      message:
        "Question type must be MULTIPLE_CHOICE, TRUE_FALSE, or SHORT_ANSWER",
    })
    .optional(),

  points: z.coerce
    .number()
    .positive("Points must be greater than 0")
    .max(1000)
    .optional(),

  order: z.coerce
    .number()
    .int()
    .positive()
    .optional(),
});

// =====================================================
// QUERY
// =====================================================

const questionQuerySchema = z.object({
  testId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  type: z
    .enum(questionTypes, {
      message:
        "Invalid question type",
    })
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
  questionIdParamSchema,
  createQuestionSchema,
  updateQuestionSchema,
  questionQuerySchema,
};