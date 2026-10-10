import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
interface MarqueeType {
  nameBn: string;
  id: number;
  slug: string;
  categoryIcon: string;
  today: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
}
const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  if (!res.ok) {
    throw new Error("Products fetch failed");
  }
  const data: MarqueeType[] = await res.json();
  return (
    <div className="my-5 border-y border-gray-200 bg-white">
      <MarqueeText className="py-1" direction="right" duration={40}>
        {data.map((h) => (
          <span key={h.id}>
            <Link className="hover:underline" href={`/productDetail/${h.id}`}>
              <span className="mx-5">
                {h.categoryIcon} {h.nameBn}
                <span className="ml-3">
                  {h.today.toLocaleString("bn-BD")} টাকা/কেজি
                </span>
                <span
                  className={
                    h.change.dir === "up"
                      ? "text-red-500"
                      : h.change.dir === "down"
                        ? "text-green-500"
                        : "text-gray-500"
                  }
                >
                  {h.change.dir === "up"
                    ? "▲"
                    : h.change.dir === "down"
                      ? "▼"
                      : "—"}
                  {h.change.pct.toLocaleString("bn-BD")}%
                </span>
              </span>
            </Link>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};
export default Marquee;
