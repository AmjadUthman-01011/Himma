const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");
// =====================================================
// HELPERS
// =====================================================

const getTeacherByUserId = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!teacher) {
    const error = new Error("Teacher profile not found");
    error.statusCode = 404;
    throw error;
  }

  return teacher;
};

const getChapter = async (courseId, chapterId) => {
  const parsedCourseId = Number(courseId);
  const parsedChapterId = Number(chapterId);
  
  if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
    const error = new Error("Invalid course ID");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedChapterId) || parsedChapterId <= 0) {
    const error = new Error("Invalid chapter ID");
    error.statusCode = 400;
    throw error;
  }

  const chapter = await prisma.chapter.findFirst({
    where: {
      id: parsedChapterId,
      courseId: parsedCourseId,
    },

    include: {
      videos: {
        orderBy: {
          order: "asc",
        },
      },

      files: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!chapter) {
    const error = new Error(
      "Chapter not found in this course"
    );
    error.statusCode = 404;
    throw error;
  }

  return chapter;
};

// =====================================================
// VERIFY TEACHER OWNS COURSE
// =====================================================

const verifyTeacherCourse = async (
  courseId,
  userId
) => {
  const teacher = await getTeacherByUserId(userId);

  const course = await prisma.course.findUnique({
    where: {
      id: Number(courseId),
    },
  });

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  if (course.teacherId !== teacher.id) {
    const error = new Error(
      "You are not allowed to manage this course"
    );

    error.statusCode = 403;
    throw error;
  }

  return course;
};

// =====================================================
// VERIFY TEACHER OWNS CHAPTER
// =====================================================

const verifyTeacherChapter = async (
  chapterId,
  userId
) => {
  const teacher = await getTeacherByUserId(userId);

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: Number(chapterId),
    },

    include: {
      course: true,
    },
  });

  if (!chapter) {
    const error = new Error("Chapter not found");
    error.statusCode = 404;
    throw error;
  }

  if (chapter.course.teacherId !== teacher.id) {
    const error = new Error(
      "You are not allowed to manage this chapter"
    );

    error.statusCode = 403;
    throw error;
  }

  return chapter;
};

// =====================================================
// CREATE CHAPTER
// =====================================================

const createChapter = async (
  courseId,
  userId,
  data,
) => {
  //console.log("Chapter:", prisma.chapter);
  //console.log("ChapterVideo:", prisma.chapterVideo);
  //console.log("ChapterFile:", prisma.chapterFile);
  await verifyTeacherCourse(courseId, userId);
  //console.log(courseId, userId, data);
  const existing = await prisma.chapter.findUnique({
    where: {
      courseId_order: {
        courseId: courseId,
        order: data.order,
      },
    },
  });

  if (existing) {
    const error = new Error(
      "A chapter with this order already exists"
    );

    error.statusCode = 409;
    throw error;
  }

  return prisma.chapter.create({
    data: {
      courseId: Number(courseId),
      title:data.title,
      description: data.description ?? null,
      order: Number(data.order),
    },

    include: {
      videos: true,
      files: true,
    },
  });
};

// =====================================================
// GET CHAPTERS BY COURSE
// =====================================================

