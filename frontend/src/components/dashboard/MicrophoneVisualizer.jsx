import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { useState, useEffect } from 'react';

export function MicrophoneVisualizer() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '320px', height: '320px' }}>
      {/* Outer pulse rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="position-absolute rounded-circle border"
          style={{
            width: '320px',
            height: '320px',
            borderWidth: '4px',
            borderColor: '#c084fc',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isActive ? [1, 1.5, 2] : 1,
            opacity: isActive ? [0.5, 0.3, 0] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Animated bars around microphone */}
      <div className="position-absolute top-50 start-50 translate-middle">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <motion.div
              key={i}
              className="position-absolute rounded-pill"
              style={{
                width: '4px',
                background: 'linear-gradient(180deg, #9333ea, #ec4899)',
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateY(-100px)`,
                height: '20px',
                transformOrigin: 'bottom center',
              }}
              animate={{
                height: isActive ? ['20px', '40px', '20px'] : '20px',
                opacity: isActive ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}
      </div>

      {/* Center microphone button */}
      <motion.div
        className="position-relative rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: '128px',
          height: '128px',
          background: 'linear-gradient(135deg, #9333ea, #ec4899)',
          boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4)',
          zIndex: 10,
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsActive(!isActive)}
        animate={{
          boxShadow: isActive
            ? [
                '0 20px 60px rgba(147, 51, 234, 0.4)',
                '0 20px 80px rgba(236, 72, 153, 0.6)',
                '0 20px 60px rgba(147, 51, 234, 0.4)',
              ]
            : '0 20px 60px rgba(147, 51, 234, 0.4)',
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Mic style={{ width: '64px', height: '64px', color: 'white' }} />
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="position-absolute rounded-circle border border-white"
            style={{
              width: '24px',
              height: '24px',
              background: '#4ade80',
              top: '-8px',
              right: '-8px',
              borderWidth: '4px',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Floating particles */}
      {isActive &&
        [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="position-absolute rounded-circle"
            style={{
              width: '8px',
              height: '8px',
              background: '#a855f7',
              left: '50%',
              top: '50%',
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 8) * 100,
              y: Math.sin((i * Math.PI * 2) / 8) * 100,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
    </div>
  );
}
