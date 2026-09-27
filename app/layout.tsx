import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <header className="border-b border-gray-800">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            
            {/* Logo */}
            <div className="text-2xl font-bold tracking-wider">
              FITLOG
            </div>

            {/* Navigation */}
            <div className="flex gap-8">
              <a href="/" className="font-medium hover:text-lime-400">
                Workout
              </a>

              <a href="/my-plan" className="font-medium hover:text-lime-400">
                My Plan
              </a>
            </div>

            {/* Counters */}
            <div className="flex gap-3">
              <a
                href="/my-plan"
                className="rounded-full bg-lime-400 px-4 py-2 font-bold text-black"
              >
                Plan 0
              </a>

              <a
                href="/my-plan"
                className="rounded-full border border-white px-4 py-2 font-bold"
              >
                Saved 0
              </a>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
