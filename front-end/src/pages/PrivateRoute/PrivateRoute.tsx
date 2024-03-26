import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { companyName = '' } = useParams();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={`/${companyName}/login`} />;
};
export default PrivateRoute;