const getChaptersByCourse = async (courseId) => {
  const chapters = await prisma.chapter.findMany({
    where: {
      courseId: Number(courseId),
    },

    orderBy: {
      order: "asc",
    },

    include: {
      videos: {
        orderBy: {
          order: "asc",
        },
      },

      files: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return chapters;
};

// =====================================================
// GET CHAPTER
// =====================================================

const getChapterById = async (courseId, chapterId) => {
  return getChapter(courseId,chapterId);
};

// =====================================================
// UPDATE CHAPTER
// =====================================================

const updateChapter = async (
  chapterId,
  userId,
  data
) => {
  const chapter = await verifyTeacherChapter(
    chapterId,
    userId
  );

  if (data.order !== undefined) {
    const existing =
      await prisma.chapter.findFirst({
        where: {
          courseId: chapter.courseId,
          order: Number(data.order),
          NOT: {
            id: Number(chapterId),
          },
        },
      });

    if (existing) {
      const error = new Error(
        "A chapter with this order already exists"
      );

      error.statusCode = 409;
      throw error;
    }
  }

  return prisma.chapter.update({
    where: {
      id: Number(chapterId),
    },

    data: {
      ...(data.title !== undefined && {
        title: data.title,
      }),

      ...(data.description !== undefined && {
        description: data.description,
      }),

      ...(data.order !== undefined && {
        order: Number(data.order),
      }),
    },

    include: {
      videos: true,
      files: true,
    },
  });
};

// =====================================================
// DELETE CHAPTER
// =====================================================

const deleteChapter = async (
  chapterId,
  userId
) => {
  await verifyTeacherChapter(
    chapterId,
    userId
  );

  await prisma.chapter.delete({
    where: {
      id: Number(chapterId),
    },
  });

  return {
    message: "Chapter deleted successfully",
  };
};

// =====================================================
// ADD VIDEO
// =====================================================

const createVideo = async (
  courseId,
  chapterId,
  data,
  file
) => {
  const parsedCourseId = Number(courseId);
  const parsedChapterId = Number(chapterId);
  const parsedOrder = Number(data.order);
  const parsedDuration =
    data.duration !== undefined
      ? Number(data.duration)
      : null;

  // Check chapter
  const chapter = await prisma.chapter.findFirst({
    where: {
      id: parsedChapterId,
      courseId: parsedCourseId,
    },
  });

  if (!chapter) {
    const error = new Error(
      "Chapter not found in this course"
    );

    error.statusCode = 404;
    throw error;
  }

  // Check duplicate order
  const existing = await prisma.chapterVideo.findUnique({
    where: {
      chapterId_order: {
        chapterId: parsedChapterId,
        order: parsedOrder,
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

  const videoUrl =
    `/uploads/courses/${parsedCourseId}/chapters/${parsedChapterId}/${file.filename}`;

  return prisma.chapterVideo.create({
    data: {
      chapterId: parsedChapterId,
      title: data.title,
      videoUrl,
      duration: parsedDuration,
      order: parsedOrder,
    },
  });
};

// =====================================================
// UPDATE VIDEO
// =====================================================

const updateVideo = async (
  videoId,
  userId,
  data
) => {
  const video =
    await prisma.chapterVideo.findUnique({
      where: {
        id: Number(videoId),
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

  await verifyTeacherChapter(
    video.chapterId,
    userId
  );

  if (data.order !== undefined) {
    const existing =
      await prisma.chapterVideo.findFirst({
        where: {
          chapterId: video.chapterId,
          order: Number(data.order),
          NOT: {
            id: Number(videoId),
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

  return prisma.chapterVideo.update({
    where: {
      id: Number(videoId),
    },

    data: {
      ...(data.title !== undefined && {
        title: data.title,
      }),

      ...(data.videoUrl !== undefined && {
        videoUrl: data.videoUrl,
      }),

      ...(data.duration !== undefined && {
        duration: Number(data.duration),
      }),

      ...(data.order !== undefined && {
        order: Number(data.order),
      }),
    },
  });
};

// =====================================================
// DELETE VIDEO
// =====================================================

const deleteVideo = async (
  videoId,
  userId
) => {
  const video =
    await prisma.chapterVideo.findUnique({
      where: {
        id: Number(videoId),
      },
    });

  if (!video) {
    const error = new Error("Video not found");
    error.statusCode = 404;
    throw error;
  }

  await verifyTeacherChapter(
    video.chapterId,
    userId
  );

  await prisma.chapterVideo.delete({
    where: {
      id: Number(videoId),
    },
  });

  return {
    message: "Video deleted successfully",
  };
};

// =====================================================
// ADD FILE
// =====================================================

const addFile = async ({
  chapterId,
  userId,
  name,
  file,
}) => {
  const parsedChapterId = Number(chapterId);

  if (
    !Number.isInteger(parsedChapterId) ||
    parsedChapterId <= 0
  ) {
    const error = new Error("Invalid chapter ID");
    error.statusCode = 400;
    throw error;
  }

  if (!file) {
    const error = new Error("File is required");
    error.statusCode = 400;
    throw error;
  }

  // Verify teacher owns the chapter
  await verifyTeacherChapter(
    parsedChapterId,
    userId
  );

  const fileUrl =
    `/uploads/chapters/${parsedChapterId}/${file.filename}`;

  return prisma.chapterFile.create({
    data: {
      chapterId: parsedChapterId,

      name:
        name ||
        file.originalname,

      fileUrl,

      fileType:
        file.mimetype || null,

      fileSize:
        file.size !== undefined
          ? Number(file.size)
          : null,
    },
  });
};

// =====================================================
// UPDATE FILE
// =====================================================



const updateFile = async (
  fileId,
  userId,
  data,
  newFile
) => {
  const parsedFileId = Number(fileId);

  if (
    !Number.isInteger(parsedFileId) ||
    parsedFileId <= 0
  ) {
    const error = new Error("Invalid file ID");
    error.statusCode = 400;
    throw error;
  }

  const file =
    await prisma.chapterFile.findUnique({
      where: {
        id: parsedFileId,
      },
    });

  if (!file) {
    const error = new Error("File not found");
    error.statusCode = 404;
    throw error;
  }

  // Verify ownership
  await verifyTeacherChapter(
    file.chapterId,
    userId
  );

  const updateData = {};

  // ==========================================
  // UPDATE NAME
  // ==========================================

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  // ==========================================
  // REPLACE FILE
  // ==========================================

  if (newFile) {
    updateData.fileUrl =
      `/uploads/chapters/${file.chapterId}/${newFile.filename}`;

    updateData.fileType =
      newFile.mimetype || null;

    updateData.fileSize =
      newFile.size !== undefined
        ? Number(newFile.size)
        : null;

    // If no custom name was provided,
    // use the uploaded filename
    if (data.name === undefined) {
      updateData.name =
        newFile.originalname;
    }
  }

  // ==========================================
  // UPDATE DATABASE
  // ==========================================

  const updatedFile =
    await prisma.chapterFile.update({
      where: {
        id: parsedFileId,
      },

      data: updateData,
    });

  // ==========================================
  // DELETE OLD FILE
  // ==========================================

  if (
    newFile &&
    file.fileUrl
  ) {
    const oldFilePath = path.join(
      process.cwd(),
      file.fileUrl.replace(
        /^\/uploads[\\/]/,
        "uploads/"
      )
    );

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  return updatedFile;
};

// =====================================================
// DELETE FILE
// =====================================================

const deleteFile = async (
  fileId,
  userId
) => {
  const parsedFileId = Number(fileId);

  if (
    !Number.isInteger(parsedFileId) ||
    parsedFileId <= 0
  ) {
    const error = new Error("Invalid file ID");
    error.statusCode = 400;
    throw error;
  }

  const file =
    await prisma.chapterFile.findUnique({
      where: {
        id: parsedFileId,
      },
    });

  if (!file) {
    const error = new Error("File not found");
    error.statusCode = 404;
    throw error;
  }

  // Verify teacher owns the chapter
  await verifyTeacherChapter(
    file.chapterId,
    userId
  );

  // ==========================================
  // DELETE DATABASE RECORD
  // ==========================================

  await prisma.chapterFile.delete({
    where: {
      id: parsedFileId,
    },
  });

  // ==========================================
  // DELETE PHYSICAL FILE
  // ==========================================

  if (file.fileUrl) {
    const filePath = path.join(
      process.cwd(),
      file.fileUrl.replace(
        /^\/uploads[\\/]/,
        "uploads/"
      )
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  return {
    message: "File deleted successfully",
  };
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