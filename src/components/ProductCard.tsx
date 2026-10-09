

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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  return (

    <div className="w-full">
      <div className="border border-gray-200 bg-white rounded-2xl p-5 w-full min-h-48 flex flex-col justify-between">
        {/* Top */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
            {product.image}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-semibold text-gray-800 text-base">
              {product.nameBn}
            </h3>

            <p className="text-sm text-gray-500">
              প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between mt-8">
          <div>
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="font-bold text-xl text-gray-800">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          {/* Change */}
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              isUp
                ? "bg-red-50 text-red-600"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp && "▲"}
            {isDown && "▼"}
            {isFlat && "—"} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
          </div>
        </div>
      </div>
    </div>

   
  );
};

export default ProductCard;
