"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import Link from "next/link";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    console.log(data);
  };

  const handleGitHubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[#f3f8f4] px-4 py-6">
      <div className="mx-auto max-w-[545px]">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">সাইন ইন</h1>

          <p className="mt-2 text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Main Card */}
        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-[20px] border border-gray-200 bg-white p-7 shadow-sm"
        >
          {/* Email */}
          <label className="mb-2 block font-medium text-gray-800">ইমেইল</label>

          <input
            name="email"
            type="email"
            required
            className="h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="you@example.com"
          />

          {/* Password */}
          <label className="mb-2 mt-6 block font-medium text-gray-800">
            পাসওয়ার্ড
          </label>

          <input
            name="password"
            type="password"
            required
            className="h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />

          {/* Sign In Button */}
          <button
            type="submit"
            className="mt-5 h-[53px] w-full rounded-xl bg-green-600 font-medium text-white shadow-md transition hover:bg-green-700 active:scale-[0.99]"
          >
            সাইন ইন
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-5">
            <div className="h-[2px] flex-1 bg-gray-200"></div>

            <span className="text-gray-500">অথবা</span>

            <div className="h-[2px] flex-1 bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex h-[53px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 transition hover:bg-gray-50"
            >
              {/* Google Icon */}
              <span className="text-xl font-bold text-[#4285F4]">G</span>

              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleGitHubSignIn}
              className="flex h-[53px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 transition hover:bg-gray-50"
            >
              {/* GitHub Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0112 7.04c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v2.65c0 .27.18.6.69.49A10.23 10.23 0 0022 12.22C22 6.58 17.52 2 12 2z" />
              </svg>

              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Sign Up */}
          <p className="mt-6 text-center text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-600 hover:underline"
            >
              সাইন আপ করুন
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

export default SignInPage;
