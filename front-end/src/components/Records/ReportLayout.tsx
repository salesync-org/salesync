/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom';
import NavigationButton from '../NavigationButton/NavigationButton';
import { Icon } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import RecordTabs from './RecordTabs';
import useType from '@/hooks/type-service/useType';

const ReportLayout = () => {
  const { types, isLoading } = useType();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!types) {
    return null;
  }

  const layoutTypes: LayoutType[] = types.map((type: any) => ({
    name: type.name,
    type_id: type.id
  }));

  return (
    <div className='flex h-full flex-col'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>All</h2>
        <RecordTabs currentTab='Report' tabs={layoutTypes} domainName='all' name='salesTabs' />
        <Icon name='edit' className='ml-auto' />
      </section>
      <div className='pt-[44px]'>
        <Outlet />
      </div>
    </div>
  );
};
export default ReportLayout;
