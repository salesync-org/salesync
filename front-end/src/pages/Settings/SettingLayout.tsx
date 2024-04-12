import NavigationButton from '@/components/NavigationButton/NavigationButton';
import { Panel } from '@/components/ui';
import { cn } from '@/utils/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';

const SettingLayout = () => {
  return (
    <div>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Set up</h2>
      </section>
      <div className='flex w-full gap-3 px-4 py-[64px]'>
        <SidebarSetting />
        <section className='w-full'>
          <header className='mb-4 h-[88px] w-full bg-slate-200'></header>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

const SidebarSetting = () => {
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

  const { companyName = '' } = useParams();
  return (
    <Panel className='m-0 h-[600px] w-[284px] bg-white px-0 py-4'>
      <div className='flex flex-col'>
        {settings.map((setting) => {
          return (
            <div key={setting.name}>
              <div className='flex flex-col'>
                {setting.items ? (
                  <SettingDropDown title={setting.name} items={setting.items} />
                ) : (
                  <ItemSetting name={setting.name} href={`/${companyName}/${setting.path}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

const SettingDropDown = ({ title, items }: { title: string; items: { name: string; path: string }[] }) => {
  const location = useLocation();
  const [open, setOpen] = useState(() => {
    return items.some((item) => location.pathname.includes(item.path));
  });
  const { companyName = '' } = useParams();

  return (
    <div className='flex flex-col'>
      <div
        className='flex cursor-pointer items-center gap-2 px-5 py-3 text-sm hover:bg-primary-color/10'
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={16} fontFamily='700' /> : <ChevronRight size={16} fontFamily='700' />}
        <span className='text-sm font-medium'>{title}</span>
      </div>
      {open && (
        <div className='flex flex-col'>
          {items.map((item, index) => (
            <ItemSetting
              className='pl-12'
              activeClassName='pl-[40px]'
              key={index}
              name={item.name}
              href={`/${companyName}/${item.path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ItemSetting = ({
  name,
  href,
  className,
  activeClassName
}: {
  name: string;
  href: string;
  className?: string;
  activeClassName?: string;
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'px-5 py-3 text-sm font-medium hover:bg-primary-color/10',
          isActive && 'border-l-[3px] border-primary-color bg-primary-color/20 pl-[15px]',
          className,
          isActive && activeClassName
        )
      }
      to={href}
    >
      {name}
    </NavLink>
  );
};
export default SettingLayout;
