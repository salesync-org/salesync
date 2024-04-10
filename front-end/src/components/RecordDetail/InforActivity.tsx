import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/utils';
import { Button, DropDown, Icon, TextButton } from '../ui';
import { UUID } from 'crypto';

interface InforActivityStruct {
  id: UUID;
  type: string;
  subject: string;
  start: Date;
  end: Date;
  description: string;
}

interface InforActivityProps {
  className?: string;
  data: InforActivityStruct;
}

const InforActivity: React.FC<InforActivityProps> = ({ className, data }) => {
  const [expand, setExpand] = useState(false);
  const [iconName, setIconName] = useState('calendar_month');
  const [iconColor, setIconColor] = useState('bg-purple-400');
  const [dateStart, setDateStart] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  useEffect(() => {
    function formatDate(date: Date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();

      // Use template literals for cleaner string construction
      return `${day}/${month}/${year}`;
    }
    function formatTime(date: Date) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    if (data.type === 'event') {
      setIconName('calendar_month');
      setIconColor('bg-purple-400');
      setDateStart(formatDate(data.start));
      setTimeStart(formatTime(data.start));
      setDateEnd(formatDate(data.end));
      setTimeEnd(formatTime(data.end));
    }
    if (data.type === 'call') {
      setIconName('call_log');
      setIconColor('bg-teal-600');
      setDateStart(formatDate(data.start));
    }
    if (data.type === 'task') {
      setIconName('checklist');
      setIconColor('bg-green-600');
      setDateStart(formatDate(data.start));
    }
  }, [data]);

  return (
    <div className={cn('my-2', className)}>
      <div className='flex justify-between'>
        <div className='flex w-16'>
          <button onClick={() => setExpand(!expand)}>
            {expand && <Icon name='expand_more' size='1' />}
            {!expand && <Icon name='chevron_right' size='1' />}
          </button>
          <Icon name={iconName} className={cn('rounded p-0.5 text-white', iconColor)}></Icon>
        </div>
        <div className='flex w-full justify-between pl-4'>
          <TextButton text={data.subject} onClick={() => {}} />
          <div className='flex items-center'>
            {data.type === 'event' && <span className='mr-1'>{`${timeStart} |`}</span>}
            <span className='mr-3'>{`${dateStart}`}</span>

            <DropDown
              defaultValue=''
              value=''
              prefixIcon={<Icon name='arrow_drop_down' size='1' className='-m-1 ml-0' />}
              className='m-0 p-0'
            >
              <div className='h-fit'>
                {data.type === 'event' && (
                  <>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>New Opportunity</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Edit</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Delete</span>
                    </Button>
                  </>
                )}

                {data.type !== 'event' && (
                  <>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Edit Comments</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Change Date</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Create Follow-Up Task</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Change Status</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Change Priority</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Edit</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Delete</span>
                    </Button>
                    <Button
                      className={cn(
                        'flex w-full justify-start border border-white bg-white hover:border-button-stroke',
                        'dark:border-button-background-dark dark:hover:border-button-stroke-dark'
                      )}
                      onClick={() => {}}
                    >
                      <span className='text-nowrap'>Create Follow-Up Event</span>
                    </Button>
                  </>
                )}
              </div>
            </DropDown>
          </div>
        </div>
      </div>

      <div className='mt-1 table h-full w-full'>
        <div className='relative table-cell w-16'>
          <div className={cn('absolute right-5 top-0 h-full w-1', iconColor)}></div>
        </div>
        <div className='table-cell'>
          <div className='px-2'>
            <div className='px-2'>
              {data.type === 'event' && <span>You had an event</span>}
              {data.type === 'call' && <span>You logged a call</span>}
              {data.type === 'task' && <span>You had a task</span>}
            </div>
            {expand && (
              <div>
                <div className='w-full rounded border border-zinc-200 px-2'>
                  {data.type === 'event' && (
                    <div className='grid grid-cols-2'>
                      <div>
                        <div>Start</div>
                        <span>{`${timeStart}, `}</span>
                        <span>{dateStart}</span>
                      </div>
                      <div>
                        <div>End</div>
                        <span>{timeEnd}, </span>
                        <span>{dateEnd}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <span>Description</span>
                  </div>
                  <div>
                    <span>{data.description}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforActivity;
