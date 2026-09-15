import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { logout as logoutApi } from "@/services/auth.service";

// =====================================================
// LOGOUT THUNK
// =====================================================

export const logout = createAsyncThunk(
  "auth/logout",

  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      return true;
    } catch (error) {
      console.error("Logout API error:", error);

      // Even if backend logout fails,
      // clear the local authentication state.
      return rejectWithValue(
        error?.message || "Logout failed"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
};

// =====================================================
// SLICE
// =====================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================================
      // LOGOUT SUCCESS
      // ===============================================

      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // ===============================================
      // LOGOUT FAILED
      // ===============================================

      .addCase(logout.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// =====================================================
// EXPORTS
// =====================================================

export const {
  setCredentials,
  setAccessToken,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;