import { motion } from 'framer-motion';
import { Mic, Volume2, Square } from 'lucide-react';
import { useVoiceAgent } from '../../contexts/VoiceAgentContext';

export function MiniVoiceBar() {
  const { agentStatus, waveform, stopAgentSpeaking } = useVoiceAgent();

  const getStatusText = () => {
    switch (agentStatus) {
      case 'listening': return '👂 Listening...';
      case 'processing': return '🤔 Thinking...';
      case 'speaking': return '🗣️ Speaking...';
      default: return '💤 Idle';
    }
  };

  const getStatusColor = () => {
    switch (agentStatus) {
      case 'listening': return '#8b5cf6';
      case 'processing': return '#6366f1';
      case 'speaking': return '#ec4899';
      default: return '#9E9E9E';
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '800px',
        height: '70px',
        background: 'linear-gradient(135deg, #7013c6 0%, #ec4899 100%)',
        borderRadius: '35px',
        boxShadow: '0 8px 32px rgba(112, 19, 198, 0.4)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        color: 'white',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Left: Status and Icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          animate={{
            scale: agentStatus === 'speaking' ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.8,
            repeat: agentStatus === 'speaking' ? Infinity : 0,
          }}
        >
          {agentStatus === 'speaking' ? (
            <Volume2 size={32} color={getStatusColor()} />
          ) : (
            <Mic size={32} color={getStatusColor()} />
          )}
        </motion.div>

        <div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>VoiceEd Ally</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
            {getStatusText()}
          </div>
        </div>
      </div>

      {/* Center: Waveform */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '40px',
        padding: '0 1rem',
        overflow: 'hidden',
      }}>
        {(() => {
          const bars = 18;
          const vals = Array.from({ length: bars }).map((_, idx) => {
            const v = waveform[idx] ?? waveform[idx % waveform.length] ?? 0;
            return Math.min(Math.max(v, 0), 100) / 100;
          });
          return vals.map((norm, i) => (
            <motion.div
              key={i}
              animate={{ height: `${Math.max(12, Math.round(norm * 100) * 0.2)}%` }}
              transition={{ duration: 0.08 }}
              style={{
                width: '4px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '3px',
                minHeight: '12%',
              }}
            />
          ));
        })()}
      </div>

      {/* Right: Stop Button */}
      {agentStatus === 'speaking' && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={stopAgentSpeaking}
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: '2px solid rgba(255,255,255,0.6)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Square size={18} fill="white" color="white" />
        </motion.button>
      )}
    </motion.div>
  );
}
