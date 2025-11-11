export function Footer() {
  return (
    <footer className="py-12 px-6 sm:px-8 lg:px-16 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold text-orange-400">
            Portfolio
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#home" className="text-slate-400 hover:text-orange-400 transition-colors">
              Home
            </a>
            <a href="#experience" className="text-slate-400 hover:text-orange-400 transition-colors">
              Experience
            </a>
            <a href="#skills" className="text-slate-400 hover:text-orange-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-slate-400 hover:text-orange-400 transition-colors">
              Projects
            </a>
            <a href="#education" className="text-slate-400 hover:text-orange-400 transition-colors">
              Education
            </a>
            <a href="#contact" className="text-slate-400 hover:text-orange-400 transition-colors">
              Contact
            </a>
          </div>

          <div className="text-slate-500 text-sm">
            © 2025 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
