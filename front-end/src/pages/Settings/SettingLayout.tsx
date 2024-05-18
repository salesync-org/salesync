import NavigationButton from '@/components/NavigationButton/NavigationButton';
import { SidebarSetting } from '@/components/SettingLayout/SideBarSetting';
import { Panel } from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useType from '@/hooks/type-service/useType';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { Building, Layers, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

const settings: SettingLayout[] = [
  {
    name: 'My Personal Information',
    items: [
      {
        name: 'Personal Information',
        path: 'setting/personal-information',
        Icon: Settings,
        adminSettingRole: false
      },
      {
        name: 'Change My Password',
        path: 'setting/change-user-password',
        Icon: Settings,
        adminSettingRole: false
      }
    ],
    adminSettingRole: false
  },
  {
    name: 'Roles & Users',
    items: [
      {
        name: 'Roles',
        path: 'setting/roles',
        Icon: User,
        adminSettingRole: true
      },
      {
        name: 'Manage Users',
        path: 'setting/users',
        Icon: User,
        adminSettingRole: true
      }
    ],
    adminSettingRole: true
  },
  {
    name: 'Company Information',
    path: 'setting/company-information',
    Icon: Building,
    adminSettingRole: true
  },
  {
    name: 'Object Manager',
    path: 'setting/object-manager',
    Icon: Layers,
    adminSettingRole: true
  }
];

const SettingLayout = () => {
  const location = useLocation();
  const { hasPermission } = useAuth();
  const { typeId } = useParams();
  const { types } = useType();
  const [adminPermission, setAdminPermimssion] = useState<boolean | null>(null);
  const settingPathObject = settings.find((setting) => {
    if (!setting.path && setting.items) {
      return setting.items.some((item) => location.pathname.includes(item.path!));
    }
    return location.pathname.includes(setting.path!);
  });

  let title = '';
  // let Icon = Settings;

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
    // Icon = item?.Icon || Settings;
  } else {
    title = header.name;
    // Icon = header.Icon || Settings;
  }

  if (typeId) {
    title = types?.find((type) => type.id === typeId)?.name || '';
  }

  useEffect(() => {
    const checkPermission = async () => {
      if (await hasPermission('admin-settings')) {
        setAdminPermimssion(true);
      } else {
        setAdminPermimssion(false);
      }
    };
    checkPermission();
  }, []);

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
            <SidebarSetting settings={settings} adminPermission={adminPermission} />
          </div>
        </div>
        <section className='w-full'>
          <header className='mb-4 h-[88px] w-full rounded-md bg-panel dark:bg-panel-dark'>
            <div className='flex h-full items-center px-6'>
              <div className='rounded-lg p-2'>
                <img src={`${import.meta.env.VITE_STORAGE_SERVICE_HOST}/system/icons/salesync_settings.png`}></img>
              </div>
              <h1 className='pl-4 text-2xl font-bold'>{title}</h1>
            </div>
          </header>
          <div className='h-[calc(100%-88px-16px)]'>
            {adminPermission && settingPathObject?.adminSettingRole ? (
              <Outlet />
            ) : !settingPathObject?.adminSettingRole ? (
              <Outlet />
            ) : adminPermission == false ? (
              <Panel className='mx-0 h-full'>
                <div className='w-full text-center text-xl font-semibold'>
                  You don't have sufficient permissions to view this page.
                </div>
              </Panel>
            ) : (
              <Panel className='mx-0 h-full'>
                <div className='w-full text-center text-xl font-semibold'>
                  <LoadingSpinner></LoadingSpinner>
                </div>
              </Panel>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingLayout;
