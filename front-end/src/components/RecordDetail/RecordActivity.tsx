/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Icon, PrimaryButton } from '@/components/ui';
import { useState } from 'react';
import ButtonActivity from './ButtonActivity';
import InforActivity from './InforActivity';
// const iconBaseUrl = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/system/icons`;

type RecordActivityProps = {
  relations: any[];
};

const RecordActivity = ({ relations }: RecordActivityProps) => {
  const [expand, setExpand] = useState(false);
  // expand: upcoming and overdue
  // expand2: this month

  const [isButtonActivity, setIsButtonActivity] = useState(false);

  const activityRelations = relations.filter(
    (relation) => relation.destination_record.type.template.name === 'Activity'
  );

  return (
    <div>
      <div className='my-4 flex flex-wrap space-x-2'>
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
        {/* <ButtonActivity
          name='Email'
          icon={`${iconBaseUrl}/salesync_email.png`}
          color='bg-neutral-400'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
        <ButtonActivity
          name='New Event'
          icon={`${iconBaseUrl}/salesync_event.png`}
          color='bg-purple-400'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
        <ButtonActivity
          name='Log a Call'
          icon={`${iconBaseUrl}/salesync_call.png`}
          color='bg-teal-600'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity}
        />
        <ButtonActivity
          name='New Task'
          icon={`${iconBaseUrl}/salesync_task.png`}
          color='bg-green-400'
          disabled={isButtonActivity}
          setDisabled={setIsButtonActivity} */}
      </div>

      <div>
        <Button
          className='my-2 flex w-full justify-start'
          onClick={() => setExpand(!expand)}
          title='Upcoming & Overdue'
        >
          {expand && <Icon name='expand_more' size='1rem' />}
          {!expand && <Icon name='chevron_right' size='1rem' />}
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
