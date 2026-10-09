"use client"

import { authClient } from "@/lib/auth-client";
import React from "react";

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
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

  return (
    <div className="flex justify-center mt-5">
      <form onSubmit={onSubmit}>
        <h1 className="font-bold text-3xl flex justify-center my-5">
          সাইন ইন{" "}
        </h1>
        <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />

          <button type="submit" className="btn bg-green-500 mt-4">
            সাইন ইন{" "}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
