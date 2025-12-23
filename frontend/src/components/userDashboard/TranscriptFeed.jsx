import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, Volume1, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../UI/button';
import { ScrollArea } from '../../UI/scroll-area';

export function TranscriptFeed({ isCollapsed = false, onToggleCollapse }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your VoiceEd Ally tutor. I'm here to help you learn at your own pace. What would you like to explore today?",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '2',
      role: 'user',
      content: "I'd like to learn about the solar system.",
      timestamp: new Date(Date.now() - 90000),
    },
    {
      id: '3',
      role: 'assistant',
      content: "Wonderful choice! The solar system is fascinating. Let's start with the basics. Our solar system consists of the Sun and everything that orbits around it, including eight planets, moons, asteroids, and comets. Would you like to learn about the planets first?",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const [currentlySpeaking, setCurrentlySpeaking] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Announce to screen reader
    const announcement = document.createElement('div');
    announcement.className = 'visually-hidden';
    announcement.setAttribute('role', 'status');
    announcement.textContent = 'Message copied to clipboard';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const handleReplay = (messageId) => {
    setCurrentlySpeaking(messageId);
    // In production, trigger TTS here
    setTimeout(() => setCurrentlySpeaking(null), 3000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (isCollapsed) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded border p-3">
        <button onClick={onToggleCollapse} className="btn btn-light w-100 d-flex justify-content-between align-items-center" aria-label="Expand conversation history">
          <span className="fw-medium">Conversation History</span>
          <ChevronUp />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded border shadow-sm d-flex flex-column h-100">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <Sparkles className="text-primary" />
          <h3 className="mb-0">Conversation</h3>
          <span className="small text-muted">({messages.length} messages)</span>
        </div>
        <button onClick={onToggleCollapse} className="btn btn-light p-2" aria-label="Collapse conversation history"><ChevronDown /></button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-fill p-3">
        <div role="log" aria-live="polite" aria-label="Conversation history">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`d-flex gap-3 ${message.role==='user'?'flex-row-reverse':'flex-row'}`}>
                {/* Avatar */}
                <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`} style={{width:40,height:40, background: message.role==='user'?'linear-gradient(90deg,#06b6d4,#3b82f6)':'linear-gradient(90deg,#7c3aed,#ec4899)'}} aria-hidden>
                  {message.role === 'user' ? <User className="text-white" /> : <Sparkles className="text-white" />}
                </div>

                {/* Message content */}
                <div className={`flex-grow-1`} style={{maxWidth:'80%'}}>
                  <div className={`rounded-3 p-3 position-relative`} style={{background: message.role==='user'?'#0d6efd':'#f8f9fa', color: message.role==='user'?'#fff':'#212529'}}>
                    <p className="mb-1 small" style={{lineHeight:1.4}}>{message.content}</p>
                    {currentlySpeaking === message.id && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="position-absolute" style={{top:-10,right:-10, background:'#198754', color:'#fff', padding:'4px 8px', borderRadius:999}}> <Volume1 style={{width:14,height:14}}/> Playing</motion.div>
                    )}
                  </div>

                  {/* Timestamp and actions */}
                  <div className={`d-flex align-items-center gap-2 mt-2 ${message.role==='user'?'flex-row-reverse':''}`}>
                    <span className="small text-muted" aria-label={`Message sent at ${formatTime(message.timestamp)}`}>{formatTime(message.timestamp)}</span>
                    <div className="d-flex align-items-center gap-1">
                      {message.role === 'assistant' && (
                        <button onClick={() => handleReplay(message.id)} className="btn btn-sm btn-light p-1" aria-label="Replay this message" title="Replay"><Volume1 style={{width:14,height:14}}/></button>
                      )}
                      <button onClick={() => handleCopy(message.content)} className="btn btn-sm btn-light p-1" aria-label="Copy message to clipboard" title="Copy"><Copy style={{width:14,height:14}}/></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Footer with quick actions */}
      <div className="p-3 border-top bg-light">
        <div className="d-flex align-items-center gap-2 small text-muted">
          <span className="d-flex align-items-center gap-1"><span className="rounded-circle" style={{width:8,height:8,background:'#198754'}}/> Live transcript</span>
          <span>•</span>
          <Button variant="ghost" size="sm" className="py-1 px-2" onClick={() => { setMessages([]); const announcement = document.createElement('div'); announcement.className='visually-hidden'; announcement.setAttribute('role','status'); announcement.textContent='Conversation history cleared'; document.body.appendChild(announcement); setTimeout(()=>document.body.removeChild(announcement),1000); }}>Clear history</Button>
        </div>
      </div>
    </motion.div>
  );
}
