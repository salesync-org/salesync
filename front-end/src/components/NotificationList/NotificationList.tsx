import { Bell } from '@/components/SaleSyncIcons';
import { Button, Item, Tooltip } from '../ui';
import { useRef, useState } from 'react';
import NotificationDropDown from './NotificationDropDown';
import { cn } from '@/utils/utils';

const NotificationList = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState<string>('1');

  return (
    <div className='relative'>
      {newMessageCount !== '' && !open && (
        <div
          className={cn(
            'absolute -right-1 top-6 z-[1002] flex aspect-square h-5 w-5 p-0',
            ' justify-center rounded-full bg-red-500 text-center align-text-top text-[0.7rem] font-semibold text-white',
            'box-content border-[2px] border-panel dark:border-panel-dark'
          )}
        >
          {newMessageCount}
        </div>
      )}
      <Button
        ref={ref}
        data-tooltip-id='viewNotification'
        data-tooltip-content={`Notifications ${newMessageCount !== '' ? `(${newMessageCount} new)` : ''}`}
        rounded='icon'
        className='z-[1001] h-10 w-10 border-text/10 p-0'
        intent={open ? 'primary' : 'normal'}
        onClick={() => {
          setOpen(!open);
          setNewMessageCount('');
        }}
      >
        <Bell strokeWidth={'2px'} name='notifications' className='size-[1.5rem]' />
      </Button>
      <Tooltip show={!open} id='viewNotification' />
      <NotificationDropDown
        triggerRef={ref}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className='right-[.25rem] top-[3rem] mt-0 w-80'
        divide={false}
      >
        <h2 className='my-2 p-4 text-[1.7rem]'>Notifications</h2>
        {Array.from({ length: 30 }).map((_, i) => (
          <Item
            key={i}
            title={`Notification ${i}`}
            onClick={() => {
              console.log(`Notification ${i} clicked`);
            }}
          />
        ))}
      </NotificationDropDown>
    </div>
  );
};

export default NotificationList;
