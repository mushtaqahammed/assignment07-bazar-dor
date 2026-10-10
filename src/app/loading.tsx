const Loading = () => {
  return (
    <main className="min-h-[80vh] bg-[#f4f9f5] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Loading Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-lime-200 border-t-green-700" />
            <span className="text-2xl">🛒</span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            বাজারদর লোড হচ্ছে
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার জন্য সর্বশেষ বাজারদরের তথ্য সংগ্রহ করা হচ্ছে...
          </p>

          <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-lime-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-lime-500" />
          </div>
        </div>

        {/* Skeleton Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 h-4 w-28 rounded bg-gray-200" />
              <div className="mb-3 h-8 w-36 rounded bg-gray-200" />
              <div className="h-3 w-44 max-w-full rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Skeleton Product Cards */}
        <div className="mb-5 flex items-center justify-between">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-24 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200" />

                <div className="flex-1">
                  <div className="mb-3 h-5 w-32 max-w-full rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mb-4 h-10 rounded-xl bg-gray-100" />

              <div className="mb-3 h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Bazar Dor — প্রতিদিনের বাজারদর আপনার হাতেই।
        </p>
      </div>
    </main>
  );
};

export default Loading;
