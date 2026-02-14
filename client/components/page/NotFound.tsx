export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-sm text-slate-500 tracking-widest uppercase"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Error 404
          </p>

          <h1
            className="text-xl font-bold text-slate-900 dark:text-white mt-3"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Page Not Found
          </h1>

          <p
            className="text-sm text-slate-600 dark:text-slate-300 mt-4"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            The page you are looking for does not exist or was moved. Try the
            homepage, projects, or resources.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-slate-700 dark:bg-[#C7C7C7] text-white dark:text-[#0E0D09]"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Go Home
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              View Projects
            </a>
          </div>

          <div className="mt-6">
            <a
              href="/resources"
              className="text-sm underline text-slate-600 dark:text-slate-300"
              style={{ fontFamily: '"Instagram Sans", sans-serif' }}
            >
              Browse Resources
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
