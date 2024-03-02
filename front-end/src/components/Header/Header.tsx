import salesyncIcon from 'assets/salesync_icon.png';
import ThemeToggle from './ThemeToggle';
import UserInfo from './UserInfo';
import Search from './Search';

const Header = () => {

  return (
    <div className='fixed top-0 z-50 backdrop-blur-md flex h-14 w-full flex-grow items-center justify-between bg-panel px-3 py-1 dark:bg-panel-dark'>
      <a className='h-10 w-10 aspect-square' href='/cheatsheet'>
        <img src={salesyncIcon} className='' alt='header icon' />
      </a>
      <Search className='align-middle' />
      <div>
        <div className='justify-right relative flex w-fit align-middle'>
          <ThemeToggle />
          <UserInfo />
        </div>
      </div>
    </div>
  );
};
export default Header;
