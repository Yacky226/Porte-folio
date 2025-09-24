import React from 'react';
import { Clock, ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  featured: boolean;
}

// formatDate uses user's locale
const formatDate = (isoOrDate: string | Date) => {
  const date = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export function Blog() {
  const { t } = useI18n();

  // base meta (images) — not user-facing text (keeps urls centralized)
  const baseMeta: { id: string; image?: string }[] = [
    { id: '1', image: 'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?...' },
    { id: '2', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?...' },
    { id: '3', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?...' },
    { id: '4', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?...' },
    { id: '5', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?...' },
    { id: '6', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?...' }
  ];

  // Build posts from translations under blog.data.{id}
  const posts: BlogPost[] = baseMeta.map(meta => {
    const id = meta.id;
    const title = t(`blog.data.${id}.title`);
    const excerpt = t(`blog.data.${id}.excerpt`);
    const content = t(`blog.data.${id}.content`);
    const author = t(`blog.data.${id}.author`);
    const dateStr = t(`blog.data.${id}.publishedAt`); // ISO string expected
    const publishedAt = dateStr ? new Date(dateStr) : new Date();
    const readTimeRaw = t(`blog.data.${id}.readTime`);
    const readTime = typeof readTimeRaw === 'string' ? Number(readTimeRaw) : Number(readTimeRaw || 0);
    const tagsRaw = t(`blog.data.${id}.tags`);
    const tags: string[] = Array.isArray(tagsRaw)
      ? tagsRaw
      : (typeof tagsRaw === 'string' && tagsRaw.length > 0 ? tagsRaw.split('|').map(s => s.trim()) : []);
    const featuredRaw = t(`blog.data.${id}.featured`);
    const featured = featuredRaw === true || featuredRaw === 'true' || featuredRaw === 1;
    return {
      id,
      title,
      excerpt,
      content,
      image: meta.image,
      author,
      publishedAt,
      readTime,
      tags,
      featured
    };
  });

  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.slice(0, 3);

  // UI strings
  const sectionTitle = t('blog.title');
  const sectionSubtitle = t('blog.subtitle');
  const featuredLabel = t('blog.featured_label');
  const latestLabel = t('blog.latest');
  const allPostsLabel = t('blog.all_posts');
  const readMoreLabel = t('blog.read_more');
  const readTimeLabel = t('blog.read_time');
  const stayUpdatedTitle = t('blog.newsletter.title');
  const stayUpdatedDesc = t('blog.newsletter.description');
  const subscribeLabel = t('blog.newsletter.subscribe');
  const emailPlaceholder = t('blog.newsletter.email_placeholder');
  const noSpam = t('blog.newsletter.no_spam');

  return (
    <section id="blog" className="py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {sectionTitle}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            {sectionSubtitle}
          </p>
        </div>

        {/* Featured */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              {featuredLabel}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map(post => <FeaturedPostCard key={post.id} post={post} readMoreLabel={readMoreLabel} readTimeLabel={readTimeLabel} />)}
            </div>
          </div>
        )}

        {/* Recent */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {latestLabel}
            </h3>
            <Button
              variant="outline"
              className="border-border hover:bg-surface"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              {allPostsLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => <BlogPostCard key={post.id} post={post} readTimeLabel={readTimeLabel} />)}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16">
          <Card className="bg-surface border-border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                {stayUpdatedTitle}
              </h3>
              <p className="text-muted mb-8 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                {stayUpdatedDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={emailPlaceholder}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-bg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
                <Button className="bg-accent hover:bg-accent-2 text-bg font-semibold px-6 py-3 rounded-lg transition-all duration-300" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                  {subscribeLabel}
                </Button>
              </div>

              <p className="text-xs text-muted mt-4" style={{ color: 'var(--muted)' }}>
                {noSpam}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ----------------- FeaturedPostCard ----------------- */
function FeaturedPostCard({ post, readMoreLabel, readTimeLabel }: { post: BlogPost; readMoreLabel: string; readTimeLabel: string; }) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="relative">
        <ImageWithFallback src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />

        <div className="absolute top-4 left-4">
          <Badge className="bg-accent text-bg font-semibold" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
            { /* "Featured" localized in parent via translations, but we show generic */ }
            { /* If you want a localized label here, add t('blog.featured_label') in parent and pass it */ }
            Featured
          </Badge>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} {readTimeLabel}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>
            {post.title}
          </h3>

          <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-bg border-border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                {tag}
              </Badge>
            ))}
          </div>

          <Button variant="ghost" className="p-0 h-auto font-semibold text-accent hover:text-accent-2 group-hover:translate-x-1 transition-all" style={{ color: 'var(--accent)' }}>
            {readMoreLabel}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ----------------- BlogPostCard ----------------- */
function BlogPostCard({ post, readTimeLabel }: { post: BlogPost; readTimeLabel: string; }) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback src={post.image} alt={post.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} {readTimeLabel}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold group-hover:text-accent transition-colors line-clamp-2" style={{ color: 'var(--text)' }}>
            {post.title}
          </h3>

          <p className="text-sm text-muted leading-relaxed line-clamp-3" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-bg border-border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-bg border-border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted" style={{ color: 'var(--muted)' }}>
              {formatDate(post.publishedAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
