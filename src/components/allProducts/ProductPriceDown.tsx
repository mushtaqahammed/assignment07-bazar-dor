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

const ProductPriceDown = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  const products: Product[] = await res.json();

  const priceUpProducts = products
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  return (
    <div>
      <h1 className="font-bold text-1xl mt-7">▼ আজ দাম কমেছে</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {priceUpProducts.map((product) => (
          <Link key={product.id} href={`/productDetail/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPriceDown;
