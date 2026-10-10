"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface NavLinkType {
  slug: string;
  id: string;
  icon: string;
  nameBn: string;
}

const NavLinks = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [data, setData] = useState<NavLinkType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
      );

      const categories: NavLinkType[] = await res.json();
      setData(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="mx-auto my-4 flex max-w-7xl flex-wrap gap-5">
      {data.map((n) => (
        <Link
          key={n.id}
          href={`/singleProduct/${n.slug}`}
          onClick={() => setActiveCategory(n.slug)}
          className={`rounded-lg px-3 py-2 transition-colors ${
            activeCategory === n.slug
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-100 hover:text-green-700"
          }`}
        >
          {n.icon} {n.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
