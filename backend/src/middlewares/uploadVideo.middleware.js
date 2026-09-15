const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;

    const uploadPath = path.join(
      process.cwd(),
      "uploads",
      "courses",
      String(courseId),
      "chapters",
      String(chapterId)
    );

    fs.mkdirSync(uploadPath, {
      recursive: true,
    });

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB
  },
});

const updateVideo = async (
  videoId,
  userId,
  data,
  file
) => {
  const parsedVideoId = Number(videoId);

  if (!Number.isInteger(parsedVideoId) || parsedVideoId <= 0) {
    const error = new Error("Invalid video ID");
    error.statusCode = 400;
    throw error;
  }

  const video = await prisma.chapterVideo.findUnique({
    where: {
      id: parsedVideoId,
    },

    include: {
      chapter: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!video) {
    const error = new Error("Video not found");
    error.statusCode = 404;
    throw error;
  }

  // Make sure the teacher owns the chapter/course
  await verifyTeacherChapter(
    video.chapterId,
    userId
  );

  // ==========================================
  // CHECK DUPLICATE ORDER
  // ==========================================

  if (data.order !== undefined) {
    const order = Number(data.order);

    if (!Number.isInteger(order) || order <= 0) {
      const error = new Error(
        "Order must be a positive integer"
      );

      error.statusCode = 400;
      throw error;
    }

    const existing =
      await prisma.chapterVideo.findFirst({
        where: {
          chapterId: video.chapterId,
          order,
          NOT: {
            id: parsedVideoId,
          },
        },
      });

    if (existing) {
      const error = new Error(
        "A video with this order already exists"
      );

      error.statusCode = 409;
      throw error;
    }
  }

  // ==========================================
  // PREPARE UPDATE
  // ==========================================

  const updateData = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  if (data.duration !== undefined) {
    updateData.duration =
      data.duration === "" || data.duration === null
        ? null
        : Number(data.duration);
  }

  if (data.order !== undefined) {
    updateData.order = Number(data.order);
  }

  // ==========================================
  // NEW VIDEO FILE
  // ==========================================

  if (file) {
    const courseId = video.chapter.course.id;
    const chapterId = video.chapterId;

    updateData.videoUrl =
      `/uploads/courses/${courseId}/chapters/${chapterId}/${file.filename}`;
  }

  // ==========================================
  // UPDATE DATABASE
  // ==========================================

  const updatedVideo =
    await prisma.chapterVideo.update({
      where: {
        id: parsedVideoId,
      },

      data: updateData,
    });

  // ==========================================
  // DELETE OLD VIDEO FILE
  // ==========================================

  if (file && video.videoUrl) {
    const oldFilePath = path.join(
      process.cwd(),
      video.videoUrl.replace(
        /^\/uploads[\\/]/,
        "uploads/"
      )
    );

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  return updatedVideo;
};

module.exports = {uploadVideo, updateVideo};