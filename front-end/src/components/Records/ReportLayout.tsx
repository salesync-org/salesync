/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom';
import NavigationButton from '../NavigationButton/NavigationButton';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import useType from '@/hooks/type-service/useType';

const ReportLayout = () => {
  const { types, isLoading } = useType();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!types) {
    return null;
  }

  return (
    <div className='flex h-full flex-col'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 text-[1.1rem] leading-6'>Report Detail</h2>
      </section>
      <div className='pt-[44px]'>
        <Outlet />
      </div>
    </div>
  );
};
export default ReportLayout;
