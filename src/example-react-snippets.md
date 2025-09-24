# React Component Examples

This document provides complete React component examples with corresponding CSS classes for the portfolio system.

## 🧩 Core Components

### 1. Header Component

```jsx
// components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon, Globe } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { useAnalytics } from '../hooks/useAnalytics';

export function Header({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { trackLanguageChange, trackThemeChange } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
    trackLanguageChange(newLang);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    trackThemeChange(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container container">
        <a href="#home" className="header__logo">
          Alex Chen
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navigation.map((item) => (
              <li key={item.href} className="header__nav-item">
                <a
                  href={item.href}
                  className={`header__nav-link ${
                    activeSection === item.href.substring(1)
                      ? 'header__nav-link--active'
                      : ''
                  }`}
                  aria-current={
                    activeSection === item.href.substring(1) ? 'page' : undefined
                  }
                >
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            onClick={handleLanguageToggle}
            className="header__action-btn"
            aria-label={t('language.switch')}
          >
            <Globe className="header__action-icon" />
            <span className="header__action-text">{language.toUpperCase()}</span>
          </button>

          <button
            onClick={handleThemeToggle}
            className="header__action-btn"
            aria-label={t('theme.toggle')}
          >
            {theme === 'dark' ? (
              <Sun className="header__action-icon" />
            ) : (
              <Moon className="header__action-icon" />
            )}
          </button>

          <button className="header__resume-btn btn btn--primary">
            <Download className="btn__icon" />
            {t('navigation.resume')}
          </button>
        </div>

        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t('navigation.menu')}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="header__mobile-icon" />
          ) : (
            <Menu className="header__mobile-icon" />
          )}
        </button>
      </div>
    </header>
  );
}
```

**CSS Classes:**
```css
/* Header Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

.header--scrolled {
  background-color: rgba(var(--color-surface-rgb), 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 var(--space-4);
}

.header__logo {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

.header__logo:hover {
  color: var(--color-accent-2);
}

.header__nav {
  display: none;
}

@media (min-width: 768px) {
  .header__nav {
    display: block;
  }
}

.header__nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--space-6);
}

.header__nav-link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
}

.header__nav-link:hover,
.header__nav-link--active {
  color: var(--color-accent);
}

.header__nav-link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
  border-radius: 2px;
}

.header__actions {
  display: none;
  align-items: center;
  gap: var(--space-3);
}

@media (min-width: 768px) {
  .header__actions {
    display: flex;
  }
}

.header__action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.header__action-btn:hover {
  background-color: var(--color-surface);
  border-color: var(--color-accent);
}

.header__action-icon {
  width: 1rem;
  height: 1rem;
}

.header__action-text {
  font-size: var(--text-sm);
  font-weight: 500;
}

.header__mobile-toggle {
  display: flex;
  align-items: center;
  padding: var(--space-2);
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
}

@media (min-width: 768px) {
  .header__mobile-toggle {
    display: none;
  }
}
```

### 2. Project Card Component

```jsx
// components/ProjectCard.tsx
import React from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useI18n } from '../hooks/useI18n';

export function ProjectCard({ project, featured = false }) {
  const { trackProjectClick, trackExternalLinkClick } = useAnalytics();
  const { t } = useI18n();

  const handleProjectClick = () => {
    trackProjectClick(project.id, project.title);
  };

  const handleExternalClick = (url, type) => {
    trackExternalLinkClick(url, `project_${type}`);
  };

  return (
    <article 
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
      onClick={handleProjectClick}
    >
      <div className="project-card__image-container">
        <img
          src={project.featuredImage.url}
          alt={project.featuredImage.alt}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__overlay">
          <button 
            className="project-card__preview-btn"
            aria-label={t('projects.actions.live_demo')}
          >
            <Play className="project-card__preview-icon" />
          </button>
        </div>
        
        {featured && (
          <div className="project-card__badge">
            {t('projects.featured')}
          </div>
        )}
      </div>

      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.title}</h3>
          <div className="project-card__status">
            <span className={`project-card__status-badge project-card__status-badge--${project.status}`}>
              {t(`projects.status.${project.status}`)}
            </span>
          </div>
        </div>

        <p className="project-card__description">
          {project.excerpt || project.description}
        </p>

        <div className="project-card__technologies">
          {project.technologies?.map((tech) => (
            <span key={tech.id} className="project-card__tech-tag">
              {tech.name}
            </span>
          ))}
        </div>

        <div className="project-card__actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__action-btn project-card__action-btn--primary"
              onClick={(e) => {
                e.stopPropagation();
                handleExternalClick(project.liveUrl, 'demo');
              }}
            >
              <ExternalLink className="project-card__action-icon" />
              {t('projects.actions.live_demo')}
            </a>
          )}
          
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__action-btn project-card__action-btn--secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleExternalClick(project.repositoryUrl, 'code');
              }}
            >
              <Github className="project-card__action-icon" />
              {t('projects.actions.view_code')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
```

