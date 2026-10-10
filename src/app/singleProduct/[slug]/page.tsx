import ProductCard from "@/components/ProductCard";
import Link from "next/link";


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
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SingleProduct = async ({ params }: PageProps) => {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const products: Product[] = await res.json();

const categoryProducts = products.filter(
  (product) => product.category === slug,
);

  const categoryName = categoryProducts[0]?.categoryNameBn || "পণ্য";

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>

        <p className="text-gray-500 border border-gray-200 bg-white rounded-2xl p-5">
          {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>

      <p className="mt-6 mb-4 text-gray-500">
        মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product: Product) => (
          <Link key={product.id} href={`/productDetail/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SingleProduct;
