import api from "../lib/api";

// =====================================================
// GET ALL COURSES
// GET /api/courses
// ADMIN / TEACHER / STUDENT
// =====================================================

export const getCourses = async (params = {}) => {
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
    `/courses${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    }
  );
};

// =====================================================
// GET COURSE BY ID
// GET /api/courses/:id
// ADMIN / TEACHER / STUDENT
// =====================================================

export const getCourse = async (courseId) => {
  return api(`/courses/${courseId}`, {
    method: "GET",
  });
};

// =====================================================
// CREATE COURSE
// POST /api/courses
// ADMIN
// =====================================================

export const createCourse = async (courseData) => {
  return api("/courses", {
    method: "POST",
    body: JSON.stringify(courseData),
  });
};

// =====================================================
// UPDATE COURSE
// PATCH /api/courses/:id
// ADMIN
// =====================================================

export const updateCourse = async (
  courseId,
  courseData
) => {
  return api(`/courses/${courseId}`, {
    method: "PATCH",
    body: JSON.stringify(courseData),
  });
};

// =====================================================
// DELETE COURSE
// DELETE /api/courses/:id
// ADMIN
// =====================================================

export const deleteCourse = async (courseId) => {
  return api(`/courses/${courseId}`, {
    method: "DELETE",
  });
};

// =====================================================
// ENROLL STUDENT
// POST /api/courses/:id/students
// ADMIN
// =====================================================

export const enrollStudent = async (
  courseId,
  studentData
) => {
  return api(`/courses/${courseId}/students`, {
    method: "POST",
    body: JSON.stringify(studentData),
  });
};

// =====================================================
// REMOVE STUDENT FROM COURSE
// DELETE /api/courses/:id/students/:studentId
// ADMIN / TEACHER
// =====================================================

export const removeStudent = async (
  courseId,
  studentId
) => {
  return api(
    `/courses/${courseId}/students/${studentId}`,
    {
      method: "DELETE",
    }
  );
};

// =====================================================
// ASSIGN TEACHER
// PATCH /api/courses/:id/teacher
// ADMIN
// =====================================================

export const assignTeacher = async (
  courseId,
  teacherData
) => {
  return api(`/courses/${courseId}/teacher`, {
    method: "PATCH",
    body: JSON.stringify(teacherData),
  });
};

// =====================================================
// GET COURSE STUDENTS
// GET /api/courses/:id/students
// ADMIN / TEACHER
// =====================================================

export const getCourseStudents = async (courseId) => {
  return api(`/courses/${courseId}/students`, {
    method: "GET",
  });
};
