"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <Link href={"/profile"}>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <Image
                  alt="Tailwind-CSS-Avatar-component"
                  src={user?.image || "/default-avatar.png"}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <h2>{user.name}</h2>
          </Link>
        </div>
      ) : (
        <div>
          <Link href={"/signin"}>
            {" "}
            <button className="btn">সাইন ইন</button>
          </Link>

          <Link href={"/signup"}>
            <button className="btn bg-green-500 text-white">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
