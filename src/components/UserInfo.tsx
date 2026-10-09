"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const handleSignOut = async () => {
  await authClient.signOut();
  redirect("/signin");
};

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);

  return (
    <div>
      {user ? (
        <div className="relative">
          {/* User Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3"
          >
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <Image
                  alt="User Avatar"
                  src={user?.image || "/default-avatar.png"}
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <h2>{user.name}</h2>
            <p>▼</p>
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border bg-white p-4 shadow-lg">
              {/* User Info */}
              <div className="border-b pb-3">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>

                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Menu */}
              <div className="mt-2">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  👤 আমার প্রোফাইল
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full rounded-lg px-3 py-2 text-left text-red-500 hover:bg-gray-100"
                >
                  🚪 লগ আউট
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/signin">
            <button className="btn">সাইন ইন</button>
          </Link>

          <Link href="/signup">
            <button className="btn bg-green-500 text-white">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
