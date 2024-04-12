import NavigationButton from '@/components/NavigationButton/NavigationButton';
import { Panel } from '@/components/ui';
import { Outlet } from 'react-router-dom';

const SettingLayout = () => {
  return (
    <div className='h-[calc(100vh-64px)]'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Set up</h2>
      </section>
      <div className='mb-2 flex h-full w-full gap-3 px-4 pb-2 pt-[64px]'>
        <Panel className='m-0 h-full w-[284px] bg-white'>a</Panel>
        <section className='h-full w-full'>
          <header className='mb-4 h-[88px] w-full bg-slate-200'></header>
          <div className='h-[calc(100%-88px-16px)]'>
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};
export default SettingLayout;
