import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PublicRoute = ({ 
  isAuthenticated, 
  redirectPath = '/' 
}: PublicRouteProps) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute; 