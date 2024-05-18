import Header from 'components/Header/Header';
import { Outlet } from 'react-router-dom';

const ConfigLayout = () => {
  return (
    <div className='flex min-h-dvh'>
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
