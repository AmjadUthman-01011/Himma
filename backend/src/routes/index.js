const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./users.route");
const studentRoute = require("./students.route");
const teacherRoute = require("./teachers.route");
const courseRoute = require("./courses.route");
const notificationRoute = require("./notifications.route");
const testRoute = require("./tests.route");
const questionRoute = require("./questions.route");
const questionOptionRoute = require("./questionOptions.route");
const submissionsRoute = require("./submissions.route");
const answersRoute = require("./answers.route");
const chapterRoute = require("./chapters.route");
const router = express.Router();

const path = require("path");

router.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/students", studentRoute);
router.use("/teachers", teacherRoute);
router.use("/courses", courseRoute);
router.use("/notifications", notificationRoute);
router.use("/tests", testRoute);
router.use("/questions", questionRoute);
router.use("/question-options", questionOptionRoute);
router.use("/submissions", submissionsRoute);
router.use("/answers", answersRoute);
router.use("/courses", chapterRoute);

module.exports = router;