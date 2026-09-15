const questionOptionService =
  require("../services/questionOptions.service");

// =====================================================
// GET ALL OPTIONS
// =====================================================

const getOptions = async (
  req,
  res,
  next
) => {
  try {
    const { questionId } =
      req.query;

    const result =
      await questionOptionService.getAllOptions({
        questionId:
          questionId !== undefined
            ? Number(questionId)
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
// GET OPTION
// =====================================================

const getOption = async (
  req,
  res,
  next
) => {
  try {
    const option =
      await questionOptionService.getOptionById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// CREATE OPTION
// =====================================================

const createOption = async (
  req,
  res,
  next
) => {
  try {
    const option =
      await questionOptionService.createOption({
        ...req.body,

        // Never trust teacherId
        // from frontend.
        userId: req.user.id,
      });

    return res.status(201).json({
      success: true,

      message:
        "Question option created successfully",

      data: option,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE OPTION
// =====================================================

const updateOption = async (
  req,
  res,
  next
) => {
  try {
    const option =
      await questionOptionService.updateOption(
        req.params.id,
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,

      message:
        "Question option updated successfully",

      data: option,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE OPTION
// =====================================================

const deleteOption = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await questionOptionService.deleteOption(
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
  getOptions,
  getOption,
  createOption,
  updateOption,
  deleteOption,
};