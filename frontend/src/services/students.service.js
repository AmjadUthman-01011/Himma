import api from "../lib/api";

// =====================================================
// GET ALL STUDENTS
// GET /api/students
// ADMIN / TEACHER
// =====================================================

export const getStudents = async (params = {}) => {
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
    `/students${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    }
  );
};

// =====================================================
// GET MY PROFILE
// GET /api/students/me
// STUDENT
// =====================================================

export const getMyProfile = async () => {
  return api("/students/me", {
    method: "GET",
  });
};

// =====================================================
// GET STUDENT BY ID
// GET /api/students/:id
// ADMIN / TEACHER
// =====================================================

export const getStudent = async (studentId) => {
  return api(`/students/${studentId}`, {
    method: "GET",
  });
};

// =====================================================
// CREATE STUDENT
// POST /api/students
// ADMIN
// =====================================================

export const createStudent = async (studentData) => {
  return api("/students", {
    method: "POST",
    body: JSON.stringify(studentData),
  });
};

// =====================================================
// UPDATE STUDENT
// PATCH /api/students/:id
// ADMIN
// =====================================================

export const updateStudent = async (
  studentId,
  studentData
) => {
  return api(`/students/${studentId}`, {
    method: "PATCH",
    body: JSON.stringify(studentData),
  });
};

// =====================================================
// DELETE STUDENT
// DELETE /api/students/:id
// ADMIN
// =====================================================

export const deleteStudent = async (studentId) => {
  return api(`/students/${studentId}`, {
    method: "DELETE",
  });
};

// =====================================================
// UPDATE STUDENT STATUS
// PATCH /api/students/:id/status
// ADMIN
// =====================================================

export const updateStudentStatus = async (
  studentId,
  statusData
) => {
  return api(`/students/${studentId}/status`, {
    method: "PATCH",
    body: JSON.stringify(statusData),
  });
};