"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  setCredentials,
  clearAuth,
} from "../../store/slices/authSlice";
import Loading from  "../../components/ui/Loading"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // =============================================
        // Check API URL
        // =============================================

        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured"
          );
        }

        // =============================================
        // Refresh Session
        // =============================================

        const response = await fetch(
          `${API_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // =============================================
        // Parse Response
        // =============================================

        const data = await response.json();

        // =============================================
        // Refresh Failed
        // =============================================

        if (!response.ok) {
          throw new Error(
            data?.message || "Session expired"
          );
        }

        // =============================================
        // Refresh Successful
        // =============================================

        dispatch(
          setCredentials({
            accessToken: data.data.accessToken,
            user: data.data.user,
          })
        );

      } catch (error) {
        console.error(
          "Failed to restore session:",
          error
        );

        // IMPORTANT:
        // Do NOT call logout() here.
        //
        // logout() makes another API request.
        // We only need to clear Redux state.
        dispatch(clearAuth());

      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  // =============================================
  // Prevent rendering before session check
  // =============================================

  if (loading) {
        return (
            <Loading/>
        );
    }

  return children;
}