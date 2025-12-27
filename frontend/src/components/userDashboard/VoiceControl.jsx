import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { useVoiceAgent } from "../../contexts/VoiceAgentContext";

export function VoiceControl() {
  const { agentStatus, waveform, stopAgentSpeaking, conversation } = useVoiceAgent();

  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  const getStatusConfig = () => {
    switch (agentStatus) {
      case 'listening':
        return { label: "👂 Listening...", pulseColor: "rgba(112, 19, 198, 0.4)", waveColor: "#7013c6" };
      case 'processing':
        return { label: "🧠 Thinking...", pulseColor: "rgba(99, 102, 241, 0.4)", waveColor: "#6366f1" };
      case 'speaking':
        return { label: "🔊 Speaking...", pulseColor: "rgba(236, 72, 153, 0.4)", waveColor: "#ec4899" };
      default:
        return { label: "🎤 Ready", pulseColor: "rgba(139, 92, 246, 0.3)", waveColor: "#8b5cf6" };
    }
  };

  const config = getStatusConfig();

  if (!agentId) {
    return (
      <div className="alert alert-danger">
        Error: VITE_ELEVENLABS_AGENT_ID is not set in .env
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center gap-4" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem 0' }}>
      {/* Status Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={agentStatus}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="px-4 py-2 rounded-pill"
          style={{
            background: 'linear-gradient(135deg, #7013c6 0%, #ec4899 100%)',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(112, 19, 198, 0.3)'
          }}
        >
          {config.label}
        </motion.div>
      </AnimatePresence>

      {/* Main Circular Mic with Waveform */}
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ width: 300, height: 300 }}
      >
        {/* Pulse Rings */}
        {(agentStatus === "listening" || agentStatus === "speaking") && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`pulse-${i}`}
                className="position-absolute rounded-circle"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 2.5, 4], opacity: [0.6, 0.2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                style={{
                  width: "40%",
                  height: "40%",
                  border: `4px solid ${config.pulseColor}`,
                  pointerEvents: 'none'
                }}
              />
            ))}

            {/* Circular Waveform - constrained and centered */}
            <div
              className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
              style={{ overflow: 'hidden', pointerEvents: 'none' }}
            >
              {(() => {
                const bars = 32;
                const wl = waveform.length;
                // if waveform is empty, use small silent values so bars remain visible
                const vals = Array.from({ length: bars }).map((_, idx) => {
                  if (!wl) return 0;
                  const pos = (idx / bars) * wl;
                  const i0 = Math.floor(pos) % wl;
                  const i1 = (i0 + 1) % wl;
                  const t = pos - Math.floor(pos);
                  const v0 = waveform[i0] ?? 0;
                  const v1 = waveform[i1] ?? 0;
                  const v = v0 * (1 - t) + v1 * t;
                  return Math.min(Math.max(v, 0), 100) / 100;
                });

                const radius = 115; // px - place bars outside the central mic (mic radius ~80)
                const maxBar = 20; // px
                const minBar = 6; // px

                return vals.map((normalized, i) => {
                  const angle = (i / bars) * 360;
                  const barHeight = Math.round(minBar + normalized * maxBar);
                  // position bar so its inner end sits at `radius` from center
                  const translateOut = radius + Math.round(barHeight / 2);
                  return (
                    <motion.div
                      key={`wave-${i}`}
                      className="position-absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${translateOut}px)`,
                        width: 4,
                        height: `${barHeight}px`,
                        background: config.waveColor,
                        borderRadius: '3px',
                        zIndex: 5,
                        willChange: 'transform, height',
                      }}
                      animate={{ height: barHeight }}
                      transition={{ duration: 0.06 }}
                    />
                  );
                });
              })()}

            </div>
          </>
        )}

        {/* Central Mic Button */}
        <motion.button
          onClick={stopAgentSpeaking}
          disabled={agentStatus !== 'speaking'}
          whileHover={{ scale: agentStatus === 'speaking' ? 1.05 : 1 }}
          whileTap={{ scale: agentStatus === 'speaking' ? 0.95 : 1 }}
          className="rounded-circle d-flex align-items-center justify-content-center text-white position-relative"
          style={{
            width: 160,
            height: 160,
            background: agentStatus === 'speaking' 
              ? 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)'
              : 'linear-gradient(135deg, #7013c6 0%, #6366f1 100%)',
            border: 'none',
            boxShadow: '0 8px 24px rgba(112, 19, 198, 0.4)',
            cursor: agentStatus === 'speaking' ? 'pointer' : 'default',
            zIndex: 10,
          }}
          aria-label={
            agentStatus === 'idle' ? 'Voice assistant ready' :
            agentStatus === 'listening' ? 'Listening to your voice' :
            agentStatus === 'processing' ? 'Processing your request' :
            'Click to stop speaking'
          }
        >
          {agentStatus === 'processing' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="rounded-circle"
              style={{
                width: 70,
                height: 70,
                border: '6px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
              }}
            />
          ) : agentStatus === 'speaking' ? (
            <Square size={70} fill="white" color="white" />
          ) : (
            <Mic size={70} strokeWidth={2} />
          )}
        </motion.button>
      </div>

      {/* Connection Status */}
      <div className="text-center">
        <small className={`badge ${conversation?.status === 'connected' ? 'bg-success' : 'bg-secondary'}`}>
          {conversation?.status === 'connected' ? '✓ Connected' : '○ Connecting...'}
        </small>
      </div>

      {/* Accessibility Announcements */}
      <div
        id="voice-announcement"
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
  );
}
