import AsideNav from '@/components/RecordLayout/AsideNav';
import { Outlet } from 'react-router-dom';

const RecordsLayout = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <AsideNav />
      <main className='flex w-full flex-col'>
        <section className='h-12 w-full bg-primary-color'></section>
        <header className='h-12 w-full bg-white'></header>
        <div className='flex-grow'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RecordsLayout;
