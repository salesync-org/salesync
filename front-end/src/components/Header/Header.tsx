import salesyncIcon from 'assets/salesync_icon.png';

import { ThemeToggle, UserInfo, Search } from './index';
import { cn } from '@/utils/utils';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '../ui';
import NotificationList from '../NotificationList/NotificationList';

const Header = ({ className }: { className?: string }) => {
  const { company } = useAuth();
  const [companyLoaded, setCompany] = useState(company);

  useEffect(() => {
    setCompany(company);
  }, [company]);

  return (
    <div
      className={cn(
        'fixed top-0 z-[100] flex h-16 w-[calc(100vw)] flex-grow items-center justify-between border-[1px] border-input-stroke bg-panel py-4 pl-3 pr-5 dark:border-input-stroke-dark  dark:bg-panel-dark',
        className
      )}
    >
      <Link
        data-tooltip-id='home-layout'
        data-tooltip-content='Home'
        className='aspect-square h-10 w-10'
        to={`/${company?.name}/section/home`}
      >
        <img
          src={`${import.meta.env.VITE_STORAGE_SERVICE_HOST}/companies/${companyLoaded?.avatar_url === 'default' ? 'default.svg' : company?.avatar_url}?lastmod=${Date.now()}`}
          className=''
          alt='header icon'
          onError={(e) => {
            e.currentTarget.src = salesyncIcon;
          }}
        />
      </Link>
      <Tooltip id='home-layout' />
      <Search className='align-middle' />
      <div>
        <div className='justify-right relative flex w-fit pr-1 align-middle'>
          <div className='flex gap-2'>
            <ThemeToggle />
            <NotificationList></NotificationList>
            <UserInfo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
