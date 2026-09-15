const { z } = require("zod");

// =====================================================
// OPTION ID
// =====================================================

const questionOptionIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Option ID must be a positive integer"),
});

// =====================================================
// CREATE OPTION
// =====================================================

const createQuestionOptionSchema = z.object({
  questionId: z.coerce
    .number()
    .int()
    .positive("Question ID must be a positive integer"),

  text: z
    .string()
    .trim()
    .min(1, "Option text is required")
    .max(
      1000,
      "Option text cannot exceed 1000 characters"
    ),

  isCorrect: z
    .boolean()
    .optional()
    .default(false),
});

// =====================================================
// UPDATE OPTION
// =====================================================

const updateQuestionOptionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Option text cannot be empty")
    .max(1000)
    .optional(),

  isCorrect: z
    .boolean()
    .optional(),
});

// =====================================================
// QUERY
// =====================================================

const questionOptionQuerySchema = z.object({
  questionId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),
});

module.exports = {
  questionOptionIdParamSchema,
  createQuestionOptionSchema,
  updateQuestionOptionSchema,
  questionOptionQuerySchema,
};