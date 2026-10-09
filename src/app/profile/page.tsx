"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      console.log("Profile Update Error:", error);
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("Profile updated successfully");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-xl">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring-2 ring-primary ring-offset-2">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold">{user.name}</h2>

          <p className="text-sm text-base-content/60">{user.email}</p>
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary mt-6 w-full"
          >
            Edit Profile
          </button>
        )}

        {/* Update Form */}
        {isEditing && (
          <form onSubmit={onSubmit} className="mt-6">
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>

              <input
                type="text"
                name="name"
                defaultValue={user.name || ""}
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />

              {/* Image */}
              <label className="label mt-3">Profile Image URL</label>

              <input
                type="url"
                name="image"
                defaultValue={user.image || ""}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
              />

              {/* Buttons */}
              <div className="mt-5 flex gap-3">
                <button type="submit" className="btn btn-primary flex-1">
                  Update Profile
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </fieldset>
          </form>
        )}

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="btn btn-error mt-4 w-full text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
