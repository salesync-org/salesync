import { Navigate, useParams } from 'react-router-dom';

const CompanyRedirect = () => {
  const { companyName = '' } = useParams();

  if (!companyName) {
    return <Navigate to='/login' />;
  }

  return <Navigate to={`/${companyName}/section/home`} />;
};

export default CompanyRedirect;
