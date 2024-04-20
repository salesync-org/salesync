import { Button, Icon, Switch, PrimaryButton } from '@/components/ui';
import { useState } from 'react';
import ButtonActivity from './ButtonActivity';
import InforActivity from './InforActivity';

const RecordActivity = () => {
  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);
  // expand: upcoming and overdue
  // expand2: this month

  const [showActivity, setShowActivity] = useState(true);
  const [isButtonActivity, setIsButtonActivity] = useState(false);

  const date = new Date(); // value test
  //
  const dataActivity = [
    // only 'event' has 'start' and 'end'
    {
      id: '97cbbf51-9c3b-4152-afc5-a9a330bd908b',
      type: 'event',
      subject: 'event1',
      start: date,
      end: date,
      description: 'abc'
    },
    {
      id: '7f6691f2-9d67-49f0-a6f9-3505c775040c',
      type: 'event',
      subject: 'event2',
      start: date,
      end: date,
      description: 'abc'
    },
    {
      id: '010487d1-6979-4659-966c-d9920d7c6ea4',
      type: 'call',
      subject: 'call1',
      start: date,
      end: date,
      description: 'abc'
    },
    {
      id: 'f74ed33e-da98-4e88-9c3c-025465b0415b',
      type: 'call',
      subject: 'call2',
      start: date,
      end: date,
      description: 'abc'
    },
    {
      id: '45bfa24c-b7d8-44a7-8e07-88c204c5bc9d',
      type: 'task',
      subject: 'task1',
      start: date,
      end: date,
      description: 'abc'
    }
  ];

  return (
    <div>
      <div className='flex flex-wrap'>
        <ButtonActivity
          name='Email'
          icon='mail'
          color='bg-neutral-400'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
        <ButtonActivity
          name='New Event'
          icon='calendar_month'
          color='bg-purple-400'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
        <ButtonActivity
          name='Log a Call'
          icon='call_log'
          color='bg-teal-600'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
        <ButtonActivity
          name='New Task'
          icon='checklist'
          color='bg-green-400'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
      </div>

      <div className='bg z-[10] my-4 flex w-fit rounded px-3'>
        <Icon name='face_2' className='mr-2 text-blue-500 dark:text-link-text-dark'></Icon>
        <span>Only show activities with insights</span>
        <Switch onClick={() => setShowActivity(!showActivity)} checked={false} className='z-10 ml-2'></Switch>
      </div>

      <div className='flex flex-row-reverse'>
        <button className='text-blue-500 hover:text-blue-800'>Expand All</button>
        <span className='m-2'> • </span>
        <button className='text-blue-500 hover:text-blue-800'>Refresh</button>
      </div>

      <div>
        <Button
          className='my-2 flex w-full justify-start'
          onClick={() => setExpand(!expand)}
          title='Upcoming & Overdue'
        >
          {expand && <Icon name='expand_more' size='1' />}
          {!expand && <Icon name='chevron_right' size='1' />}
          <span className='font-bold'>Upcoming & Overdue</span>
        </Button>
        {expand && (
          <>
            <div className='flex justify-center'>
              <span>No activities to show.</span>
            </div>
            <div className='flex justify-center'>
              <span>Get started by sending an email, scheduling a task, and more.</span>
            </div>
          </>
        )}
      </div>

      {showActivity && (
        <>
          <div>
            <Button
              className='my-2 flex w-full justify-between'
              onClick={() => setExpand2(!expand2)}
              title='March • 2024'
            >
              <div className='item-center flex'>
                {expand2 && <Icon name='expand_more' size='1' />}
                {!expand2 && <Icon name='chevron_right' size='1' />}
                <span className='font-bold'>April • 2024</span>
              </div>
              <span className='font-bold'>This Month</span>
            </Button>
            {expand2 && (
              <>
                {dataActivity.map((item) => (
                  <InforActivity data={item} />
                ))}
              </>
            )}
          </div>
        </>
      )}

      <PrimaryButton className='mx-auto mb-12 mt-4' onClick={() => {}}>
        <span>Show All Activities</span>
      </PrimaryButton>
    </div>
  );
};

export default RecordActivity;
