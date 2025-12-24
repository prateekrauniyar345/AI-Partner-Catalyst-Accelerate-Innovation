import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Bell, HelpCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../../UI/button';
import { VoiceControl } from './VoiceControl';
import { TranscriptFeed } from './TranscriptFeed';
import { ActionStrip } from './ActionStrip';
import { ProgressTracker } from './ProgressTracker';
import { LessonPlanner } from './LessonPlanner';
import { ProjectPlanner } from './ProjectPlanner';
import { SettingsPanel } from './SettingsPanel';
import { QuickActionsGuide } from './QuickActionsGuide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../UI/tabs';
import { useUser } from '../../contexts/userContext'

export default function UserDashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTranscriptCollapsed, setIsTranscriptCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  const { user } = useUser()
  const displayName = user?.name || user?.full_name || (user?.email ? user.email.split('@')[0] : '');
  const userEmail = user?.email || ''

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(90deg,#f3e8ff,#ffe4f6)' }}>
      {/* Top Status Bar - Fixed */}
      <header className="position-fixed top-0 start-0 end-0 bg-white border-bottom shadow" style={{backdropFilter: 'blur(10px)', zIndex: 1040, borderColor: '#e5e7eb'}}>
        <div className="container-fluid px-3 px-md-4">
          <div className="d-flex align-items-center justify-content-between py-1" style={{minHeight: '70px'}}>
            {/* Left: Logo & User */}
            <div className="d-flex align-items-center gap-3 gap-md-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="d-lg-none btn btn-light p-2 rounded-lg"
                aria-label="Toggle menu"
                style={{width: 40, height: 40}}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width:48,height:48, background: 'linear-gradient(135deg,#7c3aed,#ec4899)', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'}}>
                  <User className="text-white" size={24} />
                </div>
                <div className="d-none d-sm-block">
                  <h2 className="h6 mb-1 fw-600">Welcome back, {displayName || 'there'}!</h2>
                  <p className="small text-muted mb-0" style={{fontSize: '0.8rem'}}>{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="d-flex align-items-center gap-2 gap-md-3">
              {/* Network status */}
              {/* <div className="d-none d-md-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-success bg-opacity-10 text-success small fw-500" style={{fontSize: '0.85rem', border: '1px solid rgba(40, 167, 69, 0.2)'}}>
                <span className="rounded-circle" style={{width:8,height:8, background:'#28a745', animation: 'pulse 2s infinite'}} />
                <span>Online</span>
              </div> */}

              <button 
                className="btn btn-light rounded-lg position-relative d-flex align-items-center justify-content-center"
                aria-label="Notifications"
                title="Notifications"
                style={{width: 45, height: 45}}
              >
                <Bell size={20} className="text-primary" />
                <span className="position-absolute top-0 end-0 translate-middle p-2 bg-danger rounded-circle" style={{width: 12, height: 12}} />
              </button>

              <button 
                className="btn btn-light rounded-lg d-flex align-items-center justify-content-center"
                aria-label="Help"
                title="Help"
                style={{width: 45, height: 45}}
              >
                <HelpCircle size={20} className="text-info" />
              </button>

              <button 
                className="btn btn-light rounded-lg d-flex align-items-center justify-content-center"
                onClick={() => setIsSettingsOpen(true)}
                aria-label="Settings"
                title="Settings"
                style={{width: 45, height: 45}}
              >
                <Settings size={20} className="text-primary" />
              </button>

              <div className="vr d-none d-md-block" style={{height: 24, opacity: 0.2}}></div>

              <button 
                className="btn btn-light rounded-lg d-flex align-items-center justify-content-center"
                aria-label="Sign out"
                title="Sign out"
                style={{width: 45, height: 45}}
              >
                <LogOut size={20} className="text-danger" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="d-lg-none border-top" style={{background: '#fafafa'}}>
              <div className="px-3 py-3">
                <button onClick={() => { setActiveTab('learn'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 rounded-lg ${activeTab==='learn'?'btn-primary text-white':'btn-light text-dark'}`} style={{fontSize: '0.95rem', fontWeight: activeTab==='learn'?'600':'500'}}>🎤 Voice Learning</button>
                <button onClick={() => { setActiveTab('progress'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 rounded-lg ${activeTab==='progress'?'btn-primary text-white':'btn-light text-dark'}`} style={{fontSize: '0.95rem', fontWeight: activeTab==='progress'?'600':'500'}}>📊 My Progress</button>
                <button onClick={() => { setActiveTab('lessons'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 rounded-lg ${activeTab==='lessons'?'btn-primary text-white':'btn-light text-dark'}`} style={{fontSize: '0.95rem', fontWeight: activeTab==='lessons'?'600':'500'}}>📚 Lesson Plans</button>
                <button onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 rounded-lg ${activeTab==='projects'?'btn-primary text-white':'btn-light text-dark'}`} style={{fontSize: '0.95rem', fontWeight: activeTab==='projects'?'600':'500'}}>🎯 Projects</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add pulse animation */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .rounded-lg {
            border-radius: 0.5rem;
            transition: all 0.2s ease;
          }
          .btn-light:hover {
            background-color: #f0f0f0 !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .btn-primary {
            transition: all 0.2s ease;
          }
          .fw-600 {
            font-weight: 600;
          }
          .fw-500 {
            font-weight: 500;
          }
        `}</style>
      </header>

      {/* Main Content - with top padding for fixed header */}
      <main className="pt-5 px-3 pb-4" style={{paddingTop: '100px'}}>
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-100 mt-3">
            {/* Desktop Tab Navigation */}
            <TabsList className="d-none d-lg-grid w-100" style={{gridTemplateColumns: 'repeat(4,1fr)', height: '56px', marginBottom: '1rem'}}>
              <TabsTrigger value="learn" className="text-base">🎤 Voice Learning</TabsTrigger>
              <TabsTrigger value="progress" className="text-base">📊 My Progress</TabsTrigger>
              <TabsTrigger value="lessons" className="text-base">📚 Lesson Plans</TabsTrigger>
              <TabsTrigger value="projects" className="text-base">🎯 Projects</TabsTrigger>
            </TabsList>

            {/* Learn Tab - Voice Interface */}
            <TabsContent value="learn" className="mb-4">
              <div className="row g-3">
                {/* Left column - Main voice control */}
                <div className="col-lg-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3 shadow p-4 border">
                    <VoiceControl />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3">
                    <ActionStrip />
                  </motion.div>
                </div>

                {/* Right column - Transcript Feed */}
                <div className="col-lg-4">
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{height:600}}>
                    <TranscriptFeed isCollapsed={isTranscriptCollapsed} onToggleCollapse={() => setIsTranscriptCollapsed(!isTranscriptCollapsed)} />
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <ProgressTracker />
              </motion.div>
            </TabsContent>

            {/* Lessons Tab */}
            <TabsContent value="lessons">
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
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="row g-3">
                <div className="col-lg-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <ProjectPlanner />
                  </motion.div>
                </div>

                <div className="col-lg-4">
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="d-flex flex-column gap-3">
                    <div className="rounded-3 p-3 text-white" style={{background: 'linear-gradient(90deg,#7c3aed,#ec4899)'}}>
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
            </TabsContent>
          </Tabs>
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