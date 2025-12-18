import { motion } from 'framer-motion';
import { Mic, Brain, Volume1, Award } from 'lucide-react';

const steps = [
  {
    icon: Mic,
    step: '01',
    title: 'Speak Naturally',
    description: 'Just tap the microphone and speak. Ask questions, request lessons, or discuss topics—all hands-free.',
    gradient: 'linear-gradient(135deg, #9333ea, #ec4899)',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Understands',
    description: 'Google Gemini analyzes your voice, detects emotion and fatigue, then crafts personalized responses.',
    gradient: 'linear-gradient(135deg, #ec4899, #ef4444)',
  },
  {
    icon: Volume1,
    step: '03',
    title: 'Voice Responds',
    description: 'ElevenLabs delivers natural, empathetic speech—adapting tone and pace to match your needs.',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    icon: Award,
    step: '04',
    title: 'You Learn & Grow',
    description: 'Track progress, take voice quizzes, and build confidence—all through conversation.',
    gradient: 'linear-gradient(135deg, #f97316, #eab308)',
  },
];

export function HowItWorks() {
  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #fff7ed 100%)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="mb-4" style={{ color: '#111827', fontSize: '2.5rem', fontWeight: 'bold' }}>How It Works</h2>
          <p className="mx-auto" style={{ color: '#6b7280', maxWidth: '640px' }}>
            Four simple steps to accessible, personalized learning powered by AI
          </p>
        </motion.div>

        <div className="position-relative">
          {/* Connection line for desktop */}
          <div 
            className="d-none d-lg-block position-absolute top-50 start-0 end-0"
            style={{ 
              height: '4px',
              background: 'linear-gradient(90deg, #e9d5ff, #fce7f3, #fed7aa)',
              transform: 'translateY(-50%)',
              zIndex: 0
            }}
          />

          <div className="row g-4 position-relative" style={{ zIndex: 1 }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="col-12 col-md-6 col-lg-3"
                >
                  {/* Step card */}
                  <div className="bg-white rounded-4 p-4 shadow-lg position-relative" style={{ minHeight: '280px' }}>
                    {/* Step number badge */}
                    <div 
                      className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: step.gradient,
                        transform: 'translate(16px, -16px)'
                      }}
                    >
                      <span className="text-white fw-bold">{step.step}</span>
                    </div>

                    {/* Icon */}
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                      style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: step.gradient
                      }}
                    >
                      <Icon style={{ width: '32px', height: '32px', color: 'white' }} />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-center" style={{ color: '#111827', fontSize: '1.25rem', fontWeight: '600' }}>{step.title}</h3>
                    <p className="text-center small" style={{ color: '#6b7280', lineHeight: '1.6' }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Animated connector for mobile */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="d-lg-none mx-auto my-3"
                      style={{ 
                        width: '2px', 
                        height: '32px',
                        background: 'linear-gradient(180deg, #c084fc, #f472b6)'
                      }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
