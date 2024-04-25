import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/utils';
import { Button, DropDown, Icon, TextButton } from '../ui';

interface InforActivityStruct {
  id: string;
  property_name: string;
  property_label: string;
  item_value: string;
}

interface InforActivityProps {
  className?: string;
  data: InforActivityStruct[];
  type: Type;
}

const InforActivity: React.FC<InforActivityProps> = ({ className, data, type }) => {
  console.log(data);
  const [expand, setExpand] = useState(false);
  const [iconName, setIconName] = useState('calendar_month');
  const [iconColor, setIconColor] = useState('bg-purple-400');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const subject = data?.find((data) => data.property_name === 'Name')?.item_value;
  const description = data?.find((data) => data.property_name === 'Description')?.item_value;
  const comments = data?.find((data) => data.property_label === 'Comment')?.item_value;
  const start = data?.find((data) => data.property_label === 'Start')?.item_value;
  const end = data?.find((data) => data.property_label === 'End')?.item_value;

  useEffect(() => {
    function convertDateTimeFormat(dateTimeString: string) {
      try {
        // Create a Date object from the timestamp string
        const dateObject = new Date(dateTimeString);

        // Format the date using desired format specifiers
        const year = dateObject.getFullYear().toString().padStart(4, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}, ${day}-${month}-${year}`;
      } catch (error) {
        return 'Invalid datetime format';
      }
    }
    function convertDateFormat(dateTimeString: string) {
      try {
        // Create a Date object from the timestamp string
        const dateObject = new Date(dateTimeString);

        // Format the date using desired format specifiers
        const year = dateObject.getFullYear().toString().padStart(4, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');

        return `${day}-${month}-${year}`;
      } catch (error) {
        return 'Invalid datetime format';
      }
    }

    console.log({ type });
    if (type.name === 'Event') {
      setIconName('calendar_month');
      setIconColor('bg-purple-400');
      setDateStart(convertDateTimeFormat(start!));
      setDateEnd(convertDateTimeFormat(end!));
    }
    if (type.name === 'Call') {
      setIconName('call_log');
      setIconColor('bg-teal-600');
      setDateStart(convertDateFormat(start!));
    }
    if (type.name === 'Task') {
      setIconName('checklist');
      setIconColor('bg-green-600');
      setDateStart(convertDateFormat(start!));
    }
  }, [type, start, end]);

  return (
    <div className={cn('my-2', className)}>
      <div className='flex justify-between'>
        <div className='flex w-16'>
          <button onClick={() => setExpand(!expand)}>
            {expand && <Icon name='expand_more' size='1' />}
            {!expand && <Icon name='chevron_right' size='1' />}
          </button>
          <Icon name={iconName} className={cn('w-fit rounded  p-1 text-white', iconColor)}></Icon>
        </div>
        <div className='flex w-full justify-between pl-4'>
          <TextButton text={subject!} onClick={() => {}} />
          <div className='flex items-center'>
            {/* {type === 'Event' && <span className='mr-1'>{`${timeStart} |`}</span>} */}
            {/* <span className='mr-3'>{`${dateStart}`}</span> */}
            <span className='mr-1'>{dateStart}</span>

            <DropDown
              defaultValue=''
              value=''
              prefixIcon={<Icon name='arrow_drop_down' size='1' />}
              className='m-0 p-0'
            >
              <div className='h-fit'>
                {type.name === 'Event' && (
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

                {type.name !== 'Event' && (
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
          <div className={cn('absolute right-4 top-0 h-full w-1', iconColor)}></div>
        </div>
        <div className='table-cell'>
          <div className='px-2'>
            <div className='px-2'>
              {type.name === 'Event' && <span>You had an event</span>}
              {type.name === 'Call' && <span>You logged a call</span>}
              {type.name === 'Task' && <span>You had a task</span>}
            </div>
            {expand && (
              <div>
                <div className='w-full rounded border border-zinc-200 px-2'>
                  {type.name === 'Event' && (
                    <div className='grid grid-cols-2'>
                      <div>
                        <div>Start</div>
                        <span>{dateStart}</span>
                      </div>
                      <div>
                        <div>End</div>
                        <span>{dateEnd}</span>
                      </div>
                    </div>
                  )}
                  {type.name === 'Event' ? (
                    <>
                      <div>
                        <span>Description</span>
                      </div>
                      <div>
                        <span>{description}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span>Comments</span>
                      </div>
                      <div>
                        <span>{comments}</span>
                      </div>
                    </>
                  )}
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
