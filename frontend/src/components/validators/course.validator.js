import { z } from "zod";

export const createCourseSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Course code is required.")
    .max(
      20,
      "Course code must not exceed 20 characters."
    ),

  name: z
    .string()
    .trim()
    .min(
      2,
      "Course name must contain at least 2 characters."
    )
    .max(
      100,
      "Course name must not exceed 100 characters."
    ),

  description: z
    .string()
    .trim()
    .min(
      10,
      "Description must contain at least 10 characters."
    ),

  credits: z
    .number({
      error: "Credits are required.",
    })
    .int("Credits must be a whole number.")
    .positive(
      "Credits must be greater than 0."
    ),

  teacherId: z
    .number({
      error: "Teacher is required.",
    })
    .int("Teacher ID must be a whole number.")
    .positive(
      "Teacher ID must be greater than 0."
    ),
});

export const updateCourseSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Course code is required.")
    .max(
      20,
      "Course code must not exceed 20 characters."
    ),

  name: z
    .string()
    .trim()
    .min(
      2,
      "Course name must contain at least 2 characters."
    )
    .max(
      100,
      "Course name must not exceed 100 characters."
    ),

  description: z
    .string()
    .trim()
    .min(
      10,
      "Description must contain at least 10 characters."
    ),

  credits: z
    .number({
      error: "Credits are required.",
    })
    .int(
      "Credits must be a whole number."
    )
    .positive(
      "Credits must be greater than 0."
    ),
});