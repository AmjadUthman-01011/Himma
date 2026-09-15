const { z } = require("zod");

const userIdSchema = z.coerce
  .number()
  .int()
  .positive();

const createUserSchema = z.object({
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

  dateOfBirth: z
    .string()
    .datetime()
    .optional()
    .nullable(),

  phone: z
    .string()
    .trim()
    .optional()
    .nullable(),

  address: z
    .string()
    .trim()
    .optional()
    .nullable(),

  class: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

const updateUserSchema = z.object({
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

  dateOfBirth: z
    .string()
    .datetime()
    .optional()
    .nullable(),

  phone: z
    .string()
    .trim()
    .optional()
    .nullable(),

  address: z
    .string()
    .trim()
    .optional()
    .nullable(),

  class: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

const updateStatusSchema = z.object({
  isActive: z.boolean(),
});

const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});

const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
});

const userIdParamSchema = z.object({
  id: userIdSchema,
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateStatusSchema,
  updatePasswordSchema,
  updateRoleSchema,
  userIdParamSchema,
};