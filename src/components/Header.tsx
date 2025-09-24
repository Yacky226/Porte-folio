import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from './ui/sheet';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  activeSection?: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage, languages } = useI18n();
  const { theme, setTheme, toggleTheme } = useTheme();

  // Handle scroll effect
  // Change header style on scroll when scrollY > 20
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
  };

  const navigation = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.services'), href: '#services' },
    { name: t('navigation.blog'), href: '#blog' },
    { name: t('navigation.contact'), href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    // In a real app, this would download the actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the actual resume file
    link.download = `Yacouba_${language.toUpperCase()}.pdf`;
    link.click();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="text-xl md:text-2xl font-bold transition-colors duration-200"
              style={{ 
                fontWeight: 700,
                color: 'var(--accent)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
              }}
            >
              Yacouba
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm font-medium transition-colors duration-200 hover:text-accent"
                style={{ 
                  color: activeSection === item.href.substring(1) 
                    ? 'var(--accent)' 
                    : 'var(--muted)'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.href.substring(1)) {
                    e.currentTarget.style.color = 'var(--text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.href.substring(1)) {
                    e.currentTarget.style.color = 'var(--muted)';
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-border hover:bg-surface transition-colors duration-200"
              aria-label={t('language.switch')}
              aria-pressed={language === 'fr'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-surface transition-colors duration-200"
              aria-label={t('theme.toggle')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Resume Download */}
            <Button
              onClick={handleResumeDownload}
              className="bg-accent hover:bg-accent-2 text-bg font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('navigation.resume')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                aria-label={t('navigation.menu')}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-border">
              {/* Add required accessibility elements */}
              <SheetHeader className="sr-only">
                <SheetTitle>{t('navigation.menu')}</SheetTitle>
                <SheetDescription>
                  Navigate through the portfolio sections and adjust settings
                </SheetDescription>
              </SheetHeader>
              
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>Yacouba</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-bg transition-colors"
                    aria-label={t('navigation.close')}
                    style={{ color: 'var(--text)' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 py-6">
                  <ul className="space-y-4">
                    {navigation.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                            activeSection === item.href.substring(1)
                              ? 'bg-accent text-bg'
                              : 'text-text hover:bg-bg hover:text-accent'
                          }`}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Actions */}
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Language Switcher */}
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-bg transition-colors"
                      aria-label={t('language.switch')}
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">{language.toUpperCase()}</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg border border-border hover:bg-bg transition-colors"
                      aria-label={t('theme.toggle')}
                    >
                      {theme === 'dark' ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Resume Download */}
                  <Button
                    onClick={handleResumeDownload}
                    className="w-full bg-accent hover:bg-accent-2 text-bg font-medium py-3 rounded-lg transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('navigation.resume')}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}