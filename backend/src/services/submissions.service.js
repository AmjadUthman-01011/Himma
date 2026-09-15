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
// GET TEST
// =====================================================

const getTestById = async (testId) => {
  const test = await prisma.test.findUnique({
    where: {
      id: Number(testId),
    },
  });

  if (!test) {
    const error = new Error("Test not found");

    error.statusCode = 404;

    throw error;
  }

  return test;
};

// =====================================================
// VERIFY TEACHER OWNS TEST
// =====================================================

const verifyTeacherOwnsTest = async (
  testId,
  userId
) => {
  const teacher =
    await getTeacherByUserId(userId);

  const test = await getTestById(testId);

  if (test.teacherId !== teacher.id) {
    const error = new Error(
      "You are not allowed to access submissions for this test"
    );

    error.statusCode = 403;

    throw error;
  }

  return test;
};

// =====================================================
// GET ALL SUBMISSIONS
// =====================================================

const getAllSubmissions = async ({
  userId,
  role,
  testId,
  studentId,
  status,
  page = 1,
  limit = 20,
}) => {
  const skip = (page - 1) * limit;

  const where = {};

  // ---------------------------------------------------
  // TEACHER
  // ---------------------------------------------------

  if (role === "TEACHER") {
    const teacher =
      await getTeacherByUserId(userId);

    where.test = {
      teacherId: teacher.id,
    };
  }

  // ---------------------------------------------------
  // STUDENT
  // ---------------------------------------------------

  if (role === "STUDENT") {
    const student =
      await getStudentByUserId(userId);

    where.studentId = student.id;
  }

  // ---------------------------------------------------
  // ADMIN can see everything
  // ---------------------------------------------------

  if (testId !== undefined) {
    where.testId = Number(testId);
  }

  if (studentId !== undefined) {
    // Students cannot override their own ID.
    if (role === "STUDENT") {
      const student =
        await getStudentByUserId(userId);

      where.studentId = student.id;
    } else {
      where.studentId = Number(studentId);
    }
  }

  if (status !== undefined) {
    where.status = status;
  }

  const [
    submissions,
    total,
  ] = await prisma.$transaction([
    prisma.submission.findMany({
      where,

      skip,
      take: limit,

      orderBy: {
        submittedAt: "desc",
      },

      include: {
        test: {
          select: {
            id: true,
            title: true,
            maxScore: true,
            courseId: true,
            teacherId: true,
          },
        },

        student: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },

        answers: true,
      },
    }),

    prisma.submission.count({
      where,
    }),
  ]);

  return {
    data: submissions,

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
// GET SUBMISSION BY ID
// =====================================================

const getSubmissionById = async (
  id,
  userId,
  role
) => {
  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        test: {
          select: {
            id: true,
            title: true,
            maxScore: true,
            courseId: true,
            teacherId: true,
          },
        },

        student: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },

        answers: true,
      },
    });

  if (!submission) {
    const error = new Error(
      "Submission not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // ---------------------------------------------------
  // Student can only see own submission
  // ---------------------------------------------------

  if (role === "STUDENT") {
    const student =
      await getStudentByUserId(userId);

    if (
      submission.studentId !== student.id
    ) {
      const error = new Error(
        "You are not allowed to access this submission"
      );

      error.statusCode = 403;

      throw error;
    }
  }

  // ---------------------------------------------------
  // Teacher can only see their test
  // ---------------------------------------------------

  if (role === "TEACHER") {
    const teacher =
      await getTeacherByUserId(userId);

    if (
      submission.test.teacherId !==
      teacher.id
    ) {
      const error = new Error(
        "You are not allowed to access this submission"
      );

      error.statusCode = 403;

      throw error;
    }
  }

  return submission;
};

// =====================================================
// CREATE SUBMISSION
// =====================================================

const createSubmission = async ({
  userId,
  testId,
  fileUrl,
}) => {
  const student =
    await getStudentByUserId(userId);

  const test = await getTestById(testId);

  // ---------------------------------------------------
  // Check if student already submitted
  // ---------------------------------------------------

  const existing =
    await prisma.submission.findUnique({
      where: {
        testId_studentId: {
          testId: Number(testId),
          studentId: student.id,
        },
      },
    });

  if (existing) {
    const error = new Error(
      "You already have a submission for this test"
    );

    error.statusCode = 409;

    throw error;
  }

  // ---------------------------------------------------
  // Check test dates
  // ---------------------------------------------------

  const now = new Date();

  if (
    test.startDate &&
    now < test.startDate
  ) {
    const error = new Error(
      "This test has not started yet"
    );

    error.statusCode = 400;

    throw error;
  }

  if (
    test.endDate &&
    now > test.endDate
  ) {
    const error = new Error(
      "This test has already ended"
    );

    error.statusCode = 400;

    throw error;
  }

  // ---------------------------------------------------
  // Create
  // ---------------------------------------------------

  const submission =
    await prisma.submission.create({
      data: {
        testId: Number(testId),

        studentId: student.id,

        fileUrl:
          fileUrl ?? null,

        status: "SUBMITTED",
      },

      include: {
        test: true,
      },
    });

  return submission;
};

// =====================================================
// UPDATE SUBMISSION
// =====================================================

const updateSubmission = async (
  id,
  userId,
  data
) => {
  const student =
    await getStudentByUserId(userId);

  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(id),
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
      "You are not allowed to update this submission"
    );

    error.statusCode = 403;

    throw error;
  }

  if (
    submission.status === "GRADED"
  ) {
    const error = new Error(
      "A graded submission cannot be modified"
    );

    error.statusCode = 400;

    throw error;
  }

  if (
    submission.status === "SUBMITTED"
  ) {
    const error = new Error(
      "A submitted submission cannot be modified"
    );

    error.statusCode = 400;

    throw error;
  }

  return prisma.submission.update({
    where: {
      id: Number(id),
    },

    data: {
      ...(data.fileUrl !== undefined && {
        fileUrl: data.fileUrl,
      }),
    },
  });
};

