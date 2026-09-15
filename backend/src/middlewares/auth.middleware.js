const prisma = require("../config/prisma");

const {
  verifyAccessToken,
} = require("../utils/tokens");

const authenticate = async (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify JWT
    const decoded = verifyAccessToken(token);

    // 4. Make sure sessionId exists
    if (!decoded.sessionId) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    // 5. Find the session
    const session = await prisma.session.findUnique({
      where: {
        id: decoded.sessionId,
      },
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session not found",
      });
    }

    // 6. Check session owner
    if (session.userId !== decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid session",
      });
    }

    // 7. Check whether session was revoked
    if (session.revokedAt) {
      return res.status(401).json({
        success: false,
        message: "Session has been revoked. Please login again.",
      });
    }

    // 8. Check session expiration
    if (session.expiresAt <= new Date()) {
      return res.status(401).json({
        success: false,
        message: "Session has expired. Please login again.",
      });
    }

    // 9. Get current user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 10. Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    // 11. Attach authentication information
    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    next(error);
  }
};

module.exports = authenticate;