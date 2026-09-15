const studentService = require("../services/students.service");

// =====================================================
// GET ALL STUDENTS
// =====================================================

const getStudents = async (req, res, next) => {
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
      await studentService.getAllStudents({
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
// GET STUDENT BY ID
// =====================================================

const getStudent = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student =
      await studentService.getStudentById(id);

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE STUDENT
// =====================================================

const createStudent = async (req, res, next) => {
  try {
    const student =
      await studentService.createStudent(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE STUDENT
// =====================================================

const updateStudent = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student =
      await studentService.updateStudent(
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE STUDENT
// =====================================================

const deleteStudent = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const result =
      await studentService.deleteStudent(id);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE STUDENT STATUS
// =====================================================

const updateStatus = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { isActive } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    const student =
      await studentService.updateStudentStatus(
        id,
        isActive
      );

    return res.status(200).json({
      success: true,
      message: `Student ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET MY PROFILE
// GET /api/students/me
// =====================================================

const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const student =
      await studentService.getStudentById(userId);

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStatus,
  getMyProfile,
};