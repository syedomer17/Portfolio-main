import TextType from '../reactbits/TextType'
import { Button } from '../ui/button'

interface HeroSectionProps {
  name: string
  title: string
  subtitle: string
  skills: string[]
  aboutText: string
}

export function HeroSection({ name, title, subtitle, skills, aboutText }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Background image and overlay handled in App.tsx */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Hero Card */}
          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-10 transition-all duration-300 hover:bg-white/30 hover:shadow-amber-400/30">
              <p className="text-orange-400 text-lg font-semibold mb-4 tracking-wide">
                Hello! I'm {name} 👋
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                <span className="text-slate-900 dark:text-white">{title} Developer &</span>
                <br />
                <span className="text-orange-400">WordPress Expert</span>
              </h1>
              <div className="text-xl font-medium mb-4">
                <span className="text-slate-700 dark:text-slate-300">I specialize in: </span>
                <TextType
                  text={skills}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={2000}
                  className="text-orange-400 font-bold"
                  showCursor={true}
                  cursorClassName="text-orange-400"
                />
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-8">
                {aboutText}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-orange-500 hover:scale-105 transition-all duration-300"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 border border-white/30 text-slate-900 dark:text-white px-8 py-4 rounded-xl hover:bg-white/20 hover:border-orange-400 transition-all duration-300"
                >
                  Download CV
                </Button>
              </div>
            </div>
          </div>
          {/* Right Column: Tech Stack & Contact */}
          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                Tech Stack �️
              </h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'MongoDB', 'Express', 'React', 'Node.js', 'Linux'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/20 mr-2 hover:bg-orange-400 hover:text-black transition-all duration-200 font-mono text-sm shadow hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                Connect With Me 🌐
              </h2>
              <div className="space-y-3">
                {[
                  { icon: '🐙', label: 'GitHub', href: '#' },
                  { icon: '💼', label: 'LinkedIn', href: '#' },
                  { icon: '📷', label: 'Instagram', href: '#' },
                  { icon: '📧', label: 'Email', href: '#' },
                  { icon: '🌐', label: 'Website', href: '#' },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="flex items-center gap-3 text-slate-900 dark:text-white hover:text-orange-400 transition-colors duration-200 group text-lg font-medium"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
