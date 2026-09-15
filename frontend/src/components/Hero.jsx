import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc]">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:pb-14 lg:pt-20">

        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[38px] font-bold leading-[1.12] tracking-[-1.5px] text-slate-950 sm:text-[48px] lg:text-[52px]">
            Empowering{" "}
            <span className="text-[#123895]">
              Academic Excellence
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[650px] text-[15px] leading-6 text-slate-600 sm:text-[16px]">
            The unified portal designed for modern institutions.
            Seamlessly connecting administrators, educators, and
            students in one powerful, intuitive platform.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="rounded-sm bg-[#173b94] px-8 py-3 text-[12px] font-semibold text-white shadow-md shadow-blue-900/10 transition hover:bg-[#102f7e]"
            >
              Get Started
            </Link>

            
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mx-auto mt-8 max-w-[1080px] overflow-hidden  border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
          <Image
            src="/images/dashboard-preview.png"
            alt="EduManage dashboard"
            width={1920}
            height={500}
            priority
            quality={95}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}