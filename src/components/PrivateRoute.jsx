import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '@/redux/slices/auth';

function PrivateRoute({ children }) {
  const { userLoggedIn } = useSelector(selectAuth);

  return userLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute;