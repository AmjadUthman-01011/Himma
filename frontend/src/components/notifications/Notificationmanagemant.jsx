"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import NotificationHeader from "./NotificationHeader";
import NotificationFilter from "./NotificationFilter";
import NotificationTable from "./Table";
import NotificationPagination from "./Pagination";
import CreateNotificationModal from "./CreateNotificationModal";

import {
  getNotifications,
  createNotification,
  deleteNotification,
  deleteAllNotifications,
  markAllAsRead,
  markAsRead,
} from "../../services/notifications.service";

import { getUsers } from "../../services/users.service";

// =====================================================
// NOTIFICATION MANAGEMENT - ADMIN
// =====================================================

export default function NotificationManagement() {

  // =====================================================
  // DATA
  // =====================================================

  const [notifications, setNotifications] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  // =====================================================
  // UI STATE
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // CREATE MODAL
  // =====================================================

  const [createOpen, setCreateOpen] =
    useState(false);

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("ALL");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] =
    useState(1);

  const limit = 10;

  const [pagination, setPagination] =
    useState({
      total: 0,
      totalPages: 1,
    });

  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit,
        };

        // =================================================
        // SEARCH
        // =================================================

        if (search.trim()) {
          params.search =
            search.trim();
        }

        // =================================================
        // TYPE FILTER
        // =================================================

        if (type !== "ALL") {
          params.type = type;
        }

        // =================================================
        // GET NOTIFICATIONS
        // =================================================

        const response =
          await getNotifications(params);

        console.log(
          "Admin notifications:",
          response
        );

        setNotifications(
          response?.data || []
        );

        // =================================================
        // PAGINATION
        // =================================================

        setPagination({
          total:
            response?.pagination?.total || 0,

          totalPages:
            response?.pagination?.totalPages ||
            1,
        });

      } catch (err) {

        console.error(
          "Failed to fetch notifications:",
          err
        );

        setError(
          err?.message ||
            "Failed to load notifications."
        );

        setNotifications([]);

      } finally {
        setLoading(false);
      }
    }, [
      page,
      search,
      type,
    ]);

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers =
    useCallback(async () => {
      try {

        const response =
          await getUsers();

        console.log(
          "Users response:",
          response
        );

        setUsers(
          response?.users || []
        );

      } catch (err) {

        console.error(
          "Failed to fetch users:",
          err
        );

      }
    }, []);

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // =====================================================
  // TYPE FILTER
  // =====================================================

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1);
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const handleClearFilters = () => {
    setSearch("");
    setType("ALL");
    setPage(1);
  };

  // =====================================================
  // CREATE NOTIFICATION
  // =====================================================

  const handleCreateNotification =
    async (notificationData) => {

      try {

        setError("");
        setSuccess("");

        await createNotification(
          notificationData
        );

        // Close modal
        setCreateOpen(false);

        // Success message
        setSuccess(
          "Notification created successfully."
        );

        // Go to first page
        setPage(1);

        // Refresh
        await fetchNotifications();

      } catch (err) {

        console.error(
          "Create notification error:",
          err
        );

        throw err;
      }
    };

  // =====================================================
  // MARK ONE AS READ
  // =====================================================

  const handleMarkAsRead =
    async (notification) => {

      if (!notification) return;

      try {

        setError("");
        setSuccess("");

        await markAsRead(
          notification.id
        );

        // =================================================
        // UPDATE UI IMMEDIATELY
        // =================================================

        setNotifications((current) =>
          current.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  isRead: true,
                }
              : item
          )
        );

        setSuccess(
          "Notification marked as read."
        );

      } catch (err) {

        console.error(
          "Mark notification as read error:",
          err
        );

        setError(
          err?.message ||
            "Failed to mark notification as read."
        );
      }
    };

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const handleMarkAllAsRead =
    async () => {

      try {

        setError("");
        setSuccess("");

        await markAllAsRead();

        // =================================================
        // UPDATE UI IMMEDIATELY
        // =================================================

        setNotifications((current) =>
          current.map((notification) => ({
            ...notification,
            isRead: true,
          }))
        );

        setSuccess(
          "All notifications marked as read."
        );

      } catch (err) {

        console.error(
          "Mark all notifications as read error:",
          err
        );

        setError(
          err?.message ||
            "Failed to mark all notifications as read."
        );
      }
    };

  // =====================================================
  // DELETE ONE NOTIFICATION
  // =====================================================

  const handleDeleteNotification =
    async (notification) => {

      if (!notification) return;

      try {

        setError("");
        setSuccess("");

        await deleteNotification(
          notification.id
        );

        setSuccess(
          "Notification deleted successfully."
        );

        // =================================================
        // LAST ITEM ON PAGE
        // =================================================

        if (
          notifications.length === 1 &&
          page > 1
        ) {

          setPage(
            (currentPage) =>
              currentPage - 1
          );

          return;
        }

        // =================================================
        // REFRESH
        // =================================================

        await fetchNotifications();

      } catch (err) {

        console.error(
          "Delete notification error:",
          err
        );

        setError(
          err?.message ||
            "Failed to delete notification."
        );
      }
    };

  // =====================================================
  // DELETE ALL NOTIFICATIONS
  // =====================================================

  const handleDeleteAll =
    async () => {

      try {

        setError("");
        setSuccess("");

        await deleteAllNotifications();

        setSuccess(
          "All notifications deleted successfully."
        );

        setPage(1);

        await fetchNotifications();

      } catch (err) {

        console.error(
          "Delete all notifications error:",
          err
        );

        setError(
          err?.message ||
            "Failed to delete all notifications."
        );
      }
    };

  // =====================================================
  // OPEN CREATE MODAL
  // =====================================================

  const handleOpenCreate = () => {

    setError("");
    setSuccess("");
    setCreateOpen(true);
  };

  // =====================================================
  // CLOSE CREATE MODAL
  // =====================================================

  const handleCloseCreate = () => {
    setCreateOpen(false);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      <main>

        {/* =================================================
            HEADER
        ================================================= */}

        <NotificationHeader
          onCreate={handleOpenCreate}
          onDeleteAll={handleDeleteAll}
          onMarkAllAsRead={handleMarkAllAsRead}
          hasNotifications={
            notifications.length > 0
          }
        />

        {/* =================================================
            FILTERS
        ================================================= */}

        <NotificationFilter
          search={search}
          type={type}
          onSearchChange={
            handleSearchChange
          }
          onTypeChange={
            handleTypeChange
          }
          onClear={
            handleClearFilters
          }
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div
            className="
              mx-5
              mb-5
              rounded-lg
              border
              border-[#b7e4c7]
              bg-[#d8f3dc]
              px-4
              py-3
              text-sm
              font-medium
              text-[#1b4332]
              sm:mx-6
            "
          >
            {success}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mx-5
              mb-5
              rounded-lg
              border
              border-[#ffdad6]
              bg-[#ffdad6]/50
              px-4
              py-3
              text-sm
              text-[#93000a]
              sm:mx-6
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            TABLE
        ================================================= */}

        <NotificationTable
          notifications={notifications}
          loading={loading}
          onMarkAsRead={
            handleMarkAsRead
          }
          onDelete={
            handleDeleteNotification
          }
        />

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          pagination.total > 0 && (
            <NotificationPagination
              page={page}
              totalPages={
                pagination.totalPages
              }
              total={
                pagination.total
              }
              limit={limit}
              onPageChange={setPage}
            />
          )}

        {/* =================================================
            CREATE MODAL
        ================================================= */}

        <CreateNotificationModal
          users={users}
          open={createOpen}
          onClose={
            handleCloseCreate
          }
          onSubmit={
            handleCreateNotification
          }
        />

      </main>

    </div>
  );
}