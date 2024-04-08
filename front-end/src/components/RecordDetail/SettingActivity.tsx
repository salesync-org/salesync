import { useState, useRef } from 'react';
import { Button, Icon, PrimaryButton, RadioGroupInput } from '@/components/ui';
import { cn } from '@/utils/utils';
import useClickOutside from '@/hooks/useClickOutside';

const SettingActivity = () => {
  const [intent, setIntent] = useState('normal');
  const [isOpen, setIsOpen] = useState(false);
  const [dataRangeResult, setDataRangeResult] = useState('Within 2 months');
  const [activityToShowResult, setActivityToShowResult] = useState('All activities');
  const [sortActivityResult, setSortActivityResult] = useState('Newest dates first');

  const dataRange = ['Within 2 months', 'Next 7 days', 'Last 7 days', 'Last 30 days', 'Last 6 months', 'All time'];
  const activityToShow = ['All activities', 'My activities'];
  const activityType = [
    'All types',
    'Email',
    'Events',
    'Completed cadence tasks',
    'List email',
    'Logged calls',
    'Tasks'
  ];
  const sortActivity = ['Oldest dates first', 'Newest dates first'];

  const settingBoard = useRef<HTMLDivElement>(null);

  useClickOutside([settingBoard], () => {
    setIntent('normal');
    setIsOpen(false);
  });

  return (
    <div ref={settingBoard}>
      <Button
        className='ml-2 p-3'
        onClick={() => {
          if (intent === 'normal') {
            setIntent('primary');
            setIsOpen(true);
          } else {
            setIntent('normal');
            setIsOpen(false);
          }
        }}
        title='Timeline Settings'
        intent={intent}
      >
        <Icon name='settings'></Icon>
      </Button>

      {isOpen && (
        <div
          className={cn(
            'fixed bottom-5 right-10 flex h-fit w-[420px] flex-col rounded',
            'bg-white shadow-2xl shadow-button-background-dark/10 dark:bg-panel-dark',
            'border border-button-stroke dark:border-button-stroke-dark ',
            'z-[110]'
          )}
        >
          <div className='rounded px-7 pt-5'>
            <Button
              onClick={() => {
                setIntent('normal');
                setIsOpen(false);
              }}
              className='absolute right-0 top-0 m-0 border-0 border-panel p-2 dark:bg-panel-dark'
            >
              <Icon name='close'></Icon>
            </Button>

            <div className='mb-5'>
              <span> DATE RANGE </span>
              <RadioGroupInput
                labels={dataRange}
                value={dataRangeResult}
                onValueChange={setDataRangeResult}
                className='ml-3 mt-1 grid grid-cols-2'
                size='small'
              ></RadioGroupInput>
            </div>

            <div className='mb-5'>
              <span> ACTIVITIES TO SHOW </span>
              <RadioGroupInput
                labels={activityToShow}
                value={activityToShowResult}
                onValueChange={setActivityToShowResult}
                className='ml-3 mt-1 grid grid-cols-2'
                size='small'
              ></RadioGroupInput>
            </div>

            <div className='mb-5'>
              <span> ACTIVITY TYPE </span>
            </div>

            <div className='mb-5'>
              <span> SORT UPCOMING & OVERDUE ACTIVITIES </span>
              <RadioGroupInput
                labels={sortActivity}
                value={sortActivityResult}
                onValueChange={setSortActivityResult}
                className='ml-3 mt-1'
                size='small'
              ></RadioGroupInput>
            </div>
          </div>

          <div className='flex w-full justify-between rounded border border-button-stroke bg-panel p-4 dark:bg-panel-dark'>
            <div>
              <Button onClick={() => {}} disabled>
                Restore Defaults
              </Button>
            </div>
            <div className='flex gap-3'>
              <Button onClick={() => {}}>Apply & Save</Button>
              <PrimaryButton onClick={() => {}}>Apply</PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingActivity;
