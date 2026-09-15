const multer = require("multer");
const path = require("path");

// =====================================================
// STORAGE
// =====================================================

const storage = multer.memoryStorage();

// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    // Images
    "image/jpeg",
    "image/png",
    "image/webp",

    // Videos
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Unsupported file type"
      ),
      false
    );
  }

  cb(null, true);
};

// =====================================================
// UPLOAD
// =====================================================

const upload = multer({
  storage,

  limits: {
    fileSize:
      500 * 1024 * 1024, // 500 MB
  },

  fileFilter,
});

// =====================================================
// ERROR HANDLER
// =====================================================

const uploadErrorHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message:
          "File size cannot exceed 500 MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

module.exports = {
  upload,
  uploadErrorHandler,
};