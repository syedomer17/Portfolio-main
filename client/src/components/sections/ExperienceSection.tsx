

interface Experience {
  icon: string
  title: string
  company: string
  period: string
  description: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-6 sm:px-8 lg:px-16 relative bg-slate-900/50">
      <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Work Experience 💼
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My professional journey and experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experiences.map((job, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-orange-500/30 p-8 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300">
                    <span className="text-3xl">{job.icon}</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-orange-400 transition-colors duration-200">
                    {job.title}
                  </h3>
                  <p className="text-orange-400 text-sm font-semibold mb-3">
                    {job.company} • {job.period}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
