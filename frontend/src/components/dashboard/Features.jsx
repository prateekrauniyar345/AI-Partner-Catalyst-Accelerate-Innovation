import { motion } from 'framer-motion';
import { Accessibility, Brain, Heart, Globe, Volume1, Users, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Accessibility,
    title: 'True Accessibility',
    description: 'No typing, no mouse—100% voice interaction. Perfect for users with limited mobility, tremors, or visual impairments.',
    iconColor: '#9333ea',
    iconBg: '#f0f4ff',
  },
  {
    icon: Brain,
    title: 'AI-Powered Adaptation',
    description: 'Gemini AI detects sentiment and fatigue from your voice, automatically adjusting pace and offering breaks when needed.',
    iconColor: '#ec4899',
    iconBg: '#fdf2f8',
  },
  {
    icon: Heart,
    title: 'Empathetic Voice',
    description: 'ElevenLabs delivers natural, motivational voices that adapt tone (calm, energetic, supportive) to keep you engaged.',
    iconColor: '#ef4444',
    iconBg: '#fef2f2',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Adaptive curriculum that matches your pace. Learn academic subjects and practical life skills at your comfort level.',
    iconColor: '#3b82f6',
    iconBg: '#eff6ff',
  },
  {
    icon: Volume1,
    title: 'Voice Quizzes',
    description: 'Interactive assessments conducted entirely through conversation. Get instant feedback and personalized explanations.',
    iconColor: '#3b82f6',
    iconBg: '#eff6ff',
  },
  {
    icon: Users,
    title: 'Community Vault',
    description: 'Share and access anonymized tips from a supportive community of learners with similar needs and experiences.',
    iconColor: '#10b981',
    iconBg: '#f0fdf4',
  },
  {
    icon: Globe,
    title: 'Works Anywhere',
    description: 'Mobile-first PWA that works on any device. Install on your phone and use it offline when needed.',
    iconColor: '#10b981',
    iconBg: '#f0fdf4',
  },
  {
    icon: Sparkles,
    title: 'Visual Enrichment',
    description: 'Educational images and videos with spoken descriptions enhance learning while maintaining full accessibility.',
    iconColor: '#f97316',
    iconBg: '#fff7ed',
  },
];

export function Features() {
  return (
    <section id="features" className="py-5 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="mb-4" style={{ color: '#111827', fontSize: '2.5rem', fontWeight: 'bold' }}>
            Designed for <span style={{ 
              background: 'linear-gradient(90deg, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>True Inclusion</span>
          </h2>
          <p className="mx-auto" style={{ color: '#6b7280', maxWidth: '768px' }}>
            VoiceEd Ally combines cutting-edge AI technology with accessibility-first design to create an educational experience that truly works for everyone.
          </p>
        </motion.div>

        <div className="row g-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="col-12 col-md-6 col-lg-3"
              >
                <div className="card h-100 border rounded-3 shadow-sm">
                  <div className="card-body p-4">
                    <div 
                      className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '48px', height: '48px', background: feature.iconBg }}
                    >
                      <Icon style={{ width: '24px', height: '24px', color: feature.iconColor }} />
                    </div>
                    <h5 className="card-title h6 mb-3" style={{ color: '#111827' }}>{feature.title}</h5>
                    <p className="card-text text-muted small mb-0">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
