const express = require("express");

const router = express.Router();

const teacherController = require("../controllers/teachers.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorized.middleware");
const authorizeTeacherOwner = require("../middlewares/teacher.middleware");
const validate = require("../middlewares/validator.middleware");

const {
  createTeacherSchema,
  updateTeacherSchema,
  updateStatusSchema,
  updatePasswordSchema,
  teacherIdParamSchema,
  teacherCourseSchema
} = require("../validators/teachers.validator");


// =====================================================
// TEACHER MANAGEMENT
// =====================================================

// All teacher routes require authentication
router.use(authenticate);


// =====================================================
// GET ALL TEACHER
// GET /api/teachers
// =====================================================

router.get(
  "/",
  authorize("ADMIN"),
  teacherController.getTeachers
);

// =====================================================
// GET MY PROFILE
// GET /api/teachers/me
// =====================================================

router.get(
  "/me",
  authorize("TEACHER"),
  teacherController.getMyProfile
);

// =====================================================
// GET TEACHER BY ID
// GET /api/teachers/:id
// =====================================================

router.get(
  "/:id",
  authorize("ADMIN"),
  validate(teacherIdParamSchema, "params"),
  teacherController.getTeacher
);


// =====================================================
// CREATE TEACHER
// POST /api/teachers
// =====================================================

router.post(
  "/",
  authorize("ADMIN"),
  validate(createTeacherSchema),
  teacherController.createTeacher
);


// =====================================================
// UPDATE TEACHER
// PATCH /api/teachers/:id
// =====================================================

router.patch(
  "/:id",
  authorize("ADMIN"),
  validate(teacherIdParamSchema, "params"),
  validate(updateTeacherSchema),
  teacherController.updateTeacher
);


// =====================================================
// DELETE TEACHER
// DELETE /api/teachers/:id
// =====================================================

router.delete(
  "/:id",
  authorize("ADMIN"),
  validate(teacherIdParamSchema, "params"),
  teacherController.deleteTeacher
);


// =====================================================
// UPDATE TEACHER STATUS
// PATCH /api/teachers/:id/status
// =====================================================

router.patch(
  "/:id/status",
  authorize("ADMIN"),
  validate(teacherIdParamSchema, "params"),
  validate(updateStatusSchema),
  teacherController.updateStatus
);


// =====================================================
// UPDATE TEACHER PASSWORD
// PATCH /api/teachers/:id/password
// =====================================================

router.patch(
  "/:id/password",
  authorize("ADMIN"),
  validate(teacherIdParamSchema, "params"),
  validate(updatePasswordSchema),
  teacherController.updatePassword
);

router.patch(
    "/:id/courses",
    authorize("ADMIN"),
    validate(teacherIdParamSchema, "params"),
    validate(teacherCourseSchema),
    teacherController.assignTeacherToCourse
);


// Teacher → own courses
router.get(
    "/myprofile/courses",
    authorize("TEACHER"),
    teacherController.getMyCourses
);

// get students enrolled to teacher's course
router.get(
    "/myprofile/students",
    authorize("TEACHER"),
    teacherController.getMyStudents
);

router.get(
    "/:id/students",
    authorize("ADMIN", "TEACHER"),
    authorizeTeacherOwner,
    teacherController.getTeacherStudents
);

module.exports = router;