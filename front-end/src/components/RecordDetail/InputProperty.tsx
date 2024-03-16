import { Icon } from '@/components/ui';
import defaultAvatar from '@/assets/default_avatar.png';
import React from 'react';

interface InputPropertyProps {
  name?: string;
  value?: string;
}

const InputProperty: React.FC<InputPropertyProps> = ({ name, value }) => {
  return (
    <div className='px-4'>
      <div>
        <span className='text-xs'>{name}</span>
      </div>

      <div className='flex justify-between border-b'>
        {name === 'Lead Owner' && (
          <>
            <div className='flex justify-start '>
              <div className='mr-1 flex items-center'>
                <img className='h-5 w-5 rounded-full' src={defaultAvatar} alt='avatar' />
              </div>
              <span className='text-sm'>Quy</span>
            </div>
          </>
        )}
        {(name === 'Created By' || name === 'Last Modified By') && (
          <>
            <div className='flex justify-start '>
              <div className='mr-1 flex items-center'>
                <img className='h-5 w-5 rounded-full' src={defaultAvatar} alt='avatar' />
              </div>
              <span className='text-sm'>Quy, 07/03/2024</span>
            </div>
          </>
        )}
        {name !== 'Lead Owner' && name !== 'Lead Owner' && name !== 'Lead Owner' && (
          <>
            <div className='flex justify-start'>
              <span className='text-sm'>{value}</span>
            </div>
          </>
        )}

        <button>
          <Icon name='edit' />
        </button>
      </div>
    </div>
  );
};

export default InputProperty;
