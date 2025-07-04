import { useAuth } from '../../store/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const isUser = isLoggedIn && user?.role === 'admin';
  {console.log(isUser)}
  return isUser ? <Outlet/> : <Navigate to={'/'}/>;
};

export default AdminRoute;