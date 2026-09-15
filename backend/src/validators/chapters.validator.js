const { z } = require("zod");

// =====================================================
// COURSE ID
// =====================================================

const courseIdParamSchema = z.object({
  courseId: z.coerce
    .number()
    .int()
    .positive(),
});

// =====================================================
// CHAPTER ID
// =====================================================

const chapterIdParamSchema = z.object({
  chapterId: z.coerce
    .number()
    .int()
    .positive(),
});

// =====================================================
// VIDEO ID
// =====================================================

const videoIdParamSchema = z.object({
  videoId: z.coerce
    .number()
    .int()
    .positive(),
});

// =====================================================
// FILE ID
// =====================================================

const fileIdParamSchema = z.object({
  fileId: z.coerce
    .number()
    .int()
    .positive(),
});

// =====================================================
// CREATE CHAPTER
// =====================================================

const createChapterSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Chapter title is required")
    .max(255, "Chapter title is too long"),

  description: z
    .string()
    .trim()
    .max(2000, "Description is too long")
    .optional()
    .nullable(),

  order: z.coerce
    .number()
    .int()
    .positive("Order must be positive"),
});

// =====================================================
// UPDATE CHAPTER
// =====================================================

const updateChapterSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(255)
      .optional(),

    description: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .nullable(),

    order: z.coerce
      .number()
      .int()
      .positive()
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "At least one field must be provided",
    }
  );

// =====================================================
// CREATE VIDEO
// =====================================================

const createVideoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Video title is required")
    .max(255),

  videoUrl: z
    .string()
    .trim()
    .url("Invalid video URL"),

  duration: z.coerce
    .number()
    .int()
    .nonnegative()
    .optional()
    .nullable(),

  order: z.coerce
    .number()
    .int()
    .positive(),
});

// =====================================================
// UPDATE VIDEO
// =====================================================

const updateVideoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(255)
      .optional(),

    videoUrl: z
      .string()
      .trim()
      .url()
      .optional(),

    duration: z.coerce
      .number()
      .int()
      .nonnegative()
      .optional()
      .nullable(),

    order: z.coerce
      .number()
      .int()
      .positive()
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "At least one field must be provided",
    }
  );

// =====================================================
// CREATE FILE
// =====================================================

const createFileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "File name is required")
    .max(255),

  fileUrl: z
    .string()
    .trim()
    .url("Invalid file URL"),

  fileType: z
    .string()
    .trim()
    .max(100)
    .optional()
    .nullable(),

  fileSize: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),
});

// =====================================================
// UPDATE FILE
// =====================================================

const updateFileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(255)
      .optional(),

    fileUrl: z
      .string()
      .trim()
      .url()
      .optional(),

    fileType: z
      .string()
      .trim()
      .max(100)
      .optional()
      .nullable(),

    fileSize: z.coerce
      .number()
      .int()
      .positive()
      .optional()
      .nullable(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "At least one field must be provided",
    }
  );

module.exports = {
  courseIdParamSchema,
  chapterIdParamSchema,
  videoIdParamSchema,
  fileIdParamSchema,

  createChapterSchema,
  updateChapterSchema,

  createVideoSchema,
  updateVideoSchema,

  createFileSchema,
  updateFileSchema,
};