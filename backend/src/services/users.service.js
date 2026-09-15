const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const SALT_ROUNDS = 12;

const userSelect = {
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
    },
  },

  teacher: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
    },
  },
};

const getAllUsers = async ({
  page = 1,
  limit = 10,
  search,
  role,
  isActive,
}) => {
  const skip = (page - 1) * limit;

  const where = {};

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

  if (role) {
    where.role = role;
  }

  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: userSelect,
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
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: userSelect,
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const createUser = async (data) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    dateOfBirth,
    phone,
    address,
    class: studentClass,
  } = data;

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
    const newUser = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        isActive: true,
      },
    });

    if (role === "STUDENT") {
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
    }

    if (role === "TEACHER") {
      await tx.teacher.create({
        data: {
          userId: newUser.id,
          firstName,
          lastName,
          phone: phone || null,
        },
      });
    }

    return newUser;
  });

  return getUserById(user.id);
};

const updateUser = async (id, data) => {
  const userId = Number(id);

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      student: true,
      teacher: true,
    },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    data.email &&
    data.email !== existingUser.email
  ) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
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

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        ...(email !== undefined && { email }),
      },
    });

    if (existingUser.role === "STUDENT") {
      await tx.student.update({
        where: {
          userId,
        },
        data: {
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
          ...(dateOfBirth !== undefined && {
            dateOfBirth: dateOfBirth
              ? new Date(dateOfBirth)
              : null,
          }),
          ...(phone !== undefined && { phone }),
          ...(address !== undefined && { address }),
          ...(studentClass !== undefined && {
            class: studentClass,
          }),
        },
      });
    }

    if (existingUser.role === "TEACHER") {
      await tx.teacher.update({
        where: {
          userId,
        },
        data: {
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
          ...(phone !== undefined && { phone }),
        },
      });
    }
  });

  return getUserById(userId);
};

const deleteUser = async (id) => {
  const userId = Number(id);

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return {
    message: "User deleted successfully",
  };
};

const updateUserStatus = async (id, isActive) => {
  const userId = Number(id);

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive,
    },
    select: userSelect,
  });

  return user;
};

const updateUserPassword = async (id, password) => {
  const userId = Number(id);

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUNDS
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password updated successfully",
  };
};

const updateUserRole = async (userId, newRole) => {
  const id = Number(userId);

  if (!Number.isInteger(id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  const validRoles = ["ADMIN", "TEACHER", "STUDENT"];

  if (!validRoles.includes(newRole)) {
    const error = new Error("Invalid role");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.$transaction(async (tx) => {
    // =====================================================
    // 1. Get the existing user and profiles
    // =====================================================

    const user = await tx.user.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // =====================================================
    // 2. If role is already the same
    // =====================================================

    if (user.role === newRole) {
      return user;
    }
    //return user
    // =====================================================
    // 3. Store profile information before deleting it
    // =====================================================

    const firstName =
      user.student?.firstName ||
      user.teacher?.firstName ||
      "";

    const lastName =
      user.student?.lastName ||
      user.teacher?.lastName ||
      "";

    const phone =
      user.student?.phone ||
      user.teacher?.phone ||
      null;

    // =====================================================
    // 4. Remove old profile
    // =====================================================

    if (user.student) {
      await tx.student.delete({
        where: {
          userId: id,
        },
      });
    }

    if (user.teacher) {
      await tx.teacher.delete({
        where: {
          userId: id,
        },
      });
    }

    // =====================================================
    // 5. Create the new profile
    // =====================================================

    if (newRole === "STUDENT") {
      await tx.student.create({
        data: {
          userId: id,
          firstName,
          lastName,
          phone,
        },
      });
    }

    if (newRole === "TEACHER") {
      await tx.teacher.create({
        data: {
          userId: id,
          firstName,
          lastName,
          phone,
        },
      });
    }

    // =====================================================
    // 6. Update User role
    // =====================================================

    const updatedUser = await tx.user.update({
      where: {
        id,
      },
      data: {
        role: newRole,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    return updatedUser;
  });
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateUserPassword,
  updateUserRole,
};