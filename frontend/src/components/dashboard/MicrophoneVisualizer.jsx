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
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Outer pulse rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-4 border-purple-300"
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
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <motion.div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateY(-100px)`,
                height: '20px',
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
        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl flex items-center justify-center cursor-pointer group"
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
        <Mic className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white"
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
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
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
            style={{
              left: '50%',
              top: '50%',
            }}
          />
        ))}
    </div>
  );
}
