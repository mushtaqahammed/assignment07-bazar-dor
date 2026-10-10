import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-56 w-56 items-center justify-center rounded-full bg-lime-100">
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-lime-400" />

          <div>
            <h1 className="text-7xl font-black tracking-tight text-green-800">
              404
            </h1>

            <div className="mx-auto mt-3 h-1.5 w-20 rounded-full bg-lime-500" />
            <p className="mt-3 text-sm font-semibold text-green-800">
              PAGE NOT FOUND
            </p>
          </div>

          <span className="absolute -bottom-1 -left-2 rounded-2xl bg-lime-400 p-3 text-3xl shadow-md">
            🛒
          </span>

          <span className="absolute -right-2 top-5 text-4xl">🔍</span>

          <span className="absolute bottom-5 right-0 text-3xl">🥦</span>
        </div>

        {/* Content */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Oops! Something went wrong
        </p>

        <h2 className="mb-4 text-2xl font-extrabold text-gray-900 sm:text-4xl">
          ওহ! পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, ঠিকানা পরিবর্তন
          হয়েছে অথবা পেজটি আর নেই। হোম পেজে ফিরে গিয়ে প্রয়োজনীয় তথ্য খুঁজে নিন।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-7 py-3.5 font-bold text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-lime-500 hover:shadow-md"
        >
          <span>⌂</span>
          হোম পেজে ফিরে যান
          <span>→</span>
        </Link>

        <p className="mt-10 text-sm text-gray-400">
          Bazar Dor — প্রতিদিনের বাজারদর আপনার হাতেই।
        </p>
      </div>
    </main>
  );
};

export default NotFound;
