"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const onSubmit = async (e:React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
const user = Object.fromEntries(formData.entries()) as {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const { password, confirmPassword, ...userInfo } = user;

if (password !== confirmPassword) {
  alert("দুইটি পাসওয়ার্ড একই নয়!");
  return;
}

const { data, error } = await authClient.signUp.email({
  ...userInfo,
  password,
  callbackURL: "/",
});
    if (data) {
      console.log(data);
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <form onSubmit={onSubmit}>
        <h1 className="font-bold text-3xl flex justify-center my-5">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="যেমন: রহিম উদ্দিন"
          />

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
          <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            name="confirmPassword"
            type="password"
            className="input"
            placeholder="আবার লিখুন"
          />

          <button type="submit" className="btn bg-green-500 mt-4">
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
