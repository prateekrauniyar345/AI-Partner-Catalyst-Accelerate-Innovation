import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, Volume1, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Button, Card } from 'react-bootstrap';
import { useConversation } from '@elevenlabs/react';

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
          <ChevronUp />
        </Button>
      </motion.div>
    );
  }

  return (
    <Card as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-100 d-flex flex-column">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Sparkles className="text-primary" />
          <h5 className="mb-0">Conversation</h5>
          <span className="small text-muted">({messages.length} messages)</span>
        </div>
        <Button onClick={onToggleCollapse} variant="light" size="sm" className="p-1" aria-label="Collapse conversation history"><ChevronDown /></Button>
      </Card.Header>

      <Card.Body ref={scrollAreaRef} style={{ overflowY: 'auto', flex: 1 }}>
        <div role="log" aria-live="polite" aria-label="Conversation history">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`d-flex gap-3 mb-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white ${message.role === 'user' ? 'bg-info' : 'bg-primary'}`}
                  style={{ width: 40, height: 40 }}
                  aria-hidden
                >
                  {message.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
                </div>

                <div className="w-100" style={{ maxWidth: '80%' }}>
                  <div className={`rounded-3 p-3 position-relative ${message.role === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                    <p className="mb-1 small" style={{ lineHeight: 1.4 }}>{message.content}</p>
                    {currentlySpeaking === message.id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="position-absolute top-0 end-0 m-1 badge bg-success">
                        <Volume1 size={14} /> Playing
                      </motion.div>
                    )}
                  </div>

                  <div className={`d-flex align-items-center gap-2 mt-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <span className="small text-muted" aria-label={`Message sent at ${formatTime(message.timestamp)}`}>{formatTime(message.timestamp)}</span>
                    <div className="d-flex align-items-center gap-1">
                      {message.role === 'assistant' && (
                        <Button onClick={() => handleReplay(message.id)} variant="light" size="sm" className="p-1" aria-label="Replay this message" title="Replay"><Volume1 size={14} /></Button>
                      )}
                      <Button onClick={() => handleCopy(message.content)} variant="light" size="sm" className="p-1" aria-label="Copy message to clipboard" title="Copy"><Copy size={14} /></Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card.Body>

      <Card.Footer className="bg-light">
        <div className="d-flex align-items-center gap-2 small text-muted">
          <span className="d-flex align-items-center gap-1"><span className="badge bg-success rounded-pill p-1 me-1" /> Live transcript</span>
          <span>•</span>
          <Button variant="link" size="sm" className="py-0 px-1 text-muted" onClick={() => { setMessages([]); const announcement = document.createElement('div'); announcement.className='visually-hidden'; announcement.setAttribute('role','status'); announcement.textContent='Conversation history cleared'; document.body.appendChild(announcement); setTimeout(()=>document.body.removeChild(announcement),1000); }}>Clear history</Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
