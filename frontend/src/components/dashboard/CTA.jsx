import { motion } from 'framer-motion';
import { Mic, Sparkles, Heart } from 'lucide-react';
import { Button } from '../../UI/button';

export function CTA({ onStartLearning }) {
  return (
    <section className="py-5 text-white" style={{background:'linear-gradient(90deg,#7c3aed,#ec4899)'}}>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
            <Heart className="text-white-50" />
            <Mic className="text-white" />
            <Sparkles className="text-white-50" />
          </div>

          <h2 className="mb-3 text-white">Ready to Learn Without Barriers?</h2>

          <p className="lead text-white-75 mb-4">
            Join thousands of learners who have found independence, confidence, and joy in education through voice-driven AI. Your journey starts with a simple conversation.
          </p>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" onClick={onStartLearning} className="btn btn-light text-primary px-4 py-2">
              <Mic className="me-2" />
              Start Learning Now - It's Free
            </Button>
          </motion.div>

          <p className="mt-3 text-white-75 small">No signup required • 100% voice-only • Works on any device</p>
        </motion.div>

        <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">
          {['🎤 Voice-Only','♿ Fully Accessible','🧠 AI-Powered','❤️ Empathetic','🌍 Works Offline'].map((badge, index) => (
            <motion.div key={badge} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="badge bg-white bg-opacity-25 text-white rounded-pill px-3 py-2 m-1">
              {badge}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
