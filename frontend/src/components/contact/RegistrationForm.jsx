"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    institution: "",
    role: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="rounded-sm border border-slate-300 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-7">
      <h2 className="text-[20px] font-semibold tracking-tight text-[#082b82]">
        Registration Inquiry
      </h2>

      {submitted && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={17} />

          <span>
            Your inquiry has been submitted successfully.
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-[13px] font-semibold tracking-wide text-slate-900"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="h-[39px] w-full rounded-md border border-slate-300 bg-[#f8fafc] px-3 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#173b94] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-[13px] font-semibold tracking-wide text-slate-900"
            >
              Institutional Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="jane.doe@university.edu"
              className="h-[39px] w-full rounded-md border border-slate-300 bg-[#f8fafc] px-3 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#173b94] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Institution */}
          <div>
            <label
              htmlFor="institution"
              className="mb-1 block text-[13px] font-semibold tracking-wide text-slate-900"
            >
              Institution Name
            </label>

            <input
              id="institution"
              name="institution"
              type="text"
              required
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. State University"
              className="h-[39px] w-full rounded-md border border-slate-300 bg-[#f8fafc] px-3 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#173b94] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-[13px] font-semibold tracking-wide text-slate-900"
            >
              Role
            </label>

            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="h-[39px] w-full rounded-md border border-slate-300 bg-[#f8fafc] px-3 text-[14px] text-slate-800 outline-none transition focus:border-[#173b94] focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Select your role...
              </option>

              <option value="administrator">
                Administrator
              </option>

              <option value="teacher">
                Teacher
              </option>

              <option value="admissions">
                Admissions
              </option>

              <option value="it">
                IT / Technical Staff
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="mt-4">
          <label
            htmlFor="message"
            className="mb-1 block text-[13px] font-semibold tracking-wide text-slate-900"
          >
            Message / Inquiry
          </label>

          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Please describe your institutional needs or registration questions..."
            className="w-full resize-none rounded-md border border-slate-300 bg-[#f8fafc] px-3 py-3 text-[14px] leading-5 text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#173b94] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Submit */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-sm bg-[#173b94] px-6 py-2.5 text-[12px] font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#102f7e] active:scale-[0.98]"
          >
            Submit Inquiry
            <Send size={13} />
          </button>
        </div>
      </form>
    </div>
  );
}