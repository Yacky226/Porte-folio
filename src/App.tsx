import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { I18nProvider } from './hooks/useI18n';
import { ThemeProvider } from './hooks/useTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section based on scroll position
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'services', 'blog', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Theme initialization is now handled by ThemeProvider
  // No need to duplicate the logic here

  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Scroll Progress Indicator */}
          <ScrollProgress />
          
          {/* Header */}
          <Header activeSection={activeSection} />
          
          {/* Main Content */}
          <main>
            <Hero />
            <About />
            <Projects />
            <Services />
            <Blog />
            <Contact />
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster 
            position="bottom-right"
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}