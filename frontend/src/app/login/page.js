
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT - BRANDING
        ===================================================== */}

        <section className="relative hidden min-h-screen overflow-hidden lg:block">

          {/* Background image */}

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/campus.jpg')",
            }}
          />

          {/* Blue overlay */}

          <div className="absolute inset-0 bg-[#00236f]/55" />

          {/* Additional subtle white overlay */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#00236f]/20 via-[#00236f]/10 to-[#00236f]/40" />

          {/* Content */}

          <div className="relative z-10 flex min-h-screen items-center justify-center px-12 xl:px-20">

            <div className="max-w-xl text-center text-white">

              <h1 className="font-[var(--font-jakarta)] text-5xl font-bold leading-[1.15] tracking-tight xl:text-6xl">
                Empowering
                <br />
                Academic Excellence
              </h1>

              <p className="mx-auto mt-8 max-w-lg font-[var(--font-inter)] text-lg leading-relaxed text-white/90 xl:text-xl">
                Streamline administration, elevate learning, and
                connect your institution with our comprehensive
                management platform.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            RIGHT - LOGIN
        ===================================================== */}

        <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16 xl:px-24">

          <div className="w-full max-w-[480px]">

            <LoginForm />

          </div>

        </section>

      </div>
    </main>
  );
}