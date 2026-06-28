import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // No token? Send them back to login!
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;