import salesyncIcon from 'assets/salesync_icon.png';
import TextInput from 'ui/TextInput/TextInput';
import Button from 'ui/Button/Button';
import Icon from '../ui/Icon/Icon';
import { useEffect, useState } from 'react';
import getMyInfo from '@/api/getMyInfo';

const Header = () => {
  const [isLoggedIn, setLogInState] = useState(false);
  const [name, setName] = useState('Unknown');
  const [avatar_url, setAvatar] = useState('');

  const updateInfo = async () => {
    const getInfo = await getMyInfo();
    const { name, avatar_url } = getInfo.data;
    if (getInfo.status == 200) {
      setLogInState(true);
      setName(name);
      setAvatar(avatar_url);
    }
  }

  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <div className='fixed top-0 z-50 flex h-14 w-full flex-grow items-center justify-between bg-panel px-3 py-1 dark:bg-panel-dark'>
      <a href='/cheatsheet'>
        <img src={salesyncIcon} className='h-10 w-10' alt='header icon' />
      </a>
      <TextInput placeholder='Search for anything' className='w-1/2' prefixIcon='search' />
      <div>
        {isLoggedIn && 
          <div className='flex space-x-3'>
            <Button rounded='icon' className='w-10 h-10' intent='normal' onClick={() => {}}>
              <Icon name='notifications' size='1rem' />
            </Button>
            <Button rounded='icon' className='px-0 py-0 border-0' intent='link' onClick={() => {}}>
              <img className='w-full rounded-full' src={avatar_url} alt='avatar'></img>
            </Button>
          </div>
        }
      </div>
    </div>
  );
};
export default Header;
