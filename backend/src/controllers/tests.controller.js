const testService = require("../services/tests.service");

// =====================================================
// GET ALL TESTS
// =====================================================

const getTests = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      courseId,
      teacherId,
    } = req.query;

    const result =
      await testService.getAllTests({
        page: Number(page),
        limit: Number(limit),
        search,
        courseId:
          courseId !== undefined
            ? Number(courseId)
            : undefined,
        teacherId:
          teacherId !== undefined
            ? Number(teacherId)
            : undefined,
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
// GET TEST BY ID
// =====================================================

const getTest = async (req, res, next) => {
  try {
    const test =
      await testService.getTestById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// CREATE TEST
// =====================================================

const createTest = async (req, res, next) => {
  try {
    const test =
      await testService.createTest({
        ...req.body,

        // IMPORTANT:
        // Teacher ID is NOT taken from body.
        userId: req.user.id,
        role: req.user.role
      });

    return res.status(201).json({
      success: true,

      message:
        "Test created successfully",

      data: test,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE TEST
// =====================================================

const updateTest = async (req, res, next) => {
  try {
    const test =
      await testService.updateTest(
        req.params.id,
        req.user.id,
        req.body,
        req.user.role
      );

    return res.status(200).json({
      success: true,

      message:
        "Test updated successfully",

      data: test,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE TEST
// =====================================================

const deleteTest = async (req, res, next) => {
  try {
    const result =
      await testService.deleteTest(
        req.params.id,
        req.user.id,
        req.user.role
      );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
};