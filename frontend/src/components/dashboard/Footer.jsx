import { motion } from 'framer-motion';
import { Heart, Github, Mic } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Accessibility', href: '#accessibility' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Community', href: '#' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Accessibility Statement', href: '#' },
    ],
  };

  return (
    <footer className="bg-dark text-light">
      <div className="container py-5">
        {/* Main footer content */}
        <div className="row g-4 mb-4">
          {/* Brand column */}
          <div className="col-12 col-lg-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="d-flex align-items-center gap-2 mb-3">
              <div className="rounded d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}>
                <Mic style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <span className="h5 mb-0 text-white">VoiceEd Ally</span>
            </motion.div>
            <p className="small text-white mb-3">
              An inclusive, voice-driven educational companion empowering people with disabilities to learn independently through AI-powered adaptive tutoring.
            </p>
            <div className="d-flex align-items-center gap-2 small text-white">
              <span>Built for</span>
              <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-info">
                Google Cloud AI Hackathon
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="col-6 col-md-4">
            <h6 className="text-white mb-3">Product</h6>
            <ul className="list-unstyled">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="d-block text-white text-decoration-none mb-2">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="text-white mb-3">Resources</h6>
            <ul className="list-unstyled">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="d-block text-white text-decoration-none mb-2">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="text-white mb-3">Legal</h6>
            <ul className="list-unstyled">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="d-block text-white text-decoration-none mb-2">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-top pt-3 mt-4 border-secondary">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-2 small text-white">
              <span>© {currentYear} VoiceEd Ally. Made with</span>
              <Heart style={{ width: '16px', height: '16px', color: '#dc3545' }} />
              <span>for accessibility</span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none" aria-label="GitHub">
                <Github style={{ width: '20px', height: '20px' }} />
              </a>
              <div className="d-flex align-items-center gap-2 small text-white">
                <span>Powered by</span>
                <span className="text-info">ElevenLabs</span>
                <span>&</span>
                <span className="text-danger">Google Gemini</span>
              </div>
            </div>
          </div>

          {/* SDG badge */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-3 text-center">
            <div className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2" style={{ background: 'linear-gradient(90deg, rgba(55,0,179,0.12), rgba(236,72,153,0.12))', border: '1px solid rgba(124,58,237,0.12)' }}>
              <span className="small text-white">Supporting UN SDG 4: Quality Education</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
