import api from "../lib/api";

// =====================================================
// GET ALL TEACHERS
// GET /api/teachers
// ADMIN
// =====================================================

export const getTeachers = async (params = {}) => {
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
    `/teachers${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    }
  );
};

// =====================================================
// GET MY PROFILE
// GET /api/teachers/me
// TEACHER
// =====================================================

export const getMyProfile = async () => {
  return api("/teachers/me", {
    method: "GET",
  });
};

// =====================================================
// GET TEACHER BY ID
// GET /api/teachers/:id
// ADMIN
// =====================================================

export const getTeacher = async (teacherId) => {
  return api(`/teachers/${teacherId}`, {
    method: "GET",
  });
};

// =====================================================
// CREATE TEACHER
// POST /api/teachers
// ADMIN
// =====================================================

export const createTeacher = async (teacherData) => {
  return api("/teachers", {
    method: "POST",
    body: JSON.stringify(teacherData),
  });
};

// =====================================================
// UPDATE TEACHER
// PATCH /api/teachers/:id
// ADMIN
// =====================================================

export const updateTeacher = async (
  teacherId,
  teacherData
) => {
  return api(`/teachers/${teacherId}`, {
    method: "PATCH",
    body: JSON.stringify(teacherData),
  });
};

// =====================================================
// DELETE TEACHER
// DELETE /api/teachers/:id
// ADMIN
// =====================================================

export const deleteTeacher = async (teacherId) => {
  return api(`/teachers/${teacherId}`, {
    method: "DELETE",
  });
};

// =====================================================
// UPDATE TEACHER STATUS
// PATCH /api/teachers/:id/status
// ADMIN
// =====================================================

export const updateTeacherStatus = async (
  teacherId,
  statusData
) => {
  return api(`/teachers/${teacherId}/status`, {
    method: "PATCH",
    body: JSON.stringify(statusData),
  });
};

// =====================================================
// UPDATE TEACHER PASSWORD
// PATCH /api/teachers/:id/password
// ADMIN
// =====================================================

export const updateTeacherPassword = async (
  teacherId,
  passwordData
) => {
  return api(`/teachers/${teacherId}/password`, {
    method: "PATCH",
    body: JSON.stringify(passwordData),
  });
};

// =====================================================
// ASSIGN TEACHER TO COURSE
// PATCH /api/teachers/:id/courses
// ADMIN
// =====================================================

export const assignTeacherToCourse = async (
  teacherId,
  courseData
) => {
  return api(`/teachers/${teacherId}/courses`, {
    method: "PATCH",
    body: JSON.stringify(courseData),
  });
};

// =====================================================
// GET MY COURSES
// GET /api/teachers/myprofile/courses
// TEACHER
// =====================================================

export const getMyCourses = async () => {
  return api("/teachers/myprofile/courses", {
    method: "GET",
  });
};

// =====================================================
// GET MY STUDENTS
// GET /api/teachers/myprofile/students
// TEACHER
// =====================================================

export const getMyStudents = async () => {
  return api("/teachers/myprofile/students", {
    method: "GET",
  });
};

// =====================================================
// GET TEACHER STUDENTS
// GET /api/teachers/:id/students
// ADMIN / TEACHER OWNER
// =====================================================

export const getTeacherStudents = async (teacherId) => {
  return api(`/teachers/${teacherId}/students`, {
    method: "GET",
  });
};

