const answerService =
  require("../services/answers.service");

// =====================================================
// CREATE
// =====================================================

const createAnswer = async (
  req,
  res,
  next
) => {
  try {
    const answer =
      await answerService.createAnswer({
        userId: req.user.id,

        submissionId:
          req.body.submissionId,

        questionId:
          req.body.questionId,

        answer:
          req.body.answer,
      });

    return res.status(201).json({
      success: true,

      message:
        "Answer saved successfully",

      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE
// =====================================================

const updateAnswer = async (
  req,
  res,
  next
) => {
  try {
    const answer =
      await answerService.updateAnswer(
        req.params.id,

        req.user.id,

        req.body.answer
      );

    return res.status(200).json({
      success: true,

      message:
        "Answer updated successfully",

      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET ANSWERS BY SUBMISSION
// =====================================================

const getAnswersBySubmission =
  async (req, res, next) => {
    try {
      const answers =
        await answerService.getAnswersBySubmission({
          submissionId:
            req.params.submissionId,

          userId:
            req.user.id,

          role:
            req.user.role,
        });

      return res.status(200).json({
        success: true,

        data: answers,
      });
    } catch (error) {
      next(error);
    }
  };

// =====================================================
// GET BY ID
// =====================================================

const getAnswer = async (
  req,
  res,
  next
) => {
  try {
    const answer =
      await answerService.getAnswerById(
        req.params.id,

        req.user.id,

        req.user.role
      );

    return res.status(200).json({
      success: true,

      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE
// =====================================================

const deleteAnswer = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await answerService.deleteAnswer(
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
  createAnswer,
  updateAnswer,
  getAnswersBySubmission,
  getAnswer,
  deleteAnswer,
};