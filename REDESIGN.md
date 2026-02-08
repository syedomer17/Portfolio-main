# Portfolio Redesign

## Features Implemented

### ✨ Dark/Light Mode
- Smooth transitions between dark and light themes
- Persistent theme selection (saved to localStorage)
- Beautiful animated theme toggle button in the top-right corner
- System preference detection on first load

### 🎨 Modern UI Design
- Clean, professional layout inspired by modern portfolio designs
- Responsive design that works on all screen sizes
- Smooth animations using Framer Motion
- Card-based components with hover effects

### 📱 Sections

#### Hero Section
- Profile image with gradient border
- Name and title with view counter
- Engaging bio text
- Call-to-action buttons (Book a call, Send email)
- Social media links (GitHub, Twitter, LinkedIn, etc.)
- GitHub contribution calendar placeholder

#### Experience Section
- Company cards with logos
- Role, location, and time period
- Achievement bullet points
- Technology tags
- "View All" button

#### Projects Section
- Grid layout with project cards
- "Coming Soon" placeholders for future projects
- Live/Building status indicators
- Project descriptions and images
- Pin functionality (UI only)
- "View All" button

#### Blogs Section
- List of blog posts with dates and view counts
- Tag system for categorization
- External link indicators
- "View All" button

#### Skills & Technologies Section
- Interactive skill badges with icons
- Hover animations
- Technology icons using react-icons
- Comprehensive tech stack display

#### Contact Section
- Gradient background card
- Social media and email links
- Hover animations
- Footer with copyright information

### 🛠 Technologies Used
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Lucide React** - Additional icons
- **pnpm** - Package manager

## Setup Instructions

1. Install dependencies:
   ```bash
   cd client
   pnpm install
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

## Theme Toggle

The theme toggle button is fixed in the top-right corner. Click it to switch between light and dark modes. The preference is automatically saved and will persist across sessions.

## Customization

### Update Personal Information
Edit the following files to customize your portfolio:

- `src/components/Hero.tsx` - Personal info, bio, social links
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Projects showcase
- `src/components/Blogs.tsx` - Blog posts
- `src/components/TechStack.tsx` - Skills and technologies
- `src/components/Contact.tsx` - Contact information

### Change Colors
The color scheme can be modified in:
- `src/index.css` - CSS variables for dark/light themes
- `tailwind.config.js` - Tailwind theme configuration

## Performance

- All animations are GPU-accelerated
- Images are lazy-loaded
- Smooth 60fps animations
- Optimized for Core Web Vitals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Built with ❤️ using React, TypeScript, Tailwind CSS & Framer Motion

