import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const CompanyName = () => {
  const location = useLocation();
  const { companyName = '' } = useParams();

  if (location.pathname.endsWith(companyName)) {
    return <Navigate to={`/${companyName}/home`} />;
  }
  return <Outlet />;
};
export default CompanyName;
