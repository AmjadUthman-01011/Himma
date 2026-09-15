"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`
      );
    }
  }, [
    isAuthenticated,
    user,
    pathname,
    router,
  ]);

  // Don't render protected page
  // while redirecting
  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-gray-500">
          Redirecting...
        </div>
      </div>
    );
  }

  return children;
}