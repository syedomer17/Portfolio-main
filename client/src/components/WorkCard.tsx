import { Button } from './ui/button'

interface WorkCardProps {
  icon: string
  title: string
  description: string
}

export function WorkCard({ icon, title, description }: WorkCardProps) {
  return (
    <div className="bg-linear-to-br from-purple-900/20 to-blue-900/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 card-hover">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 break-words">
            {description}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-purple-500/50 hover:bg-purple-600/20 text-purple-400 text-xs sm:text-sm"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
    </div>
  )
}
