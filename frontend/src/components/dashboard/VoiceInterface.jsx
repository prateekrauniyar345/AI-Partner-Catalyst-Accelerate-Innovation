import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume1, X, Sparkles } from 'lucide-react';
import { Button } from '../../UI/button';

export function VoiceInterface({ onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Simulate AI processing
      setTimeout(() => {
        setAiResponse(
          "Great question! I'm here to help you learn. What subject would you like to explore today? I can teach you math, science, history, or even help with life skills."
        );
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1000);
    } else {
      setIsListening(true);
      setTranscript('');
      setAiResponse('');
      // Simulate speech recognition
      setTimeout(() => {
        setTranscript("Hello, I'd like to learn about photosynthesis.");
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4"
      style={{ 
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1050
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-100"
        style={{ maxWidth: '672px' }}
      >
        <div className="card border shadow-lg" style={{ borderWidth: '2px', borderColor: '#e9d5ff' }}>
          <div className="card-header border-bottom d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0 d-flex align-items-center gap-2">
              <Sparkles style={{ width: '20px', height: '20px', color: '#9333ea' }} />
              Voice Learning Session
            </h5>
            <Button variant="ghost" size="sm" onClick={onClose} className="btn btn-sm btn-link">
              <X style={{ width: '20px', height: '20px' }} />
            </Button>
          </div>

          <div className="card-body pt-4">
            {/* Microphone Visualizer */}
            <div className="d-flex flex-column align-items-center mb-4">
              <motion.div
                className="position-relative"
                animate={{
                  scale: isListening ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isListening ? Infinity : 0,
                }}
              >
                {/* Pulse rings when listening */}
                {isListening && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="position-absolute rounded-circle border"
                        style={{
                          width: '160px',
                          height: '160px',
                          borderWidth: '4px',
                          borderColor: '#c084fc',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{
                          scale: [1, 2, 3],
                          opacity: [0.5, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Main button */}
                <button
                  onClick={handleToggleListening}
                  className="position-relative rounded-circle border-0 shadow-lg d-flex align-items-center justify-content-center"
                  style={{
                    width: '160px',
                    height: '160px',
                    background: isListening 
                      ? 'linear-gradient(135deg, #ef4444, #ec4899)'
                      : 'linear-gradient(135deg, #9333ea, #ec4899)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isListening) {
                      e.target.style.background = 'linear-gradient(135deg, #7c3aed, #db2777)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isListening) {
                      e.target.style.background = 'linear-gradient(135deg, #9333ea, #ec4899)';
                    }
                  }}
                >
                  {isListening ? (
                    <MicOff style={{ width: '64px', height: '64px', color: 'white' }} />
                  ) : (
                    <Mic style={{ width: '64px', height: '64px', color: 'white' }} />
                  )}
                </button>

                {/* Status indicator */}
                {isSpeaking && (
                  <motion.div
                    className="position-absolute start-50 translate-middle-x bg-success text-white rounded-pill d-flex align-items-center gap-2"
                    style={{
                      bottom: '-8px',
                      padding: '4px 16px',
                      fontSize: '0.875rem',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Volume1 style={{ width: '16px', height: '16px' }} />
                    Speaking...
                  </motion.div>
                )}
              </motion.div>

              <p className="mt-4 text-center" style={{ color: '#6b7280' }}>
                {isListening
                  ? '🎤 Listening... Speak naturally'
                  : '👆 Tap the microphone to start learning'}
              </p>
            </div>

            {/* Transcript Display */}
            <AnimatePresence mode="wait">
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-3"
                >
                  <div className="rounded p-3" style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6' }}>
                    <div className="small mb-1" style={{ color: '#2563eb', fontSize: '0.75rem' }}>You said:</div>
                    <div style={{ color: '#1f2937' }}>{transcript}</div>
                  </div>
                </motion.div>
              )}

              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="rounded p-3" style={{ background: '#faf5ff', borderLeft: '4px solid #9333ea' }}>
                    <div className="small mb-1 d-flex align-items-center gap-1" style={{ color: '#9333ea', fontSize: '0.75rem' }}>
                      <Sparkles style={{ width: '12px', height: '12px' }} />
                      AI Tutor:
                    </div>
                    <div style={{ color: '#1f2937' }}>{aiResponse}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <div className="mt-4 pt-4 border-top">
              <p className="small text-center mb-0" style={{ color: '#6b7280' }}>
                This is a demo interface. In the full version, you'll interact with real ElevenLabs voice AI and Google Gemini for adaptive, empathetic learning.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
