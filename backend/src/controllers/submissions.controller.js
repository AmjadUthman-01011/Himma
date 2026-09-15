const submissionService =
  require("../services/submissions.service");

// =====================================================
// GET ALL
// =====================================================

const getSubmissions = async (
  req,
  res,
  next
) => {
  try {
    const {
      testId,
      studentId,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    const result =
      await submissionService.getAllSubmissions({
        userId: req.user.id,

        role: req.user.role,

        testId:
          testId !== undefined
            ? Number(testId)
            : undefined,

        studentId:
          studentId !== undefined
            ? Number(studentId)
            : undefined,

        status,

        page: Number(page),

        limit: Number(limit),
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
// GET BY ID
// =====================================================

const getSubmission = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.getSubmissionById(
        req.params.id,
        req.user.id,
        req.user.role
      );

    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// CREATE
// =====================================================

const createSubmission = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.createSubmission({
        userId: req.user.id,

        ...req.body,
      });

    return res.status(201).json({
      success: true,

      message:
        "Submission created successfully",

      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE
// =====================================================

const updateSubmission = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.updateSubmission(
        req.params.id,
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,

      message:
        "Submission updated successfully",

      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// SUBMIT
// =====================================================

const submitSubmission = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.submitSubmission(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,

      message:
        "Submission submitted successfully",

      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GRADE
// =====================================================

const gradeSubmission = async (
  req,
  res,
  next
) => {
  try {
    const submission =
      await submissionService.gradeSubmission(
        req.params.id,
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,

      message:
        "Submission graded successfully",

      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteSubmission = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await submissionService.deleteSubmission(
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
  getSubmissions,
  getSubmission,
  createSubmission,
  updateSubmission,
  submitSubmission,
  gradeSubmission,
  deleteSubmission,
};