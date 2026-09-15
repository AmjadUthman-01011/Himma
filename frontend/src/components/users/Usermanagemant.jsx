"use client";

import { useCallback, useEffect, useState } from "react";

import UserHeader from "./UserHeader";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import UserPagination from "./UserPagination";

import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ChangeRoleModal from "./ChangeRoleModal";
import DeleteUserModal from "./DeleteUserModal";

import {
  getUsers,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../../services/users.service";

export default function UserManagement() {
  // =====================================================
  // DATA
  // =====================================================

  const [users, setUsers] = useState([]);

  // =====================================================
  // UI STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });
  const [total, setTotal] = useState(0)

  // =====================================================
  // MODALS
  // =====================================================

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  // =====================================================
  // FETCH USERS
  // =====================================================

const fetchUsers = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const params = {
      page,
      limit,
      search,
      role,
    };

    // Only send isActive when a specific
    // status is selected.
    if (status !== "ALL") {
      params.isActive = status === "true";
    }

    const response = await getUsers(params);

    // =====================================================
    // USERS
    // =====================================================

    setUsers(
      response?.users ||
      response?.data ||
      []
    );

    // =====================================================
    // PAGINATION
    // =====================================================

    const paginationData =
      response?.pagination || {};

    setPagination({
      total:
        Number(paginationData.total) ||
        Number(response?.total) ||
        0,

      totalPages:
        Number(paginationData.totalPages) ||
        Number(response?.totalPages) ||
        1,
    });

  } catch (err) {
    console.error(
      "Failed to fetch users:",
      err
    );

    setError(
      err?.message ||
      "Failed to load users."
    );

    setUsers([]);

    setPagination({
      total: 0,
      totalPages: 1,
    });
  } finally {
    setLoading(false);
  }
}, [
  page,
  limit,
  search,
  role,
  status,
]);

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
  // ROLE FILTER
  // =====================================================

  const handleRoleChange = (value) => {
    setRole(value);
    setPage(1);
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const handleClearFilters = () => {
    setSearch("");
    setRole("ALL");
    setStatus("ALL");
    setPage(1);
  };

  // =====================================================
  // CREATE USER
  // =====================================================

  const handleCreateUser = async (formData) => {
    try {
      await createUser(formData);

      setCreateModalOpen(false);

      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =====================================================
  // EDIT USER
  // =====================================================

  const handleEditUser = async (formData) => {
    

    try {
      await updateUser(selectedUser.id, formData);

      setEditModalOpen(false);
      setSelectedUser(null);

      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =====================================================
  // CHANGE ROLE
  // =====================================================

  const handleChangeRole = async (newRole) => {
    if (!selectedUser) return;

    try {
      await updateUserRole(
        selectedUser.id,
        newRole
      );

      setRoleModalOpen(false);
      setSelectedUser(null);

      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  const handleToggleStatus = async (user) => {
    try {
      await updateUserStatus(
        user.id,
        !user.isActive
      );

      await fetchUsers();
    } catch (err) {
      setError(
        err.message || "Failed to update status"
      );
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);

      setDeleteModalOpen(false);
      setSelectedUser(null);

      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // =====================================================
  // OPEN ROLE
  // =====================================================

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setRoleModalOpen(true);
  };

  // =====================================================
  // OPEN DELETE
  // =====================================================

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      <main>

        <UserHeader
          onCreateUser={() =>
            setCreateModalOpen(true)
          }
        />

        <UserFilters
          search={search}
          role={role}
          status={status}
          onSearchChange={handleSearchChange}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
          onClear={handleClearFilters}
        />

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/50 px-4 py-3 text-sm text-[#93000a]">
            {error}
          </div>
        )}

        {/* TABLE */}

        <UserTable
          users={users}
          loading={loading}
          onEdit={openEditModal}
          onChangeRole={openRoleModal}
          onToggleStatus={handleToggleStatus}
          onDelete={openDeleteModal}
        />

        {/* PAGINATION */}

        {!loading && users.length > 0 && (
          <UserPagination
            page={page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={limit}
            onPageChange={setPage}
          />
        )}

      </main>

      {/* CREATE */}

      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />

      {/* =====================================================
          EDIT USER MODAL
      ===================================================== */}
      
      {editModalOpen && (
        <EditUserModal
          open={editModalOpen}
          user={selectedUser}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleEditUser}
        />
      )}
      
      
      {/* =====================================================
          CHANGE ROLE MODAL
      ===================================================== */}
      
      {roleModalOpen && (
        <ChangeRoleModal
          open={roleModalOpen}
          user={selectedUser}
          onClose={() => {
            setRoleModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleChangeRole}
        />
      )}
      
      
      {/* =====================================================
          DELETE USER MODAL
      ===================================================== */}
      
      {deleteModalOpen && (
        <DeleteUserModal
          open={deleteModalOpen}
          user={selectedUser}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDeleteUser}
        />
      )}

    </div>
  );
}