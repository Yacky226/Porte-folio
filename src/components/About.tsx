import React from 'react';
import { Calendar, MapPin, Code, Users, Award, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const { t } = useI18n();

  // Localized simple strings
  const title = t('about.title');
  const subtitle = t('about.subtitle');
  const description = t('about.description');
  const skillsTitle = t('about.skills_title');
  const timelineTitle = t('about.timeline_title');
  const locationText = t('about.location'); // e.g. "Remote Worldwide"
  const locationStatus = t('about.location_status'); // e.g. "Available for work"
  const imageAlt = t('about.image_alt'); // alt text for profile photo

  // Skills: translations provide an array of objects [{ name, level }]
  // Fallback: if the i18n returns a string or pipe-separated list, try to parse it.
  const rawSkills: any = t('about.data.skills');
  const skills: Array<{ name: string; level: number }> = Array.isArray(rawSkills)
    ? rawSkills.map((s: any) => {
        if (typeof s === 'string') {
          // allow "Name|80"
          const parts = s.split('|').map((p: string) => p.trim());
          return { name: parts[0], level: Number(parts[1] || 0) };
        }
        return { name: s.name || '', level: Number(s.level || 0) };
      })
    : [];

  // Achievements: translations provide array [{ title, subtitle }]
  // We keep icons and colors locally but titles/subtitles come from i18n
  const achievementsMeta = [
    { icon: Code, color: 'text-accent' },
    { icon: Users, color: 'text-accent-2' },
    { icon: Award, color: 'text-accent' },
    { icon: BookOpen, color: 'text-accent-2' }
  ];
  const rawAchievements: any = t('about.data.achievements');
  const achievements = achievementsMeta.map((meta, idx) => {
    const item = Array.isArray(rawAchievements) ? rawAchievements[idx] : null;
    const title = item?.title ?? t(`about.achievements.${idx}.title`) ?? '';
    const subtitle = item?.subtitle ?? t(`about.achievements.${idx}.subtitle`) ?? '';
    return { ...meta, title, subtitle };
  });

  // Timeline is expected to be an array of objects from translations (year, title, company, description)
  const timeline: Array<any> = Array.isArray(t('about.timeline')) ? t('about.timeline') : [];

  return (
    <section id="about" className="py-20 bg-surface/30" style={{ backgroundColor: 'rgba(11, 18, 32, 0.3)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Photo and Description */}
          <div className="space-y-8">
            {/* Profile Photo */}
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)'
                }}
              >
                <ImageWithFallback
                  src="/face.jpg"
                  alt={imageAlt}
                  className="w-full h-[600px] md:h-[600px] object-cover"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10"
                  style={{
                    background: `linear-gradient(135deg, var(--accent)/0.1, transparent, var(--accent-2)/0.1)`
                  }}
                />
              </div>

              {/* Floating info card */}
              <div className="absolute -bottom-6 -right-6 z-10">
                <Card
                  className="bg-surface border-border shadow-xl backdrop-blur-sm"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-xl)'
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="p-2 rounded-lg bg-accent text-bg"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'var(--bg)'
                        }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                          {locationText}
                        </p>
                        <p className="text-xs text-muted" style={{ color: 'var(--muted)' }}>
                          {locationStatus}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
                {description}
              </p>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className="bg-surface border-border hover:bg-surface/80 transition-colors"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${achievement.color}`}
                          style={{
                            backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)',
                            color: 'var(--bg)'
                          }}
                        >
                          <achievement.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ color: 'var(--text)' }}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-muted" style={{ color: 'var(--muted)' }}>
                            {achievement.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills and Timeline */}
          <div className="space-y-12">
            {/* Technical Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
                {skillsTitle}
              </h3>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium" style={{ color: 'var(--text)' }}>
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted" style={{ color: 'var(--muted)' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={skill.level}
                        className="h-2 bg-bg"
                        style={{ backgroundColor: 'var(--bg)' }}
                      />
                      <div
                        className="absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
                {timelineTitle}
              </h3>

              <div className="space-y-6">
                {timeline.map((item: any, index: number) => (
                  <Card
                    key={index}
                    className="bg-surface border-border hover:bg-surface/80 transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge
                            className="bg-accent text-bg"
                            style={{
                              backgroundColor: 'var(--accent)',
                              color: 'var(--bg)'
                            }}
                          >
                            {item.year}
                          </Badge>
                          <div>
                            <h4 className="font-semibold" style={{ color: 'var(--text)' }}>
                              {item.title}
                            </h4>
                            <p className="text-sm text-accent" style={{ color: 'var(--accent)' }}>
                              {item.company}
                            </p>
                          </div>
                        </div>
                        <Calendar className="w-4 h-4 text-muted" />
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
