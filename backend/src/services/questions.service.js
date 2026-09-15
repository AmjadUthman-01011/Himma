const prisma = require("../config/prisma");

// =====================================================
// GET TEACHER BY USER ID
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
// VERIFY TEACHER OWNS TEST
// =====================================================

const getTeacherTest = async (
  testId,
  userId
) => {
  const teacher =
    await getTeacherByUserId(userId);

  const test = await prisma.test.findUnique({
    where: {
      id: Number(testId),
    },
  });

  if (!test) {
    const error = new Error(
      "Test not found"
    );

    error.statusCode = 404;

    throw error;
  }

  if (test.teacherId !== teacher.id) {
    const error = new Error(
      "You are not allowed to access this test"
    );

    error.statusCode = 403;

    throw error;
  }

  return test;
};

// =====================================================
// GET ALL QUESTIONS
// =====================================================

const getAllQuestions = async ({
  testId,
  type,
  page = 1,
  limit = 20,
}) => {
  const skip = (page - 1) * limit;

  const where = {};

  if (testId !== undefined) {
    where.testId = Number(testId);
  }

  if (type !== undefined) {
    where.type = type;
  }

  const [questions, total] =
    await prisma.$transaction([
      prisma.question.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          order: "asc",
        },

        include: {
          options: true,

          test: {
            select: {
              id: true,
              title: true,
              courseId: true,
              teacherId: true,
            },
          },
        },
      }),

      prisma.question.count({
        where,
      }),
    ]);

  return {
    data: questions,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
};

// =====================================================
// GET QUESTION BY ID
// =====================================================

const getQuestionById = async (id) => {
  const question =
    await prisma.question.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        options: true,

        test: {
          select: {
            id: true,
            title: true,
            courseId: true,
            teacherId: true,
          },
        },
      },
    });

  if (!question) {
    const error = new Error(
      "Question not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return question;
};

// =====================================================
// CREATE QUESTION
// =====================================================

const createQuestion = async ({
  userId,
  testId,
  text,
  type,
  points,
  order,
}) => {
  // Verify teacher owns the test
  await getTeacherTest(
    testId,
    userId
  );

  // -----------------------------------------------
  // Determine order automatically
  // -----------------------------------------------

  let questionOrder = order;

  if (questionOrder === undefined) {
    const lastQuestion =
      await prisma.question.findFirst({
        where: {
          testId: Number(testId),
        },

        orderBy: {
          order: "desc",
        },
      });

    questionOrder = lastQuestion
      ? lastQuestion.order + 1
      : 1;
  }

  // -----------------------------------------------
  // Check duplicate order
  // -----------------------------------------------

  const existingQuestion =
    await prisma.question.findFirst({
      where: {
        testId: Number(testId),
        order: questionOrder,
      },
    });

  if (existingQuestion) {
    const error = new Error(
      `Question order ${questionOrder} already exists in this test`
    );

    error.statusCode = 409;

    throw error;
  }

  // -----------------------------------------------
  // Create question
  // -----------------------------------------------

  const newQuestion =
    await prisma.question.create({
      data: {
        testId: Number(testId),

        text,

        type,

        points: points ?? 1,

        order: questionOrder,
      },

      include: {
        options: true,
      },
    });

  return newQuestion;
};

// =====================================================
// UPDATE QUESTION
// =====================================================

const updateQuestion = async (
  id,
  userId,
  data
) => {
  const existingQuestion =
    await prisma.question.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!existingQuestion) {
    const error = new Error(
      "Question not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // Verify teacher owns the test
  await getTeacherTest(
    existingQuestion.testId,
    userId
  );

  const updateData = {};

  if (data.text !== undefined) {
    updateData.text = data.text;
  }

  if (data.type !== undefined) {
    updateData.type = data.type;
  }

  if (data.points !== undefined) {
    updateData.points = data.points;
  }

  // -----------------------------------------------
  // Check order
  // -----------------------------------------------

  if (data.order !== undefined) {
    const duplicate =
      await prisma.question.findFirst({
        where: {
          testId:
            existingQuestion.testId,

          order: data.order,

          NOT: {
            id: Number(id),
          },
        },
      });

    if (duplicate) {
      const error = new Error(
        `Question order ${data.order} already exists in this test`
      );

      error.statusCode = 409;

      throw error;
    }

    updateData.order = data.order;
  }

  // -----------------------------------------------
  // Update
  // -----------------------------------------------

  return prisma.question.update({
    where: {
      id: Number(id),
    },

    data: updateData,

    include: {
      options: true,
    },
  });
};

// =====================================================
// DELETE QUESTION
// =====================================================

const deleteQuestion = async (
  id,
  userId
) => {
  const question =
    await prisma.question.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!question) {
    const error = new Error(
      "Question not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // Verify ownership
  await getTeacherTest(
    question.testId,
    userId
  );

  await prisma.question.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message:
      "Question deleted successfully",
  };
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};