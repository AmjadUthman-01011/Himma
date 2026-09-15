import { z } from "zod";

export const createTestSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Test title is required.")
      .max(200, "Test title is too long."),

    description: z
      .string()
      .trim()
      .max(
        1000,
        "Description is too long."
      )
      .optional(),

    courseId: z
      .number({
        message: "Course is required.",
      })
      .int()
      .positive("Invalid course."),

    teacherId: z
      .number({
        message: "Teacher is required.",
      })
      .int()
      .positive("Invalid teacher."),

    startDate: z
      .string()
      .min(
        1,
        "Start date is required."
      ),

    endDate: z
      .string()
      .min(
        1,
        "End date is required."
      ),

    maxScore: z
      .number({
        message:
          "Maximum score is required.",
      })
      .positive(
        "Maximum score must be greater than 0."
      ),
  })
  .refine(
    (data) =>
      new Date(data.endDate) >
      new Date(data.startDate),
    {
      path: ["endDate"],
      message:
        "End date must be after start date.",
    }
  );


// =====================================================
// UPDATE TEST SCHEMA
// =====================================================

export const updateTestSchema = z.object({
  courseId: z
    .number({
      message: "Course is required",
    })
    .int("Course ID must be an integer")
    .positive("Course ID must be positive")
    .optional(),

  title: z
    .string()
    .trim()
    .min(1, "Test title is required")
    .max(200, "Test title must not exceed 200 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(
      1000,
      "Description must not exceed 1000 characters"
    )
    .optional(),

  startDate: z
    .string()
    .datetime({
      message: "Start date must be a valid ISO date",
    })
    .optional(),

  endDate: z
    .string()
    .datetime({
      message: "End date must be a valid ISO date",
    })
    .optional(),

  maxScore: z
    .number({
      message: "Maximum score must be a number",
    })
    .positive("Maximum score must be greater than 0")
    .optional(),
});