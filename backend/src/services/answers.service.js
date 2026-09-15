const prisma = require("../config/prisma");

// =====================================================
// GET STUDENT BY USER ID
// =====================================================

const getStudentByUserId = async (userId) => {
  const student = await prisma.student.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!student) {
    const error = new Error(
      "Student profile not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return student;
};

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
// VERIFY SUBMISSION OWNERSHIP
// =====================================================

const verifyStudentSubmission = async (
  submissionId,
  userId
) => {
  const student =
    await getStudentByUserId(userId);

  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(submissionId),
      },
    });

  if (!submission) {
    const error = new Error(
      "Submission not found"
    );

    error.statusCode = 404;

    throw error;
  }

  if (
    submission.studentId !== student.id
  ) {
    const error = new Error(
      "You are not allowed to access this submission"
    );

    error.statusCode = 403;

    throw error;
  }

  return submission;
};

// =====================================================
// GET QUESTION
// =====================================================

const getQuestion = async (questionId) => {
  const question =
    await prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },

      include: {
        options: true,

        test: {
          select: {
            id: true,
            maxScore: true,
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
// VALIDATE QUESTION BELONGS TO SUBMISSION TEST
// =====================================================

const validateQuestionBelongsToTest = (
  question,
  submission
) => {
  if (
    question.testId !== submission.testId
  ) {
    const error = new Error(
      "This question does not belong to the submission test"
    );

    error.statusCode = 400;

    throw error;
  }
};

// =====================================================
// CALCULATE ANSWER
// =====================================================

const calculateAnswer = (
  question,
  answer
) => {
  // ---------------------------------------------------
  // No answer
  // ---------------------------------------------------

  if (
    answer === null ||
    answer === undefined ||
    answer.trim() === ""
  ) {
    return {
      isCorrect: false,
      points: 0,
    };
  }

  // ---------------------------------------------------
  // MULTIPLE CHOICE
  // ---------------------------------------------------

  if (
    question.type ===
    "MULTIPLE_CHOICE"
  ) {
    const selectedOption =
      question.options.find(
        (option) =>
          String(option.id) ===
          String(answer)
      );

    if (!selectedOption) {
      const error = new Error(
        "Invalid question option"
      );

      error.statusCode = 400;

      throw error;
    }

    const isCorrect =
      selectedOption.isCorrect;

    return {
      isCorrect,

      points: isCorrect
        ? question.points
        : 0,
    };
  }

  // ---------------------------------------------------
  // TRUE / FALSE
  // ---------------------------------------------------

  if (
    question.type ===
    "TRUE_FALSE"
  ) {
    const normalizedAnswer =
      answer.trim().toLowerCase();

    if (
      normalizedAnswer !== "true" &&
      normalizedAnswer !== "false"
    ) {
      const error = new Error(
        "TRUE_FALSE answer must be true or false"
      );

      error.statusCode = 400;

      throw error;
    }

    const correctOption =
      question.options.find(
        (option) =>
          option.isCorrect === true
      );

    if (!correctOption) {
      const error = new Error(
        "This TRUE_FALSE question has no correct option configured"
      );

      error.statusCode = 500;

      throw error;
    }

    const correctAnswer =
      correctOption.text
        .trim()
        .toLowerCase();

    const isCorrect =
      normalizedAnswer ===
      correctAnswer;

    return {
      isCorrect,

      points: isCorrect
        ? question.points
        : 0,
    };
  }

  // ---------------------------------------------------
  // SHORT ANSWER
  // ---------------------------------------------------

  if (
    question.type ===
    "SHORT_ANSWER"
  ) {
    // Teacher/manual grading
    return {
      isCorrect: null,
      points: null,
    };
  }

  return {
    isCorrect: null,
    points: null,
  };
};

// =====================================================
// CREATE ANSWER
// =====================================================

const createAnswer = async ({
  userId,
  submissionId,
  questionId,
  answer,
}) => {
  const submission =
    await verifyStudentSubmission(
      submissionId,
      userId
    );

  // Cannot answer a graded submission
  if (
    submission.status === "GRADED"
  ) {
    const error = new Error(
      "Cannot modify a graded submission"
    );

    error.statusCode = 400;

    throw error;
  }

  // Cannot modify submitted submission
  if (
    submission.status === "SUBMITTED"
  ) {
    const error = new Error(
      "Submission has already been submitted"
    );

    error.statusCode = 400;

    throw error;
  }

  const question =
    await getQuestion(questionId);

  validateQuestionBelongsToTest(
    question,
    submission
  );

  // Check duplicate
  const existing =
    await prisma.answer.findUnique({
      where: {
        submissionId_questionId: {
          submissionId:
            Number(submissionId),

          questionId:
            Number(questionId),
        },
      },
    });

  if (existing) {
    const error = new Error(
      "An answer already exists for this question"
    );

    error.statusCode = 409;

    throw error;
  }

  const result =
    calculateAnswer(
      question,
      answer
    );

  return prisma.answer.create({
    data: {
      submissionId:
        Number(submissionId),

      questionId:
        Number(questionId),

      answer:
        answer ?? null,

      isCorrect:
        result.isCorrect,

      points:
        result.points,
    },

    include: {
      question: true,
    },
  });
};

// =====================================================
// UPDATE ANSWER
// =====================================================

const updateAnswer = async (
  id,
  userId,
  answer
) => {
  const existing =
    await prisma.answer.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        submission: true,

        question: {
          include: {
            options: true,
          },
        },
      },
    });

  if (!existing) {
    const error = new Error(
      "Answer not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // Verify ownership
  await verifyStudentSubmission(
    existing.submissionId,
    userId
  );

  if (
    existing.submission.status ===
    "GRADED"
  ) {
    const error = new Error(
      "Cannot modify a graded submission"
    );

    error.statusCode = 400;

    throw error;
  }

  if (
    existing.submission.status ===
    "SUBMITTED"
  ) {
    const error = new Error(
      "Submission has already been submitted"
    );

    error.statusCode = 400;

    throw error;
  }

  const result =
    calculateAnswer(
      existing.question,
      answer
    );

  return prisma.answer.update({
    where: {
      id: Number(id),
    },

    data: {
      answer:
        answer ?? null,

      isCorrect:
        result.isCorrect,

      points:
        result.points,
    },

    include: {
      question: true,
    },
  });
};

// =====================================================
// GET ANSWERS BY SUBMISSION
// =====================================================

const getAnswersBySubmission = async ({
  submissionId,
  userId,
  role,
}) => {
  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(submissionId),
      },

      include: {
        test: true,
      },
    });

  if (!submission) {
    const error = new Error(
      "Submission not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // Student
  if (role === "STUDENT") {
    await verifyStudentSubmission(
      submissionId,
      userId
    );
  }

  // Teacher
  if (role === "TEACHER") {
    const teacher =
      await getTeacherByUserId(userId);

    if (
      submission.test.teacherId !==
      teacher.id
    ) {
      const error = new Error(
        "You are not allowed to access these answers"
      );

      error.statusCode = 403;

      throw error;
    }
  }

  return prisma.answer.findMany({
    where: {
      submissionId:
        Number(submissionId),
    },

    orderBy: {
      question: {
        order: "asc",
      },
    },

    include: {
      question: {
        include: {
          options: true,
        },
      },
    },
  });
};

// =====================================================
// GET ANSWER BY ID
// =====================================================

const getAnswerById = async (
  id,
  userId,
  role
) => {
  const answer =
    await prisma.answer.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        submission: {
          include: {
            test: true,
          },
        },

        question: {
          include: {
            options: true,
          },
        },
      },
    });

  if (!answer) {
    const error = new Error(
      "Answer not found"
    );

    error.statusCode = 404;

    throw error;
  }

  if (role === "STUDENT") {
    await verifyStudentSubmission(
      answer.submissionId,
      userId
    );
  }

  if (role === "TEACHER") {
    const teacher =
      await getTeacherByUserId(userId);

    if (
      answer.submission.test.teacherId !==
      teacher.id
    ) {
      const error = new Error(
        "You are not allowed to access this answer"
      );

      error.statusCode = 403;

      throw error;
    }
  }

  return answer;
};

// =====================================================
// DELETE ANSWER
// =====================================================

const deleteAnswer = async (
  id,
  userId
) => {
  const answer =
    await prisma.answer.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!answer) {
    const error = new Error(
      "Answer not found"
    );

    error.statusCode = 404;

    throw error;
  }

  const submission =
    await verifyStudentSubmission(
      answer.submissionId,
      userId
    );

  if (
    submission.status !==
    "IN_PROGRESS"
  ) {
    const error = new Error(
      "Only answers in an in-progress submission can be deleted"
    );

    error.statusCode = 400;

    throw error;
  }

  await prisma.answer.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message:
      "Answer deleted successfully",
  };
};

module.exports = {
  createAnswer,
  updateAnswer,
  getAnswersBySubmission,
  getAnswerById,
  deleteAnswer,
};