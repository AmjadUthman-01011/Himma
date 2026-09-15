import { store } from "../store/store";
import { setAccessToken, logout } from "../store/slices/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = async (endpoint, options = {}) => {
  let accessToken = store.getState().auth.accessToken;

  const makeRequest = async (token) => {
    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...(options.headers || {}),
      },
    });
  };

  let response = await makeRequest(accessToken);

  // Access token expired
  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshResponse.ok) {
      store.dispatch(logout());
      throw new Error("Session expired");
    }

    const refreshData = await refreshResponse.json();

    const newAccessToken =
      refreshData?.accessToken ||
      refreshData.accessToken;

    if (!newAccessToken) {
      store.dispatch(logout());
      throw new Error("Unable to refresh session");
    }

    // Update Redux
    store.dispatch(setAccessToken(newAccessToken));

    // Retry original request
    response = await makeRequest(newAccessToken);
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong"
    );

    // Keep backend validation errors
    error.errors = data.errors || [];

    // Optional: keep the complete response
    error.data = data;

    error.status = response.status;

    throw error;
  }

  return data;
};

export default api;