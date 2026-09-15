const express = require("express");

const courseController = require("../controllers/courses.controller");
const {authorizeCourseTeacher, authorizeCourseAccess} =require("../middlewares/course.middleware");
const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorized.middleware");
const validate = require("../middlewares/validator.middleware");
const {
    courseIdSchema,
    courseIdParamSchema,
    createCourseSchema,
    updateCourseSchema,
    updateStatusSchema,
    teacherCourseSchema,
    courseStudentParamSchema} = require("../validators/courses.validator");

const router = express.Router();


// =========================
// ADMIN → CREATE COURSE
// =========================

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createCourseSchema),
    courseController.createCourse
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "TEACHER", "STUDENT"),
    courseController.getCourses
);

router.post(
    "/:id/students",
    authenticate,
    authorize("ADMIN"),
    validate(courseIdParamSchema, "params"),
    courseController.enrollStudent
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "TEACHER", "STUDENT"),
    authorizeCourseAccess,
    validate(courseIdParamSchema, "params"),
    courseController.getCourse
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(courseIdParamSchema,"params"),
    validate(updateCourseSchema),
    courseController.updateCourse
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(courseIdParamSchema,"params"),
    courseController.deleteCourse
);

router.delete(
    "/:id/students/:studentId",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    validate(courseStudentParamSchema, "params"),
    courseController.removeStudent
);

router.patch(
    "/:id/teacher",
    authenticate,
    authorize("ADMIN", ),
    validate(courseIdParamSchema,"params"),
    validate(teacherCourseSchema),
    courseController.assignTeacher
);

router.get(
    "/:id/students",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    authorizeCourseTeacher,
    validate(courseIdParamSchema,"params"),
    courseController.getCourseStudents
);


module.exports = router;