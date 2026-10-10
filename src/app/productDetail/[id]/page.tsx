import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  const products: Product[] = await res.json();
  if (!products) {
    notFound();
  }

  // URL এর id দিয়ে product খুঁজে বের করা
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  // Market থেকে সর্বনিম্ন দাম
  const lowestPrice = Math.min(...product.markets.map((item) => item.min));

  // Market থেকে সর্বোচ্চ দাম
  const highestPrice = Math.max(...product.markets.map((item) => item.max));

  // Average price
  const averagePrice = Math.round(
    product.markets.reduce(
      (total, item) => total + (item.min + item.max) / 2,
      0,
    ) / product.markets.length,
  );

  return (
    <div className="min-h-screen bg-[#f4f9f5] p-5 md:p-8">
      {/* Breadcrumb */}
      <div className="mb-5 text-sm text-gray-500">
        <Link className="hover:underline" href={"/"}>
          {" "}
          হোম
        </Link>
        <span className="mx-2">›</span>
        <Link
          className="hover:underline"
          href={`/singleProduct/${product.category}`}
        >
          {product.categoryNameBn}
        </Link>
        <span className="mx-2">›</span>
        {product.nameBn}
      </div>

      {/* Product Header */}
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-4xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{product.nameBn}</h1>

              <p className="mt-1 text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                {product.change.dir === "up"
                  ? "বেড়েছে"
                  : product.change.dir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}{" "}
                · {Math.abs(product.today - product.yesterday)} টাকা
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="rounded-xl bg-gray-50 px-8 py-4 text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <h2 className="text-3xl font-bold">{product.today}</h2>

            <p className="text-sm text-gray-500">টাকা / {product.unit}</p>

            <p
              className={`mt-1 ${
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-500"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {product.change.pct}%
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-2xl border bg-white p-5">
        <h2 className="mb-5 text-xl font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Lowest */}
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

            <h3 className="mt-1 text-2xl font-bold text-green-500">
              {lowestPrice} টাকা
            </h3>

            <p className="mt-1 text-sm text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* Highest */}
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

            <h3 className="mt-1 text-2xl font-bold text-red-500">
              {highestPrice} টাকা
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average */}
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>

            <h3 className="mt-1 text-2xl font-bold text-green-500">
              {averagePrice} টাকা
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি {product.unit}-এর গড় দাম
            </p>
          </div>
        </div>

        {/* Market Table */}
        <h2 className="mb-4 mt-8 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-4">বাজার</th>

                <th className="px-5 py-4">বিভাগ</th>

                <th className="px-5 py-4">সর্বনিম্ন</th>

                <th className="px-5 py-4">সর্বাধিক</th>

                <th className="px-5 py-4">গড়</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => {
                const average = (market.min + market.max) / 2;

                return (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-5 py-4">{market.market}</td>

                    <td className="px-5 py-4">{market.division}</td>

                    <td className="px-5 py-4">{market.min} টাকা</td>

                    <td className="px-5 py-4">{market.max} টাকা</td>

                    <td className="px-5 py-4">{average.toFixed(2)} টাকা</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