// =====================================================
// SUBMIT
// =====================================================

const submitSubmission = async (
  id,
  userId
) => {
  const student =
    await getStudentByUserId(userId);

  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(id),
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
      "You are not allowed to submit this submission"
    );

    error.statusCode = 403;

    throw error;
  }

  if (
    submission.status !==
    "IN_PROGRESS"
  ) {
    const error = new Error(
      "This submission has already been submitted"
    );

    error.statusCode = 400;

    throw error;
  }

  return prisma.submission.update({
    where: {
      id: Number(id),
    },

    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
    },
  });
};

// =====================================================
// GRADE SUBMISSION
// =====================================================

const gradeSubmission = async (
  id,
  userId,
  data
) => {
  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(id),
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

  // Verify teacher owns test
  await verifyTeacherOwnsTest(
    submission.testId,
    userId
  );

  // ---------------------------------------------------
  // Validate score against test maxScore
  // ---------------------------------------------------

  if (
    data.score > submission.test.maxScore
  ) {
    const error = new Error(
      `Score cannot exceed test maximum score of ${submission.test.maxScore}`
    );

    error.statusCode = 400;

    throw error;
  }

  return prisma.submission.update({
    where: {
      id: Number(id),
    },

    data: {
      score: data.score,

      feedback:
        data.feedback ?? null,

      status: "GRADED",
    },

    include: {
      test: true,

      student: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

// =====================================================
// DELETE SUBMISSION
// =====================================================

const deleteSubmission = async (
  id,
  userId,
  role
) => {
  const submission =
    await prisma.submission.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!submission) {
    const error = new Error(
      "Submission not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // ---------------------------------------------------
  // Student
  // ---------------------------------------------------

  if (role === "STUDENT") {
    const student =
      await getStudentByUserId(userId);

    if (
      submission.studentId !== student.id
    ) {
      const error = new Error(
        "You are not allowed to delete this submission"
      );

      error.statusCode = 403;

      throw error;
    }

    if (
      submission.status === "GRADED"
    ) {
      const error = new Error(
        "A graded submission cannot be deleted"
      );

      error.statusCode = 400;

      throw error;
    }
  }

  // ---------------------------------------------------
  // Teacher
  // ---------------------------------------------------

  if (role === "TEACHER") {
    await verifyTeacherOwnsTest(
      submission.testId,
      userId
    );
  }

  await prisma.submission.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message:
      "Submission deleted successfully",
  };
};

module.exports = {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  submitSubmission,
  gradeSubmission,
  deleteSubmission,
};