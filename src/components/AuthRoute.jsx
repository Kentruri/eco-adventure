import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '@/redux/slices/auth';

function AuthRoute({ children }) {
  const { userLoggedIn } = useSelector(selectAuth);

  return !userLoggedIn ? children : <Navigate to="/dashboard" />;
}

export default AuthRoute;