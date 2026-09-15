const prisma = require("../config/prisma");


// =====================================================
// GET MY NOTIFICATIONS
// =====================================================

const getMyNotifications = async ({
  userId,
  page = 1,
  limit = 10,
  isRead,
  type,
}) => {
  const skip = (page - 1) * limit;

  const where = {
    userId: Number(userId),
  };

  if (isRead !== undefined) {
    where.isRead = isRead;
  }

  if (type) {
    where.type = type;
  }

  const [notifications, total, unreadCount] =
    await prisma.$transaction([
      prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.notification.count({
        where,
      }),

      prisma.notification.count({
        where: {
          userId: Number(userId),
          isRead: false,
        },
      }),
    ]);

  return {
    data: notifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    unreadCount,
  };
};


// =====================================================
// GET NOTIFICATION BY ID
// =====================================================

const getNotificationById = async (
  notificationId,
  userId
) => {
  const notification =
    await prisma.notification.findFirst({
      where: {
        id: Number(notificationId),
        userId: Number(userId),
      },
    });

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  return notification;
};


// =====================================================
// CREATE NOTIFICATION
// =====================================================

const createNotification = async ({
  userId,
  title,
  message,
  type = "GENERAL",
}) => {
  const notification =
    await prisma.notification.create({
      data: {
        userId: Number(userId),
        title,
        message,
        type,
      },
    });

  return notification;
};


// =====================================================
// MARK AS READ
// =====================================================

const markAsRead = async (
  notificationId,
  userId
) => {
  const notification =
    await prisma.notification.findFirst({
      where: {
        id: Number(notificationId),
        userId: Number(userId),
      },
    });

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  if (notification.isRead) {
    return notification;
  }

  return prisma.notification.update({
    where: {
      id: notification.id,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
};


// =====================================================
// MARK ALL AS READ
// =====================================================

const markAllAsRead = async (userId) => {
  const result =
    await prisma.notification.updateMany({
      where: {
        userId: Number(userId),
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

  return {
    count: result.count,
  };
};


// =====================================================
// DELETE NOTIFICATION
// =====================================================

const deleteNotification = async (
  notificationId,
  userId
) => {
  const notification =
    await prisma.notification.findFirst({
      where: {
        id: Number(notificationId),
        userId: Number(userId),
      },
    });

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.notification.delete({
    where: {
      id: notification.id,
    },
  });

  return {
    message: "Notification deleted successfully",
  };
};


// =====================================================
// DELETE ALL MY NOTIFICATIONS
// =====================================================

const deleteAllNotifications = async (userId) => {
  const result =
    await prisma.notification.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

  return {
    count: result.count,
  };
};


// =====================================================
// GET UNREAD COUNT
// =====================================================

const getUnreadCount = async (userId) => {
  const count =
    await prisma.notification.count({
      where: {
        userId: Number(userId),
        isRead: false,
      },
    });

  return {
    unreadCount: count,
  };
};


module.exports = {
  getMyNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  getUnreadCount,
};