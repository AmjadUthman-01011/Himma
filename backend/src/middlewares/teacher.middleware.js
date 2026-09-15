const prisma = require("../config/prisma");

const authorizeTeacherOwner = async (req, res, next) => {
  try {
    // ADMIN can access everything
    if (req.user.role === "ADMIN") {
      return next();
    }

    // Only teachers can continue
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // :id is USER ID
    const teacherId = Number(req.params.id);

    if (!Number.isInteger(teacherId) || teacherId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Make sure the requested User belongs to a Teacher
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
      select: {
        id: true,
        userId: true,
      },
    });
    //return res.json({students:teacher})

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Make sure the logged-in teacher owns this user
    if (teacher.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only access your own resources",
      });
    }

    return next();

  } catch (error) {
    return next(error);
  }
};

module.exports = authorizeTeacherOwner;