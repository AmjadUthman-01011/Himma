import Image from "next/image";

export default function Testimonial() {
  return (
    <section
      id="testimonials"
      className="bg-[#f7f9fc]"
    >
      <div className="mx-auto max-w-[900px] px-5 py-16 text-center sm:px-8 lg:py-20">

        {/* Quote icon */}
        <div className="text-[36px] font-bold leading-none text-slate-300">
          “
        </div>

        <blockquote className="mx-auto mt-3 max-w-[720px] text-[17px] font-medium leading-6 text-slate-900 sm:text-[19px]">
          "EduManage has completely transformed how we handle our
          daily administrative tasks. The centralized approach and
          intuitive design have saved our faculty hundreds of hours
          this semester alone, allowing us to focus on what truly
          matters: our students."
        </blockquote>

        {/* Person */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <Image
            src="/images/testimonial.jpg"
            alt="Testimonial"
            width={38}
            height={38}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="text-left">
            <p className="text-[11px] font-semibold text-slate-900">
              Dr. Sarah Jenkins
            </p>

            <p className="text-[9px] text-slate-500">
              Provost, Global Tech University
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}