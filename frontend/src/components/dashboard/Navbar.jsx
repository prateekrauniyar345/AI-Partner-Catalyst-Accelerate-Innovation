import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Menu, X, Accessibility } from 'lucide-react';
import { Button } from '../../UI/button';

export default function Navbar({ onStartLearning }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


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
      className="navbar navbar-expand-lg fixed-top bg-white"
      style={{ borderBottom: '1px solid #e5e7eb' }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100" style={{ height: '64px' }}>
          {/* Logo - Left */}
          <div
            className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => window.location.href='/' }
          >
            <div className="rounded d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', borderRadius: '8px' }}>
              <Mic style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <span className="ms-2 h5 mb-0" style={{ color: '#374151', fontWeight: '600' }}>VoiceEd Ally</span>
          </div>

          {/* Navigation Links - Center */}
          <div className="d-none d-lg-flex align-items-center gap-4 position-absolute start-50 translate-middle-x">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-decoration-none"
                style={{ color: '#374151', fontSize: '0.95rem', fontWeight: '400' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="btn btn-link p-0 border-0 text-decoration-none"
              style={{ color: '#374151' }}
              aria-label="Accessibility features"
            >
              <Accessibility style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Action Buttons - Right */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {user ? (
              <>
                <div className="d-flex flex-column text-end me-2">
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151' }}>
                    {user.username || user.user_metadata?.username || user.name || ''}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{user.email}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  style={{ color: '#374151', fontSize: '0.95rem', fontWeight: '400' }}
                  onClick={() => {
                    try { localStorage.removeItem('user') } catch (e) {}
                    setUser(null)
                    navigate('/')
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  style={{ color: '#374151', fontSize: '0.95rem', fontWeight: '400' }}
                  onClick={(e) => { e.preventDefault(); navigate('/signin'); }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  style={{ color: '#374151', fontSize: '0.95rem', fontWeight: '400' }}
                  onClick={(e) => { e.preventDefault(); navigate('/signup'); }}
                >
                  Sign Up
                </button>
              </>
            )}
            <Button 
              onClick={onStartLearning} 
              className="btn text-white border-0 rounded" 
              style={{ 
                background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
                padding: '8px 16px',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              <Mic className="me-2" style={{ width: '16px', height: '16px' }} />
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="d-lg-none btn btn-sm btn-outline-secondary border-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: '#374151' }}
          >
            {isMobileMenuOpen ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
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
            className="d-lg-none border-top bg-white"
          >
            <div className="p-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="d-block py-2 text-decoration-none"
                  style={{ color: '#374151' }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-top d-flex flex-column gap-2">
                {user ? (
                  <>
                    <div className="px-2">
                      <div style={{ fontWeight: 600 }}>{user.username || user.name || ''}</div>
                      <div className="small text-muted">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => { setIsMobileMenuOpen(false); try { localStorage.removeItem('user') } catch (e) {} ; navigate('/'); }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/signin'); }}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
                <Button
                  onClick={() => {
                    onStartLearning();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-100 text-white border-0"
                  style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)' }}
                >
                  <Mic className="me-2" style={{ width: '16px', height: '16px' }} />
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
