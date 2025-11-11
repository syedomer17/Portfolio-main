import { Badge } from '../ui/badge'

interface SkillGroup {
  category: string
  skills: string[]
}

interface SkillsSectionProps {
  skillGroups: SkillGroup[]
}

export function SkillsSection({ skillGroups }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 px-6 sm:px-8 lg:px-16 relative bg-slate-800/30">
      <div className="absolute left-[10%] top-[30%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Tech Stack 🚀
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-orange-500/30 p-8 transition-all duration-300 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-orange-400">
                {group.category} 🔥
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-slate-700/60 border border-slate-600/50 text-slate-200 hover:border-orange-500/50 px-4 py-2 text-sm font-medium transition-all"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
