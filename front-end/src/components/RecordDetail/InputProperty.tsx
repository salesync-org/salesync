import defaultAvatar from '@/assets/default_avatar.png';
import React from 'react';

interface InputPropertyProps {
  name?: string;
  value?: string;
}

const InputProperty: React.FC<InputPropertyProps> = ({ name, value }) => {
  return (
    <div className='px-4 py-1'>
      <div>
        <span className='text-xs font-medium'>{name}</span>
      </div>

      <div className='flex justify-between border-b py-1'>
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
            <div className='flex justify-start overflow-hidden'>
              <span className='truncate text-sm' title={value}>
                {value}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputProperty;
