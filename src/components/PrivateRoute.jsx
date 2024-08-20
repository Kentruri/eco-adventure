import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { userLoggedIn } = useSelector((state) => state.auth);

  return userLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;