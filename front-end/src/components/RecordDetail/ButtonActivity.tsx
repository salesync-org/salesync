import React, { useState } from 'react';
import {
  Button,
  Icon,
  ButtonGroup,
  DropDownList,
  Item,
  PrimaryButton,
  TextInput,
  TextArea,
  DateInput
} from '@/components/ui';
import { cn } from 'utils/utils';

interface ButtonActivityProps {
  name?: string;
  icon: string;
  color?: string;
  open: boolean;
  onClose: (value: boolean) => void;
  className?: string;
}
// open: state to manage mini popup (button triangle on the right)
// onClose: change value of 'open' parameter

const ButtonActivity: React.FC<ButtonActivityProps> = ({ icon, name, className, color, open, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');

  return (
    <>
      <ButtonGroup className='mb-1 mr-1'>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          title={name}
        >
          <div className='flex items-center'>
            <Icon
              name={icon}
              className={cn('mr-1 rounded p-0.5 text-white', color ? color : 'bg-teal-600', className)}
            ></Icon>
            <span className='text-blue-500'>{name}</span>
          </div>
        </Button>

        <DropDownList
          open={open}
          onClose={() => {
            onClose(false);
          }}
        >
          <Item title='abc' />
        </DropDownList>

        <Button zoom={false} intent='normal' className='px-1' onClick={() => onClose(true)}>
          <Icon name='arrow_drop_down' size='1'></Icon>
        </Button>
      </ButtonGroup>

      <nav
        className={cn(
          'fixed bottom-0 right-4 flex h-[500px] w-[470px] flex-col rounded  bg-panel shadow-2xl shadow-button-background-dark/10 transition-all duration-200 dark:bg-panel-dark',
          'border-[2px] border-button-stroke dark:border-button-stroke-dark ',
          isOpen ? 'translate-y-0' : 'translate-y-[100%]',
          'z-[110]'
        )}
      >
        <div className='flex h-[40px] items-center justify-between border-b-2 border-primary-stroke px-4 dark:border-primary-stroke-dark'>
          <div className='flex items-center'>
            <Icon name={icon} className={cn('mr-1 rounded p-0.5 text-white', color ? color : 'bg-teal-600')}></Icon>
            <h2 className='text-base font-normal leading-5'>{subject ? subject : name}</h2>
          </div>
          <div className='flex gap-2'>
            <span title='Minimize'>
              <Icon name='minimize' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
            <span title='Maximize'>
              <Icon name='pan_zoom' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
            <span title='Close' onClick={() => setIsOpen(false)}>
              <Icon name='close' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
          </div>
        </div>

        <div className='flex max-h-[410px] overflow-y-auto'>
          <form className='w-full p-4'>
            <TextInput
              header='Subject'
              className='mb-5 w-full'
              postfixIcon='search'
              onChange={(e) => setSubject(e.target.value)}
            />
            {name === 'Email' && <></>}
            {name === 'New Event' && (
              <>
                <TextArea header='Description' className='mb-4' />
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <span className='font-semibold'>Start</span>
                    <div className='grid grid-cols-2'>
                      <div>
                        <DateInput header='* Date' type='date' />
                      </div>
                      <div>
                        <DateInput header='* Time' type='time' />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className='font-semibold'>End</span>
                    <div className='grid grid-cols-2'>
                      <div>
                        <DateInput header='* Date' type='date' />
                      </div>
                      <div>
                        <DateInput header='* Time' type='time' />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {name === 'Log a Call' && <></>}
            {name === 'New Task' && <></>}

            <div className='invisible h-2'></div>
          </form>
        </div>

        <div className='absolute bottom-0 flex h-[50px] w-full items-center justify-end bg-secondary pr-2 dark:bg-sky-950'>
          <PrimaryButton>Save</PrimaryButton>
        </div>
      </nav>
    </>
  );
};

export default ButtonActivity;
