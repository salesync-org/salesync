import React, { useState } from 'react';
import {
  Button,
  Icon,
  ButtonGroup,
  PrimaryButton,
  TextInput,
  TextArea,
  DateInput,
  DropDown,
  TextButton
} from '@/components/ui';
import { cn } from 'utils/utils';
import InputRecordRelative from './InputRecordRelative';

interface ButtonActivityProps {
  name: 'Email' | 'New Event' | 'Log a Call' | 'New Task';
  icon: string;
  color?: string;
  className?: string;
  disabled?: boolean;
  setDisabled?: (disabled: boolean) => void;
}

const ButtonActivity: React.FC<ButtonActivityProps> = ({ icon, name, className, color = 'bg-neutral-400', disabled = false, setDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  const setType = () => {
    if (name === 'Email') return 'email';
    if (name === 'New Event') return 'event';
    if (name === 'Log a Call') return 'call';
    if (name === 'New Task') return 'task';
  };
  const [typeActivity, setTypeActivity] = useState(setType()); // email, event, call, task

  let isDisabledTriangleButton = false;
  if (name === 'New Task') isDisabledTriangleButton = true;

  return (
    <div>
      <ButtonGroup className='mb-1 mr-1'>
        <Button
          onClick={() => {
            if (name === 'New Event' || name === 'New Task') {
              // init date and time now
              const date = new Date();
              const currentDate = date.toLocaleDateString();
              const currentTime = date.toLocaleTimeString();
              const arrDate = currentDate.split('/');
              const arrTime = currentTime.split(/[/:\s]/);
              if (arrDate[0].length === 1) arrDate[0] = '0' + arrDate[0];
              if (arrDate[1].length === 1) arrDate[1] = '0' + arrDate[1];
              if (arrTime[3] === 'PM' && arrTime[0] !== '12') arrTime[0] = (Number(arrTime[0]) + 12).toString();
              if (arrTime[3] === 'AM' && arrTime[0] === '12') arrTime[0] = '00';
              const fineTuneCurrentDate = arrDate[2] + '-' + arrDate[0] + '-' + arrDate[1]; //yyyy-mm-dd
              const fineTuneCurrentTime = arrTime[0] + ':' + arrTime[1]; //hh:mm
              setDateStart(fineTuneCurrentDate);
              setTimeStart(fineTuneCurrentTime);
              setDateEnd(fineTuneCurrentDate);
              setTimeEnd(fineTuneCurrentTime);
            }
            setIsOpen(true);
            setDisabled && setDisabled(true);
          }}
          title={name}
          disabled={disabled} // disable button
        >
          <div className='flex items-center'>
            <Icon name={icon} className={cn('mr-1 rounded p-0.5 text-white', color, className)}></Icon>
            <span className='text-blue-500 dark:text-link-text-dark'>{name}</span>
          </div>
        </Button>

        <DropDown
          defaultValue=''
          value=''
          prefixIcon={<Icon name='arrow_drop_down' size='1' className='ml-1' />}
          className='m-0 p-0'
          disabled={disabled === true ? disabled : isDisabledTriangleButton}
          align='left'
        >
          <div className='h-fit'>
            {name === 'Email' && (
              <>
                <Button
                  className='flex w-full justify-start border-0 border-button-background dark:border-button-background-dark'
                  onClick={() => {
                    setTypeActivity('task');
                    setIsOpen(true);
                  }}
                >
                  <Icon name='checklist' className='mr-1'></Icon>
                  <span className='text-nowrap'>Add Email to To Do List</span>
                </Button>
                <hr />
                <div className='p-3'>
                  <p className='font-bold'>Email</p>
                  <TextButton
                    onClick={() => {
                      setTypeActivity('email');
                      setIsOpen(true);
                    }}
                    text='trantoan@gmail.com'
                  ></TextButton>
                </div>
                <hr />
                <Button
                  className='flex w-full justify-start border-0 border-button-background dark:border-button-background-dark'
                  onClick={() => {}}
                >
                  <Icon name='settings' className='mr-1'></Icon>
                  <span className='text-nowrap'>Set My Email Preferences</span>
                </Button>
              </>
            )}

            {name === 'New Event' && (
              <>
                <Button
                  className='flex w-full justify-start border-0 border-button-background dark:border-button-background-dark'
                  onClick={() => {}}
                >
                  <Icon name='open_in_new' className='mr-1'></Icon>
                  <span className='text-nowrap'>View Calendar</span>
                </Button>
              </>
            )}

            {name === 'Log a Call' && (
              <>
                <Button
                  className='flex w-full justify-start border-0 border-button-background dark:border-button-background-dark'
                  onClick={() => {
                    setTypeActivity('task');
                    setIsOpen(true);
                  }}
                >
                  <Icon name='checklist' className='mr-1'></Icon>
                  <span className='text-nowrap'>Add Call to To Do List</span>
                </Button>
                <hr />
                <div className='p-3'>
                  <p className='font-bold'>Call</p>
                  <TextButton onClick={() => {}} text='0123456789'></TextButton>
                </div>
              </>
            )}
          </div>
        </DropDown>
      </ButtonGroup>

      <nav
        className={cn(
          'fixed bottom-0 right-4 flex h-[500px] w-[470px] flex-col rounded',
          'bg-white shadow-2xl shadow-button-background-dark/10 transition-all duration-200 dark:bg-panel-dark',
          'border-[2px] border-button-stroke dark:border-button-stroke-dark',
          isOpen ? 'translate-y-0' : 'translate-y-[100%]',
          'z-[110]'
        )}
      >
        <div className='flex h-[40px] items-center justify-between border-b-2 border-primary-stroke px-4 dark:border-primary-stroke-dark'>
          <div className='flex items-center'>
            <Icon
              name={cn(typeActivity === 'task' ? 'checklist' : icon)}
              className={cn('mr-1 rounded p-0.5 text-white', typeActivity === 'task' ? 'bg-green-400' : color)}
            ></Icon>
            <h2 className='text-base font-normal leading-5'>
              {subject ? subject : cn(typeActivity === 'task' ? 'New Task' : name)}
            </h2>
          </div>
          <div className='flex gap-2'>
            <span title='Minimize'>
              <Icon name='minimize' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
            <span title='Maximize'>
              <Icon name='pan_zoom' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
            <span
              title='Close'
              onClick={() => {
                setIsOpen(false);
                setTypeActivity(setType());
                setDisabled && setDisabled(false);
              }}
            >
              <Icon name='close' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
          </div>
        </div>

        <div className='flex h-[400px] overflow-y-auto'>
          <form className='w-full p-4'>
            {typeActivity === 'email' && <></>}

            {typeActivity !== 'email' && (
              <>
                <TextInput
                  header='Subject'
                  className='mb-5 w-full'
                  postfixIcon='search'
                  onChange={(e) => setSubject(e.target.value)}
                />

                {typeActivity === 'event' && (
                  <>
                    {/* description */}
                    <TextArea header='Description' className='mb-5' />

                    {/* date time */}
                    <div className='grid grid-cols-2 gap-2'>
                      <div>
                        <span className='font-semibold'>Start</span>
                        <div className='grid grid-cols-2'>
                          <DateInput
                            header='* Date'
                            type='date'
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                          />
                          <DateInput
                            header='* Time'
                            type='time'
                            value={timeStart}
                            onChange={(e) => setTimeStart(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <span className='font-semibold'>End</span>
                        <div className='grid grid-cols-2'>
                          <DateInput
                            header='* Date'
                            type='date'
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                          />
                          <DateInput
                            header='* Time'
                            type='time'
                            value={timeEnd}
                            onChange={(e) => setTimeEnd(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {typeActivity === 'call' && (
                  <div>
                    {/* Comments */}
                    <TextArea header='Comments' className='mb-5' />
                  </div>
                )}

                {typeActivity === 'task' && (
                  <div className='grid grid-cols-2 gap-3'>
                    <DateInput
                      header='Due Date'
                      type='date'
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                    <InputRecordRelative header='* Assigned To' pattern='assign' />
                  </div>
                )}

                {/* Name and Relative to */}
                <div className='mt-5 grid grid-cols-2 gap-2'>
                  <InputRecordRelative header='Name' pattern='name' />
                  <InputRecordRelative header='Relative To' pattern='relation' />
                </div>

                {typeActivity === 'event' && (
                  <div className='mt-5'>
                    <div>
                      <span>Attendees</span>
                    </div>
                    <TextButton
                      text='People'
                      className='mt-2 border-b-[3px] border-blue-400 px-3 py-1 font-bold text-text hover:border-blue-500 hover:text-text hover:no-underline'
                      onClick={() => {}}
                    />
                    <div className='border-b-[2px]'></div>

                    <div className='mt-3'>
                      <TextInput placeholder='Search People...' className='w-full' />
                    </div>
                    <div className='rounded h-fit border py-1'></div>

                    <div className='h-12'></div>
                  </div>
                )}
              </>
            )}
          </form>
        </div>

        <div className='absolute bottom-0 flex h-[50px] w-full items-center justify-end border border-button-stroke bg-panel pr-2 dark:border-button-stroke-dark dark:bg-panel-dark'>
          <PrimaryButton
            onClick={() => {
              console.log('Start', dateStart, timeStart);
              console.log('End', dateEnd, timeEnd);
            }}
          >
            Save
          </PrimaryButton>
        </div>
      </nav>
    </div>
  );
};

export default ButtonActivity;
