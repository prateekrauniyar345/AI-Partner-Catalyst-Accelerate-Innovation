import { motion } from 'framer-motion';
import { Accessibility, Brain, Heart, Globe, Volume1, Users, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../UI/card';

const features = [
  {
    icon: Accessibility,
    title: 'True Accessibility',
    description: 'No typing, no mouse—100% voice interaction. Perfect for users with limited mobility, tremors, or visual impairments.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Brain,
    title: 'AI-Powered Adaptation',
    description: 'Gemini AI detects sentiment and fatigue from your voice, automatically adjusting pace and offering breaks when needed.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    icon: Heart,
    title: 'Empathetic Voice',
    description: 'ElevenLabs delivers natural, motivational voices that adapt tone (calm, energetic, supportive) to keep you engaged.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Adaptive curriculum that matches your pace. Learn academic subjects and practical life skills at your comfort level.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    icon: Volume1,
    title: 'Voice Quizzes',
    description: 'Interactive assessments conducted entirely through conversation. Get instant feedback and personalized explanations.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Users,
    title: 'Community Vault',
    description: 'Share and access anonymized tips from a supportive community of learners with similar needs and experiences.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Globe,
    title: 'Works Anywhere',
    description: 'Mobile-first PWA that works on any device. Install on your phone and use it offline when needed.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    icon: Sparkles,
    title: 'Visual Enrichment',
    description: 'Educational images and videos with spoken descriptions enhance learning while maintaining full accessibility.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
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
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-gray-900">
            Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">True Inclusion</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
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
              >
                <div className="col-12 col-md-6 col-lg-3">
                  <Card className="h-100 border rounded-3 shadow-sm p-3">
                    <CardHeader>
                      <div className={`rounded-3 d-inline-flex align-items-center justify-content-center mb-3`} style={{width:48,height:48,background:'#f0f4ff'}}>
                        <Icon className={`text-primary`} />
                      </div>
                      <CardTitle className="h6">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
