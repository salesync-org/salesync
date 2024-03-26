import salesyncIcon from 'assets/salesync_icon.png';

import { ThemeToggle, UserInfo, Search, QuickSetting } from './index';

const Header = () => {
  return (
    <div className='fixed left-[76px] top-0 z-50 flex h-14 w-[calc(100vw-76px)] flex-grow items-center justify-between border-[1px] border-input-stroke bg-panel pl-3 pr-5 py-1 dark:border-input-stroke-dark  dark:bg-panel-dark'>
      <a className='aspect-square h-10 w-10' href='/cheatsheet'>
        <img src={salesyncIcon} className='' alt='header icon' />
      </a>
      <Search className='align-middle' />
      <div>
        <div className='justify-right relative flex w-fit align-middle'>
          <div className='flex gap-2'>
            <ThemeToggle />
            <QuickSetting />
          </div>
          <UserInfo />
        </div>
      </div>
    </div>
  );
};
export default Header;
