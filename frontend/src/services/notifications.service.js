import api from "../lib/api";

// =====================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// AUTHENTICATED USER
// =====================================================

export const getNotifications = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();

  return api(
    `/notifications${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    }
  );
};

// =====================================================
// GET UNREAD COUNT
// GET /api/notifications/unread-count
// AUTHENTICATED USER
// =====================================================

export const getUnreadCount = async () => {
  return api("/notifications/unread-count", {
    method: "GET",
  });
};

// =====================================================
// GET NOTIFICATION BY ID
// GET /api/notifications/:id
// AUTHENTICATED USER
// =====================================================

export const getNotification = async (notificationId) => {
  return api(`/notifications/${notificationId}`, {
    method: "GET",
  });
};

// =====================================================
// CREATE NOTIFICATION
// POST /api/notifications
// ADMIN
// =====================================================

export const createNotification = async (notificationData) => {
  return api("/notifications", {
    method: "POST",
    body: JSON.stringify(notificationData),
  });
};

// =====================================================
// MARK AS READ
// PATCH /api/notifications/:id/read
// AUTHENTICATED USER
// =====================================================

export const markAsRead = async (notificationId) => {
  return api(`/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
};

// =====================================================
// MARK ALL AS READ
// PATCH /api/notifications/read-all
// AUTHENTICATED USER
// =====================================================

export const markAllAsRead = async () => {
  return api("/notifications/read-all", {
    method: "PATCH",
  });
};

// =====================================================
// DELETE NOTIFICATION
// DELETE /api/notifications/:id
// AUTHENTICATED USER
// =====================================================

export const deleteNotification = async (notificationId) => {
  return api(`/notifications/${notificationId}`, {
    method: "DELETE",
  });
};

// =====================================================
// DELETE ALL NOTIFICATIONS
// DELETE /api/notifications
// AUTHENTICATED USER
// =====================================================

export const deleteAllNotifications = async () => {
  return api("/notifications", {
    method: "DELETE",
  });
};