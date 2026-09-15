const courseContentService = require("../services/chapters.service");

// =====================================================
// CHAPTERS
// =====================================================

// CREATE CHAPTER
const createChapter = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;
    const courseId = req.params.courseId;
    const userId = req.user.id;
    const chapter = await courseContentService.createChapter(courseId,userId,data);

    res.status(201).json({
      success: true,
      message:
        "Chapter created successfully",
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

// GET CHAPTERS
const getChaptersByCourse = async (
  req,
  res,
  next
) => {
  try {
    const chapters =
      await courseContentService.getChaptersByCourse(
        req.params.courseId
      );

    res.status(200).json({
      success: true,
      count: chapters.length,
      data: chapters,
    });
  } catch (error) {
    next(error);
  }
};

// GET CHAPTER
const getChapterById = async (
  req,
  res,
  next
) => {
  try {
    const chapter =
      await courseContentService.getChapterById(
        req.params.courseId, req.params.chapterId
      );

    res.status(200).json({
      success: true,
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CHAPTER
const updateChapter = async (
  req,
  res,
  next
) => {
  try {
    const chapter =
      await courseContentService.updateChapter(
        req.params.chapterId,
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Chapter updated successfully",
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CHAPTER
const deleteChapter = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await courseContentService.deleteChapter(
        req.params.chapterId,
        req.user.id
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// VIDEOS
// =====================================================

// ADD VIDEO
const createVideo = async (req, res, next) => {
  try {
    const { courseId, chapterId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    const video = await chapterService.createVideo(
      courseId,
      chapterId,
      req.body,
      req.file
    );

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE VIDEO
const updateVideo = async (req, res, next) => {
  try {
    const video =
      await courseContentService.updateVideo(
        req.params.videoId,
        req.user.userId,
        req.body,
        req.file
      );

    return res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE VIDEO
const deleteVideo = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await courseContentService.deleteVideo(
        req.params.videoId,
        req.user.id
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// FILES
// =====================================================

// ADD FILE
const addFile = async (req, res, next) => {
  try {
    const file =
      await courseContentService.addFile({
        chapterId: req.params.chapterId,
        userId: req.user.userId,
        name: req.body.name,
        file: req.file,
      });

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE FILE
const updateFile = async (
  req,
  res,
  next
) => {
  try {
    const file =
      await courseContentService.updateFile(
        req.params.fileId,
        req.user.userId,
        req.body,
        req.file
      );

    return res.status(200).json({
      success: true,
      message: "File updated successfully",
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE FILE
const deleteFile = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await courseContentService.deleteFile(
        req.params.fileId,
        req.user.id
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChapter,
  getChaptersByCourse,
  getChapterById,
  updateChapter,
  deleteChapter,

  createVideo,
  updateVideo,
  deleteVideo,

  addFile,
  updateFile,
  deleteFile,
};