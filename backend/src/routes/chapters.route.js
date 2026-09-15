const express = require("express");

const router = express.Router();

const controller = require(
  "../controllers/chapters.controller"
);

const authenticate = require(
  "../middlewares/auth.middleware"
);

const authorize = require(
  "../middlewares/authorized.middleware"
);

const validate = require(
  "../middlewares/validator.middleware"
);

const {uploadVideo, updateVideo} = require("../middlewares/uploadVideo.middleware")
const uploadFile = require("../middlewares/uploadeFile.middleware");

const {
  courseIdParamSchema,
  chapterIdParamSchema,
  videoIdParamSchema,
  fileIdParamSchema,

  createChapterSchema,
  updateChapterSchema,

  createVideoSchema,
  updateVideoSchema,

  createFileSchema,
  updateFileSchema,
} = require(
  "../validators/chapters.validator"
);

// =====================================================
// AUTHENTICATION
// =====================================================

router.use(authenticate);

// =====================================================
// CHAPTERS
// =====================================================

// GET /api/course-content/courses/:courseId/chapters

router.get(
  "/:courseId/chapters",

  validate(
    courseIdParamSchema,
    "params"
  ),

  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),

  controller.getChaptersByCourse
);

// CREATE CHAPTER

router.post(
  "/:courseId/chapters",
  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),
  validate(
    courseIdParamSchema,
    "params"
  ),

  validate(
    createChapterSchema
  ),

  controller.createChapter
);

// GET CHAPTER

router.get(
  "/:courseId/chapters/:chapterId",

  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),

  //validate(
  //  chapterIdParamSchema,
  //  "params"
  //),

  controller.getChapterById
);

// UPDATE CHAPTER

router.patch(
  "/:courseId/chapters/:chapterId",

  authorize(
    "ADMIN",
    "TEACHER"
  ),

  //validate(
  //  chapterIdParamSchema,
  //  "params"
  //),

  validate(
    updateChapterSchema
  ),

  controller.updateChapter
);

// DELETE CHAPTER

router.delete(
  "/chapters/:chapterId",

  authorize(
    "ADMIN",
    "TEACHER"
  ),

  validate(
    chapterIdParamSchema,
    "params"
  ),

  controller.deleteChapter
);

// =====================================================
// VIDEOS
// =====================================================

// ADD VIDEO

router.post(
  "/:courseId/chapters/:chapterId/videos",
  authenticate,
  authorize("TEACHER"),
  validate(chapterIdParamSchema, "params"),
  uploadVideo.single("video"),
  controller.createVideo
);
// UPDATE VIDEO

router.patch(
  "/:courseId/chapters/:chapterId/videos/:videoId",
  authenticate,
  authorize("TEACHER"),
  validate(chapterIdParamSchema, "params"),
  uploadVideo.single("video"),
  controller.updateVideo
);

// DELETE VIDEO

router.delete(
  "/videos/:videoId",

  authorize(
    "ADMIN",
    "TEACHER"
  ),

  validate(
    videoIdParamSchema,
    "params"
  ),

  controller.deleteVideo
);

// =====================================================
// FILES
// =====================================================

// ADD FILE

router.post(
  "/:courseId/chapters/:chapterId/files",
  authenticate,
  authorize("TEACHER"),
  validate(fileIdParamSchema, "params"),
  uploadFile.single("file"),
  controller.addFile
);

// UPDATE FILE

router.patch(
  "/:courseId/chapters/:chapterId/files/:fileId",
  authenticate,
  authorize("TEACHER"),
  validate(fileIdParamSchema, "params"),
  uploadFile.single("file"),
  controller.updateFile
);

// DELETE FILE

router.delete(
  "/:courseId/chapters/:chapterId/files/:fileId",
  authenticate,
  authorize("TEACHER"),
  validate(fileIdParamSchema, "params"),
  controller.deleteFile
);

module.exports = router;