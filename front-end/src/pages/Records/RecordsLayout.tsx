import AsideNav from '@/components/RecordLayout/AsideNav';
import { Outlet } from 'react-router-dom';

const RecordsLayout = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <AsideNav />
      <main className='w-full'>
        <section className='bg-primary-color h-12 w-full'></section>
        <header className='h-12 w-full bg-white'></header>
        <Outlet />
      </main>
    </div>
  );
};

export default RecordsLayout;
