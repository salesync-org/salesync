import React, { useMemo, useState } from 'react';
import { cn } from '@/utils/utils';
import { DropDown, Icon, Button } from '../ui';
import ItemType from './ItemType';

interface InputRecordRelativeProps {
  header?: string;
  showHeader?: boolean;
  className?: string;
  disabled?: boolean;
  pattern: 'name' | 'relation';
}

const InputRecordRelative: React.FC<InputRecordRelativeProps> = ({
  header,
  showHeader = true,
  className,
  disabled,
  pattern
}) => {
  // const [search, setSearch] = useState('');
  const [isChoose, setIsChoose] = useState(true);
  const [type, setType] = useState('lead');

  const listTypes1 = [
    { name: 'lead', color: 'bg-blue-500' },
    { name: 'contact', color: 'bg-purple-700' }
  ];
  const listTypes2 = [
    { name: 'account', color: 'bg-indigo-500' },
    { name: 'asset_relationship', color: 'bg-orange-500' },
    { name: 'asset', color: 'bg-sky-700' },
    { name: 'campaign', color: 'bg-purple-500' },
    { name: 'case', color: 'bg-pink-500' },
    { name: 'communication_subscription_consent', color: 'bg-pink-500' },
    { name: 'contact_request', color: 'bg-teal-800' },
    { name: 'image', color: 'bg-blue-600' },
    { name: 'list_email', color: 'bg-neutral-400' },
    { name: 'operating_hours_holiday', color: 'bg-purple-700' },
    { name: 'opportunity', color: 'bg-orange-500' },
    { name: 'party_consent', color: 'bg-blue-500' },
    { name: 'product', color: 'bg-violet-800' }
  ];

  const colorIcon = useMemo(() => {
    const listTypes1 = [
      { name: 'lead', color: 'bg-blue-500' },
      { name: 'contact', color: 'bg-purple-700' }
    ];
    const listTypes2 = [
      { name: 'account', color: 'bg-indigo-500' },
      { name: 'asset_relationship', color: 'bg-orange-500' },
      { name: 'asset', color: 'bg-sky-700' },
      { name: 'campaign', color: 'bg-purple-500' },
      { name: 'case', color: 'bg-pink-500' },
      { name: 'communication_subscription_consent', color: 'bg-pink-500' },
      { name: 'contact_request', color: 'bg-teal-800' },
      { name: 'image', color: 'bg-blue-600' },
      { name: 'list_email', color: 'bg-neutral-400' },
      { name: 'operating_hours_holiday', color: 'bg-purple-700' },
      { name: 'opportunity', color: 'bg-orange-500' },
      { name: 'party_consent', color: 'bg-blue-500' },
      { name: 'product', color: 'bg-violet-800' }
    ];
    if (pattern === 'name') {
      for (let i = 0; i < listTypes1.length; i++) {
        if (type === listTypes1[i].name) return listTypes1[i].color;
      }
    }
    if (pattern === 'relation') {
      for (let i = 0; i < listTypes2.length; i++) {
        if (type === listTypes2[i].name) return listTypes2[i].color;
      }
    }
    return 'bg-blue-500';
  }, [type, pattern]);

  return (
    <div>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
          'flex h-fit items-center p-1',
          disabled && 'opacity-80',
          'transform-all duration-[50ms] ease-in-out',
          'rounded placeholder:text-opacity-50',
          'bg-input-background-light dark:bg-input-background-dark ',
          'border-[2px] border-input-stroke-light  dark:border-input-background-dark',
          !disabled && 'dark:hover:bg-button-background-dark',
          className
        )}
      >
        {isChoose === false && (
          <>
            <div>
              <DropDown
                defaultValue=''
                value=''
                divide={true}
                prefixIcon={
                  <div className='flex items-center'>
                    <img
                      className={cn('h-[24px] w-[24px] rounded-sm', colorIcon)}
                      src={`/src/assets/type-icon/${type}_icon.png`}
                      alt='icon'
                    />
                    <Icon name='arrow_drop_down' size='1' className='-m-1' />
                  </div>
                }
                className='m-0 border p-0 dark:border-input-background-dark dark:bg-input-background-dark'
                maxHeightList={300}
                maxWidthList={200}
                onValueChange={setType}
              >
                {pattern === 'name' && listTypes1.map((item) => <ItemType name={item.name} color={item.color} />)}
                {pattern === 'relation' && listTypes2.map((item) => <ItemType name={item.name} color={item.color} />)}
              </DropDown>
            </div>
          </>
        )}
        {isChoose === true && (
          <>
            <div className='flex w-full items-center justify-between rounded border-[2px] border-blue-200 py-1'>
              <div className='flex items-center'>
                <img
                  className='mx-2 h-[28px] w-[28px] rounded-sm bg-blue-500'
                  src='/src/assets/type-icon/lead_icon.png' // type = lead
                  alt='icon'
                />
                <span>Trần Toàn</span>
              </div>
              <Button
                className='mr-2 border-0 border-transparent bg-transparent p-0'
                onClick={() => setIsChoose(false)}
              >
                <Icon name='close' size='1rem' />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputRecordRelative;
