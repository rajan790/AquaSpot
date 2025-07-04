import { useAuth } from '../../store/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const isUser = isLoggedIn && user?.role === 'user';


  if (!isUser) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default UserRoute;
