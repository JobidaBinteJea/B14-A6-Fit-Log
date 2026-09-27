export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-wider">
              FITLOG
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Train with intent. Log every set.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 FitLog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}