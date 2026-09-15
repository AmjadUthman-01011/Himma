const teacherService = require("../services/teachers.service");

// =====================================================
// GET ALL Teachers
// =====================================================

const getTeachers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      isActive,
    } = req.query;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (
      !Number.isInteger(parsedPage) ||
      parsedPage < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be a positive integer",
      });
    }

    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 100",
      });
    }

    let parsedIsActive;

    if (isActive !== undefined) {
      if (
        isActive !== "true" &&
        isActive !== "false"
      ) {
        return res.status(400).json({
          success: false,
          message: "isActive must be true or false",
        });
      }

      parsedIsActive = isActive === "true";
    }

    const result =
      await teacherService.getAllTeachers({
        page: parsedPage,
        limit: parsedLimit,
        search,
        isActive: parsedIsActive,
      });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET TEACHER BY ID
// =====================================================

const getTeacher = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const teacher =
      await teacherService.getTeacherById(id);

    return res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE TEACHER
// =====================================================

const createTeacher = async (req, res, next) => {
  try {
    const teacher =
      await teacherService.createTeacher(req.body);

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE TEACHER
// =====================================================

const updateTeacher = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const teacher =
      await teacherService.updateTeacher(
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE TEACHER
// =====================================================

const deleteTeacher = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const result =
      await teacherService.deleteTeacher(id);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE TEACHER STATUS
// =====================================================

const updateStatus = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { isActive } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    const teacher =
      await teacherService.updateTeacherStatus(
        id,
        isActive
      );

    return res.status(200).json({
      success: true,
      message: `Teacher ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE PASSWORD
// =====================================================

const updatePassword = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { password } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    if (
      typeof password !== "string" ||
      password.trim().length < 8
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters",
      });
    }

    const result =
      await teacherService.updateTeacherPassword(
        id,
        password
      );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET MY PROFILE
// GET /api/teachers/me
// =====================================================

const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const teacher =
      await teacherService.getTeacherById(userId);

    return res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

const assignTeacherToCourse = async (req, res, next) => {
    try {

        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required"
            });
        }

        const course = await teacherService.assignTeacherToCourse(
            req.params.id,
            courseId
        );

        res.status(200).json({
            success: true,
            message: "Teacher assigned to course successfully",
            course
        });

    } catch (error) {
        next(error);
    }
};

const getMyCourses = async (req, res, next) => {
    try {
        const courses = await teacherService.getMyCourses(
            req.user.id
        );
        
        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });

    } catch (error) {
        next(error);
    }
};

const getTeacherStudents = async (req, res, next) => {
    try {
        
        const students = await teacherService.getTeacherStudents(
            req.params.id
        );
        //res.json({students})

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        next(error);
    }
};

const getMyStudents = async (req, res, next) => {
    try {

        const students = await teacherService.getMyStudents(
            req.user.id
        );

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        next(error);
    }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updateStatus,
  updatePassword,
  getMyProfile,
  assignTeacherToCourse,
  getMyCourses,
  getTeacherStudents,
  getMyStudents
};