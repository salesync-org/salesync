import NavigationButton from '@/components/NavigationButton/NavigationButton';
import { SidebarSetting } from '@/components/SettingLayout/SideBarSetting';
import { Outlet } from 'react-router-dom';

export type Setting = {
  name: string;
  items?: {
    name: string;
    path: string;
  }[];
  path?: string;
};

const settings = [
  {
    name: 'My Personal Information',
    items: [
      {
        name: 'Personal Information',
        path: 'setting/personal-information'
      },
      {
        name: 'Change My Password',
        path: 'setting/change-password'
      }
    ]
  },
  {
    name: 'Users',
    items: [
      {
        name: 'Profiles',
        path: 'setting/profiles'
      },
      {
        name: 'Users',
        path: 'setting/users'
      }
    ]
  },
  {
    name: 'Company Information',
    path: 'setting/company-information'
  },
  {
    name: 'Object Manager',
    path: 'object-manager'
  }
];

const SettingLayout = () => {
  return (
    <div>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Set up</h2>
      </section>
      <div className='flex w-full gap-3 px-4 py-[64px]'>
        <SidebarSetting settings={settings} />
        <section className='w-full'>
          <header className='mb-4 h-[88px] w-full bg-slate-200'></header>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default SettingLayout;
