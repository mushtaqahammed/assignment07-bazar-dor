import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
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

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const products = await res.json();
  return (
    <div>
      <h1 className="font-bold text-2xl mt-7">সব পণ্য</h1>
      <p>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product:Product) => (
          <Link key={product.id} href={`/productDetail/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
