import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from 'react-bootstrap';
import { useVoiceAgent } from '../../contexts/VoiceAgentContext';

export function TranscriptFeed({ isCollapsed = false, onToggleCollapse }) {
  const { messages, clearMessages } = useVoiceAgent();
  const [currentlySpeaking, setCurrentlySpeaking] = useState(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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

  const isUserMessage = (m) => {
    if (!m) return false;
    const src = (m.source || m.role || '').toString().toLowerCase();
    return src === 'user' || src === 'human' || src === 'you';
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button onClick={onToggleCollapse} variant="light" className="w-100 d-flex justify-content-between align-items-center" aria-label="Expand conversation history">
          <span className="fw-semibold">Conversation History</span>
          <span>Expand</span>
        </Button>
      </motion.div>
    );
  }

  return (
    <Card as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-100 d-flex flex-column">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0">Conversation</h5>
          <span className="small text-muted">({messages.length} messages)</span>
        </div>
        <Button onClick={onToggleCollapse} variant="light" size="sm" className="p-1" aria-label="Collapse conversation history"><span>Collapse</span></Button>
      </Card.Header>

      <Card.Body ref={scrollAreaRef} style={{ overflowY: 'auto', flex: 1 }}>
        <div role="log" aria-live="polite" aria-label="Conversation history">
          <AnimatePresence>
            {messages.map((message) => {
              const isUser = isUserMessage(message);
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`d-flex gap-3 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 40, height: 40 }} aria-hidden>
                    {isUser ? (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0ea5a4' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <circle cx="12" cy="8" r="3.2" fill="white" />
                          <path d="M4 20c0-3.3 4.3-5 8-5s8 1.7 8 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg,#7c3aed,#ec4899)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M12 1.75a3.5 3.5 0 0 0-3.5 3.5v5.5a3.5 3.5 0 1 0 7 0V5.25A3.5 3.5 0 0 0 12 1.75z" fill="white" />
                          <path d="M19 11.25a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6.5 6.97V21a1 1 0 0 0 2 0v-2.78A7 7 0 0 0 19 11.25z" fill="white" opacity="0.95" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="w-100" style={{ maxWidth: '80%' }}>
                    <div className={`rounded-3 p-3 position-relative ${isUser ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                      <p className="mb-1 small" style={{ lineHeight: 1.4 }}>{message.content}</p>
                      {currentlySpeaking === message.id && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="position-absolute top-0 end-0 m-1 badge bg-success">
                          <span>Playing</span>
                        </motion.div>
                      )}
                    </div>

                    <div className={`d-flex align-items-center gap-2 mt-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                      <span className="small text-muted" aria-label={`Message sent at ${formatTime(message.timestamp)}`}>{formatTime(new Date(message.timestamp))}</span>
                      <div className="d-flex align-items-center gap-1">
                        <Button onClick={() => handleCopy(message.content)} variant="light" size="sm" className="p-1" aria-label="Copy message to clipboard" title="Copy">Copy</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Card.Body>

      <Card.Footer className="bg-light">
        <div className="d-flex align-items-center gap-2 small text-muted">
          <span className="d-flex align-items-center gap-1"><span className="badge bg-success rounded-pill p-1 me-1" /> Live transcript</span>
          <span>•</span>
          <Button variant="link" size="sm" className="py-0 px-1 text-muted" onClick={() => { clearMessages(); const announcement = document.createElement('div'); announcement.className='visually-hidden'; announcement.setAttribute('role','status'); announcement.textContent='Conversation history cleared'; document.body.appendChild(announcement); setTimeout(()=>document.body.removeChild(announcement),1000); }}>Clear history</Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
