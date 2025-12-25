import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume1 } from "lucide-react";
import { Button } from "react-bootstrap";

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
      playSound("start");
      announceToScreen("Listening");

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
    // Mock audio feedback
    console.log(`🔊 Sound: ${type}`);
  };

  const announceToScreen = (message) => {
    const announcement = document.getElementById("voice-announcement");
    if (announcement) {
      announcement.textContent = message;
    }
  };

  const stateConfig = {
    idle: {
      label: "🎤 Ready to listen",
      buttonText: "Tap to Talk",
      buttonIcon: Mic,
      pulseColor: "",
      waveColor: "",
    },
    listening: {
      label: "👂 Listening...",
      buttonText: "Listening...",
      buttonIcon: MicOff,
      pulseColor: "#93c5fd",
      waveColor: "#0d6efd",
    },
    processing: {
      label: "🧠 Thinking...",
      buttonText: "Thinking...",
      buttonIcon: null, // Spinner will be shown
    },
    speaking: {
      label: "🔊 Speaking...",
      buttonText: "Speaking...",
      buttonIcon: Volume1,
      pulseColor: "#86efac",
      waveColor: "#198754",
    },
  };

  const currentConfig = stateConfig[state];

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div id="voice-announcement" className="visually-hidden" role="status" aria-live="polite" aria-atomic="true" />

      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="px-3 py-2 rounded-pill bg-light"
        >
          <span className="small text-muted">{currentConfig.label}</span>
        </motion.div>
      </AnimatePresence>

      <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: 240, height: 240 }}>
        {(state === "listening" || state === "speaking") && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="position-absolute rounded-circle border"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 2, 3], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                style={{ width: "100%", height: "100%", borderWidth: 4, borderColor: currentConfig.pulseColor }}
              />
            ))}
            <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center">
              {waveform.map((value, i) => {
                const angle = (i * 360) / waveform.length;
                const height = 10 + value * 20;
                return (
                  <motion.div
                    key={i}
                    className="position-absolute rounded-pill"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}deg) translateY(-60px)`,
                      width: 4,
                      background: currentConfig.waveColor,
                      height
                    }}
                  />
                );
              })}
            </div>
          </>
        )}

        <Button
          as={motion.button}
          onClick={handleToggle}
          disabled={state === 'processing'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant="primary"
          className="rounded-circle d-flex flex-column align-items-center justify-content-center text-white"
          style={{ width: '100%', height: '100%' }}
          aria-label={
            state === 'idle' ? 'Start voice input' :
            state === 'listening' ? 'Stop listening' :
            state === 'processing' ? 'Processing your request' : 'AI is speaking'
          }
          aria-pressed={state === 'listening'}
        >
          {state === 'processing' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="rounded-circle border"
              style={{ width: 64, height: 64, borderWidth: 8, borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
            />
          ) : (
            <currentConfig.buttonIcon size={64} />
          )}
          <span className="h5 mt-2 mb-0">{currentConfig.buttonText}</span>
        </Button>
      </div>

      <Button variant="light" size="sm">
        {isAlwaysListening ? 'Always Listening' : 'Push to Talk'}
      </Button>

      <div className="text-center small text-muted" style={{ maxWidth: 520 }}>
        <p>Say: "Start lesson", "Show progress", "Plan project", or ask any question</p>
      </div>
    </div>
  );
}