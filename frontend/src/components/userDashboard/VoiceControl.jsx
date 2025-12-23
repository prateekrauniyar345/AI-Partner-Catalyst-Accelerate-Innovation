import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume1 } from "lucide-react";

export function VoiceControl({ onVoiceInput, isAlwaysListening = false }) {
  const [state, setState] = useState("idle");
  const [waveform, setWaveform] = useState([]);

  useEffect(() => {
    // Generate random waveform for visual feedback
    if (state === "listening" || state === "speaking") {
      const interval = setInterval(() => {
        setWaveform(
          Array.from({ length: 32 }, () => Math.random()),
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleToggle = () => {
    if (state === "idle") {
      setState("listening");
      // Play sound cue
      playSound("start");
      announceToScreen("Listening");

      // Simulate voice recognition
      setTimeout(() => {
        setState("processing");
        announceToScreen("Processing");
        setTimeout(() => {
          setState("speaking");
          announceToScreen("Responding");
          onVoiceInput?.("Sample voice input");
          setTimeout(() => {
            setState("idle");
          }, 3000);
        }, 1500);
      }, 3000);
    } else if (state === "listening") {
      setState("idle");
      playSound("stop");
      announceToScreen("Stopped listening");
    }
  };

  const playSound = (type) => {
    // Audio feedback - in production, use actual sound files
    const audio = new Audio();
    // Mock audio feedback
    console.log(`🔊 Sound: ${type}`);
  };

  const announceToScreen = (message) => {
    // For screen readers
    const announcement = document.getElementById(
      "voice-announcement",
    );
    if (announcement) {
      announcement.textContent = message;
    }
  };

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      {/* Screen reader announcements */}
      <div
        id="voice-announcement"
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* State indicator */}
      <AnimatePresence mode="wait">
        <motion.div
            key={state}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-3 py-2 rounded-pill bg-light"
          >
            <span className="small text-muted">
              {state === "idle" && "🎤 Ready to listen"}
              {state === "listening" && "👂 Listening..."}
              {state === "processing" && "🧠 Thinking..."}
              {state === "speaking" && "🔊 Speaking..."}
            </span>
          </motion.div>
      </AnimatePresence>

      {/* Main voice control */}
      <div className="relative">
        {/* Pulse rings */}
        {(state === "listening" || state === "speaking") && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="position-absolute rounded-circle border"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                style={{ width: "240px", height: "240px", borderWidth: 4, borderColor: state === 'listening' ? '#93c5fd' : '#86efac' }}
              />
            ))}
          </>
        )}

        {/* Waveform visualization */}
        {(state === "listening" || state === "speaking") && (
          <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center">
            {waveform.map((value, i) => {
              const angle = (i * 360) / waveform.length;
              const height = 20 + value * 40;
                      return (
                        <motion.div key={i} className="position-absolute rounded-pill" style={{left:'50%', top:'50%', transform:`rotate(${angle}deg) translateY(-120px)`, width:4, background: state==='listening'?'#0d6efd':'#198754', height}} />
                      );
                    })}
                  </div>
                )}

                {/* Main button */}
                <motion.button onClick={handleToggle} disabled={state === 'processing'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary rounded-circle d-flex flex-column align-items-center justify-content-center" style={{width:240,height:240}} aria-label={state==='idle'?'Start voice input':state==='listening'?'Stop listening':state==='processing'?'Processing your request':'AI is speaking'} aria-pressed={state==='listening'}>
                  {state === 'idle' && <Mic style={{width:64,height:64}} />}
                  {state === 'listening' && <MicOff style={{width:64,height:64}} />}
                  {state === 'processing' && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="rounded-circle border" style={{width:64,height:64,borderWidth:8,borderColor:'#fff',borderTopColor:'transparent'}} />
                  )}
                  {state === 'speaking' && <Volume1 style={{width:64,height:64}} />}

                  <span className="h5 mt-2 mb-0">
                    {state === 'idle' && 'Tap to Talk'}
                    {state === 'listening' && 'Listening...'}
                    {state === 'processing' && 'Thinking...'}
                    {state === 'speaking' && 'Speaking...'}
                  </span>
                </motion.button>

                {/* Status badge */}
                {state !== 'idle' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="position-absolute px-3 py-1 rounded-pill text-white shadow" style={{left:'50%', transform:'translateX(-50%)', bottom:-10, background: state==='listening'?'#0d6efd':state==='processing'?'#fd7e14':'#198754'}}>
                    {state === 'listening' && '🎤 Recording'}
                    {state === 'processing' && '⚡ Processing'}
                    {state === 'speaking' && '🔊 Playing'}
                  </motion.div>
                )}
      </div>

      {/* Mode toggle */}
      <button onClick={() => {}} className="btn btn-light d-flex align-items-center gap-2" aria-label="Toggle voice mode">
        <span>{isAlwaysListening ? '🔴 Always Listening' : '👆 Push to Talk'}</span>
      </button>

      {/* Quick help */}
      <div className="text-center small text-muted" style={{maxWidth: 520}}>
        <p>
          Say: "Start lesson", "Show progress", "Plan project",
          or ask any question
        </p>
      </div>
    </div>
  );
}