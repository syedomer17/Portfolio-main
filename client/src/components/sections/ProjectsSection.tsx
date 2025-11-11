import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  tech: string[]
  image: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 px-6 sm:px-8 lg:px-16 relative bg-slate-900/50">
      <div className="absolute right-[10%] top-[30%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Projects & Work 🚀
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Some of the projects I've worked on recently
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-orange-500/30 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-orange-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-5xl ml-4 flex-shrink-0">{project.image}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <Badge
                      key={idx}
                      className="bg-slate-700/60 border border-slate-600/50 text-slate-200 hover:border-orange-500/50 text-xs font-medium transition-all"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-orange-500/50 text-slate-200 transition-all"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
