import { Navigate } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '../../api/AuthContext';

export const ProtectedRouteWrapper = ({ children }) => {
  const {isLoggedIn} = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
