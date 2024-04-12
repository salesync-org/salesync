import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';
import AsideNav from '../RecordLayout/AsideNav';

const ConfigLayout = () => {
  return (
    <div className='flex min-h-dvh'>
      {/* <AsideNav /> */}
      <div className='flex h-dvh flex-grow flex-col'>
        <Header />
        <div className='mx-auto mt-16 w-full flex-grow'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default ConfigLayout;
