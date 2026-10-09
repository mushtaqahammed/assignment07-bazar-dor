import AllProducts from "@/components/allProducts/AllProducts";
import ProductPriceDown from "@/components/allProducts/ProductPriceDown";
import ProductsPriceUp from "@/components/allProducts/ProductsPriceUp";
import Banner from "@/components/Banner";


export default function Home() {
  return (
    <div>
      
      <div className="max-w-7xl  mx-auto">
        <Banner />
        <ProductsPriceUp />
        <ProductPriceDown/>
        <AllProducts />
      </div>
    </div>
  );
}
