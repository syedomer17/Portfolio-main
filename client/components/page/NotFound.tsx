export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-gray-200 px-6">
      <div className="text-center">
        
        {/* Code-like status */}
        <p className="text-sm text-gray-500 tracking-widest uppercase">
          Error 404
        </p>

        {/* Big Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mt-3 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            Go Home
          </a>

          <a
            href="mailto:syedomerali2006@gmail.com"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 rounded-lg transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
