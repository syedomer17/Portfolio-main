# Portfolio Website

A modern, responsive portfolio website built with React and TypeScript, featuring a stunning glassmorphism design aesthetic.

![Portfolio Preview](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- **Glassmorphism Design**: Modern frosted glass aesthetic with backdrop blur effects
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **Type-Safe**: Built with TypeScript for robust code quality
- **Fast Performance**: Lightning-fast build times with Vite
- **Organized Tech Stack**: Categorized skills showcase with clean layout
- **Professional UI**: Clean, minimalist design without excessive effects

## 🚀 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7** - Next-generation build tool
- **Tailwind CSS 4** - Utility-first CSS framework

### Animation & Effects
- **Framer Motion 12** - Smooth page transitions and animations
- **GSAP 3** - Advanced typing animations
- **React Fast Marquee** - Smooth marquee effects

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Type-safe component variants

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/syedomer17/Portfolio-main.git

# Navigate to the client directory
cd Portfolio-main/client

# Install dependencies
npm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

The development server will start at `http://localhost:5173/`

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # React components
│   │   ├── sections/        # Page sections (Hero, Projects, etc.)
│   │   ├── ui/              # Reusable UI components
│   │   └── reactbits/       # Animation components
│   ├── lib/                 # Utility functions
│   ├── assets/              # Static assets
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Public assets
├── types/                   # TypeScript type declarations
└── index.html               # HTML entry point
```

## 🎨 Customization

### Colors
The color scheme uses blue-based glassmorphism. To customize, edit the CSS variables in `src/App.css`:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Content
Update your personal information in the following components:
- `src/components/sections/HeroSection.tsx` - Name, title, and bio
- `src/components/sections/ProjectsSection.tsx` - Project showcase
- `src/components/sections/ContactSection.tsx` - Contact links

## 🚢 Deployment

Build the project for production:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Syed Omer Ali**

- GitHub: [@syedomer17](https://github.com/syedomer17)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Glassmorphism design pattern
- React and TypeScript communities

---

⭐ Star this repository if you find it helpful!

