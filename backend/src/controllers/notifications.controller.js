const notificationService = require("../services/notifications.service");


// =====================================================
// GET MY NOTIFICATIONS
// =====================================================

const getMyNotifications = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      isRead,
      type,
    } = req.query;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    let parsedIsRead;

    if (isRead !== undefined) {
      parsedIsRead = isRead === "true";
    }

    const result =
      await notificationService.getMyNotifications({
        userId: req.user.id,
        page: parsedPage,
        limit: parsedLimit,
        isRead: parsedIsRead,
        type,
      });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET NOTIFICATION BY ID
// =====================================================

const getNotification = async (req, res, next) => {
  try {
    const notification =
      await notificationService.getNotificationById(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE NOTIFICATION
// =====================================================

const createNotification = async (req, res, next) => {
  try {
    const notification =
      await notificationService.createNotification(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// MARK AS READ
// =====================================================

const markAsRead = async (req, res, next) => {
  try {
    const notification =
      await notificationService.markAsRead(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// MARK ALL AS READ
// =====================================================

const markAllAsRead = async (req, res, next) => {
  try {
    const result =
      await notificationService.markAllAsRead(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE NOTIFICATION
// =====================================================

const deleteNotification = async (req, res, next) => {
  try {
    const result =
      await notificationService.deleteNotification(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE ALL NOTIFICATIONS
// =====================================================

const deleteAllNotifications = async (req, res, next) => {
  try {
    const result =
      await notificationService.deleteAllNotifications(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: "All notifications deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET UNREAD COUNT
// =====================================================

const getUnreadCount = async (req, res, next) => {
  try {
    const result =
      await notificationService.getUnreadCount(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getMyNotifications,
  getNotification,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  getUnreadCount,
};