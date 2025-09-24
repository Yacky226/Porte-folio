# Yacouba - Student Portfolio 


## 🌟 Features

### Core Functionality
- **Bilingual Support**: Complete English and French localization
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Accessibility**: WCAG AA compliant with proper ARIA labels and focus management
- **Dark/Light Themes**: System preference detection with manual toggle
- **Progressive Web App**: Service worker and manifest for offline functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Vercel/Netlify account for deployment

### Development

```bash
# Start development server
npm run dev

# Run with CMS preview mode
npm run dev:preview

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── About.tsx          # About section component
│   ├── Blog.tsx           # Blog listing component
│   ├── Contact.tsx        # Contact form component
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Projects.tsx       # Projects grid
│   └── Services.tsx       # Services section
├── hooks/
│   ├── useI18n.tsx        # Internationalization
│   └── useTheme.tsx       # Theme management
├── locales/
│   ├── en.json           # English translations
│   └── fr.json           # French translations
```