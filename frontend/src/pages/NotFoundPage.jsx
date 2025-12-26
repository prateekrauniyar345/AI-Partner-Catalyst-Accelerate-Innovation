import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          color: 'white',
          maxWidth: '600px'
        }}
      >
        <motion.h1
          style={{
            fontSize: '10rem',
            fontWeight: 'bold',
            margin: 0,
            lineHeight: 1,
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          404
        </motion.h1>
        
        <motion.h2
          style={{
            fontSize: '2rem',
            marginTop: '1rem',
            marginBottom: '1rem'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist or you don't have permission to access it.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            🏠 Go Home
          </Button>
          
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => navigate(-1)}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            ← Go Back
          </Button>
        </motion.div>
        
        <motion.div
          style={{
            marginTop: '3rem',
            fontSize: '5rem',
            opacity: 0.3
          }}
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🤔
        </motion.div>
      </motion.div>
    </div>
  );
}
