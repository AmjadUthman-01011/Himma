const questionService =
  require("../services/questions.service");

// =====================================================
// GET ALL QUESTIONS
// =====================================================

const getQuestions = async (
  req,
  res,
  next
) => {
  try {
    const {
      testId,
      type,
      page = 1,
      limit = 20,
    } = req.query;

    const result =
      await questionService.getAllQuestions({
        testId:
          testId !== undefined
            ? Number(testId)
            : undefined,

        type,

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
// GET QUESTION
// =====================================================

const getQuestion = async (
  req,
  res,
  next
) => {
  try {
    const question =
      await questionService.getQuestionById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// CREATE QUESTION
// =====================================================

const createQuestion = async (
  req,
  res,
  next
) => {
  try {
    const question =
      await questionService.createQuestion({
        ...req.body,

        // Never trust teacherId
        // from frontend.
        userId: req.user.id,
      });

    return res.status(201).json({
      success: true,

      message:
        "Question created successfully",

      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE QUESTION
// =====================================================

const updateQuestion = async (
  req,
  res,
  next
) => {
  try {
    const question =
      await questionService.updateQuestion(
        req.params.id,
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,

      message:
        "Question updated successfully",

      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE QUESTION
// =====================================================

const deleteQuestion = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await questionService.deleteQuestion(
        req.params.id,
        req.user.id
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
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};