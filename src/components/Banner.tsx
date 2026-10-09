import React from "react";
import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="flex justify-between border border-gray-200 bg-white rounded-2xl p-6 w-full">
      <div>
        <p className="text-green-500">{date}</p>

        <h1 className="font-bold text-3xl my-5">আজকের বাজারের দাম এক নজরে</h1>

        <p>
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <button className="btn bg-green-500 text-white font-bold my-4">
          সব পণ্য দেখুন
        </button>
      </div>

      <Image
        src="/image/bazar-hero.png"
        height={300}
        width={300}
        alt="Logo_icon"
        className="h-auto w-auto"
      />
    </div>
  );
};

export default Banner;
