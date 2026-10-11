
import { notFound } from "next/navigation";
import SortableProductList from "@/components/SortableProductList.tsx";

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SingleProduct = async ({ params }: PageProps) => {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const products: Product[] = await res.json();

  if (!Array.isArray(products)) {
    throw new Error("Invalid products response");
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName =
    categoryProducts[0]?.categoryNameBn || "পণ্য";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex flex-wrap justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-gray-500">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>

      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold">{categoryName}</h1>

        <p className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-500">
          {categoryProducts.length.toLocaleString("bn-BD")}
          টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>

      <SortableProductList products={categoryProducts} />
    </main>
  );
};

export default SingleProduct;
