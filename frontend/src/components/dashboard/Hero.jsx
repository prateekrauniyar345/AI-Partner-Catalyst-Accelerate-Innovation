import { motion } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';
import { Button } from '../../UI/button';
import { MicrophoneVisualizer } from './MicrophoneVisualizer';

export function Hero({ onStartLearning }) {
  return (
    <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden bg-light">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container py-5">
        <div className="row gx-5 align-items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-lg-start col-12 col-lg-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="d-inline-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill mb-3 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-900">Powered by ElevenLabs & Google Gemini</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4"
            >
              <span className="block text-gray-900">VoiceEd Ally</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Learning Without Barriers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-4 text-muted"
            >
              An inclusive, 100% voice-driven educational companion designed for people with physical disabilities, visual impairments, or anyone who benefits from hands-free interaction. Learn independently with adaptive AI tutoring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start"
            >
              <Button
                size="lg"
                onClick={onStartLearning}
                className="btn text-white"
                style={{background:'linear-gradient(90deg,#7c3aed,#ec4899)'}}
              >
                <Mic className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Learning Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline-secondary"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-4 row text-center"
            >
              <div className="col-4">
                <div className="text-primary">100%</div>
                <div className="small text-muted">Voice-Only</div>
              </div>
              <div className="col-4">
                <div className="text-primary">24/7</div>
                <div className="small text-muted">Available</div>
              </div>
              <div className="col-4">
                <div className="text-primary">AI</div>
                <div className="small text-muted">Adaptive</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Interactive Microphone Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="col-12 col-lg-6 d-flex align-items-center justify-content-center"
          >
            <MicrophoneVisualizer />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-purple-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
