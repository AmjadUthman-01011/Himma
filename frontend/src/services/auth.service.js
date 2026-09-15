import api from "../lib/api";

/**
 * Login
 */
export const login = async (email, password) => {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};


/**
 * Get current authenticated user
 */
export const getMe = async (accessToken) => {
  return api("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


/**
 * Refresh access token
 */
export const refreshToken = async (refreshTokenValue) => {
  return api("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
    }),
  });
};


/**
 * Logout
 */
export const logout = async (accessToken) => {
  return api("/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};