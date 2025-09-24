import React from 'react';
import { ArrowRight, Download, Code, Users, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const { t } = useI18n();

  const handleViewWork = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // In a real app, this would download the actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Yacouba_Resume.pdf';
    link.click();
  };

  const stats = [
    {
      icon: Trophy,
      label: t('hero.stats.experience'),
      color: 'text-accent'
    },
    {
      icon: Code,
      label: t('hero.stats.projects'),
      color: 'text-accent-2'
    },
    {
      icon: Users,
      label: t('hero.stats.clients'),
      color: 'text-accent'
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-2">
                <p 
                  className="text-lg text-muted"
                  style={{ color: 'var(--muted)' }}
                >
                  {t('hero.greeting')}
                </p>
                <h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{ 
                    color: 'var(--text)',
                    fontWeight: 700,
                    lineHeight: 1.1
                  }}
                >
                  <span 
                    className="text-accent block"
                    style={{ color: 'var(--accent)' }}
                  >
                    {t('hero.name')}
                  </span>
                </h1>
              </div>
              
              <h2 
                className="text-xl md:text-2xl text-muted font-medium"
                style={{ 
                  color: 'var(--muted)',
                  fontWeight: 500
                }}
              >
                {t('hero.title')}
              </h2>
              
              <p 
                className="text-lg leading-relaxed max-w-2xl"
                style={{ 
                  color: 'var(--text)',
                  lineHeight: 1.7
                }}
              >
                {t('hero.description')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleViewWork}
                size="lg"
                className="bg-accent hover:bg-accent-2 text-bg font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 group"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)'
                }}
              >
                {t('hero.cta_primary')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleDownloadResume}
                variant="outline"
                size="lg"
                className="border-border hover:bg-surface font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                {t('hero.cta_secondary')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg bg-surface border border-border"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div 
                    className={`p-2 rounded-lg ${stat.color}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)',
                      color: 'var(--bg)'
                    }}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Image */}
              <div 
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)'
                }}
              >
                <ImageWithFallback
                  src='/profil.jpg'
                  alt="Yacouba - Software Engineer workspace"
                  className="w-full h-[800px] md:h-[700px] object-cover"
                />
                
                {/* Overlay gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-bg/20 via-transparent to-accent/20"
                  style={{
                    background: `linear-gradient(135deg, var(--bg)/0.2, transparent, var(--accent)/0.2)`
                  }}
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 z-20">
                <Badge 
                  className="bg-accent text-bg px-4 py-2 font-semibold shadow-lg"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  Available for hire
                </Badge>
              </div>

              <div className="absolute -bottom-4 -left-4 z-20">
                <div 
                  className="bg-surface border border-border p-4 rounded-xl shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 bg-accent rounded-full animate-pulse"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text)' }}
                    >
                      Currently coding
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10"
              style={{
                background: `radial-gradient(ellipse at center, var(--accent)/0.1, transparent 70%)`
              }}
            />
            
            <div 
              className="absolute top-0 right-0 w-32 h-32 -z-10 rounded-full blur-3xl"
              style={{
                backgroundColor: 'var(--accent-2)',
                opacity: 0.2
              }}
            />
            
            <div 
              className="absolute bottom-0 left-0 w-40 h-40 -z-10 rounded-full blur-3xl"
              style={{
                backgroundColor: 'var(--accent)',
                opacity: 0.15
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}