import defaultAvatar from '@/assets/default_avatar.png';
import { Button, DropDownList, Item } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Settings, LogOut } from '@/components/SaleSyncIcons';
import { useNavigate, useParams } from 'react-router-dom';

const UserInfo = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('Unknown');
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const navigate = useNavigate();
  const { companyName = '' } = useParams();

  useEffect(() => {
    const updateInfo = async () => {
      if (user === null) {
        setName('Unknown');
      } else {
        setName(`${user.first_name} ${user.last_name}`);
      }
    };
    updateInfo();
    setTimeout(() => {
      setAvatarUrl(
        `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/${user?.avatar_url}-48.jpg?lastmod=${Date.now()}`
      );
    }, 2000);
  }, [user]);

  return (
    <>
      {user && (
        <div className=''>
          <Button
            rounded='icon'
            className='mx-0 my-0 h-10 w-10 border-0 px-0 py-0'
            intent='link'
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          >
            <img
              className='w-full rounded-full'
              src={`${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/${user.avatar_url}-48.jpg?lastmod=${Date.now()}`}
              alt='avatar'
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            ></img>
          </Button>
          <DropDownList
            open={isMenuOpen}
            onClose={() => {
              setMenuOpen(false);
            }}
            className='right-[.25rem] top-[3rem] mt-0 w-80'
            divide={false}
          >
            <div className='mb-2 border-b-[1px] border-button-stroke/50 dark:border-button-stroke/30'>
              <Item title={name} icon={<img className='w-full rounded-full' src={avatarUrl} alt='avatar'></img>} />
            </div>
            <Item
              className='py-0'
              icon={<Settings name='settings' width='1.4rem' height='1.4rem' />}
              title='Settings & Administration'
              onClick={() => {
                navigate(`/${companyName}/setting/personal-information`);
              }}
            />
            <Item
              className='py-0'
              icon={<LogOut name='logout' width='1.4rem' height='1.4rem' />}
              title='Log out'
              onClick={() => {
                navigate(`/${companyName}/section/home`);
                logout();
              }}
            />
            <div className='h-2' />
          </DropDownList>
        </div>
      )}
    </>
  );
};
export default UserInfo;
