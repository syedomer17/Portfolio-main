import { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-slate-900/90 border-b border-slate-800/50 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-400">
            Portfolio
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
              Home
            </a>
            <a href="#experience" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
              Experience
            </a>
            <a href="#skills" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
              Skills
            </a>
            <a href="#projects" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
              Projects
            </a>
            <a href="#contact" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-slate-800/50 pt-4">
            <a
              href="#home"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#experience"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </a>
            <a
              href="#skills"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
