"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Stats", href: "#stats" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          href="#"
          className="text-[19px] font-bold tracking-tight text-[#082b82]"
        >
          Himmah | هِمَّة
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[13px] font-medium transition-colors ${
                index === 0
                  ? "text-[#082b82]"
                  : "text-slate-700 hover:text-[#082b82]"
              }`}
            >
              {link.name}

              {index === 0 && (
                <span className="absolute -bottom-[22px] left-0 h-[2px] w-full bg-[#082b82]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className="text-[13px] font-medium text-[#082b82] transition hover:text-blue-700"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="rounded-sm bg-[#12368f] px-5 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#0d2d7b]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-sm p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-[#082b82]"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex items-center gap-4 border-t border-slate-100 pt-4">
              <Link
                href="/login"
                className="text-sm font-medium text-[#082b82]"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-[#12368f] px-5 py-2 text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}