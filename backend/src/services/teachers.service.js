

const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const SALT_ROUNDS = 12;

const teacherSelect = {
  id: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,

  teacher: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  },
};

// =====================================================
// GET ALL Teachers
// =====================================================

const getAllTeachers = async ({
  page = 1,
  limit = 10,
  search,
  isActive,
}) => {
  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  const skip = (page - 1) * limit;

  const where = {
    role: "TEACHER",
  };

  // Search
  if (search) {
    where.OR = [
      {
        email: {
          contains: search,
        },
      },
      {
        teacher: {
          firstName: {
            contains: search,
          },
        },
      },
      {
        teacher: {
          lastName: {
            contains: search,
          },
        },
      },
    ];
  }

  // Active / inactive
  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }
  

  const [teachers, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: teacherSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    teachers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// =====================================================
// GET Teacher BY ID
// =====================================================

const getTeacherById = async (id) => {
  const teacher = await prisma.user.findFirst({
    where: {
      id: Number(id),
      role: "TEACHER",
    },
    select: teacherSelect,
  });

  if (!teacher) {
    const error = new Error("Teacher not found");
    error.statusCode = 404;
    throw error;
  }

  return teacher;
};

// =====================================================
// CREATE Teacher
// =====================================================

const createTeacher = async (data) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
  } = data;

  // Check email
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUNDS
  );

  const user = await prisma.$transaction(async (tx) => {
    // Create User
    const newUser = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "TEACHER",
        isActive: true,
      },
    });

    // Create teacher profile
    await tx.teacher.create({
      data: {
        userId: newUser.id,
        firstName,
        lastName,
        phone: phone || null,
      },
    });

    return newUser;
  });

  return getTeacherById(user.id);
};

// =====================================================
// UPDATE Teacher
// =====================================================

const updateTeacher = async (id, data) => {
  const teacherId = Number(id);

  const existingTeacher = await prisma.user.findFirst({
    where: {
      id: teacherId,
      role: "TEACHER",
    },
    include: {
      teacher: true,
    },
  });

  if (!existingTeacher) {
    const error = new Error("Teacher not found");
    error.statusCode = 404;
    throw error;
  }

  const {
    email,
    firstName,
    lastName,
    phone,
    
  } = data;

  // Check email uniqueness
  if (
    email !== undefined &&
    email !== existingTeacher.email
  ) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  await prisma.$transaction(async (tx) => {
    // Update User
    await tx.user.update({
      where: {
        id: teacherId,
      },
      data: {
        ...(email !== undefined && {
          email,
        }),
      },
    });

    // Update teacher profile
    await tx.teacher.update({
      where: {
        userId: teacherId,
      },
      data: {
        ...(firstName !== undefined && {
          firstName,
        }),

        ...(lastName !== undefined && {
          lastName,
        }),

        ...(phone !== undefined && {
          phone,
        }),
      },
    });
  });

  return getTeacherById(teacherId);
};

// =====================================================
// DELETE TEACHER
// =====================================================

const deleteTeacher = async (id) => {
  const teacherId = Number(id);

  const teacher = await prisma.user.findFirst({
    where: {
      id: teacherId,
      role: "TEACHER",
    },
  });

  if (!teacher) {
    const error = new Error("Teacher not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.user.delete({
    where: {
      id: teacherId,
    },
  });

  return {
    message: "Teacher deleted successfully",
  };
};

// =====================================================
// UPDATE Teacher STATUS
// =====================================================

const updateTeacherStatus = async (id, isActive) => {
  const teacherId = Number(id);

  const teacher = await prisma.user.findFirst({
    where: {
      id: teacherId,
      role: "TEACHER",
    },
  });

  if (!teacher) {
    const error = new Error("Teacher not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.user.update({
    where: {
      id: teacherId,
    },
    data: {
      isActive,
    },
    select: teacherSelect,
  });
};

