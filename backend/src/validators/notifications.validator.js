const { z } = require("zod");


// =====================================================
// NOTIFICATION ID
// =====================================================

const notificationIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive(),
});


// =====================================================
// CREATE NOTIFICATION
// =====================================================

const createNotificationSchema = z.object({
  userId: z.coerce
    .number()
    .int()
    .positive(),

  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title cannot exceed 150 characters"),

  message: z.string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message cannot exceed 1000 characters"),

  type: z.enum([
    "GENERAL",
    "COURSE",
    "ENROLLMENT",
    "TEST",
    "GRADE",
    "SYSTEM",
  ]).optional(),
});


// =====================================================
// NOTIFICATION QUERY
// =====================================================

const notificationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .optional(),

  isRead: z
    .enum(["true", "false"])
    .optional(),

  type: z.enum([
    "GENERAL",
    "COURSE",
    "ENROLLMENT",
    "TEST",
    "GRADE",
    "SYSTEM",
  ]).optional(),
});


module.exports = {
  notificationIdParamSchema,
  createNotificationSchema,
  notificationQuerySchema,
};