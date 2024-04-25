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
// import InputRecordRelative from './InputRecordRelative';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import useType from '@/hooks/type-service/useType';
import useProperties from '@/hooks/type-service/useProperties';
import { useLocation } from 'react-router-dom';
import recordApi from '@/api/record';
import { useToast } from '../ui/Toast';
// import ErrorToaster from '@/pages/Error/ErrorToaster';
import { useForm } from 'react-hook-form';
import RecordForm from '../Records/RecordForm';

interface ButtonActivityProps {
  name: 'Email' | 'New Event' | 'Log a Call' | 'New Task';
  icon: string;
  color?: string;
  className?: string;
  disabled?: boolean;
  setDisabled?: (disabled: boolean) => void;
}

const ButtonActivity: React.FC<ButtonActivityProps> = ({
  icon,
  name,
  className,
  color = 'bg-neutral-400',
  disabled = false,
  setDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [dateStart, setDateStart] = useState('');
  // const [dateEnd, setDateEnd] = useState('');

  const setType = () => {
    if (name === 'Email') return 'Email';
    if (name === 'New Event') return 'Event';
    if (name === 'Log a Call') return 'Call';
    if (name === 'New Task') return 'Task';
  };
  const [typeActivity, setTypeActivity] = useState(setType()); // Email, Event, Call, Task

  let isDisabledTriangleButton = false;
  if (name === 'New Task') isDisabledTriangleButton = true;

  const { handleSubmit, register } = useForm();

  const { toast } = useToast();
  const location = useLocation();
  const companyName = location.pathname.split('/')[1] || '';
  const { types: types } = useType(companyName);
  console.log(types);
  const typeId = types?.find((type) => type.name === setType())?.id;
  const { data: typeProperty, isLoading: isPropertiesLoading } = useProperties(companyName, typeId!);

  console.log({ typeId, typeProperty });

  if (!typeId) {
    return null;
  }

  const setDateTimeNow = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    now.setTime(now.getTime() - timezoneOffset * 60 * 1000);
    // const formattedDateTime = now.toISOString().slice(0, 16);
    // setDateStart(formattedDateTime);
    // setDateEnd(formattedDateTime);
  };

  const handleCreateRecord = async (data: any) => {
    const req = {
      record_name: data['Name'],
      stage_id: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      properties: typeProperty?.properties.map((property: any) => {
        return {
          id: property.id,
          property_name: property.name,
          property_label: property.label,
          item_value: data[property.name]
        };
      })
    };

    const res = await recordApi.createRecord(companyName, typeId!, req);

    if (res) {
      toast({
        title: 'Success',
        description: 'Create activity successfully'
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsOpen(false);

      handleCreateRecord(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create activity',
        variant: 'destructive'
      });
    }
  };

  const FORM_ID = 'activity-form';

  return (
    <div>
      <ButtonGroup className='mb-1 mr-1'>
        <Button
          onClick={() => {
            setIsOpen(true);
            setDateTimeNow();
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
          prefixIcon={<Icon name='arrow_drop_down' size='1' />}
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
                    setTypeActivity('Task');
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
                      setTypeActivity('Email');
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
                    setTypeActivity('Task');
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

      {isPropertiesLoading && <LoadingSpinner className='mt-10' />}

      <nav
        className={cn(
          'fixed bottom-0 right-4 flex h-[500px] w-[470px] flex-col rounded',
          'bg-white shadow-2xl shadow-button-background-dark/10 transition-all duration-200 dark:bg-panel-dark',
          'border-[2px] border-button-stroke dark:border-button-stroke-dark',
          isOpen ? 'translate-y-0' : 'translate-y-[100%]',
          'z-[100]'
        )}
      >
        <div className='flex h-[40px] items-center justify-between border-b-2 border-primary-stroke px-4 dark:border-primary-stroke-dark'>
          <div className='flex items-center'>
            <Icon
              name={cn(typeActivity === 'Task' ? 'checklist' : icon)}
              className={cn('mr-1 rounded p-0.5 text-white', typeActivity === 'Task' ? 'bg-green-400' : color)}
            ></Icon>
            <h2 className='text-base font-normal leading-5'>{typeActivity === 'Task' ? 'New Task' : name}</h2>
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
          <div className='grid w-full gap-1 p-4'>
            {typeProperty ? (
              <RecordForm formId={FORM_ID} typeProperty={typeProperty} onSubmit={onSubmit} className='pb-4' />
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>

        <div className='absolute bottom-0 flex h-[50px] w-full items-center justify-end border border-button-stroke bg-panel pr-2 dark:border-button-stroke-dark dark:bg-panel-dark'>
          <PrimaryButton type='submit' form={FORM_ID}>
            Save
          </PrimaryButton>
        </div>
      </nav>
    </div>
  );
};

export default ButtonActivity;
