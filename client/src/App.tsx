import { Navigation } from './components/Navigation'
import { HeroSection } from './components/sections/HeroSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { EducationSection } from './components/sections/EducationSection'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/sections/Footer'

function App() {
  // Personal Information
  const personalInfo = {
    name: 'Ibrahim Mannan',
    title: 'Full Stack',
    subtitle: 'Developer &',
    email: 'ibrahimmannan930@gmail.com',
    aboutText: `A passionate full-stack developer and UI/UX designer with 3+ years of experience 
      in building scalable web applications. I specialize in creating beautiful, 
      user-centered designs and robust backend systems. Currently working at @Facebook, 
      where I contribute to products used by millions of users worldwide.`
  }

  const skills = [
    'React.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'Next.js',
    'MongoDB',
    'PostgreSQL',
    'AWS'
  ]

  // Work Experience Data
  const experiences = [
    {
      icon: '��',
      title: 'Senior Frontend Developer',
      company: 'Facebook',
      period: '2022 - Present',
      description: 'Leading development of scalable React applications used by millions. Implementing modern UI/UX patterns and performance optimizations.'
    },
    {
      icon: '🚀',
      title: 'Full Stack Developer',
      company: 'Tech Startup',
      period: '2021 - 2022',
      description: 'Built and deployed multiple web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality products.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      period: '2020 - 2021',
      description: 'Designed user interfaces for web and mobile applications. Created design systems and conducted user research.'
    },
    {
      icon: '💻',
      title: 'Junior Developer',
      company: 'Software Company',
      period: '2019 - 2020',
      description: 'Started my career building responsive websites and learning modern web technologies. Contributed to various client projects.'
    }
  ]

  // Skills Data
  const skillGroups = [
    { category: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'] },
    { category: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'] },
    { category: 'Tools & Others', skills: ['Git', 'Docker', 'AWS', 'Figma', 'Jest'] }
  ]

  // Projects Data
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒'
    },
    {
      title: 'Social Media App',
      description: 'Real-time social networking platform with messaging, posts, comments, and media sharing capabilities.',
      tech: ['Next.js', 'PostgreSQL', 'WebSocket', 'AWS'],
      image: '📱'
    },
    {
      title: 'Project Management Tool',
      description: 'Collaborative project management tool with task tracking, team collaboration, and analytics dashboard.',
      tech: ['React', 'Express', 'MongoDB', 'Chart.js'],
      image: '📊'
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool using OpenAI API for creating blog posts, social media content, and more.',
      tech: ['Next.js', 'OpenAI', 'Tailwind', 'Vercel'],
      image: '🤖'
    }
  ]

  // Education Data
  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      period: '2015 - 2019',
      description: 'Graduated with honors. Specialized in Software Engineering and Web Development.',
      icon: '🎓'
    },
    {
      degree: 'Full Stack Web Development',
      institution: 'Online Bootcamp',
      period: '2019',
      description: 'Intensive 6-month program covering modern web technologies and best practices.',
      icon: '💻'
    },
    {
      degree: 'UI/UX Design Certification',
      institution: 'Design Institute',
      period: '2020',
      description: 'Professional certification in User Interface and User Experience Design.',
      icon: '🎨'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navigation />
      
      <HeroSection
        name={personalInfo.name}
        title={personalInfo.title}
        subtitle={personalInfo.subtitle}
        skills={skills}
        aboutText={personalInfo.aboutText}
      />
    
      <ExperienceSection experiences={experiences} />
      
      <SkillsSection skillGroups={skillGroups} />
      
      <ProjectsSection projects={projects} />
      
      <EducationSection education={education} />
      
      <ContactSection email={personalInfo.email} />
      
      <Footer />
    </div>
  )
}

export default App
