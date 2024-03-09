import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';

const ConfigLayout = () => {
  return (
    <>
      <Header />
      <div className='mx-auto w-full mt-14'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default ConfigLayout;
