"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";
import toast, { Toaster } from "react-hot-toast";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SendEmailPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const remaining = useMemo(() => 4000 - form.message.length, [form.message.length]);

  const validate = (values: FormState) => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const missing: string[] = [];

    if (!values.name.trim()) missing.push("Name");
    if (!values.email.trim()) missing.push("Email");
    if (!values.subject.trim()) missing.push("Subject");
    if (!values.message.trim()) missing.push("Message");

    if (values.name.trim().length > 80) nextErrors.name = "Name is too long";
    if (values.subject.trim().length > 120) nextErrors.subject = "Subject is too long";
    if (values.message.trim().length < 10) nextErrors.message = "Message is too short";
    if (values.message.trim().length > 4000) nextErrors.message = "Message is too long";

    if (values.email && !emailRegex.test(values.email)) {
      nextErrors.email = "Enter a valid email";
    }

    return { errors: nextErrors, missing };
  };

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerMessage("");

    const { errors: nextErrors, missing } = validate(form);
    if (missing.length > 0) {
      toast.error(`Please fill out: ${missing.join(", ")}`);
      setErrors(nextErrors);
      setStatus("error");
      return;
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setForm(initialState);
        setServerMessage("Thanks! Your message is on the way.");
      } else {
        setStatus("error");
        setServerMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Send email error:", error);
      setStatus("error");
      setServerMessage("Failed to connect. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0B0D10] dark:text-slate-50">
      <Toaster position="bottom-right" />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,transparent,transparent)]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.12),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.08),transparent_60%)]" />

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6">
          <div className="flex flex-wrap items-center justify-end gap-4">
            <ThemeToggle />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl" style={{ fontFamily: "Instagram Sans", fontWeight: "bold" }}>
                Thoughtful products, built with intent.
              </h1>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                If you want a reliable partner who can scope clearly, ship cleanly, and keep
                you updated, you&apos;re in the right place. Tell me what you&apos;re building and
                I&apos;ll respond with next steps and a practical plan.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-[#121621]/80">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-slate-900/5 p-2 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                      <PenLine className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Why contact me</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Clarity over chaos.</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>Product thinking + design sensibility, not just code.</li>
                    <li>Clear timelines and weekly progress updates.</li>
                    <li>Scalable foundations that stay easy to maintain.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-[#121621]/80">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-slate-900/5 p-2 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                      <CalendarCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Best-fit projects</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Where I add the most value.</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>Product launches, revamps, and design systems.</li>
                    <li>Full-stack apps, dashboards, and workflow tooling.</li>
                    <li>Fast-moving teams who want a steady partner.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-4 py-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-[#0F1320]/50 dark:text-slate-400">
                Prefer a direct route? Email me at <span className="font-medium">syedomer2006@gmail.com</span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0F1320]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Send the brief</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">I&apos;ll reply within 1-2 business days.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="relative">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  {errors.name ? (
                    <div className="absolute -top-7 left-0 z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap">
                      {errors.name}
                    </div>
                  ) : null}
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-[#0B0D10] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-600"
                    maxLength={80}
                    aria-invalid={Boolean(errors.name)}
                    aria-required="true"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  {errors.email ? (
                    <div className="absolute -top-7 left-0 z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap">
                      {errors.email}
                    </div>
                  ) : null}
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-[#0B0D10] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-600"
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    aria-required="true"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-medium" htmlFor="subject">
                    Subject
                  </label>
                  {errors.subject ? (
                    <div className="absolute -top-7 left-0 z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap">
                      {errors.subject}
                    </div>
                  ) : null}
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) => handleChange("subject", event.target.value)}
                    placeholder="New product launch in Q2"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-[#0B0D10] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-600"
                    maxLength={120}
                    aria-invalid={Boolean(errors.subject)}
                    aria-required="true"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-medium" htmlFor="message">
                    Message
                  </label>
                  {errors.message ? (
                    <div className="absolute -top-7 left-0 z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap">
                      {errors.message}
                    </div>
                  ) : null}
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    placeholder="Share goals, scope, timelines, and anything that would help me understand the project."
                    className="mt-2 min-h-[150px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-[#0B0D10] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-600"
                    maxLength={4000}
                    aria-invalid={Boolean(errors.message)}
                    aria-required="true"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Minimum 10 characters</span>
                    <span>{remaining} left</span>
                  </div>
                </div>

                <div className="hidden">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(event) => handleChange("company", event.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-sm text-white transition hover:brightness-110 dark:from-white dark:via-white dark:to-white dark:text-slate-900 dark:hover:brightness-95"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Send message"}
                </Button>

                <div
                  className="min-h-[20px] text-sm text-slate-600 dark:text-slate-300"
                  aria-live="polite"
                >
                  {status === "success" || status === "error" ? serverMessage : ""}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
