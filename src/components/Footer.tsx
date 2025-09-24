import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from '../hooks/useI18n';

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  // Social links use localized names (but keep hrefs static or change them)
  const socialLinks = [
    {
      name: t('footer.social.github'),
      icon: Github,
      href: 'https://github.com/yacouba',
      color: 'hover:text-accent'
    },
    {
      name: t('footer.social.linkedin'),
      icon: Linkedin,
      href: 'https://linkedin.com/in/yacouba',
      color: 'hover:text-accent'
    },
    {
      name: t('footer.social.twitter'),
      icon: Twitter,
      href: 'https://twitter.com/yacouba',
      color: 'hover:text-accent'
    },
    {
      name: t('footer.social.email'),
      icon: Mail,
      href: `mailto:${t('footer.contact.email')}`,
      color: 'hover:text-accent-2'
    }
  ];

  const quickLinks = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.services'), href: '#services' },
    { name: t('navigation.blog'), href: '#blog' },
    { name: t('navigation.contact'), href: '#contact' }
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface border-t border-border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-accent mb-4" style={{ color: 'var(--accent)' }}>
                  {t('footer.brand.name')}
                </h3>
                <p className="text-muted leading-relaxed max-w-md" style={{ color: 'var(--muted)' }}>
                  {t('footer.brand.description')}
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  {t('footer.connect_title')}
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-bg border border-border ${link.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--muted)'
                      }}
                      aria-label={link.name}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>
                {t('footer.quick_links_title')}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className="text-muted hover:text-accent transition-colors duration-200"
                      style={{ color: 'var(--muted)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>
                {t('footer.contact.title')}
              </h4>
              <div className="space-y-3 text-muted" style={{ color: 'var(--muted)' }}>
                <div>
                  <p className="font-medium text-text" style={{ color: 'var(--text)' }}>{t('footer.contact.email_label')}</p>
                  <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-accent transition-colors">
                    {t('footer.contact.email')}
                  </a>
                </div>
                <div>
                  <p className="font-medium text-text" style={{ color: 'var(--text)' }}>{t('footer.contact.location_label')}</p>
                  <p>{t('footer.contact.location')}</p>
                </div>
                <div>
                  <p className="font-medium text-text" style={{ color: 'var(--text)' }}>{t('footer.contact.availability_label')}</p>
                  <p>{t('footer.contact.availability')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-muted" style={{ color: 'var(--muted)' }}>
              <p>{t('footer.copyright').replace('{year}', String(currentYear))}</p>
            </div>

            {/* Back to Top */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-border hover:bg-surface group"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              {t('footer.back_to_top')}
              <ArrowUp className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
    </footer>
  );
}
