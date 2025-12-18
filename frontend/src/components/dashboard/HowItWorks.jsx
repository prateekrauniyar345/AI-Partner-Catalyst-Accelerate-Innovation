import { motion } from 'framer-motion';
import { Mic, Brain, Volume1, Award } from 'lucide-react';

const steps = [
  {
    icon: Mic,
    step: '01',
    title: 'Speak Naturally',
    description: 'Just tap the microphone and speak. Ask questions, request lessons, or discuss topics—all hands-free.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Understands',
    description: 'Google Gemini analyzes your voice, detects emotion and fatigue, then crafts personalized responses.',
    color: 'from-pink-500 to-red-500',
  },
  {
    icon: Volume1,
    step: '03',
    title: 'Voice Responds',
    description: 'ElevenLabs delivers natural, empathetic speech—adapting tone and pace to match your needs.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Award,
    step: '04',
    title: 'You Learn & Grow',
    description: 'Track progress, take voice quizzes, and build confidence—all through conversation.',
    color: 'from-orange-500 to-yellow-500',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-gray-900">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to accessible, personalized learning powered by AI
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative"
                >
                  {/* Step card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10">
                    {/* Step number badge */}
                    <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-white">{step.step}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-center text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Animated connector for mobile */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="lg:hidden h-8 w-1 mx-auto my-4 bg-gradient-to-b from-purple-300 to-pink-300"
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
