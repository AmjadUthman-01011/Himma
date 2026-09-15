import Link from "next/link";
import { Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e5e8eb]">
      <div className="mx-auto max-w-[1200px] px-5 py-9 sm:px-8">

        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              href="#"
              className="text-[16px] font-bold text-[#082b82]"
            >
              Himmah | هِمَّة
            </Link>

            <p className="mt-2 max-w-[310px] text-[10px] leading-4 text-slate-600">
              Modernizing education administration through intuitive
              design and powerful centralized tools.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-wide text-slate-900">
              Company
            </h3>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="#"
                className="text-[10px] text-slate-600 hover:text-[#082b82]"
              >
                About Us
              </Link>

              <Link
                href="#features"
                className="text-[10px] text-slate-600 hover:text-[#082b82]"
              >
                Features
              </Link>

              <Link
                href="#"
                className="text-[10px] text-slate-600 hover:text-[#082b82]"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-wide text-slate-900">
              Support
            </h3>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="#"
                className="text-[10px] text-slate-600 hover:text-[#082b82]"
              >
                Help Center
              </Link>

              <Link
                href="#contact"
                className="text-[10px] text-slate-600 hover:text-[#082b82]"
              >
                Contact Us
              </Link>

              <Link
                href="#"
                className="text-[10px] text-slate-600 hover:text-[#082b82]"
              >
                System Status
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-300 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[9px] text-slate-600">
            © 2024 Himmah Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-700">
            <button aria-label="Language">
              <Globe size={15} strokeWidth={1.6} />
            </button>

            <a href="mailto:contact@edumanage.com">
              <Mail size={15} strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}