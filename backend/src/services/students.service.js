// src/services/student.service.js

const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const SALT_ROUNDS = 12;

const studentSelect = {
  id: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,

  student: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      phone: true,
      address: true,
      class: true,
      createdAt: true,
      updatedAt: true,
    },
  },
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

const getAllStudents = async ({
  page = 1,
  limit = 10,
  search,
  isActive,
  studentClass,
}) => {
  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  const skip = (page - 1) * limit;

  const where = {
    role: "STUDENT",
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
        student: {
          firstName: {
            contains: search,
          },
        },
      },
      {
        student: {
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

  // Class filter
  if (studentClass) {
    where.student = {
      class: studentClass,
    };
  }

  const [students, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: studentSelect,
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
    students,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

const getStudentById = async (id) => {
  const student = await prisma.user.findFirst({
    where: {
      id: Number(id),
      role: "STUDENT",
    },
    select: studentSelect,
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return student;
};

// =====================================================
// CREATE STUDENT
// =====================================================

const createStudent = async (data) => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address,
    class: studentClass,
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
        role: "STUDENT",
        isActive: true,
      },
    });

    // Create Student profile
    await tx.student.create({
      data: {
        userId: newUser.id,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth)
          : null,
        phone: phone || null,
        address: address || null,
        class: studentClass || null,
      },
    });

    return newUser;
  });

  return getStudentById(user.id);
};

// =====================================================
// UPDATE STUDENT
// =====================================================

const updateStudent = async (id, data) => {
  const studentId = Number(id);

  const existingStudent = await prisma.user.findFirst({
    where: {
      id: studentId,
      role: "STUDENT",
    },
    include: {
      student: true,
    },
  });

  if (!existingStudent) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const {
    email,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address,
    class: studentClass,
  } = data;

  // Check email uniqueness
  if (
    email !== undefined &&
    email !== existingStudent.email
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
        id: studentId,
      },
      data: {
        ...(email !== undefined && {
          email,
        }),
      },
    });

    // Update Student profile
    await tx.student.update({
      where: {
        userId: studentId,
      },
      data: {
        ...(firstName !== undefined && {
          firstName,
        }),

        ...(lastName !== undefined && {
          lastName,
        }),

        ...(dateOfBirth !== undefined && {
          dateOfBirth: dateOfBirth
            ? new Date(dateOfBirth)
            : null,
        }),

        ...(phone !== undefined && {
          phone,
        }),

        ...(address !== undefined && {
          address,
        }),

        ...(studentClass !== undefined && {
          class: studentClass,
        }),
      },
    });
  });

  return getStudentById(studentId);
};

// =====================================================
// DELETE STUDENT
// =====================================================

const deleteStudent = async (id) => {
  const studentId = Number(id);

  const student = await prisma.user.findFirst({
    where: {
      id: studentId,
      role: "STUDENT",
    },
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.user.delete({
    where: {
      id: studentId,
    },
  });

  return {
    message: "Student deleted successfully",
  };
};

// =====================================================
// UPDATE STUDENT STATUS
// =====================================================

const updateStudentStatus = async (id, isActive) => {
  const studentId = Number(id);

  const student = await prisma.user.findFirst({
    where: {
      id: studentId,
      role: "STUDENT",
    },
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.user.update({
    where: {
      id: studentId,
    },
    data: {
      isActive,
    },
    select: studentSelect,
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStudentStatus,
};