import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const ConfigLayout = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto mt-4 w-full'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default ConfigLayout;
