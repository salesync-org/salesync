import salesyncIcon from 'assets/salesync_icon.png';
import TextInput from 'ui/TextInput/TextInput';
import Button from 'ui/Button/Button';
import Icon from 'ui/Icon/Icon';
import { useEffect, useState, MouseEvent } from 'react';
import auth from '@/api/auth';
import DropDownList from 'ui/DropDown/DropDownList';
import Item from 'ui/Item/Item';
import Switch from 'ui/Switch/Switch';
import themeSwitcher from '@/utils/themeSwitcher';

const Header = () => {
  const [isLoggedIn, setLogInState] = useState(false);
  const [isOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('Unknown');
  const [avatar_url, setAvatar] = useState('');
  useEffect(() => {
    const updateInfo = async () => {
      if (!localStorage.getItem('access_token')) return;
      const { name, avatar_url } = await auth.getMyInfo();
      setLogInState(true);
      setName(name);
      setAvatar(avatar_url);
    };
    updateInfo();
  }, [localStorage]);

  function logOutHandle(_: MouseEvent<HTMLDivElement>): void {
    const logOut = async () => {
      await auth.logOut();
    };
    logOut();
    setLogInState(false);
    setName('Unknown');
    setAvatar('');
    localStorage.removeItem('access_token');
    window.location.href = '/';
  }

  return (
    <div className='fixed top-0 z-50 flex h-14 w-full flex-grow items-center justify-between bg-panel px-3 py-1 dark:bg-panel-dark'>
      <a href='/cheatsheet'>
        <img src={salesyncIcon} className='h-10 w-10' alt='header icon' />
      </a>
      <TextInput
        placeholder='Search for anything'
        className='absolute left-0 right-0 mx-auto w-1/2'
        prefixIcon='search'
      />
      <div>
        <div className='justify-right relative flex w-fit space-x-4 align-middle'>
          <div className='mx-auto flex justify-center space-x-2 pt-2 align-middle'>
            <Icon name='light_mode' size='1rem' />
            <Switch checked={document.documentElement.classList.contains('dark')} onClick={themeSwitcher}></Switch>
            <Icon name='dark_mode' size='1rem' />
          </div>
          {isLoggedIn ? (
            <div className='relative flex w-fit space-x-3 pl-2 align-middle'>
              <Button rounded='icon' className='h-10 w-10' intent='normal' onClick={() => {}}>
                <Icon name='notifications' size='1rem' />
              </Button>
              <div>
                <Button
                  rounded='icon'
                  className='mx-0 my-0 h-10 w-10 border-0 px-0 py-0'
                  intent='link'
                  onClick={() => {
                    setMenuOpen(!isOpen);
                  }}
                >
                  <img className='w-full rounded-full' src={avatar_url} alt='avatar'></img>
                </Button>
                <DropDownList
                  open={isOpen}
                  align='right'
                  className='right-[.25rem] top-[3rem] mt-0 w-80'
                  divide={false}
                >
                  <div className='mb-2 border-b-2 border-button-stroke'>
                    <Item
                      title={name}
                      icon={<img className='w-full rounded-full' src={avatar_url} alt='avatar'></img>}
                    />
                  </div>
                  <Item
                    className='py-0'
                    icon={<Icon name='settings' size='2rem' />}
                    title='Settings & Administration'
                  />
                  <Item
                    className='py-0'
                    icon={<Icon name='logout' size='2rem' />}
                    title='Log out'
                    onClick={logOutHandle}
                  />
                  <div className='h-2' />
                </DropDownList>
              </div>
            </div>
          ) : (
            <div>
              <Button
                intent='primary'
                rounded='normal'
                className='w-20'
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                Log in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