**CSS Classes:**
```css
/* Project Card Styles */
.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.project-card--featured {
  border: 2px solid var(--color-accent);
  background: linear-gradient(135deg, var(--color-surface) 0%, rgba(var(--color-accent-rgb), 0.05) 100%);
}

.project-card__image-container {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-card__image {
  transform: scale(1.05);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__preview-btn {
  padding: var(--space-4);
  background: var(--color-accent);
  border: none;
  border-radius: 50%;
  color: var(--color-bg);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.project-card__preview-btn:hover {
  transform: scale(1.1);
}

.project-card__preview-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.project-card__badge {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  padding: var(--space-1) var(--space-3);
  background: var(--color-accent);
  color: var(--color-bg);
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

.project-card__content {
  padding: var(--space-6);
}

.project-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.project-card__title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  line-height: 1.3;
}

.project-card__status-badge {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  white-space: nowrap;
}

.project-card__status-badge--completed {
  background: rgba(var(--color-success-rgb), 0.2);
  color: var(--color-success);
}

.project-card__status-badge--in-progress {
  background: rgba(var(--color-warning-rgb), 0.2);
  color: var(--color-warning);
}

.project-card__description {
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.project-card__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.project-card__tech-tag {
  padding: var(--space-1) var(--space-2);
  background: rgba(var(--color-accent-rgb), 0.1);
  color: var(--color-accent);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-sm);
}

.project-card__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.project-card__action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.project-card__action-btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
}

.project-card__action-btn--primary:hover {
  background: var(--color-accent-2);
  transform: translateY(-1px);
}

.project-card__action-btn--secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.project-card__action-btn--secondary:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.project-card__action-icon {
  width: 1rem;
  height: 1rem;
}
```

### 3. Contact Form Component

```jsx
// components/ContactForm.tsx
import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Building } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useAnalytics } from '../hooks/useAnalytics';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { t } = useI18n();
  const { trackContactSubmit } = useAnalytics();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.name_required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.email_invalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.errors.subject_required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.message_required');
    } else if (formData.message.length < 10) {
      newErrors.message = t('contact.form.errors.message_too_short');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Track analytics
      trackContactSubmit(formData);

      // Submit form (replace with actual API call)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <form 
      className="contact-form" 
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-title"
    >
      <h3 id="contact-form-title" className="contact-form__title">
        {t('contact.form.title')}
      </h3>

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="name" className="contact-form__label">
            <User className="contact-form__label-icon" />
            {t('contact.form.name.label')}
            <span className="contact-form__required" aria-label="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
            placeholder={t('contact.form.name.placeholder')}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && (
            <div id="name-error" className="contact-form__error" role="alert">
              {errors.name}
            </div>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor="email" className="contact-form__label">
            <Mail className="contact-form__label-icon" />
            {t('contact.form.email.label')}
            <span className="contact-form__required" aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
            placeholder={t('contact.form.email.placeholder')}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && (
            <div id="email-error" className="contact-form__error" role="alert">
              {errors.email}
            </div>
          )}
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="company" className="contact-form__label">
          <Building className="contact-form__label-icon" />
          {t('contact.form.company.label')}
        </label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          className="contact-form__input"
          placeholder={t('contact.form.company.placeholder')}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="subject" className="contact-form__label">
          <MessageSquare className="contact-form__label-icon" />
          {t('contact.form.subject.label')}
          <span className="contact-form__required" aria-label="required">*</span>
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={`contact-form__input ${errors.subject ? 'contact-form__input--error' : ''}`}
          placeholder={t('contact.form.subject.placeholder')}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={!!errors.subject}
          required
        />
        {errors.subject && (
          <div id="subject-error" className="contact-form__error" role="alert">
            {errors.subject}
          </div>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="message" className="contact-form__label">
          {t('contact.form.message.label')}
          <span className="contact-form__required" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
          placeholder={t('contact.form.message.placeholder')}
          rows="6"
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && (
          <div id="message-error" className="contact-form__error" role="alert">
            {errors.message}
          </div>
        )}
      </div>

      {submitStatus && (
        <div 
          className={`contact-form__status contact-form__status--${submitStatus}`}
          role="alert"
          aria-live="polite"
        >
          {submitStatus === 'success' 
            ? t('contact.form.success')
            : t('contact.form.error')
          }
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="contact-form__submit btn btn--primary btn--large"
        aria-describedby="submit-status"
      >
        {isSubmitting ? (
          <>
            <div className="btn__spinner" aria-hidden="true" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <Send className="btn__icon" />
            {t('contact.form.submit')}
          </>
        )}
      </button>
    </form>
  );
}
```

