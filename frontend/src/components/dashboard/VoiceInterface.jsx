import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume1, X, Sparkles } from 'lucide-react';
import { Button } from '../../UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../UI/card';

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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 border-purple-200 shadow-2xl">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Voice Learning Session
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Microphone Visualizer */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                className="relative"
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
                        className="absolute inset-0 rounded-full border-4 border-purple-300"
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
                        style={{ width: '160px', height: '160px' }}
                      />
                    ))}
                  </>
                )}

                {/* Main button */}
                <button
                  onClick={handleToggleListening}
                  className={`relative w-40 h-40 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? 'bg-gradient-to-br from-red-500 to-pink-500'
                      : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-16 h-16 text-white" />
                  ) : (
                    <Mic className="w-16 h-16 text-white" />
                  )}
                </button>

                {/* Status indicator */}
                {isSpeaking && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Volume1 className="w-4 h-4" />
                    Speaking...
                  </motion.div>
                )}
              </motion.div>

              <p className="mt-6 text-center text-gray-600">
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
                  className="mb-4"
                >
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                    <div className="text-xs text-blue-600 mb-1">You said:</div>
                    <div className="text-gray-800">{transcript}</div>
                  </div>
                </motion.div>
              )}

              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                    <div className="text-xs text-purple-600 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Tutor:
                    </div>
                    <div className="text-gray-800">{aiResponse}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 text-center">
                This is a demo interface. In the full version, you'll interact with real ElevenLabs voice AI and Google Gemini for adaptive, empathetic learning.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
