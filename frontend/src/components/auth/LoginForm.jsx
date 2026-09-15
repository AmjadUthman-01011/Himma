"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";


import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

import { login } from "../../services/auth.service";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(
        formData.email,
        formData.password
      );
      
      const {
        accessToken,
        refreshToken,
        user,
      } = response;

      // Store authentication data in Redux
      
      dispatch(
      setCredentials({
        user: response.user,
        accessToken: response.accessToken,
      })
    );

      

      switch (user.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;

        case "TEACHER":
          router.push("/dashboard/teacher");
          break;

        case "STUDENT":
          router.push("/dashboard/student");
          break;

        default:
          router.push("/dashboard");
      }

    } catch (error) {
      setError(
        error.message ||
        "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="mb-14 flex items-center gap-3">

        <GraduationCap
          size={38}
          strokeWidth={2}
          className="text-[#00236f]"
        />

        <span className="font-[var(--font-jakarta)] text-[32px] font-bold tracking-tight text-[#00236f]">
          Himmah | هِمَّة
        </span>

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <h1 className="font-[var(--font-jakarta)] text-[32px] font-bold leading-tight tracking-tight text-[#191c1e]">
          Welcome back
        </h1>

        <p className="mt-2 font-[var(--font-inter)] text-[18px] leading-relaxed text-[#444651]">
          Please enter your details to sign in.
        </p>

      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-6 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/50 px-4 py-3">

          <p className="font-[var(--font-inter)] text-sm font-medium text-[#93000a]">
            {error}
          </p>

        </div>
      )}


      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ===================================================
            EMAIL
        =================================================== */}

        <div>

          <label
            htmlFor="email"
            className="mb-2 block font-[var(--font-inter)] text-[14px] font-semibold text-[#191c1e]"
          >
            Email address
          </label>

          <div className="relative">

            <Mail
              size={20}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444651]"
            />

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@university.edu"
              autoComplete="email"
              disabled={loading}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-[#c5c5d3]
                bg-[#f7f9fb]
                pl-11
                pr-4
                font-[var(--font-inter)]
                text-[16px]
                text-[#191c1e]
                outline-none
                transition
                placeholder:text-[#9a9ba5]
                focus:border-[#4e45d5]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4e45d5]/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

          </div>

        </div>


        {/* ===================================================
            PASSWORD
        =================================================== */}

        <div>

          <label
            htmlFor="password"
            className="mb-2 block font-[var(--font-inter)] text-[14px] font-semibold text-[#191c1e]"
          >
            Password
          </label>

          <div className="relative">

            <Lock
              size={20}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444651]"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-[#c5c5d3]
                bg-[#f7f9fb]
                pl-11
                pr-12
                font-[var(--font-inter)]
                text-[16px]
                text-[#191c1e]
                outline-none
                transition
                placeholder:text-[#9a9ba5]
                focus:border-[#4e45d5]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4e45d5]/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[#444651]
                transition
                hover:text-[#00236f]
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>


        {/* ===================================================
            REMEMBER + FORGOT
        =================================================== */}

        <div className="flex items-center justify-between">

          <label className="flex cursor-pointer items-center gap-2">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
              className="
                h-[18px]
                w-[18px]
                rounded
                border-[#c5c5d3]
                accent-[#4e45d5]
              "
            />

            <span className="font-[var(--font-inter)] text-[14px] text-[#444651]">
              Remember me
            </span>

          </label>


          <button
            type="button"
            className="
              font-[var(--font-inter)]
              text-[14px]
              font-semibold
              text-[#00236f]
              transition
              hover:text-[#4e45d5]
            "
          >
            Forgot password?
          </button>

        </div>


        {/* ===================================================
            LOGIN BUTTON
        =================================================== */}

        <button
          type="submit"
          disabled={loading}
          className="
            h-11
            w-full
            rounded-lg
            bg-[#1e3a8a]
            font-[var(--font-inter)]
            text-[15px]
            font-semibold
            tracking-wide
            text-white
            transition
            hover:bg-[#00236f]
            focus:outline-none
            focus:ring-2
            focus:ring-[#4e45d5]/30
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading
            ? "Signing in..."
            : "Login to Dashboard"}
        </button>

      </form>


      {/* =====================================================
          REGISTER
      ===================================================== 

      <div className="mt-14 text-center">

        <p className="font-[var(--font-inter)] text-[14px] text-[#444651]">

          Don't have an account?{" "}

          <button
            type="button"
            className="
              font-semibold
              text-[#00236f]
              transition
              hover:text-[#4e45d5]
            "
          >
            Register institution
          </button>

        </p>

      </div>*/}

    </div>
  );
}