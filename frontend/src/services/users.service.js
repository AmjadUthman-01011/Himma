import api from "../lib/api";

// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role = "",
  isActive = "",
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (search) {
    params.append("search", search);
  }

  if (role && role !== "ALL") {
    params.append("role", role);
  }

  if (isActive !== "" && isActive !== "ALL") {
    params.append("isActive", isActive);
  }

  return api(`/users?${params.toString()}`);
};

// =====================================================
// GET USER BY ID
// GET /api/users/:id
// =====================================================

export const getUserById = async (id) => {
  return api(`/api/users/${id}`);
};

// =====================================================
// CREATE USER
// POST /api/users
// =====================================================

export const createUser = async (userData) => {
  return api("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// =====================================================
// UPDATE USER
// PATCH /api/users/:id
// =====================================================

export const updateUser = async (id, userData) => {
  return api(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

// =====================================================
// UPDATE USER ROLE
// PATCH /api/users/:id/role
// =====================================================

export const updateUserRole = async (id, role) => {
  return api(`/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({
      role,
    }),
  });
};

// =====================================================
// UPDATE USER STATUS
// PATCH /api/users/:id/status
// =====================================================

export const updateUserStatus = async (id, isActive) => {
  return api(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      isActive,
    }),
  });
};

// =====================================================
// UPDATE USER PASSWORD
// PATCH /api/users/:id/password
// =====================================================

export const updateUserPassword = async (id, password) => {
  return api(`/users/${id}/password`, {
    method: "PATCH",
    body: JSON.stringify({
      password,
    }),
  });
};

// =====================================================
// DELETE USER
// DELETE /api/users/:id
// =====================================================

export const deleteUser = async (id) => {
  return api(`/users/${id}`, {
    method: "DELETE",
  });
};

