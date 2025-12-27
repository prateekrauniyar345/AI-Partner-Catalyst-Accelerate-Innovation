import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  // Show nothing while checking auth
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#667eea'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to 404 if not authenticated
  if (!user) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
