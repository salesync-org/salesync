import { CircleOff } from 'lucide-react';
import { useEffect, useState } from 'react';

type AvatarGroupProps = {
  users: SimpleUser[];
  maxAvatars: number;
};
const AvatarGroup = ({ users, maxAvatars }: AvatarGroupProps) => {
  const [showMoreAvatars, setShowMoreAvatars] = useState<number>(0);
  const avatarLink = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/`;

  useEffect(() => {
    if (users.length > maxAvatars) {
      setShowMoreAvatars(users.length - maxAvatars);
    }
  }, [users, maxAvatars]);

  return (
    <div className='flex items-center -space-x-2'>
      {users.length == 0 && <CircleOff size='1.5rem' />}
      {users &&
        users.map((user, index) => (
          <img
            key={index}
            src={`${avatarLink}${user.avatar_url}-48.jpg`}
            className='h-10 w-10 rounded-full border-2 border-white dark:border-gray-800'
            alt='avatar'
          />
        ))}
      {showMoreAvatars !== 0 && (
        <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-input-stroke-light bg-button-background/20 backdrop-blur-lg dark:border-input-stroke-dark dark:bg-button-background-dark/20'>
          <span className='mr-1 text-sm font-semibold'>+{showMoreAvatars}</span>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
