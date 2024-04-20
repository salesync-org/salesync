import NavigationButton from '@/components/NavigationButton/NavigationButton';
import { SidebarSetting } from '@/components/SettingLayout/SideBarSetting';
import useType from '@/hooks/type-service/useType';
import { cn } from '@/utils/utils';
import { Building, ChevronRight, Layers, Settings, User } from 'lucide-react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

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
        path: 'setting/personal-information',
        Icon: Settings
      },
      {
        name: 'Change My Password',
        path: 'setting/change-user-password',
        Icon: Settings
      }
    ]
  },
  {
    name: 'Users',
    items: [
      {
        name: 'Roles',
        path: 'setting/roles',
        Icon: User
      },
      {
        name: 'Users',
        path: 'setting/users',
        Icon: User
      }
    ]
  },
  {
    name: 'Company Information',
    path: 'setting/company-information',
    Icon: Building
  },
  {
    name: 'Object Manager',
    path: 'setting/object-manager',
    Icon: Layers
  }
];

const SettingLayout = () => {
  const location = useLocation();
  const { typeId } = useParams();
  const { types } = useType();

  let title = '';
  let Icon = Settings;

  const header = settings.find((setting) => {
    if (!setting.path && setting.items) {
      return setting.items.some((item) => location.pathname.includes(item.path!));
    }
    return location.pathname.includes(setting.path!);
  });

  if (!header) {
    return null;
  }

  if (header.items) {
    const item = header.items.find((item) => location.pathname.includes(item.path!));
    title = item?.name || '';
    Icon = item?.Icon || Settings;
  } else {
    title = header.name;
    Icon = header.Icon || Settings;
  }

  if (typeId) {
    title = types?.find((type) => type.id === typeId)?.name || '';
  }

  return (
    <div className='h-[calc(100vh-64px)]'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Set up</h2>
      </section>
      <div className='mb-2 flex h-full w-full gap-3 px-4 pb-2 pt-[64px]'>
        <div className='h-full'>
          <div className='absolute bottom-2 left-2 top-32 flex w-2 items-center justify-center rounded-full bg-panel dark:bg-panel md:hidden'></div>
          <div
            className={cn(
              'absolute bottom-2 left-2 top-32 z-50 w-4 overflow-hidden opacity-0 transition-all duration-200 md:h-full',
              'hover:w-fit hover:opacity-100 md:static md:w-fit md:max-w-full md:overflow-auto md:opacity-100 md:hover:w-fit'
            )}
          >
            <SidebarSetting settings={settings} />
          </div>
        </div>
        <section className='w-full'>
          <header className='mb-4 h-[88px] w-full rounded-md bg-panel dark:bg-panel-dark'>
            <div className='flex h-full items-center px-6'>
              <div className='rounded-lg bg-primary-color p-2'>
                <Icon size={28} color='#fff' />
              </div>
              <h1 className='pl-4 text-2xl font-bold'>{title}</h1>
            </div>
          </header>
          <div className='h-[calc(100%-88px-16px)]'>
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingLayout;
