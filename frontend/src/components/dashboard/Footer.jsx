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
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-white">VoiceEd Ally</span>
            </motion.div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              An inclusive, voice-driven educational companion empowering people with disabilities to learn independently through AI-powered adaptive tutoring.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Built for</span>
              <a
                href="https://cloud.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Google Cloud AI Hackathon
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} VoiceEd Ally. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for accessibility</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Powered by</span>
                <span className="text-purple-400">ElevenLabs</span>
                <span>&</span>
                <span className="text-pink-400">Google Gemini</span>
              </div>
            </div>
          </div>

          {/* SDG badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-full px-4 py-2">
              <span className="text-sm text-gray-300">Supporting UN SDG 4: Quality Education</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
