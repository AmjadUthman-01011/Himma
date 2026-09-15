const prisma = require("../config/prisma");

// =====================================================
// GET ALL TESTS
// =====================================================

const getAllTests = async ({
  page = 1,
  limit = 10,
  search,
  courseId,
  teacherId,
}) => {
  const skip = (page - 1) * limit;

  const where = {};

  // Search
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
        },
      },
      {
        description: {
          contains: search,
        },
      },
    ];
  }

  // Course filter
  if (courseId !== undefined) {
    where.courseId = Number(courseId);
  }

  // Teacher filter
  if (teacherId !== undefined) {
    where.teacherId = Number(teacherId);
  }

  const [tests, total] =
    await prisma.$transaction([
      prisma.test.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          course: true,

          teacher: true,

          _count: {
            select: {
              questions: true,
              submissions: true,
            },
          },
        },
      }),

      prisma.test.count({
        where,
      }),
    ]);

  return {
    data: tests,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// =====================================================
// GET TEST BY ID
// =====================================================

const getTestById = async (id) => {
  const test = await prisma.test.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      course: true,

      teacher: true,

      questions: {
        orderBy: {
          order: "asc",
        },

        include: {
          options: true,
        },
      },

      _count: {
        select: {
          submissions: true,
        },
      },
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
// GET TEST BY ID FOR TEACHER
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
// CREATE TEST
// =====================================================

const createTest = async ({
  userId,
  courseId,
  title,
  description,
  startDate,
  endDate,
  maxScore,
  role
}) => {

  // Find course
  // -----------------------------------------------

  const course = await prisma.course.findUnique({
    where: {
      id: Number(courseId),
    },
  });

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  
  if(role!=="ADMIN"){
    // -----------------------------------------------
  // Find authenticated teacher
  // -----------------------------------------------

    const teacher =
    await getTeacherByUserId(userId);
  

  // -----------------------------------------------
  // Verify course ownership
  // -----------------------------------------------

  if (course.teacherId !== teacher.id) {
    const error = new Error(
      "You are not assigned to this course"
    );

    error.statusCode = 403;

    throw error;
  }
  }
  

  // -----------------------------------------------
  // Validate dates
  // -----------------------------------------------

  if (
    startDate &&
    endDate &&
    new Date(startDate) >= new Date(endDate)
  ) {
    const error = new Error(
      "End date must be after start date"
    );

    error.statusCode = 400;

    throw error;
  }

  // -----------------------------------------------
  // Create test
  // -----------------------------------------------

  const test = await prisma.test.create({
    data: {
      courseId: Number(courseId),

      teacherId: course.teacherId,

      title,

      description:
        description ?? null,

      startDate: startDate
        ? new Date(startDate)
        : null,

      endDate: endDate
        ? new Date(endDate)
        : null,

      maxScore: maxScore ?? 100,
    },

    include: {
      course: true,
      teacher: true,
    },
  });

  return test;
};

// =====================================================
// UPDATE TEST
// =====================================================

const updateTest = async (
  id,
  userId,
  data,
  role
) => {
  const test = await prisma.test.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!test) {
    const error = new Error("Test not found");
    error.statusCode = 404;
    throw error;
  }
  if(role!=="ADMIN"){
    const teacher =
    await getTeacherByUserId(userId);

  // Only the teacher who created the test
  // can update it.

  if (
    test.teacherId !== teacher.id
  ) {
    const error = new Error(
      "You are not allowed to update this test"
    );

    error.statusCode = 403;

    throw error;
  }
  }
  

  const updateData = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  if (data.description !== undefined) {
    updateData.description =
      data.description;
  }

  if (data.startDate !== undefined) {
    updateData.startDate =
      data.startDate
        ? new Date(data.startDate)
        : null;
  }

  if (data.endDate !== undefined) {
    updateData.endDate =
      data.endDate
        ? new Date(data.endDate)
        : null;
  }

  if (data.maxScore !== undefined) {
    updateData.maxScore =
      data.maxScore;
  }

  // Course change
  if (data.courseId !== undefined) {
    const course =
      await prisma.course.findUnique({
        where: {
          id: Number(data.courseId),
        },
      });

    if (!course) {
      const error = new Error(
        "Course not found"
      );

      error.statusCode = 404;

      throw error;
    }
    if(role!=="ADMIN"){
      const teacher =
    await getTeacherByUserId(userId);
      if (
      course.teacherId !== teacher.id
    ) {
      const error = new Error(
        "You are not assigned to this course"
      );

      error.statusCode = 403;

      throw error;
    }
    }
    

    updateData.courseId =
      Number(data.courseId);
  }

  // Validate resulting dates
  const finalStartDate =
    data.startDate !== undefined
      ? data.startDate
      : test.startDate;

  const finalEndDate =
    data.endDate !== undefined
      ? data.endDate
      : test.endDate;

  if (
    finalStartDate &&
    finalEndDate &&
    new Date(finalStartDate) >=
      new Date(finalEndDate)
  ) {
    const error = new Error(
      "End date must be after start date"
    );

    error.statusCode = 400;

    throw error;
  }

  return prisma.test.update({
    where: {
      id: Number(id),
    },

    data: updateData,

    include: {
      course: true,
      teacher: true,
    },
  });
};

// =====================================================
// DELETE TEST
// =====================================================

const deleteTest = async (
  id,
  userId,
  role
) => {
  const test = await prisma.test.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!test) {
    const error = new Error("Test not found");
    error.statusCode = 404;
    throw error;
  }
  if(role!=="ADMIN"){
    const teacher =
    await getTeacherByUserId(userId);

  // Teacher ownership
  if (
    test.teacherId !== teacher.id
  ) {
    const error = new Error(
      "You are not allowed to delete this test"
    );

    error.statusCode = 403;

    throw error;
  }
  }
  

  await prisma.test.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Test deleted successfully",
  };
};

module.exports = {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
};