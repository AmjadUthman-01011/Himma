const prisma = require("../config/prisma");

// =====================================================
// GET TEACHER
// =====================================================

const getTeacherByUserId = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!teacher) {
    const error = new Error(
      "Teacher profile not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return teacher;
};

// =====================================================
// VERIFY QUESTION OWNERSHIP
// =====================================================

const getTeacherQuestion = async (
  questionId,
  userId
) => {
  const teacher =
    await getTeacherByUserId(userId);

  const question =
    await prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },

      include: {
        test: true,
      },
    });

  if (!question) {
    const error = new Error(
      "Question not found"
    );

    error.statusCode = 404;

    throw error;
  }

  if (
    question.test.teacherId !== teacher.id
  ) {
    const error = new Error(
      "You are not allowed to access this question"
    );

    error.statusCode = 403;

    throw error;
  }

  return question;
};

// =====================================================
// GET ALL OPTIONS
// =====================================================

const getAllOptions = async ({
  questionId,
}) => {
  const where = {};

  if (questionId !== undefined) {
    where.questionId = Number(questionId);
  }

  const options =
    await prisma.questionOption.findMany({
      where,

      orderBy: {
        id: "asc",
      },
    });

  return {
    data: options,
  };
};

// =====================================================
// GET OPTION BY ID
// =====================================================

const getOptionById = async (id) => {
  const option =
    await prisma.questionOption.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        question: {
          include: {
            test: {
              select: {
                id: true,
                title: true,
                teacherId: true,
              },
            },
          },
        },
      },
    });

  if (!option) {
    const error = new Error(
      "Question option not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return option;
};

// =====================================================
// CREATE OPTION
// =====================================================

const createOption = async ({
  userId,
  questionId,
  text,
  isCorrect = false,
}) => {
  const question =
    await getTeacherQuestion(
      questionId,
      userId
    );

  // -----------------------------------------------
  // For MULTIPLE_CHOICE / TRUE_FALSE
  // -----------------------------------------------

  if (
    isCorrect === true
  ) {
    // If this is a TRUE_FALSE question,
    // there can still be only one correct option.
    const existingCorrect =
      await prisma.questionOption.findFirst({
        where: {
          questionId: Number(questionId),
          isCorrect: true,
        },
      });

    if (existingCorrect) {
      const error = new Error(
        "This question already has a correct option"
      );

      error.statusCode = 409;

      throw error;
    }
  }

  const option =
    await prisma.questionOption.create({
      data: {
        questionId:
          Number(questionId),

        text,

        isCorrect,
      },
    });

  return option;
};

// =====================================================
// UPDATE OPTION
// =====================================================

const updateOption = async (
  id,
  userId,
  data
) => {
  const option =
    await prisma.questionOption.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!option) {
    const error = new Error(
      "Question option not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // Verify question/test ownership
  const question =
    await getTeacherQuestion(
      option.questionId,
      userId
    );

  // -----------------------------------------------
  // Correct answer validation
  // -----------------------------------------------

  if (data.isCorrect === true) {
    const existingCorrect =
      await prisma.questionOption.findFirst({
        where: {
          questionId:
            option.questionId,

          isCorrect: true,

          NOT: {
            id: Number(id),
          },
        },
      });

    if (existingCorrect) {
      const error = new Error(
        "This question already has a correct option"
      );

      error.statusCode = 409;

      throw error;
    }
  }

  const updateData = {};

  if (data.text !== undefined) {
    updateData.text = data.text;
  }

  if (
    data.isCorrect !== undefined
  ) {
    updateData.isCorrect =
      data.isCorrect;
  }

  return prisma.questionOption.update({
    where: {
      id: Number(id),
    },

    data: updateData,
  });
};

// =====================================================
// DELETE OPTION
// =====================================================

const deleteOption = async (
  id,
  userId
) => {
  const option =
    await prisma.questionOption.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!option) {
    const error = new Error(
      "Question option not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // Verify ownership
  await getTeacherQuestion(
    option.questionId,
    userId
  );

  await prisma.questionOption.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message:
      "Question option deleted successfully",
  };
};

module.exports = {
  getAllOptions,
  getOptionById,
  createOption,
  updateOption,
  deleteOption,
};