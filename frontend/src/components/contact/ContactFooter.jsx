import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer className="border-t border-slate-300 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-7 sm:px-8">

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[18px] font-bold text-[#082b82]"
          >
            <GraduationCap size={21} />
            Himmah | هِمَّة
          </Link>

          {/* Copyright */}
          <p className="text-center text-[12px] text-slate-600">
            © 2024 Himmah Institutional Systems. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-[12px] text-slate-700 transition hover:text-[#082b82]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-[12px] text-slate-700 transition hover:text-[#082b82]"
            >
              Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}