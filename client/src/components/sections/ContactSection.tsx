import { Button } from '../ui/button'
import { Github, Linkedin, Instagram, Dribbble, Mail } from 'lucide-react'

interface ContactSectionProps {
  email: string
}

export function ContactSection({ email }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 px-6 sm:px-8 lg:px-16 relative bg-slate-800/30">
      <div className="absolute left-1/2 -translate-x-1/2 top-[20%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Let's Work Together 💬
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            I'm currently looking to join a cross-functional team that values improving people's lives
            through accessible design, or have a project in mind? Let's connect.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-10 shadow-xl">
          <div className="text-center mb-8">
            <p className="text-slate-400 mb-4">Feel free to reach out to me at:</p>
            <a 
              href={`mailto:${email}`}
              className="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-all inline-block"
            >
              {email}
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 shadow-lg shadow-orange-500/25"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button 
              variant="outline"
              className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-orange-500/50 text-slate-200"
            >
              Download CV
            </Button>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-slate-400 mb-6">Connect with me on social media</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, label: 'GitHub', link: '#' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', link: '#' },
                { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', link: '#' },
                { icon: <Dribbble className="w-5 h-5" />, label: 'Dribbble', link: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 hover:bg-slate-700 hover:border-orange-500/50 hover:scale-110 transition-all group"
                  aria-label={social.label}
                >
                  <div className="text-slate-400 group-hover:text-orange-400 transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
