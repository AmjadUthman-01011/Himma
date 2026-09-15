const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notifications.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorized.middleware");
const validate = require("../middlewares/validator.middleware");

const {
  notificationIdParamSchema,
  createNotificationSchema,
  notificationQuerySchema,
} = require("../validators/notifications.validator");


// =====================================================
// NOTIFICATION ROUTES
// =====================================================

router.use(authenticate);


// =====================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// =====================================================

router.get(
  "/",
  validate(notificationQuerySchema, "query"),
  notificationController.getMyNotifications
);


// =====================================================
// GET UNREAD COUNT
// GET /api/notifications/unread-count
// =====================================================

router.get(
  "/unread-count",
  notificationController.getUnreadCount
);


// =====================================================
// GET NOTIFICATION BY ID
// GET /api/notifications/:id
// =====================================================

router.get(
  "/:id",
  validate(notificationIdParamSchema, "params"),
  notificationController.getNotification
);


// =====================================================
// CREATE NOTIFICATION
// POST /api/notifications
// ADMIN ONLY
// =====================================================

router.post(
  "/",
  authorize("ADMIN", "TEACHER"),
  validate(createNotificationSchema),
  notificationController.createNotification
);


// =====================================================
// MARK AS READ
// PATCH /api/notifications/:id/read
// =====================================================

router.patch(
  "/:id/read",
  validate(notificationIdParamSchema, "params"),
  notificationController.markAsRead
);


// =====================================================
// MARK ALL AS READ
// PATCH /api/notifications/read-all
// =====================================================

router.patch(
  "/read-all",
  notificationController.markAllAsRead
);


// =====================================================
// DELETE NOTIFICATION
// DELETE /api/notifications/:id
// =====================================================

router.delete(
  "/:id",
  validate(notificationIdParamSchema, "params"),
  notificationController.deleteNotification
);


// =====================================================
// DELETE ALL NOTIFICATIONS
// DELETE /api/notifications
// =====================================================

router.delete(
  "/",
  notificationController.deleteAllNotifications
);


module.exports = router;