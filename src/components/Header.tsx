
import React from "react";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 border-y border-gray-200 bg-white">
      <div className="my-2 mx-auto flex max-w-7xl justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              className="h-10 w-10 rounded-2xl bg-green-500"
              src="/image/logo-icon.png"
              height={50}
              width={50}
              alt="Logo_icon"
            />
            <div>
              <h1>বাজার দর</h1>
              <p>{date}</p>
            </div>
          </Link>
        </div>

        <div className="flex gap-3">
          <UserInfo/>
        </div>
      </div>
    </header>
  );
};

export default Header;
