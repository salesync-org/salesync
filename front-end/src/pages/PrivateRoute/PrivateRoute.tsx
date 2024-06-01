import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { companyName = '' } = useParams();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(location.pathname);
    console.log(redirectUrl);
    return <Navigate to={`/${companyName}/login?redirectUrl=${redirectUrl}`} />;
  }

  return <Outlet />;
};
export default PrivateRoute;
