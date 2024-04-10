import React, { useMemo, useState } from 'react';
import { cn } from '@/utils/utils';
import { DropDown, Icon, Button, TextInput } from '../ui';
import ItemType from './ItemType';

interface InputRecordRelativeProps {
  header?: string;
  showHeader?: boolean;
  className?: string;
  pattern: 'name' | 'relation' | 'assign';
}

const InputRecordRelative: React.FC<InputRecordRelativeProps> = ({ header, showHeader = true, className, pattern }) => {
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
  const listTypes3 = [
    { name: 'people', color: 'bg-blue-500' },
    { name: 'queue', color: 'bg-blue-500' },
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
    const listTypes3 = [
      { name: 'people', color: 'bg-blue-500' },
      { name: 'queue', color: 'bg-blue-500' },
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
    if (pattern === 'assign') {
      for (let i = 0; i < listTypes3.length; i++) {
        if (type === listTypes3[i].name) return listTypes3[i].color;
      }
    }
    return 'bg-blue-500';
  }, [type, pattern]);

  return (
    <div>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div className={cn('flex h-fit items-center p-1', className)}>
        {isChoose === false && (
          <TextInput
            postfixIcon='search'
            prefixIconNode={
              <DropDown
                defaultValue=''
                value=''
                divide={true}
                prefixIcon={
                  <div className='flex w-fit items-center'>
                    <img
                      className={cn('h-[24px] w-[24px] rounded-sm', colorIcon)}
                      src={`/src/assets/type-icon/${type}_icon.png`}
                      alt='icon'
                    />
                    <Icon name='arrow_drop_down' size='1' className='-m-1' />
                  </div>
                }
                className='m-0 w-fit border p-0 dark:border-input-background-dark dark:bg-input-background-dark'
                maxHeightList={300}
                maxWidthList={200}
                onValueChange={setType}
              >
                {pattern === 'name' && listTypes1.map((item) => <ItemType name={item.name} color={item.color} />)}
                {pattern === 'relation' && listTypes2.map((item) => <ItemType name={item.name} color={item.color} />)}
                {pattern === 'assign' && listTypes3.map((item) => <ItemType name={item.name} color={item.color} />)}
              </DropDown>
            }
            className='h-[46px] py-2'
          />
          
        )}
        {isChoose === true && (
          <div className='w-full rounded border-[2px] border-input-stroke-light p-1  dark:border-input-background-dark'>
            <div className='flex w-full items-center justify-between rounded border-[2px] border-input-stroke-light p-1  py-1 dark:border-input-background-dark'>
              <div className='flex items-center'>
                <img
                  className='mx-2 h-[28px] w-[28px] rounded-sm bg-blue-500'
                  src='/src/assets/type-icon/lead_icon.png' // type = lead
                  alt='icon'
                />
                <span>Trần Toàn</span>
              </div>
              <Button
                className='mr-2 border-0 border-transparent bg-transparent p-0 dark:border-transparent dark:bg-transparent'
                onClick={() => setIsChoose(false)}
              >
                <Icon name='close' size='1rem' />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputRecordRelative;
