const bcrypt = require("bcrypt");

const prisma = require("../config/prisma");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../utils/tokens");

const {hashToken} = require("../utils/hash");

const register = async ({ email, password, role }) => {
  // Check whether the email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || "STUDENT",
    },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  // Create tokens
  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const login = async ({ email, password }) => {
  // 1. Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });
  //return user
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 2. Check account status
  if (!user.isActive) {
    const error = new Error("Account is inactive");
    error.statusCode = 403;
    throw error;
  }

  // 3. Verify password
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 4. Revoke previous active sessions
  await prisma.session.updateMany({
    where: {
      userId: user.id,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  // 5. Generate refresh token
  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  // 6. Hash refresh token before storing it
  const hashedRefreshToken = hashToken(refreshToken);

  // 7. Create the new session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken: hashedRefreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    },
  });

  // 8. Create access token WITH session ID
  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
    sessionId: session.id,
  });

  // 9. Return response
  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token is required");
    error.statusCode = 401;
    throw error;
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    const err = new Error("Invalid or expired refresh token");
    err.statusCode = 401;
    throw err;
  }

  const hashedToken = hashToken(refreshToken);

  const session = await prisma.session.findUnique({
    where: {
      refreshToken: hashedToken,
    },
  });

  if (!session) {
    const error = new Error("Session not found");
    error.statusCode = 401;
    throw error;
  }

  if (session.userId !== decoded.userId) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }

  if (session.revokedAt) {
    const error = new Error("Session has been revoked");
    error.statusCode = 401;
    throw error;
  }

  console.log("SESSION EXPIRES:", session.expiresAt);
  console.log("CURRENT TIME:", new Date());

  if (session.expiresAt <= new Date()) {
    const error = new Error("Session has expired");
    error.statusCode = 401;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("Account is inactive");
    error.statusCode = 403;
    throw error;
  }

  // Generate new refresh token
  const newRefreshToken = generateRefreshToken({
    userId: user.id,

  });

  const newHashedRefreshToken =
    hashToken(newRefreshToken);

  // Rotate refresh token
  await prisma.session.update({
    where: {
      id: session.id,
    },
    data: {
      refreshToken: newHashedRefreshToken,
    },
  });

  // Generate new access token
  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
    sessionId: session.id,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logout = async (sessionId) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    const error = new Error("Session not found");
    error.statusCode = 404;
    throw error;
  }

  if (session.revokedAt) {
    return;
  }

  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

module.exports = {
  register,
  login,
  refresh,
  logout
};
