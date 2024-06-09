import { Bell } from '@/components/SaleSyncIcons';
import { Button, Skeleton, Tooltip } from '../ui';
import { useEffect, useRef, useState } from 'react';
import NotificationDropDown from './NotificationDropDown';
import { cn } from '@/utils/utils';
import useNotification from '@/hooks/useNotification';
import useAuth from '@/hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
const AVATAR_URL = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/`;
// ${user?.avatar_url}-48.jpg?lastmod=${Date.now()}`

const NotificationList = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const {
    notifications,
    newMessageCount,
    clearNewNotificationCount,
    fetchNotifications,
    // readAllMessage,
    readMessage
  } = useNotification();
  const [open, setOpen] = useState(false);
  const [newMessageString, setNewMessageString] = useState<string>('0');
  const { user, getSimpleUser } = useAuth();
  const { companyName = '' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newMessageCount) {
      return;
    }
    if (newMessageCount > 9) {
      setNewMessageString('9+');
    } else {
      setNewMessageString(newMessageCount.toString());
    }
  }, [newMessageCount]);

  const filterContent = (content: string) => {
    const preCheckedMessageChunks = content.split('${');
    const messageChunks: MessageChunk[] = [];
    preCheckedMessageChunks.map((chunk) => {
      if (chunk.includes('}')) {
        const checkedMessageChunks = chunk.split('}');
        const simpleUser = getSimpleUser(checkedMessageChunks[0]);
        messageChunks.push({
          type: 'mention',
          content: simpleUser
            ? simpleUser.user_id === user?.user_id
              ? 'You'
              : `${simpleUser.first_name} ${simpleUser.last_name}`
            : 'Somebody'
        });
        if (checkedMessageChunks.length > 1) {
          messageChunks.push({
            type: 'text',
            content: checkedMessageChunks[1]
          });
        }
      } else {
        messageChunks.push({
          type: 'text',
          content: chunk
        });
      }
    });
    return messageChunks;
  };

  return (
    <div className='relative'>
      {newMessageString !== '' && newMessageString !== '0' && !open && (
        <div
          className={cn(
            'absolute -right-1 top-6 z-[1002] flex aspect-square h-5 w-5 p-0',
            ' justify-center rounded-full bg-red-500 text-center align-text-top text-[0.7rem] font-semibold text-white',
            'box-content border-[2px] border-panel dark:border-panel-dark'
          )}
        >
          {newMessageString}
        </div>
      )}
      <Button
        ref={ref}
        data-tooltip-id='viewNotification'
        data-tooltip-content={`Notifications ${newMessageString !== '' ? `(${newMessageString} new)` : ''}`}
        rounded='icon'
        className='z-[1001] h-10 w-10 border-text/10 p-0'
        intent={open ? 'primary' : 'normal'}
        onClick={() => {
          setOpen(!open);
          setNewMessageString('');
          clearNewNotificationCount();
          fetchNotifications();
          // readAllMessage();
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
        {notifications ? (
          notifications.length > 0 ? (
            notifications.map((notification) => {
              const chunks = filterContent(notification.content);
              const props: NotificationItemProps = {
                id: notification.id,
                title: notification.title,
                url: notification.url,
                action: notification.action,
                senderId: notification.sender_id,
                isRead: notification.is_read,
                message: chunks
              };
              return (
                <div
                  className={cn(`flex cursor-pointer rounded-sm`)}
                  onClick={() => {
                    readMessage(notification.id);
                    navigate(`/${companyName}/section/sales/${notification.url.slice(1)}`);
                  }}
                >
                  <NotificationItem {...props} />
                </div>
              );
            })
          ) : (
            <div className='flex h-40 items-center justify-center'>
              <div className='text-secondary-text-light dark:text-secondary-text-dark text-center'>
                No notifications
              </div>
            </div>
          )
        ) : (
          <NotificationSkeletion />
        )}
      </NotificationDropDown>
    </div>
  );
};

type MessageChunk = {
  type: 'text' | 'mention';
  content: string;
};

type NotificationItemProps = {
  id: string;
  title: string;
  url: string;
  action: string;
  senderId: string;
  isRead: boolean;
  message: MessageChunk[];
};

const NotificationItem = ({ id, title, isRead, senderId, message, ...props }: NotificationItemProps) => {
  const [simpleUser, setSimpleUser] = useState<SimpleUser | null>(null);
  const { getSimpleUser } = useAuth();
  useEffect(() => {
    const thisUser = getSimpleUser(senderId);
    setSimpleUser(thisUser ?? null);
  }, [message, getSimpleUser]);

  return (
    <div
      className={cn(
        'flex flex-grow cursor-pointer items-center rounded-sm px-2 py-2 align-middle',
        'hover:bg-secondary-light/40 dark:hover:bg-secondary-dark/40',
        'hover:text-link-text-light  dark:hover:text-link-text-dark'
      )}
      onClick={() => {}}
      {...props}
    >
      <div className='overflow-hidden text-ellipsis rounded-full pr-4 align-middle'>
        <img
          className='aspect-square w-12 min-w-12 rounded-full'
          src={`${AVATAR_URL}${simpleUser ? simpleUser.avatar_url : 'default'}-128.jpg`}
        ></img>
      </div>
      <div>
        <div className='text-sm font-semibold text-link-text-light dark:text-link-text-dark'>{title}</div>
        <div className='text-secondary-text-light dark:text-secondary-text-dark text-xs'>
          {message &&
            message.map((chunk, index) => (
              <span key={index} className={cn(chunk.type === 'mention' && 'font-semibold')}>
                {chunk.content}
              </span>
            ))}
        </div>
      </div>
      <div className='ml-auto max-w-6'>
        <div className={cn('transparent mx-2  aspect-square h-3 w-3  rounded-full', !isRead && 'bg-primary')}></div>
      </div>
    </div>
  );
};

const NotificationSkeletion = () => {
  return (
    <section className='flex h-fit flex-col space-y-4 overflow-hidden opacity-50 dark:opacity-90'>
      <div className='grid w-full grid-cols-[auto_1fr] justify-center gap-3'>
        <div className='aspect-square w-14'>
          <Skeleton width='100%' height='100%' borderRadius='50%' />
        </div>
        <div className='space-y-2'>
          <Skeleton width='100%' height='1rem' borderRadius='4px' />
          <Skeleton width='70%' height='1rem' borderRadius='4px' />
          <Skeleton width='40%' height='1rem' borderRadius='4px' />
        </div>
      </div>
      <div className='grid w-full grid-cols-[auto_1fr] justify-center gap-3'>
        <div className='aspect-square w-14'>
          <Skeleton width='100%' height='100%' borderRadius='50%' />
        </div>
        <div className='space-y-2'>
          <Skeleton width='100%' height='1rem' borderRadius='4px' />
          <Skeleton width='70%' height='1rem' borderRadius='4px' />
          <Skeleton width='40%' height='1rem' borderRadius='4px' />
        </div>
      </div>
      <div className='grid w-full grid-cols-[auto_1fr] justify-center gap-3'>
        <div className='aspect-square w-14'>
          <Skeleton width='100%' height='100%' borderRadius='50%' />
        </div>
        <div className='space-y-2'>
          <Skeleton width='100%' height='1rem' borderRadius='4px' />
          <Skeleton width='70%' height='1rem' borderRadius='4px' />
          <Skeleton width='40%' height='1rem' borderRadius='4px' />
        </div>
      </div>
    </section>
  );
};

export default NotificationList;
