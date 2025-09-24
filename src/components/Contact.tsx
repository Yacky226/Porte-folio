import React, { useState } from 'react';
import { Send, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader } from './ui/card';
import { useI18n } from '../hooks/useI18n';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  honeypot: string; // Hidden field for spam protection
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Localized strings
  const title = t('contact.title');
  const subtitle = t('contact.subtitle');

  // Get budget options from translations (array OR pipe-separated string supported)
  const budgetOptionsRaw: any = t('contact.form.budget_options');
  const budgetOptions: string[] = Array.isArray(budgetOptionsRaw)
    ? budgetOptionsRaw
    : (typeof budgetOptionsRaw === 'string' && budgetOptionsRaw.length > 0
        ? budgetOptionsRaw.split('|').map((s: string) => s.trim())
        : []);

  const budgetPlaceholder = t('contact.form.budget_placeholder');

  // Contact info
  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email_label'),
      value: t('contact.info.email'),
      action: () => window.open(`mailto:${t('contact.info.email')}`)
    },
    {
      icon: MapPin,
      label: t('contact.info.location_label'),
      value: t('contact.info.location'),
      action: null
    },
    {
      icon: Clock,
      label: t('contact.info.response_label'),
      value: t('contact.info.response_time'),
      action: null
    }
  ];

  // Validation messages (localized)
  const errNameRequired = t('contact.form.errors.name_required');
  const errEmailRequired = t('contact.form.errors.email_required');
  const errEmailInvalid = t('contact.form.errors.email_invalid');
  const errMessageRequired = t('contact.form.errors.message_required');
  const errMessageTooShort = t('contact.form.errors.message_too_short');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = errNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = errEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = errEmailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = errMessageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = errMessageTooShort;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.honeypot) {
      console.warn('Spam detected (honeypot)');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success toast (localized)
      toast.success(t('contact.form.success'), {
        icon: <CheckCircle className="w-4 h-4" />,
        duration: 5000
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: '',
        honeypot: ''
      });
      setErrors({});
    } catch (err) {
      toast.error(t('contact.form.error'), {
        icon: <AlertCircle className="w-4 h-4" />,
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-surface/30" style={{ backgroundColor: 'rgba(11, 18, 32, 0.3)' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-surface border-border shadow-xl" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-xl)' }}>
              <CardHeader>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  {t('contact.form.header_title')}
                </h3>
                <p className="text-muted" style={{ color: 'var(--muted)' }}>
                  {t('contact.form.header_subtitle')}
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => handleInputChange('honeypot', e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                        {t('contact.form.name')} *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact.form.name_placeholder')}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`bg-bg border-border ${errors.name ? 'border-red-500' : ''}`}
                        style={{ backgroundColor: 'var(--bg)', borderColor: errors.name ? '#ef4444' : 'var(--border)', color: 'var(--text)' }}
                        required
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className="text-sm text-red-500" role="alert">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                        {t('contact.form.email')} *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.form.email_placeholder')}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`bg-bg border-border ${errors.email ? 'border-red-500' : ''}`}
                        style={{ backgroundColor: 'var(--bg)', borderColor: errors.email ? '#ef4444' : 'var(--border)', color: 'var(--text)' }}
                        required
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-sm text-red-500" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                        {t('contact.form.company')}
                      </label>
                      <Input
                        id="company"
                        type="text"
                        placeholder={t('contact.form.company_placeholder')}
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-bg border-border"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                        {t('contact.form.budget')}
                      </label>
                      <Select value={formData.budget} onValueChange={(value: string) => handleInputChange('budget', value)}>
                        <SelectTrigger className="bg-bg border-border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                          <SelectValue placeholder={budgetPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((option, idx) => (
                            <SelectItem key={idx} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {t('contact.form.message')} *
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t('contact.form.message_placeholder')}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`bg-bg border-border min-h-[120px] resize-none ${errors.message ? 'border-red-500' : ''}`}
                      style={{ backgroundColor: 'var(--bg)', borderColor: errors.message ? '#ef4444' : 'var(--border)', color: 'var(--text)' }}
                      required
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-sm text-red-500" role="alert">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-2 text-bg font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin mr-2" />
                        {t('contact.form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                {t('contact.get_in_touch_title')}
              </h3>
              <p className="text-muted mb-8" style={{ color: 'var(--muted)' }}>
                {t('contact.get_in_touch_subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className={`bg-surface border-border transition-all duration-300 ${info.action ? 'cursor-pointer hover:bg-surface/80 hover:scale-105' : ''}`}
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                  onClick={info.action || undefined}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)', color: 'var(--bg)' }}>
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted" style={{ color: 'var(--muted)' }}>{info.label}</p>
                        <p className="font-medium" style={{ color: 'var(--text)' }}>{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-accent text-bg border-0 cursor-pointer transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }} onClick={() => window.open(`mailto:${t('contact.info.email')}`)}>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{t('contact.quick_contact.title')}</h4>
                <p className="text-sm opacity-90">{t('contact.quick_contact.subtitle')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
