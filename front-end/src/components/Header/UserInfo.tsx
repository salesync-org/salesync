import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'ui/Button/Button';
import DropDownList from 'ui/DropDown/DropDownList';
import Icon from 'ui/Icon/Icon';
import Item from 'ui/Item/Item';

const UserInfo = () => {
  const { user, logout, fetchUser } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('Unknown');
  const [avatar_url, setAvatar] = useState('');
  const navigate = useNavigate();
  
  if (user === null) {
    fetchUser();
  }
  useEffect(() => {
    const updateInfo = async () => {
      if (user === null) {
        setName('Unknown');
        setAvatar('');
      } else {
        const { name, avatar_url } = user;
        setName(name);
        setAvatar(avatar_url);
      }
    };
    updateInfo();
  }, [user]);

  return (
    <>
      {user ? (
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
                setMenuOpen(!isMenuOpen);
              }}
            >
              <img className='w-full rounded-full' src={avatar_url} alt='avatar'></img>
            </Button>
            <DropDownList
              open={isMenuOpen}
              align='right'
              className='right-[.25rem] top-[3rem] mt-0 w-80'
              divide={false}
            >
              <div className='mb-2 border-b-2 border-button-stroke'>
                <Item title={name} icon={<img className='w-full rounded-full' src={avatar_url} alt='avatar'></img>} />
              </div>
              <Item className='py-0' icon={<Icon name='settings' size='2rem' />} title='Settings & Administration' onClick={()=>{navigate('/setting')}} />
              <Item
                className='py-0'
                icon={<Icon name='logout' size='2rem' />}
                title='Log out'
                onClick={() => {
                  logout();
                }}
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
            className='mx-3 w-20'
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Log in
          </Button>
        </div>
      )}
    </>
  );
};
export default UserInfo;
