const { z } = require("zod");

const teacherIdSchema = z.coerce
  .number()
  .int()
  .positive();

const createTeacherSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),

  role: z
    .enum(["ADMIN", "TEACHER", "STUDENT"])
    .default("STUDENT"),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must contain at least 2 characters"),

  phone: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

const updateTeacherSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase()
    .optional(),

  firstName: z
    .string()
    .trim()
    .min(2)
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(2)
    .optional(),

  phone: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

const updateStatusSchema = z.object({
  isActive: z.boolean(),
});

const teacherCourseSchema = z.object({
  courseId: z
  .number()
  .int()
  .positive(),

});

const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});

const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
});

const teacherIdParamSchema = z.object({
  id: teacherIdSchema,
});

module.exports = {
  createTeacherSchema,
  updateTeacherSchema,
  updateStatusSchema,
  updatePasswordSchema,
  updateRoleSchema,
  teacherIdParamSchema,
  teacherCourseSchema
};