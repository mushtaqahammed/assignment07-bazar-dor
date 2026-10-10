"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  

  const [name, setName] = useState("");
 

  // Sign Out
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  // Update Profile
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await authClient.updateUser({
      name,
   
    });

    if (error) {
      console.log("Profile Update Error:", error);
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("Profile updated successfully");

      router.refresh();
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

          <p className="text-sm text-base-content/60">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-16 rounded-full ring-2 ring-primary ring-offset-2">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name + Email */}
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>

                <p className="text-sm text-base-content/60">{user.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error btn-sm"
            >
              ← সাইন আউট
            </button>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <h2 className="mb-6 font-semibold">তথ্য</h2>

          <form onSubmit={onSubmit}>
            {/* Name */}
            <label className="mb-2 block text-sm">নাম</label>

            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="input input-bordered w-full"
            />

            {/* Update Button */}
            <button
              type="submit"
              className="btn mt-5 w-full bg-green-600 text-white hover:bg-green-700"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
