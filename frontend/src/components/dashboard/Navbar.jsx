import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Menu, X, Accessibility } from 'lucide-react';
import { Button } from '../../UI/button';

export default function Navbar({ onStartLearning }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Impact', href: '#impact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar navbar-expand-md fixed-top bg-white border-bottom"
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between" style={{ height: '64px' }}>
          {/* Logo */}
          <div className="d-flex align-items-center">
            <div className="rounded-lg d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}>
              <Mic className="text-white" />
            </div>
            <span className="ms-2 h5 mb-0">VoiceEd Ally</span>
          </div>

          {/* Desktop Navigation */}
          <div className="d-none d-md-flex align-items-center gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-secondary text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
            <Button variant="ghost" size="sm" className="btn-link text-secondary" aria-label="Accessibility features">
              <Accessibility />
            </Button>
            <Button onClick={onStartLearning} className="btn text-white" style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)' }}>
              <Mic className="me-2" />
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="d-md-none btn btn-sm btn-outline-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="d-md-none border-top bg-white"
          >
            <div className="p-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="d-block text-secondary py-2 text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2">
                <Button
                  onClick={() => {
                    onStartLearning();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-100 text-white"
                  style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)' }}
                >
                  <Mic className="me-2" />
                  Start Learning
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
