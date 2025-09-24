import React from 'react';
import { ArrowRight, CheckCircle, Clock, Layers, Zap, Users, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useI18n } from '../hooks/useI18n';

export function Services() {
  const { t } = useI18n();

  // Translated section strings
  const title = t('services.title');
  const subtitle = t('services.subtitle');
  const topContactCTA = t('services.contact_cta');

  // Services data from translations (flexible: accept arrays or pipe/strings)
  const rawServices: any = t('services.items');
  const services: Array<any> = Array.isArray(rawServices)
    ? rawServices.map((s: any) => {
        // normalize deliverables to string[]
        let deliverables: string[] = [];
        if (Array.isArray(s.deliverables)) {
          deliverables = s.deliverables;
        } else if (typeof s.deliverables === 'string') {
          deliverables = s.deliverables.split('|').map((d: string) => d.trim());
        }
        return {
          title: s.title || '',
          description: s.description || '',
          deliverables,
          timeline: s.timeline || ''
        };
      })
    : [];

  // Icons mapped by index (keeps icons local)
  const serviceIcons = [Layers, Zap, BarChart3, Users];

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Bottom CTA texts
  const bottomTitle = t('services.bottom_cta_title');
  const bottomDescription = t('services.bottom_cta_description');
  const startProjectText = t('services.start_project');
  const scheduleCallText = t('services.schedule_call');

  return (
    <section id="services" className="py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-8" style={{ color: 'var(--muted)' }}>
            {subtitle}
          </p>

          <Button
            onClick={handleContactClick}
            size="lg"
            className="bg-accent hover:bg-accent-2 text-bg font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 group"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)'
            }}
          >
            {topContactCTA}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[index % serviceIcons.length] || Layers;
            return (
              <ServiceCard
                key={index}
                service={service}
                icon={IconComponent}
                index={index}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div
            className="bg-surface border border-border rounded-2xl p-8 md:p-12"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              {bottomTitle}
            </h3>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              {bottomDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleContactClick}
                size="lg"
                className="bg-accent hover:bg-accent-2 text-bg font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)'
                }}
              >
                {startProjectText}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-surface font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                onClick={() => window.open('mailto:contact@yacouba.dev')}
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              >
                {scheduleCallText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------
   ServiceCard component
   --------------------------- */
interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    deliverables: string[];
    timeline: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}

function ServiceCard({ service, icon: IconComponent, index }: ServiceCardProps) {
  const { t } = useI18n();

  // CTA label for service cards
  const cardCta = t('services.cta');

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface relative overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 transition-opacity group-hover:opacity-20"
        style={{
          backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)'
        }}
      />

      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)',
              color: 'var(--bg)'
            }}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>
              {service.title}
            </h3>
            <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
              {service.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Deliverables */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center" style={{ color: 'var(--text)' }}>
            <CheckCircle className="w-4 h-4 mr-2 text-accent" />
            {t('services.deliverables_title')}
          </h4>
          <ul className="space-y-2">
            {service.deliverables.map((deliverable, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{
                    backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)'
                  }}
                />
                <span className="text-sm text-muted" style={{ color: 'var(--muted)' }}>
                  {deliverable}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {t('services.timeline_label')}
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-border"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          >
            {service.timeline}
          </Badge>
        </div>

        {/* CTA */}
        <Button
          className="w-full bg-transparent border border-border hover:bg-surface group-hover:bg-accent group-hover:text-bg group-hover:border-accent transition-all duration-300"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text)'
          }}
          onClick={() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {cardCta}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
