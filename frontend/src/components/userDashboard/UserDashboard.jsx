import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Bell, HelpCircle, LogOut, Menu, X } from 'lucide-react';
import { Button, Nav } from 'react-bootstrap';
import { VoiceControl } from './VoiceControl';
import { TranscriptFeed } from './TranscriptFeed';
import { ActionStrip } from './ActionStrip';
import { ProgressTracker } from './ProgressTracker';
import { LessonPlanner } from './LessonPlanner';
import { ProjectPlanner } from './ProjectPlanner';
import { SettingsPanel } from './SettingsPanel';
import { QuickActionsGuide } from './QuickActionsGuide';
import { useUser } from '../../contexts/userContext';

export default function UserDashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTranscriptCollapsed, setIsTranscriptCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  const { user } = useUser();
  const displayName = user?.name || user?.full_name || (user?.email ? user.email.split('@')[0] : '');
  const userEmail = user?.email || '';

  const handleTabSelect = (k) => {
    setActiveTab(k);
    setIsMobileMenuOpen(false);
  };

  // current navigation system
  const navOptions = {
    "learn": "Voice Learning",
    "progress": "My Progress",
    "lessons": "Lesson Plans",
    "projects": "Projects",
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f7fafc' }}>
      {/* Top Status Bar - Fixed */}
      <header className="position-fixed top-0 start-0 end-0 bg-white border-bottom shadow-sm" style={{ zIndex: 1040 }}>
        <div className="container-fluid px-3 px-md-4">
          <div className="d-flex align-items-center justify-content-between py-1" style={{ minHeight: '70px' }}>
            {/* Left: Logo & User */}
            <div className="d-flex align-items-center gap-3 gap-md-4">
              <Button
                variant="light"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="d-lg-none p-2 rounded-3"
                aria-label="Toggle menu"
                style={{ width: 40, height: 40 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>

              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    background: '#e9ecef',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <User className="text-dark" size={24} />
                </div>
                <div className="d-none d-sm-block">
                  <h2 className="h6 mb-1 fw-semibold">Welcome back, {displayName || 'there'}!</h2>
                  <p className="small text-muted mb-0">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="d-flex align-items-center gap-2 gap-md-3">
              <Button variant="light" className="rounded-3 position-relative p-0" aria-label="Notifications" title="Notifications" style={{ width: 45, height: 45 }}>
                <Bell size={20} className="text-primary" />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
              </Button>

              <Button variant="light" className="rounded-3 p-0" aria-label="Help" title="Help" style={{ width: 45, height: 45 }}>
                <HelpCircle size={20} className="text-info" />
              </Button>

              <Button variant="light" className="rounded-3 p-0" onClick={() => setIsSettingsOpen(true)} aria-label="Settings" title="Settings" style={{ width: 45, height: 45 }}>
                <Settings size={20} className="text-primary" />
              </Button>

              <div className="vr d-none d-md-block" />

              <Button variant="light" className="rounded-3 p-0" aria-label="Sign out" title="Sign out" style={{ width: 45, height: 45 }}>
                <LogOut size={20} className="text-danger" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="d-lg-none border-top bg-white"
            >
              <Nav variant="pills" activeKey={activeTab} onSelect={handleTabSelect} className="flex-column p-3">
                <Nav.Item>
                  <Nav.Link
                    eventKey="learn"
                    style={{
                      backgroundColor: activeTab === 'learn' ? '#f3f4f6' : 'transparent',
                      color: '#000',
                      fontWeight: activeTab === 'learn' ? 700 : 500,
                      borderRadius: 8,
                      padding: '8px 12px',
                      marginBottom: 8,
                    }}
                  >
                    Voice Learning
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="progress"
                    style={{
                      backgroundColor: activeTab === 'progress' ? '#f3f4f6' : 'transparent',
                      color: '#000',
                      fontWeight: activeTab === 'progress' ? 700 : 500,
                      borderRadius: 8,
                      padding: '8px 12px',
                      marginBottom: 8,
                    }}
                  >
                    My Progress
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="lessons"
                    style={{
                      backgroundColor: activeTab === 'lessons' ? '#f3f4f6' : 'transparent',
                      color: '#000',
                      fontWeight: activeTab === 'lessons' ? 700 : 500,
                      borderRadius: 8,
                      padding: '8px 12px',
                      marginBottom: 8,
                    }}
                  >
                    Lesson Plans
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="projects"
                    style={{
                      backgroundColor: activeTab === 'projects' ? '#f3f4f6' : 'transparent',
                      color: '#000',
                      fontWeight: activeTab === 'projects' ? 700 : 500,
                      borderRadius: 8,
                      padding: '8px 12px',
                      marginBottom: 8,
                    }}
                  >
                    Projects
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content - with top padding for fixed header */}
      <main className="pt-5 px-3 pb-4" style={{ paddingTop: '100px' }}>
        <div className="container">
          {/* Desktop nav + content (minimal, rounded, neutral) */}
          <div className="d-none d-lg-block mt-3">
            <div style={{ display: 'flex', gap: 8, backgroundColor: '#ffffff', padding: 6, borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              
              { navOptions && Object.entries(navOptions).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleTabSelect(key)}
                  style={{ padding: '8px 14px', borderRadius: 10, border: 'none', backgroundColor: activeTab === key ? '#f3f4f6' : 'transparent', color: '#000', fontWeight: activeTab === key ? 700 : 500 }}
                  className="btn"
                >
                  { label } 
                </button>
              ))}
            </div>

            <div className="mt-3">
              {activeTab === 'learn' && (
                <div className="row g-3">
                  <div className="col-lg-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3 shadow-sm p-4 border">
                      <VoiceControl />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3">
                      <ActionStrip />
                    </motion.div>
                  </div>
                  <div className="col-lg-4">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ height: 600 }}>
                      <TranscriptFeed isCollapsed={isTranscriptCollapsed} onToggleCollapse={() => setIsTranscriptCollapsed(!isTranscriptCollapsed)} />
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <ProgressTracker />
                </motion.div>
              )}

              {activeTab === 'lessons' && (
                <div className="row g-3">
                  <div className="col-lg-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                      <LessonPlanner />
                    </motion.div>
                  </div>
                  <div className="col-lg-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded border p-3">
                      <h3 className="fw-semibold mb-3">Quick Actions</h3>
                      <QuickActionsGuide />
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="row g-3">
                  <div className="col-lg-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <ProjectPlanner />
                    </motion.div>
                  </div>
                  <div className="col-lg-4">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="d-flex flex-column gap-3">
                      <div className="rounded-3 p-3" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', color: '#000' }}>
                        <h3 className="fw-semibold mb-2">💡 Voice Tip</h3>
                        <p className="small">Say "Mark task complete" followed by the task name to check it off your list hands-free!</p>
                      </div>
                      <div className="bg-white rounded border p-3 text-center">
                        <div className="display-4 mb-2">🏆</div>
                        <h3 className="fw-semibold mb-2">Keep Going!</h3>
                        <p className="small text-muted">You're making great progress on your projects. Stay focused and you'll achieve your goals!</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content for mobile view (driven by the same state) */}
          <div className="d-lg-none mt-3">
            {activeTab === 'learn' && (
              <div className="row g-3">
              <div className="col-lg-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3 shadow-sm p-4 border">
                  <VoiceControl />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3">
                  <ActionStrip />
                </motion.div>
              </div>
              <div className="col-lg-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ height: 600 }}>
                  <TranscriptFeed isCollapsed={isTranscriptCollapsed} onToggleCollapse={() => setIsTranscriptCollapsed(!isTranscriptCollapsed)} />
                </motion.div>
              </div>
            </div>
            )}
            {activeTab === 'progress' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <ProgressTracker />
              </motion.div>
            )}
            {activeTab === 'lessons' && (
               <div className="row g-3">
               <div className="col-lg-6">
                 <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                   <LessonPlanner />
                 </motion.div>
               </div>
               <div className="col-lg-6">
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded border p-3">
                   <h3 className="fw-semibold mb-3">Quick Actions</h3>
                   <QuickActionsGuide />
                 </motion.div>
               </div>
             </div>
            )}
            {activeTab === 'projects' && (
              <div className="row g-3">
              <div className="col-lg-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <ProjectPlanner />
                </motion.div>
              </div>
              <div className="col-lg-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="d-flex flex-column gap-3">
                  <div className="rounded-3 p-3" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', color: '#000' }}>
                    <h3 className="fw-semibold mb-2">💡 Voice Tip</h3>
                    <p className="small">Say "Mark task complete" followed by the task name to check it off your list hands-free!</p>
                  </div>
                  <div className="bg-white rounded border p-3 text-center">
                    <div className="display-4 mb-2">🏆</div>
                    <h3 className="fw-semibold mb-2">Keep Going!</h3>
                    <p className="small text-muted">You're making great progress on your projects. Stay focused and you'll achieve your goals!</p>
                  </div>
                </motion.div>
              </div>
            </div>
            )}
          </div>
        </div>
      </main>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Screen reader live region for global announcements */}
      <div id="global-announcements" className="visually-hidden" role="status" aria-live="polite" aria-atomic="true" />
    </div>
  );
}