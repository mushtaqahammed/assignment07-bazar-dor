
"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Email and Password Signup
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignUp = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?login=success",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে signup ব্যর্থ হয়েছে!");
      }
    } catch {
      toast.error("Google দিয়ে signup করা যায়নি!");
    }
  };

  // GitHub Signup
  const handleGitHubSignUp = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/?login=success",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে signup ব্যর্থ হয়েছে!");
      }
    } catch {
      toast.error("GitHub দিয়ে signup করা যায়নি!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f8f4] px-4 py-6">
      <div className="mx-auto max-w-[545px]">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-gray-500">
            নিচের তথ্যগুলো দিয়ে আপনার নতুন অ্যাকাউন্ট তৈরি করুন।
          </p>
        </div>

        {/* Main Card */}
        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-[20px] border border-gray-200 bg-white p-7 shadow-sm"
        >
          {/* Name */}
          <label className="mb-2 block font-medium text-gray-800">
            নাম
          </label>

          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="যেমন: রহিম উদ্দিন"
          />

          {/* Email */}
          <label className="mb-2 mt-5 block font-medium text-gray-800">
            ইমেইল
          </label>

          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="you@example.com"
          />

          {/* Password */}
          <label className="mb-2 mt-5 block font-medium text-gray-800">
            পাসওয়ার্ড
          </label>

          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />

          {/* Confirm Password */}
          <label className="mb-2 mt-5 block font-medium text-gray-800">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>

          <input
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="পাসওয়ার্ড আবার লিখুন"
          />

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 h-[53px] w-full rounded-xl bg-green-600 font-medium text-white shadow-md transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-5">
            <div className="h-[2px] flex-1 bg-gray-200" />

            <span className="text-gray-500">অথবা</span>

            <div className="h-[2px] flex-1 bg-gray-200" />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex h-[53px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 transition hover:bg-gray-50"
            >
              <span className="text-xl font-bold text-[#4285F4]">G</span>
              <span>Google দিয়ে সাইন আপ</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleGitHubSignUp}
              className="flex h-[53px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 transition hover:bg-gray-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0112 7.04c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v2.65c0 .27.18.6.69.49A10.23 10.23 0 0022 12.22C22 6.58 17.52 2 12 2z" />
              </svg>

              <span>GitHub দিয়ে সাইন আপ</span>
            </button>
          </div>

          {/* Sign In */}
          <p className="mt-6 text-center text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-green-600 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </form>

        {/* Back */}
        <Link
          href="/"
          className="mt-8 block text-center text-gray-500 hover:text-gray-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
