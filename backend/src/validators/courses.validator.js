const { z } = require("zod");
const id = require("zod/v4/locales/id.cjs");

const courseIdSchema = z.coerce
  .number()
  .int()
  .positive();

const studentIdSchema = z.coerce
  .number()
  .int()
  .positive();
		
const createCourseSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase(),

  name: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters"),

  description: z
    .string()
    .trim()
    .min(10, "First name must contain at least 2 characters"),

  credits:z
  .number()
  .int()
  .positive(),

  teacherId:z
  .number()
  .int()
  .positive()
});

const updateCourseSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase(),

  name: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters"),

  description: z
    .string()
    .trim()
    .min(10, "First name must contain at least 2 characters"),

  credits:z
  .number()
  .int()
  .positive()
});

const updateStatusSchema = z.object({
  status: z.boolean(),
});

const teacherCourseSchema = z.object({
  teacherId: z
  .number()
  .int()
  .positive(),

});

const courseStudentParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive(),

  studentId: z.coerce
    .number()
    .int()
    .positive(),
});


const courseIdParamSchema = z.object({
  id: courseIdSchema,
});

const studentIdParamSchema = z.object({
  studentId: studentIdSchema,
});

module.exports = {
  courseIdSchema,
  courseIdParamSchema,
  createCourseSchema,
  updateCourseSchema,
  updateStatusSchema,
  teacherCourseSchema,
  studentIdParamSchema,
  courseStudentParamSchema
};