const express = require("express");

const router = express.Router();

const studentController = require("../controllers/students.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorized.middleware");
const validate = require("../middlewares/validator.middleware");

const {
  createStudentSchema,
  updateStudentSchema,
  updateStatusSchema,
  updatePasswordSchema,
  studentIdParamSchema,
} = require("../validators/students.validator");


// =====================================================
// STUDENT MANAGEMENT
// =====================================================

// All student routes require authentication
router.use(authenticate);


// =====================================================
// GET ALL STUDENTS
// GET /api/students
// =====================================================

router.get(
  "/",
  authorize("ADMIN", "TEACHER"),
  studentController.getStudents
);

// =====================================================
// GET MY PROFILE
// GET /api/students/me
// =====================================================

router.get(
  "/me",
  authorize("STUDENT"),
  studentController.getMyProfile
);

// =====================================================
// GET STUDENT BY ID
// GET /api/students/:id
// =====================================================

router.get(
  "/:id",
  authorize("ADMIN", "TEACHER"),
  validate(studentIdParamSchema, "params"),
  studentController.getStudent
);


// =====================================================
// CREATE STUDENT
// POST /api/students
// =====================================================

router.post(
  "/",
  authorize("ADMIN"),
  validate(createStudentSchema),
  studentController.createStudent
);


// =====================================================
// UPDATE STUDENT
// PATCH /api/students/:id
// =====================================================

router.patch(
  "/:id",
  authorize("ADMIN"),
  validate(studentIdParamSchema, "params"),
  validate(updateStudentSchema),
  studentController.updateStudent
);


// =====================================================
// DELETE STUDENT
// DELETE /api/students/:id
// =====================================================

router.delete(
  "/:id",
  authorize("ADMIN"),
  validate(studentIdParamSchema, "params"),
  studentController.deleteStudent
);


// =====================================================
// UPDATE STUDENT STATUS
// PATCH /api/students/:id/status
// =====================================================

router.patch(
  "/:id/status",
  authorize("ADMIN"),
  validate(studentIdParamSchema, "params"),
  validate(updateStatusSchema),
  studentController.updateStatus
);

module.exports = router;