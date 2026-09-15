const { z } = require("zod");

// =====================================================
// ANSWER ID
// =====================================================

const answerIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Answer ID must be a positive integer"),
});

// =====================================================
// CREATE ANSWER
// =====================================================

const createAnswerSchema = z.object({
  submissionId: z.coerce
    .number()
    .int()
    .positive("Submission ID must be a positive integer"),

  questionId: z.coerce
    .number()
    .int()
    .positive("Question ID must be a positive integer"),

  answer: z
    .string()
    .trim()
    .max(5000, "Answer is too long")
    .nullable()
    .optional(),
});

// =====================================================
// UPDATE ANSWER
// =====================================================

const updateAnswerSchema = z.object({
  answer: z
    .string()
    .trim()
    .max(5000, "Answer is too long")
    .nullable()
    .optional(),
});

// =====================================================
// QUERY
// =====================================================

const answerQuerySchema = z.object({
  submissionId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  questionId: z.coerce
    .number()
    .int()
    .positive()
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
  answerIdParamSchema,
  createAnswerSchema,
  updateAnswerSchema,
  answerQuerySchema,
};