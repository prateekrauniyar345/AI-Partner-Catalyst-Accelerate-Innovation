import { motion } from 'framer-motion';
import { useVoiceAgent } from '../../contexts/VoiceAgentContext';

export function MiniVoiceBar() {
  const { agentStatus, waveform, stopAgentSpeaking } = useVoiceAgent();

  const getStatusText = () => {
    switch (agentStatus) {
      case 'listening': return 'Listening...';
      case 'processing': return 'Thinking...';
      case 'speaking': return 'Speaking...';
      default: return 'Idle';
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
    <div style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      padding: '20px 12px',
      zIndex: 1200,
    }}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        style={{
          pointerEvents: 'auto',
          width: 'min(900px, calc(100% - 80px))',
          maxWidth: '900px',
          height: '70px',
          background: 'linear-gradient(135deg, #7013c6 0%, #ec4899 100%)',
          borderRadius: '35px',
          boxShadow: '0 8px 32px rgba(112, 19, 198, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          color: 'white',
          backdropFilter: 'blur(10px)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
      {/* Left: Status and Icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          animate={{
            scale: agentStatus === 'speaking' ? [1, 1.15, 1] : 1,
          }}
          transition={{
            duration: 0.9,
            repeat: agentStatus === 'speaking' ? Infinity : 0,
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: getStatusColor(),
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }} />

          <div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>VoiceEd Ally</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
              {getStatusText()}
            </div>
          </div>
        </motion.div>
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={stopAgentSpeaking}
          style={{
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '12px',
            width: '56px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <div style={{
            width: 12,
            height: 12,
            background: 'white',
            borderRadius: 2,
          }} />
        </motion.button>
      )}
      </motion.div>
    </div>
  );
}
