"use client";

import { useState } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        {/* <img
          src="/profile.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover"
        /> */}

        <div className="text-left">
          <p className="text-sm font-semibold">Rezwan</p>
          <p className="text-xs text-gray-500">⌄</p>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border p-3 z-50">
          {/* User Information */}
          <div className="px-3 py-2 border-b">
            <p className="font-semibold">Rezwan Ahmed</p>
            <p className="text-sm text-gray-500">rezwanahmed@gmail.com</p>
          </div>

          {/* Profile */}
          <button
            className="w-full text-left px-3 py-3 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              // profile page
            }}
          >
            👤 আমার প্রোফাইল
          </button>

          {/* Logout */}
          <button
            className="w-full text-left px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg"
            onClick={() => {
              // logout function
            }}
          >
            ↪️ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
