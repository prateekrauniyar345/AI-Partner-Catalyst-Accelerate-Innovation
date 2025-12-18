import { motion } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';
import { Button } from '../../UI/button';
import { MicrophoneVisualizer } from './MicrophoneVisualizer';

export function Hero({ onStartLearning }) {
  return (
    <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #fff0f5 100%)' }}>
      {/* Animated background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          className="position-absolute rounded-circle"
          style={{
            width: '288px',
            height: '288px',
            background: 'rgba(112, 19, 198, 0.2)',
            // background: 'rgba(82, 102, 31, 0.2)',
            top: '80px',
            left: '40px',
            filter: 'blur(80px)',
            mixBlendMode: 'multiply',
          }}
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
          className="position-absolute rounded-circle"
          style={{
            width: '288px',
            height: '288px',
            background: 'rgba(99, 102, 241, 0.2)',
            bottom: '80px',
            right: '40px',
            filter: 'blur(80px)',
            mixBlendMode: 'multiply',
          }}
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

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
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
              <Sparkles style={{ width: '16px', height: '16px', color: '#9333ea' }} />
              <span className="small" style={{ color: '#581c87' }}>Powered by ElevenLabs & Google Gemini</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4"
              style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1.2' }}
            >
              <span className="d-block" style={{ color: '#111827' }}>VoiceEd Ally</span>
              <span className="d-block" style={{ 
                background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Learning Without Barriers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-4 text-muted lead"
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
                className="btn text-white border-0"
                style={{background:'linear-gradient(90deg,#7c3aed,#ec4899)'}}
              >
                <Mic className="me-2" style={{ width: '20px', height: '20px' }} />
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
              className="mt-5 row text-center"
            >
              <div className="col-4">
                <div className="h4 mb-0" style={{ color: '#7c3aed' }}>100%</div>
                <div className="small text-muted">Voice-Only</div>
              </div>
              <div className="col-4">
                <div className="h4 mb-0" style={{ color: '#7c3aed' }}>24/7</div>
                <div className="small text-muted">Available</div>
              </div>
              <div className="col-4">
                <div className="h4 mb-0" style={{ color: '#7c3aed' }}>AI</div>
                <div className="small text-muted">Adaptive</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Interactive Microphone Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
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
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ zIndex: 1 }}
      >
        <div className="d-flex align-items-start justify-content-center" style={{ width: '24px', height: '40px', border: '2px solid #a855f7', borderRadius: '9999px', padding: '8px' }}>
          <motion.div
            className="rounded-pill"
            style={{ width: '4px', height: '8px', background: '#a855f7' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