const assignTeacherToCourse = async (teacherId, courseId) => {
    const teacherIdNumber = Number(teacherId);
    const courseIdNumber = Number(courseId);

    if (
        !Number.isInteger(teacherIdNumber) ||
        !Number.isInteger(courseIdNumber)
    ) {
        throw new Error("Invalid teacher ID or course ID");
    }

    // Check teacher
    const teacher = await prisma.teacher.findUnique({
        where: {
            id: teacherIdNumber
        }
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    // Check course
    const course = await prisma.course.findUnique({
        where: {
            id: courseIdNumber
        }
    });

    if (!course) {
        throw new Error("Course not found");
    }

    // Assign teacher
    const updatedCourse = await prisma.course.update({
        where: {
            id: courseIdNumber
        },
        data: {
            teacherId: teacherIdNumber
        },
        select: {
            id: true,
            code: true,
            name: true,
            description: true,
            credits: true,
            teacherId: true,

            teacher: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone:true
                }
            }
        }
    });

    return updatedCourse;
};

const getMyCourses = async (userId) => {
    const id = Number(userId);

    if (!Number.isInteger(id)) {
        throw new Error("Invalid user ID");
    }

    const teacher = await prisma.teacher.findUnique({
        where: {
            userId: id
        }
    });

    if (!teacher) {
        throw new Error("Teacher profile not found");
    }

    const courses = await prisma.course.findMany({
        where: {
            teacherId: teacher.id
        },

        select: {
            id: true,
            code: true,
            name: true,
            description: true,
            status: true,
            credits: true,
            createdAt: true,
            updatedAt: true,

            // Students enrolled in the course
            enrollments: {
                select: {
                    student: {
                        select: {
                            id: true,
                            userId: true,
                            firstName: true,
                            lastName: true,
                            dateOfBirth: true,
                            phone: true,
                            address: true,
                            class: true
                        }
                    }
                }
            },

            // Chapters belonging to the course
            chapters: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    order: true,
                    createdAt: true,
                    updatedAt: true
                },

                orderBy: {
                    order: "asc"
                }
            }
        },

        orderBy: {
            id: "desc"
        }
    });

    return courses.map((course) => ({
        ...course,

        students: course.enrollments.map(
            (enrollment) => enrollment.student
        ),

        // Remove the raw enrollments array
        enrollments: undefined
    }));
};

const getTeacherStudents = async (id) => {
    const teacherId = Number(id);
    //return teacherId;
    if (!Number.isInteger(teacherId)) {
        throw new Error("Invalid teacher ID");
    }

    // Check teacher exists
    const teacher = await prisma.teacher.findUnique({
        where: {
            id:teacherId
        }
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    const students = await prisma.student.findMany({
        where: {
            enrollments: {
                some: {
                    course: {
                        teacherId: teacherId
                    }
                }
            }
        },

        select: {
            id: true,
            userId: true,
            firstName: true,
            lastName: true,
            phone: true,

            user: {
                select: {
                    email: true,
                    isActive: true
                }
            },

            enrollments: {
                where: {
                    course: {
                        teacherId: teacherId
                    }
                },
                select: {
                    id: true,
                    status: true,
                    enrolledAt: true,

                    course: {
                        select: {
                            id: true,
                            code: true,
                            name: true
                        }
                    }
                }
            }
        },

        orderBy: {
            id: "desc"
        }
    });

    return students;
};

const getMyStudents = async (userId) => {

    if (!Number.isInteger(userId)) {
        throw new Error("Invalid teacher ID");
    }

    // Check teacher exists
    const teacher = await prisma.teacher.findUnique({
        where: {
            userId:Number(userId)
        }
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    const students = await prisma.student.findMany({
        where: {
            enrollments: {
                some: {
                    course: {
                        teacherId: teacher.id
                    }
                }
            }
        },

        select: {
            id: true,
            userId: true,
            firstName: true,
            lastName: true,
            phone: true,

            user: {
                select: {
                    email: true,
                    isActive: true
                }
            },

            enrollments: {
                where: {
                    course: {
                        teacherId: teacher.id
                    }
                },
                select: {
                    id: true,
                    status: true,
                    enrolledAt: true,

                    course: {
                        select: {
                            id: true,
                            code: true,
                            name: true
                        }
                    }
                }
            }
        },

        orderBy: {
            id: "desc"
        }
    });

    return students;
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updateTeacherStatus,
  assignTeacherToCourse,
  getMyCourses,
  getTeacherStudents,
  getMyStudents
};