**CSS Classes:**
```css
/* Contact Form Styles */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-8);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.contact-form__title {
  margin-bottom: var(--space-6);
  color: var(--color-text);
  text-align: center;
}

.contact-form__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

@media (min-width: 640px) {
  .contact-form__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-form__field {
  margin-bottom: var(--space-4);
}

.contact-form__label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.contact-form__label-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent);
}

.contact-form__required {
  color: var(--color-error);
  font-weight: 700;
}

.contact-form__input,
.contact-form__textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.contact-form__input:focus,
.contact-form__textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.1);
}

.contact-form__input--error,
.contact-form__textarea--error {
  border-color: var(--color-error);
}

.contact-form__textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form__error {
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-error);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.contact-form__status {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  font-weight: 500;
}

.contact-form__status--success {
  background: rgba(var(--color-success-rgb), 0.1);
  color: var(--color-success);
  border: 1px solid rgba(var(--color-success-rgb), 0.3);
}

.contact-form__status--error {
  background: rgba(var(--color-error-rgb), 0.1);
  color: var(--color-error);
  border: 1px solid rgba(var(--color-error-rgb), 0.3);
}

.contact-form__submit {
  width: 100%;
  justify-content: center;
}
```

### 4. Button System

```jsx
// components/ui/Button.tsx
import React from 'react';
import { cn } from '../utils';

const buttonVariants = {
  variant: {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    outline: 'btn--outline',
    ghost: 'btn--ghost',
    destructive: 'btn--destructive'
  },
  size: {
    small: 'btn--small',
    medium: 'btn--medium',
    large: 'btn--large'
  }
};

export function Button({
  className,
  variant = 'primary',
  size = 'medium',
  children,
  icon,
  loading = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'btn',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        loading && 'btn--loading',
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && <div className="btn__spinner" aria-hidden="true" />}
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </button>
  );
}
```

**CSS Classes:**
```css
/* Button System */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--loading {
  pointer-events: none;
}

/* Variants */
.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-accent-2);
  transform: translateY(-1px);
}

.btn--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--color-bg);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn--outline {
  background: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn--outline:hover:not(:disabled) {
  background: var(--color-accent);
  color: var(--color-bg);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-surface);
  color: var(--color-accent);
}

.btn--destructive {
  background: var(--color-error);
  color: white;
}

.btn--destructive:hover:not(:disabled) {
  background: #dc2626;
}

/* Sizes */
.btn--small {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
}

.btn--medium {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
}

.btn--large {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-lg);
}

/* Elements */
.btn__icon {
  display: flex;
  align-items: center;
}

.btn__icon svg {
  width: 1em;
  height: 1em;
}

.btn__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn__text {
  white-space: nowrap;
}
```

---

These examples provide a comprehensive foundation for building the portfolio components with proper accessibility, responsive design, and modern React patterns. Each component includes proper ARIA attributes, keyboard navigation support, and follows the BEM CSS methodology for maintainable styles.