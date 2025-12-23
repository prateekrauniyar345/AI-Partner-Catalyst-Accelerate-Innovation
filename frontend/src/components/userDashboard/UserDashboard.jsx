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

export default function UserDashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTranscriptCollapsed, setIsTranscriptCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  const userName = 'Alex';
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(90deg,#f3e8ff,#ffe4f6)' }}>
      {/* Top Status Bar - Fixed */}
      <header className="position-fixed top-0 start-0 end-0 bg-white bg-opacity-90 border-bottom shadow-sm" style={{backdropFilter: 'blur(6px)', zIndex: 1040}}>
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center justify-content-between" style={{height: '64px'}}>
            {/* Left: Logo & User */}
            <div className="d-flex align-items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="d-lg-none btn p-2 text-secondary"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>

              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{width:40,height:40, background: 'linear-gradient(90deg,#7c3aed,#ec4899)'}}>
                  <User className="text-white" />
                </div>
                <div className="d-none d-sm-block">
                  <h2 className="h6 mb-0">Welcome back, {userName}!</h2>
                  <p className="small text-muted mb-0">{currentTime}</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="d-flex align-items-center gap-2">
              {/* Network status */}
              <div className="d-none d-md-flex align-items-center gap-2 px-2 py-1 rounded-pill bg-success bg-opacity-10 text-success small">
                <span className="rounded-circle" style={{width:8,height:8, background:'#28a745'}} />
                <span>Online</span>
              </div>

              <Button variant="ghost" size="sm" className="position-relative" aria-label="Notifications">
                <Bell />
                <span className="position-absolute top-0 end-0 translate-middle p-1 bg-danger rounded-circle" />
              </Button>

              <Button variant="ghost" size="sm" aria-label="Help"><HelpCircle /></Button>
              <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(true)} aria-label="Settings"><Settings /></Button>
              <Button variant="ghost" size="sm" className="text-danger" aria-label="Sign out"><LogOut /></Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="d-lg-none border-top bg-white">
              <div className="px-3 py-2">
                <button onClick={() => { setActiveTab('learn'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 ${activeTab==='learn'?'btn-primary':'btn-light'}`}>Voice Learning</button>
                <button onClick={() => { setActiveTab('progress'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 ${activeTab==='progress'?'btn-primary':'btn-light'}`}>My Progress</button>
                <button onClick={() => { setActiveTab('lessons'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 ${activeTab==='lessons'?'btn-primary':'btn-light'}`}>Lesson Plans</button>
                <button onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} className={`btn w-100 text-start mb-2 ${activeTab==='projects'?'btn-primary':'btn-light'}`}>Projects</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content - with top padding for fixed header */}
      <main className="pt-5 px-3 pb-4" style={{paddingTop: '88px'}}>
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