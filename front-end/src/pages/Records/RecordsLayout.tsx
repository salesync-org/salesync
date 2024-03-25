import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

const RecordsLayout = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <main className='flex w-full flex-col'>
        <section className='h-12 w-full bg-primary-color'></section>
        <Header />
        <div className='flex-grow'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RecordsLayout;
