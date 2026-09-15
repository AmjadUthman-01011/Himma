const { z } = require("zod");

const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .min(1, "Password is required"),
  })
  .strict();

const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required"),
});

  module.exports = {
  loginSchema,
  refreshTokenSchema
};