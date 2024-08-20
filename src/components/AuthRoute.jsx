import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
  const { userLoggedIn } = useSelector((state) => state.auth);

  return !userLoggedIn ? children : <Navigate to="/" />;
}

export default AuthRoute;