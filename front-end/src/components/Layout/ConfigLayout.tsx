import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';

const ConfigLayout = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto mt-20 w-full h-fit'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default ConfigLayout;
