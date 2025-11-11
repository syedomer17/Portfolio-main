import { Button } from './ui/button'
import { Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  icon: string
  reverse?: boolean
}

export function ProjectCard({ title, description, icon, reverse = false }: ProjectCardProps) {
  return (
    <div className="mb-20 sm:mb-32">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center ${reverse ? '' : ''}`}>
        <div className={`${reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
          <p className="text-purple-400 text-sm mb-2">Featured Project</p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">{title}</h3>
          <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-purple-600/20 hover:text-purple-400"
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-purple-600/20 hover:text-purple-400"
            >
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className={`${reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
          <div className="bg-linear-to-br from-purple-900/20 to-blue-900/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-purple-500/20 aspect-video flex items-center justify-center card-hover">
            <div className="text-gray-500 text-4xl sm:text-6xl">{icon}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
