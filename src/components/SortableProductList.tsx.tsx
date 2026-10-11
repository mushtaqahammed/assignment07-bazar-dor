
"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useMemo, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number | string;
  yesterday: number | string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface Props {
  products: Product[];
}

const toNumber = (value: number | string): number => {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  const normalized = String(value)
    .replace(/[০-৯]/g, (digit) =>
      englishDigits[bengaliDigits.indexOf(digit)]
    )
    .replace(/[٠-٩]/g, (digit) =>
      englishDigits["٠١٢٣٤٥٦٧٨٩".indexOf(digit)]
    )
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
};

const SortableProductList = ({ products }: Props) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort(
        (a, b) => toNumber(a.today) - toNumber(b.today)
      );
    } else if (sort === "high-to-low") {
      result.sort(
        (a, b) => toNumber(b.today) - toNumber(a.today)
      );
    }

    return result;
  }, [products, sort]);

  return (
    <>
      {/* Sort Dropdown */}
      <div className="mb-5 flex justify-end">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 text-gray-500">
          <label htmlFor="sort-products">সাজান</label>

          <div className="relative">
            <select
              id="sort-products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-success appearance-none pr-10"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <p className="mb-4 mt-6 text-gray-500">
        মোট {sortedProducts.length.toLocaleString("bn-BD")}
        টি পণ্য দেখানো হচ্ছে
      </p>
    
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/productDetail/${product.id}`}>
            <ProductCard
              product={{
                ...product,
                today: toNumber(product.today),
                yesterday: toNumber(product.yesterday),
              }}
            />
          </Link>
        ))}
      </div>
      
    </>
  );
};

export default SortableProductList;