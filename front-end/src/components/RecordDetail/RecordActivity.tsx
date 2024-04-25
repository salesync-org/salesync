/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Icon, PrimaryButton, Switch } from '@/components/ui';
import { useState } from 'react';
import ButtonActivity from './ButtonActivity';
import InforActivity from './InforActivity';

type RecordActivityProps = {
  relations: any[];
};

const RecordActivity = ({ relations }: RecordActivityProps) => {
  const [expand, setExpand] = useState(false);
  // expand: upcoming and overdue
  // expand2: this month

  const [showActivity, setShowActivity] = useState(true);
  const [isButtonActivity, setIsButtonActivity] = useState(false);

  const activityRelations = relations.filter(
    (relation) => relation.destination_record.type.template.name === 'Activity'
  );

  const refreshActivity = () => {};

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
        <button className='text-blue-500 hover:text-blue-800' onClick={() => refreshActivity}>
          Refresh
        </button>
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
            {activityRelations!.length > 0 ? (
              activityRelations?.map((item) => (
                <InforActivity data={item.destination_record.properties} type={item.destination_record.type} />
              ))
            ) : (
              <div>Get started by sending an email, scheduling a task, and more.</div>
            )}
          </>
        )}
      </div>
      <PrimaryButton className='mx-auto mb-12 mt-4' onClick={() => {}}>
        <span>Show All Activities</span>
      </PrimaryButton>
    </div>
  );
};

export default RecordActivity;
